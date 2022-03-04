"Script to determine the path of the scenario results of OSeMBE for the REEEMgame."
#%% Import of needed packages
from distutils.command.config import config
import numpy as np
import os
import sys
from typing import List, Dict
import pandas as pd
#%% Function to read needed results parameter
def read_res(path,param):
    path_param = os.path.join(path,param) + '.csv'
    df = pd.read_csv(path_param)
    return df

#%% Function to read Emission results
def read_emissions(path: str, param: str, emission: List) -> pd.DataFrame:
    """ Read and filter emissions by: country, year, emission
    """
    # path = os.path.join("tests","fixtures") #for testing
    # param = "AnnualTechnologyEmission" #for testing
    # emission = ['CO2'] #for testing
    df = read_res(path,param)
    df['REGION'] = df['TECHNOLOGY'].str[:2]
    df_f = pd.DataFrame(columns=["REGION","EMISSION","YEAR","VALUE"])
    for e in emission:
        df_e = df[df["EMISSION"]==e]
        for r in df_e["REGION"].unique():
            for y in df_e["YEAR"].unique():
                df_f = df_f.append({"REGION": r, "EMISSION": e, "YEAR": y,"VALUE": df_e.loc[(df_e["REGION"]==r)&(df_e["YEAR"]==y),["VALUE"]].sum(axis=0).VALUE}, ignore_index=True)
    df_f = df_f[df_f.VALUE != 0]

    return df_f

#%% Function to read CapitalInvestment (3-dimensional parameter)
def read_investment(path: str, param: str) -> pd.DataFrame:
    """ Read and filter new installed capacity by: country, technology, year.
    """
    df = read_res(path,param)
    df['REGION'] = df['TECHNOLOGY'].str[:2]
    return df

#%%
def read_net_imp(path: str):
    """Function to read ProductionByTechnologyAnnual and filter electricity exchanged between countries
    """

    tech = '(?=^.{2}(EL))^((?!00).)*$'
    parameters = ['ProductionByTechnologyAnnual','UseByTechnology']
    results = {}
    for p in parameters:
        results[p] = read_res(path, p)
    
    countries = pd.Series(dtype='object')
    years = pd.Series()
    for p in results:
        df = results[p]
        df_f = pd.DataFrame(columns=df.columns)
        mask = df['TECHNOLOGY'].str.contains(tech)
        df_f = df[mask]

        df_f['REGION'] = df_f['FUEL'].str[:2]
        df_f = df_f.drop(columns='FUEL')
        df_f = df_f.groupby(by=['REGION', 'YEAR']).sum()
        df_f = df_f.reset_index(level=['REGION', 'YEAR'])

        countries = countries.append(df_f.loc[:,'REGION'])
        years = years.append(df_f.loc[:,'YEAR'])
        results[p] = df_f
    
    countries = countries.unique()
    years = years.unique()
    exports = results['UseByTechnology']
    imports = results['ProductionByTechnologyAnnual']

    df = pd.DataFrame(columns=['REGION','YEAR','VALUE'])
    for country in countries:
        for year in years:
            if not exports[(exports['REGION']==country)&(exports['YEAR']==year)].empty:
                if not imports[(imports['REGION']==country)&(imports['YEAR']==year)].empty:
                    value = imports[(imports['REGION']==country)&(imports['YEAR']==year)].iloc[0]['VALUE'] - exports[(exports['REGION']==country)&(exports['YEAR']==year)].iloc[0]['VALUE']
                    df = df.append({'REGION': country, 'YEAR': year, 'VALUE': value}, ignore_index=True)
                else:
                    value = -exports[(exports['REGION']==country)&(exports['YEAR']==year)].iloc[0]['VALUE']
                    df = df.append({'REGION': country, 'YEAR': year, 'VALUE': value}, ignore_index=True)
            else:
                if not imports[(imports['REGION']==country)&(imports['YEAR']==year)].empty:
                    value = imports[(imports['REGION']==country)&(imports['YEAR']==year)].iloc[0]['VALUE']
                    df = df.append({'REGION': country, 'YEAR': year, 'VALUE': value}, ignore_index=True)

    return df
#%%
def read_net_imp_det(path: str, year_n: int)-> pd.DataFrame:

    tech = '(?=^.{2}(EL))^((?!00).)*$'
    parameters = ['ProductionByTechnologyAnnual','UseByTechnology']
    results = {}
    for p in parameters:
        results[p] = read_res(path, p)
    
    for p in results:
        if p == 'UseByTechnology':
            i = 'FROM'
            j = 'TO'
        else:
            i = 'TO'
            j = 'FROM'
        df = results[p]
        df_f = pd.DataFrame(columns=df.columns)
        mask = df['TECHNOLOGY'].str.contains(tech)
        df_f = df[mask]

        df_f[i] = df_f['FUEL'].str[:2]
        df_f = df_f.drop(columns='FUEL')

        mask = df_f['TECHNOLOGY'].str[:2] == df_f[i]
        df_1 = df_f[mask]
        df_2 = df_f[~mask]
        df_1[j] = df_1['TECHNOLOGY'].str[4:6]
        df_2[j] = df_2['TECHNOLOGY'].str[:2]
        df_f = pd.concat([df_1,df_2])
        df_f = df_f.groupby(by=['FROM','TO','YEAR']).sum().reset_index(level=['FROM','TO','YEAR'])

        results[p] = df_f

    countries = pd.Series(np.append(results['ProductionByTechnologyAnnual']['TO'].unique(),results['ProductionByTechnologyAnnual']['FROM'].unique())).unique()
    years = pd.Series(results['ProductionByTechnologyAnnual'][results['ProductionByTechnologyAnnual']['YEAR']<(year_n+1)]['YEAR'].unique())
    df = pd.DataFrame(columns=['TO','FROM','YEAR','VALUE'])

    for c in countries:
        for y in years:
            df_i = results['ProductionByTechnologyAnnual']
            df_e = results['UseByTechnology']
            df_i = df_i[(df_i['TO']==c)&(df_i['YEAR']==y)]
            df_e = df_e[(df_e['FROM']==c)&(df_e['YEAR']==y)]
            n = pd.Series(np.append(df_i['FROM'].unique(),df_e['TO'].unique())).unique()
            for r in n:
                if not df_i[df_i['FROM']==r].empty:
                    if not df_e[df_e['TO']==r].empty:
                        value = df_i.iloc[0,3] - df_e.iloc[0,3]
                    else:
                        value = df_i.iloc[0,3]
                else:
                    if not df_e[df_e['TO']==r].empty:
                        value = - df_e.iloc[0,3]
                df = df.append({'TO': c, 'FROM': r, 'YEAR': y, 'VALUE': value}, ignore_index=True)

    return df

#%%
def filter_op_cost(param, path, year_n: int) -> pd.pd.DataFrame:
    """Function to read filter and sum to annual values per country.
    """

    df = read_res(path, param)
    df['REGION'] = df['TECHNOLOGY'].str[:2]
    df = df.drop(columns='TECHNOLOGY')
    df = df[df['YEAR']<(year_n+1)]
    df = df.groupby(by=['REGION', 'YEAR']).sum()
    df = df.reset_index(level=['REGION','YEAR'])

    return df

#%% 
def main(config: List, res_path: str, y_n: int) -> Dict:

    scen_res = {}
    for param in config:
        if param['function'] == 'read_emissions':
            scen_res[param['parameter']] = read_emissions(res_path,param['parameter'],['CO2'])
        elif param['function'] == 'read_investment':
            scen_res[param['parameter']] = read_investment(res_path,param['parameter'])
        elif param['function'] == 'read_net_imp':
            scen_res['NetElImports'] = read_net_imp(res_path)
        elif param['function'] == 'read_net_imp_det':
            scen_res['NetElImportsPerCountry'] = read_net_imp_det(res_path, y_n)
        elif param['function'] == 'filter_op_cost':
            scen_res[param['parameter']] = filter_op_cost(param['parameter'], res_path, y_n)
        else:
            print("Function does not exist.")
            exit(1)

    return scen_res
#%%
if __name__ == "__main__":
    
    dic_scen_res = {}

# %%

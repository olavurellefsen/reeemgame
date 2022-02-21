"Script to determine the path of the scenario results of OSeMBE for the REEEMgame."
#%% Import of needed packages
from distutils.command.config import config
import os
import sys
from typing import List, Dict
import pandas as pd
#%% Function to read needed results parameter
def read_res(path,param):
    path_param = os.path.join(path,param) + '.csv'
    df = pd.read_csv(path_param)
    return df
#%% Read pop-projections
def read_pop(path,sheet,header):
    """ Function that reads in population data from excel file.
    """
    df_pop = pd.read_excel(path,sheet,header=header)
    df_pop = df_pop[df_pop['variable']=='Population']
    df_pop['id'] = df_pop.index
    df_pop = pd.wide_to_long(df_pop,["y"],i="id",j="year")
    df_pop.rename(columns={"name":"country","y":"value"},inplace=True)
    df_pop['value'] = df_pop["value"]*1000
    df_pop = df_pop.drop(columns=["unit","code_wb","variable"])
    df_pop = df_pop.reset_index(level=["year"])
    df_pop = df_pop[df_pop["year"]>=2015]
    df_pop = df_pop.reset_index(drop=True)
    return df_pop

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

#%% Function to read installed capacities
# def read_installed_capacities(path: str, param: str) -> pd.DataFrame:
#     """ Read and filter the total capacity annual by: country, technology, year.
#     """
#     df = read_res(path, param)
#     df["REGION"] = df["TECHNOLOGY"].str(:2)
#     return
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
def filter_op_cost(param, path):
    """Function to read filter and sum to annual values per country.
    """

    df = read_res(path, param)
    df['REGION'] = df['TECHNOLOGY'].str[:2]
    df = df.drop(columns='TECHNOLOGY')
    df = df.groupby(by=['REGION', 'YEAR']).sum()
    df = df.reset_index(level=['REGION','YEAR'])

    return df

#%% Filter population data
def filter_pop(df,countries):
    """Function to filter a dataframe with population data down to the countries that are in the model.
    """
    mask = df.country.isin(countries['country'])
    df = df[mask]

    return pd.merge(df,countries,on='country')
#%% 
def main(config: Dict, res_path: str) -> Dict:

    scen_res = {}
    for param in config:
        if param['function'] == 'read_emissions':
            scen_res[param['parameter']] = read_emissions(res_path,param['parameter'],['CO2'])
        if param['function'] == 'read_investment':
            scen_res[param['parameter']] = read_investment(res_path,param['parameter'])
        if param['function'] == 'read_net_imp':
            scen_res[param['parameter']] = read_net_imp(res_path)
        if param['function'] == 'filter_op_cost':
            scen_res[param['parameter']] = filter_op_cost(param['parameter'],res_path)
        else:
            print("Function does not exist.")
            exit(1)

    return scen_res
#%%
if __name__ == "__main__":
    
    dic_scen_res = {}
    df_pop = read_pop('results/pop_projection_NEWAGE.xlsx','MaGe Factors',12)
    osembe_countries = pd.read_csv('osembe_countries.csv')
    df_pop = filter_pop(df_pop,osembe_countries)

# %%

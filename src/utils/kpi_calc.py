"""Script to calculate REEEMgame KPIs.
"""
from this import d
import numpy as np
import pandas as pd
from typing import List, Dict

import kpi_main as km #for development

#%%
def calc_PA(dr: pd.DataFrame, ol: pd.DataFrame) ->pd.DataFrame:
    """Function to calculate the Present value Annuity.
    """
    dr = dr['VALUE'].iloc[0]

    ol_array = ol['VALUE'].to_numpy()
    pa = (1-(1+dr)**((-1)*ol_array))*((1+dr)/dr)

    d = {'REGION': ol['REGION'], 'TECHNOLOGY': ol['TECHNOLOGY'], 'VALUE': pa}
    df = pd.DataFrame(data=d)

    return df

#%%
def calc_aic(ci: pd.DataFrame, pa: pd.DataFrame, ol: pd.DataFrame, years: pd.Series)->pd.DataFrame:
    """Function to calculate the Annualised Investment Cost.
    """
    df = pd.DataFrame(columns=['REGION','YEAR','VALUE'])

    for r in ci['REGION'].unique():
        for y in years:
            df_w = ci[(ci['REGION']==r)&(ci['YEAR']<=y)]
            aic = 0
            for t in df_w['TECHNOLOGY'].unique():
                o_l = ol[ol['TECHNOLOGY']==t]['VALUE'].iloc[0]
                latest_ci = df_w[(df_w['TECHNOLOGY']==t)&(df_w['YEAR']<=y)&(df_w['YEAR']>(y-o_l))]['VALUE'].to_numpy()
                latest_ci = latest_ci / pa[pa['TECHNOLOGY']==t]['VALUE'].iloc[0]
                aic += latest_ci.sum()
            df = pd.concat([df, pd.DataFrame([[r,y,aic]], columns=['REGION','YEAR','VALUE'])])
    return df
#%%
def calc_dp(sad: pd.DataFrame, ni: pd.DataFrame, years: pd.Series)->pd.DataFrame:
    """Function to calculate the domestic electricity production.
    """
    df = pd.DataFrame(columns=['REGION','YEAR','VALUE'])
    for c in sad['REGION'].unique():
        for y in years:
            value = 0
            if c in ni['REGION']:
                if ni[(ni['REGION']==c)&(ni['YEAR']==y)]['VALUE'].iloc[0] > 0 :
                    value = sad[(sad['REGION']==c)&(sad['YEAR']==y)]['VALUE'].iloc[0] - ni[(ni['REGION']==c)&(ni['YEAR']==y)] * 0.95
                else:
                    value = sad[(sad['REGION']==c)&(sad['YEAR']==y)]['VALUE'].iloc[0] - ni[(ni['REGION']==c)&(ni['YEAR']==y)]
            else:
                value = sad[(sad['REGION']==c)&(sad['YEAR']==y)]['VALUE'].iloc[0]
            df = pd.concat([df, pd.DataFrame([[c,y,value]], columns=['REGION','YEAR','VALUE'])])
    return df
#%%
def calc_lcode(aic: pd.DataFrame, afoc: pd.DataFrame, avoc: pd.DataFrame, dp: pd.DataFrame, years: pd.Series)->pd.DataFrame:
    """Function to calculate the Levelised Cost of Domestic Electicity.
    """
    df = pd.DataFrame(columns=['REGION','YEAR','VALUE'])
    aic = aic.sort_values(by=['REGION', 'YEAR'])
    afoc = afoc.sort_values(by=['REGION', 'YEAR'])
    avoc = avoc.sort_values(by=['REGION', 'YEAR'])
    dp = dp.sort_values(by=['REGION', 'YEAR'])

    aic_array = aic['VALUE'].to_numpy()
    afoc_array = afoc['VALUE'].to_numpy()
    avoc_array = avoc['VALUE'].to_numpy()
    dp_array = dp['VALUE'].to_numpy()

    lcode_array = (aic_array + afoc_array + avoc_array) / (dp_array * 277.778)

    df['REGION'] = aic['REGION']
    df['YEAR'] = years
    df['VALUE'] = lcode_array

    return df
#%%
def calc_CO2_intens(ate: pd.DataFrame, pop: pd.DataFrame, years: pd.Series)-> pd.DataFrame:
    """Function to calculate the KPI CO2 intensity per citizen in each modelled country for each year.
    """
    countries = pop['iso2'].unique()
    ate_df = pd.DataFrame(index=countries,columns=years)
    pop_df = pd.DataFrame(index=countries, columns=years)
    for r in range(len(ate)):
        if ate.iloc[r]['YEAR']<2051:
            ate_df[ate.iloc[r]['YEAR']][ate.iloc[r]['REGION']] = ate.iloc[r]['VALUE']
    for r in range(len(pop)):
        if pop.iloc[r]['year']<2051:
            pop_df[pop.iloc[r]['year']][pop.iloc[r]['iso2']] = pop.iloc[r]['value']

    ate_df = ate_df.fillna(0)

    ate_array = ate_df.to_numpy()
    pop_array = pop_df.to_numpy()

    co2_intensity_array = ate_array*1000/pop_array

    co2_intensity = pd.DataFrame(data=co2_intensity_array, columns=years, index=countries)
    co2_intensity = co2_intensity.stack()
    co2_intensity = co2_intensity.reset_index()

    return co2_intensity.set_axis(['REGION', 'YEAR', 'VALUE'], axis='columns')
#%%
def main(data: Dict)->Dict:
    kpis = {}
    indi = {}

    years = pd.Series(pd.date_range('2015', freq='Y', periods=36)).dt.year

    data = km.main('config.yml', 'results', 'input_data/data') #for development

    indi['PA'] = calc_PA(data['inputs']['DiscountRate'], data['inputs']['OperationalLife'])
    indi['AIC'] = calc_aic(data['results']['CapitalInvestment'],indi['PA'],data['inputs']['OperationalLife'],years)
    indi['DP'] = calc_dp(data['inputs']['SpecifiedAnnualDemand'],data['results']['NetElImports'], years)
    indi['LCODE'] = calc_lcode(indi['AIC'], data['results']['AnnualFixedOperatingCost'], data['results']['AnnualVariableOperatingCost'],indi['DP'], years)

    kpis['CO2 intensity'] = calc_CO2_intens(data['results']['AnnualTechnologyEmission'], data['others']['Population'], years)
    return kpis

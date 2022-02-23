"""Script to calculate REEEMgame KPIs.
"""
import numpy as np
import pandas as pd
from typing import List, Dict

import kpi_main as km #for development

#%%
def calc_PA(dr: pd.DataFrame, ol: pd.DataFrame) ->pd.DataFrame:
    dr = dr['VALUE'].iloc[0]

    ol_array = ol['VALUE'].to_numpy()
    pa = (1-(1+dr)**((-1)*ol_array))*((1+dr)/dr)

    d = {'REGION': ol['REGION'], 'TECHNOLOGY': ol['TECHNOLOGY'], 'VALUE': pa}
    df = pd.DataFrame(data=d)

    return df


#%%
def calc_CO2_intens(ate, pop)-> pd.DataFrame:
    years = pd.Series(pd.date_range('2015', freq='Y', periods=36)).dt.year
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

    return co2_intensity
#%%
def main(data: Dict)->Dict:
    kpis = {}
    indi = {}

    data = km.main('config.yml', 'results', 'input_data/data') #for development

    indi['PA'] = calc_PA(data['inputs']['DiscountRate'], data['inputs']['OperationalLife'])

    kpis['CO2 intensity'] = calc_CO2_intens(data['results']['AnnualTechnologyEmission'], data['others']['Population'])
    return kpis

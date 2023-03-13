"""Script to read and filter data not related to OSeMBE needed in the REEEMgame.
"""
import pandas as pd
from typing import List, Dict

#%%
def read_pop(config: Dict,countries: pd.DataFrame, year_0: int, year_n: int)-> Dict:
    """ Function that reads in population data from excel file.
    """
    path = config['path']
    sheet = config['sheet']
    header = config['header']

    df_pop = pd.read_excel(path,sheet,header=header)
    df_pop = df_pop[df_pop['variable']=='Population']
    df_pop['id'] = df_pop.index
    df_pop = pd.wide_to_long(df_pop,["y"],i="id",j="year")
    df_pop.rename(columns={"name":"country","y":"value"},inplace=True)
    df_pop['value'] = df_pop["value"]*1000
    df_pop = df_pop.drop(columns=["unit","code_wb","variable"])
    df_pop = df_pop.reset_index(level=["year"])
    df_pop = df_pop[(df_pop["year"]>=int(year_0))&(df_pop["year"]<(int(year_n)+1))]
    df_pop = df_pop.reset_index(drop=True)

    df_pop = filter_pop(df_pop, countries)

    return df_pop

#%%
def filter_pop(df,countries):
    """Function to filter a dataframe with population data down to the countries that are in the model.
    """
    mask = df.country.isin(countries['country'])
    df = df[mask]

    return pd.merge(df,countries,on='country')

#%%
def main(config: List, y_0: int, y_n: int) -> Dict:
    osembe_countries = pd.read_csv('other_data/osembe_countries.csv')
    others_dic = {}

    for p in config:
        if p['function'] == 'read_pop':
            others_dic[p['parameter']] = read_pop(p, osembe_countries, y_0, y_n)
        else:
            print('The provided function does not exist.')
            exit(1)
    
    return others_dic
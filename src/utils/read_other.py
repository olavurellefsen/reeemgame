"""Script to read and filter data not related to OSeMBE needed in the REEEMgame.
"""
import pandas as pd

#%%
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

#%%
def filter_pop(df,countries):
    """Function to filter a dataframe with population data down to the countries that are in the model.
    """
    mask = df.country.isin(countries['country'])
    df = df[mask]

    return pd.merge(df,countries,on='country')

#%%
def main():
    others_dic = {}

    df_pop = read_pop('other_data/pop_projection_NEWAGE.xlsx','MaGe Factors',12)
    osembe_countries = pd.read_csv('other_data/osembe_countries.csv')
    df_pop = filter_pop(df_pop,osembe_countries)
    return others_dic
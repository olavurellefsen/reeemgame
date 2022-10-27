"""Script to read input data of OSeMBE scenarios.
"""
import pandas as pd
import read_res as rr
from typing import List, Dict

#%%
def read_dr(param: str, path: str) -> pd.DataFrame:
    """Function to read the discount rate from a datapackage."""
    df = rr.read_res(path, param)
    if df.empty:
        df_default = rr.read_res(path,'default_values')
        value = df_default[df_default['name']=='DiscountRate'].iloc[0]['default_value']
        df = df.append({'REGION': 'REGION1', 'VALUE': value}, ignore_index=True)
    else:
        print('Currently only default values for the DiscountRate are accepted in this script.')
        exit(1)
    return df
#%%
def read_ol(param: str, path: str) -> pd.DataFrame:
    df = rr.read_res(path, param)
    df['REGION'] = df['TECHNOLOGY'].str[:2]
    return df
#%%
def read_sad(param: str, path: str, y_start: int, y_last: int) -> pd.DataFrame:
    df = rr.read_res(path, param)
    df['REGION'] = df['FUEL'].str[:2]
    df['FUEL'] = df['FUEL'].str[2:]
    df = df[(df['YEAR']>=int(y_start))&(df['YEAR']<=int(y_last))]
    return df
#%%
def main(config: List, inp_path: str, y_0: int, y_n: int) -> Dict:
    
    scen_inp = {}

    for param in config:
        if param['function'] == 'read_dr':
            scen_inp[param['parameter']] = read_dr(param['parameter'], inp_path)
        elif param['function'] == 'read_ol':
            scen_inp[param['parameter']] = read_ol(param['parameter'], inp_path)
        elif param['function'] == 'read_sad':
            scen_inp[param['parameter']] = read_sad(param['parameter'], inp_path, y_0, y_n)
        else:
            print('Function does not exist.')
            exit(1)

    return scen_inp
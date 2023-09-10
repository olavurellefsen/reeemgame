"""
This script coordinates the calculation of KPIs for the REEEMgame using OSeMBE results, OSeMBE inputs and other data. 
Usage:
    python kpi_main.py <config> <results> <data>' <year 0> <year n>

Args:
    config file (str): Path to yml configuration file that contains information on whic model input parameter, results variables, and other data needs to be read in for calculating the KPIs.
    results (str): Path to directory that contains OSeMBE results in csv format.
    data (str): Path to data folder of OSeMBE datapackage.
    year 0 (int): first year of interest.
    year n (int): last year of interest.

Returns:
    scenarioScore (json): Scenario scores for the entire modelled region (EU+CH+NO+UK).
    score (json): Scores per modelled country.
    KPIs (csv): The Key Performance Indicators for the modelled region per year.

Author:
    Hauke Henke - 2023-02-07
"""
from ast import arg
import kpi_calc as kc
import os
import pandas as pd
import read_inp as ri
import read_other as ro
import read_res as rr
import scen_names as sn
import sys
from typing import List, Dict
import write_kpis as wk
import write_scores as ws
from yaml import load, SafeLoader

#%%
def get_dirs(path):
    """
    Get directory names from folder.
    Args:
        path (str): path to directory in which to read in subdirectories

    Returns:
        List: directories in indicated directory
    """
    dirs = [d for d in os.listdir(path) if os.path.isdir(os.path.join(path, d))]
    return dirs
#%%
def build_names(dic,i):
    """
    Function to go through the identified directories and build scenario names and paths.
    Args:
        dic (Dictionary): Paths to results and scenario names
        i (int): number used to end process 

    Returns:
        dic (Dictionary): Paths to results and scenario names
        i (int): process control number
    """
    if i == 0:
        p = dic[i]
        dirs = get_dirs(p)
        dic = {}
        for f in dirs:
            dic[f] = os.path.join(p,f)
        i+=1
    else:
        dic_t = {}
        for s in dic:
            dirs = get_dirs(dic[s])
            if 'res' in dirs:
                i+=1
                dic[s] = os.path.join(dic[s],'res')
            else:
                for d in dirs:
                    dic_t[s+'|'+d] = os.path.join(dic[s],d)
        if bool(dic_t):
            dic = dic_t

    return dic,i

#%%
def get_scens(path: str):
    """
    Function to get names of scenarios and paths to scenario results in indicated results directory.
    Args:
        path (str): Path to folder containing results.
    Returns:
        Dictionary: Scenario names and paths to scenario results.
    """
    dic_scen = {}
    i = 0
    dic_scen = {0: path}
    while i < 2:
        dic_scen, i = build_names(dic_scen,i)
    return dic_scen
#%% Load configuration
def load_config(filepath: str) -> Dict:
    """
    Reads the configuration file
    Args:
        filepath (str): The path to the config file

    Returns:
        Dictionary: Information on what input parameter, results variables, and other data to read in and what functions to use.
    """
    with open(filepath, 'r') as configfile:
        config = load(configfile, Loader=SafeLoader)
    return config
#%%
def check_config(conf: Dict, scens: Dict):
    """
    Check that results parameter in configuration file exist.
    Args:
        conf (Dictionary): Information on what input parameter, results variables, and other data to read in and what functions to use.
        scens (Dictionary): Scenario names and paths to results.
        
    Returns:
        Dictionary: Scenarios with reuqired results.
    """
    scens_complete = dict(scens)

    for s in scens:
        res_files = next(os.walk(scens[s]), (None,None,[]))[2]

        for p in conf['results']:
            f = p['parameter'] + '.csv'
            if f not in res_files:
                print("%s does not have %s in results" % (s, p))
                if s in scens_complete:
                    del scens_complete[s]
    return scens_complete
#%%
def main(path_conf: str, path_res: str, path_dp: str, first_y: int, last_y):

    config = load_config(path_conf)
    scens = get_scens(path_res)
    print('Identified the following scenarios:')
    print(scens.keys())
    scen_names = sn.main()

    scens = check_config(config, scens)

    data = {}
    data['inputs'] = ri.main(config['inputs'],path_dp, first_y, last_y)
    print("Read input data.")
    data['others'] = ro.main(config['others'], first_y, last_y)
    print("Read other data.")

    kpis = {}
    indicators = ['AccumulatedCO2', 'CO2Intensity', 'DiscountedInvestmentPerCitizen', 'LCOE']
    kpis_csv = {}
    for i in indicators:
        kpis_csv[i] = pd.DataFrame()
    
    for s in scens:
        scen = scen_names[scen_names['scen_names_long']==s]['scen_names_short'].iloc[0]
        print("Scenario: %s" % (s))
        data['results'] = rr.main(config['results'], scens[s], last_y)
        print("Read results for scenario %s" % (s))

        kpis[scen] = kc.main(data, first_y, last_y)
        print("Calculated KPIs for scenario %s" % (s))
        for i in indicators:
            df = pd.DataFrame()
            df[scen] = kpis[scen][i][kpis[scen][i]['YEAR']==2050]['VALUE']
            df = df.reset_index(drop=True)
            kpis_csv[i] = pd.concat([kpis_csv[i],df], axis=1)
        
        print("Added KPIs to kpis_csv for %s" % (s))
    
    kpis_c = {}
    kpis_r = {}

    for i in indicators:
        kpis_csv[i] = pd.concat([kpis_csv[i],kpis[scen][i][kpis[scen][i]['YEAR']==2050]['REGION'].reset_index(drop=True)],axis=1)
        kpis_c[i] = kpis_csv[i][kpis_csv[i]['REGION']!='EU+CH+NO+UK']
        kpis_r[i] = kpis_csv[i][kpis_csv[i]['REGION']=='EU+CH+NO+UK']
        path = os.path.join(path_res, i+'.csv')
        kpis_csv[i].to_csv(path, index=False)

    ws.main(kpis_r, '../data/scenarioScore.json', 'EU+CH+NO+UK') # Writing out scores for the entire modelled region
    ws.main(kpis_c, '../data/score.json') # Writing out scores per country
    return wk.main(kpis) # Writing out KPIs

#%% 
if __name__ == "__main__":
    
    args = sys.argv[1:]
    if len(args)!= 5:
        print("Use this script as follows: 'python kpi_main.py <configuration path> <results path> <path to data folder of datapackage>' <year 0> <year n>")

    config_path = args[0]
    res_path = args[1]
    dp_path = args[2]
    year_0 = args[3]
    year_n = args[4]

    main(config_path, res_path, dp_path, year_0, year_n)
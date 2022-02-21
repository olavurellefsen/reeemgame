"""This script coordinates the calculation of KPIs for the REEEMgame using OSeMBE results, inputs and other data. 
"""
import os
import pandas as pd
import read_inp as ri
import read_other as ro
import read_res as rr
import sys
from typing import List, Dict
from yaml import load, SafeLoader

#%% Get directory names from folder
def get_dirs(path):
    dirs = [d for d in os.listdir(path) if os.path.isdir(os.path.join(path, d))]
    return dirs
#%% Function to go through directories and build scenario names and paths
def build_names(dic,i):
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
    dic_scen = {}
    i = 0
    dic_scen = {0: path}
    while i < 2:
        dic_scen, i = build_names(dic_scen,i)
    return dic_scen
#%% Load configuration
def load_config(filepath: str) -> Dict:
    """Reads the configuration file

    Arguments
    ---------
    filepath : str
        The path to the config file
    """
    with open(filepath, 'r') as configfile:
        config = load(configfile, Loader=SafeLoader)
    return config
#%% Check that results parameter in config exist
def check_config(conf: Dict, scens: Dict):

    res_files = next(os.walk(scens[list(scens.keys())[0]]), (None,None,[]))[2]

    for p in conf['results']:
        f = p['parameter'] + '.csv'
        if f not in res_files:
            print("p not in results")
            exit(1)
    return
#%%
def main(path_conf: str, path_res: str, path_dp: str):

    config = load_config(path_conf)
    scens = get_scens(path_res)

    check_config(config, scens)

    data = {}
    data['inputs'] = ri.main(config['inputs'],path_dp)
    data['others'] = ro.main()

    for s in scens:
        data['results'] = rr.main(config['results'], scens[s])

    return

#%% 
if __name__ == "__main__":
    
    args = sys.argv[1:]

    config_path = args[0]
    res_path = args[1]

    main(config_path, res_path)
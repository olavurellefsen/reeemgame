import json
from os import environ
import pandas as pd
from typing import Dict

#%% 
def format_kpis(kpis: Dict, kpi: str) -> Dict:
    """Function to bring KPI data into dictionaries by Scenario, Year, and Country."""
    kpi_dic_json = {}
    countries = pd.Series(kpis[list(kpis.keys())[0]]['LCOE']['REGION'].unique())
    countries = countries[countries!='EU+CH+NO+UK']
    for s in kpis:
        dic_of_years = {}
        for y in kpis[s][kpi]['YEAR'].unique():
            country_value_dic = {}
            for c in countries:
                country_value_dic[c] = kpis[s][kpi][(kpis[s][kpi]['YEAR']==y)&(kpis[s][kpi]['REGION']==c)].iloc[0, 2]
            dic_of_years[int(y)] = country_value_dic
        kpi_dic_json[s] = dic_of_years

    return kpi_dic_json

#%%
def main(kpis: Dict):
    """Main function to bring data of all KPIs provided into dictionary format and to write out to json files."""

    kpis_in_dics = {}

    for kpi in kpis[list(kpis.keys())[0]].keys():

        kpis_in_dics[kpi] = format_kpis(kpis, kpi)
        
        # with open('../data/indicators/%s.json' % kpi, 'w') as outfile:
        with open('results/test/%s.json' % kpi, 'w') as outfile:
            json.dump(kpis_in_dics[kpi], outfile)

    return
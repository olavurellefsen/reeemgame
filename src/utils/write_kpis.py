import json
from os import environ
import pandas as pd
from typing import Dict

# for development
#kpis = {}
#kpis['CO2Intensity'] = pd.read_csv('results/220506/results/CO2Intensity_10th.csv')
#kpis['DiscountedInvestmentPerCitizen'] = pd.read_csv('results/220506/results/DiscountedInvestmentPerCitizen_10th.csv')
#kpis['LCOE'] = pd.read_csv('results/220506/results/LCOE_10th.csv')

#def filter_kpis(data: pd.DataFrame) -> pd.DataFrame:
#    data = data[data['REGION']!='EU+CH+NO+UK']
#    years = data['YEAR'].unique() # this could be removed if years are taken from MultiIndex in function format_kpis
#    regions = data['REGION'].unique() # this could be removed if countries are taken from MultiIndex in function format_kpis
#    data = data.set_index(['REGION','YEAR'])
#    return data, years, regions

def format_kpis(kpis: Dict, kpi: str) -> Dict:
    kpi_dic_json = {}
    countries = pd.Series(kpis[list(kpis.keys())[0]]['LCOE']['REGION'].unique())
    countries = countries[countries!='EU+CH+NO+UK']
    for s in kpis:
        dic_of_years = {}
        for y in kpis[s][kpi]['YEAR'].unique():
            country_value_dic = {}
            for c in countries:
                country_value_dic[c] = kpis[s][kpi][(kpis[s][kpi]['YEAR']==y)&(kpis[s][kpi]['REGION']==c)]['VALUE']
            dic_of_years[int(y)] = country_value_dic
        kpi_dic_json[s] = dic_of_years

    return kpi_dic_json

def main(kpis: Dict):

    kpis_in_dics = {}

    for kpi in kpis:

        kpis_in_dics[kpi] = format_kpis(kpis, kpi)

        with open('../data/indicators/%s.json' % kpi, 'w') as outfile:
            json.dump(kpis_in_dics[kpi], outfile)

    return
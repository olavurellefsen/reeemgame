import json
from os import environ
import pandas as pd
from typing import Dict

# for development
#kpis = {}
#kpis['CO2Intensity'] = pd.read_csv('results/220506/results/CO2Intensity_10th.csv')
#kpis['DiscountedInvestmentPerCitizen'] = pd.read_csv('results/220506/results/DiscountedInvestmentPerCitizen_10th.csv')
#kpis['LCOE'] = pd.read_csv('results/220506/results/LCOE_10th.csv')

def filter_kpis(data: pd.DataFrame) -> pd.DataFrame:
    data = data[data['YEAR']==2050] # change to 2050!!!
    data = data.drop(['YEAR'], axis=1)
    return data.set_index('REGION')

def main(kpis: Dict):

    for kpi in kpis:
        kpis[kpi] = filter_kpis(kpis[kpi])

    rawScores = []

    for s in kpis['CO2Intensity'].columns:
        for c in kpis['CO2Intensity'].index:
            env = kpis['CO2Intensity'].loc[c, s]
            eco = kpis['DiscountedInvestmentPerCitizen'].loc[c, s]
            soc = kpis['LCOE'].loc[c, s]
            rawScores.append(
                {
                    "scenario": s,
                    "country": c,
                    "env": env,
                    "eco": eco,
                    "soc": soc
                }
            )

    with open('../data/rawScores.json', 'w') as outfile:
        json.dump(rawScores, outfile)

    return
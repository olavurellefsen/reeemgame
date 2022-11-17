import json
from os import environ
import pandas as pd
from typing import Dict, Optional

# for development
# kpis = {}
# kpis['CO2Intensity'] = pd.read_csv('results/220617/results/CO2Intensity_10th.csv')
# kpis['DiscountedInvestmentPerCitizen'] = pd.read_csv('results/220617/results/DiscountedInvestmentPerCitizen_10th.csv')
# kpis['LCOE'] = pd.read_csv('results/220617/results/LCOE_10th.csv')

def filter_kpis(data: pd.DataFrame, region: Optional[str]=None) -> pd.DataFrame:
    if region:
        data = data[data['REGION']=='EU+CH+NO+UK']
        #data = data.drop(['REGION'], axis=1)
    else:
        data = data[data['REGION']!='EU+CH+NO+UK']
    return data

def normalise_scores(df: pd.DataFrame, reg: Optional[str]=None) -> pd.DataFrame:

    df = df.set_index('REGION')

    max_value = max(df.max())
        
    df = 100 - (df/max_value)*100

    return df

def main(kpis: Dict, path: str, reg: Optional[str]=None):

    for kpi in kpis:
        # if reg:
        #     kpis[kpi] = filter_kpis(kpis[kpi], reg)
        # else:
        #     kpis[kpi] = filter_kpis(kpis[kpi])
        kpis[kpi] = normalise_scores(kpis[kpi])

    rawScores = []

    scenarios = list(kpis['CO2Intensity'])

    if reg:
        for s in scenarios:
            env = kpis['CO2Intensity'].loc[reg, s]
            eco = kpis['DiscountedInvestmentPerCitizen'].loc[reg, s]
            soc = kpis['LCOE'].loc[reg, s]
            rawScores.append(
                {
                    "scenario": s,
                    "env": env,
                    "eco": eco,
                    "soc": soc
                }
            )
    else:
        countries = kpis['CO2Intensity'].index
        for c in countries:
            for s in scenarios:
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

    with open(path, 'w') as outfile:
        json.dump(rawScores, outfile)

    return
import json
from os import environ
import pandas as pd
from typing import Dict

# for development
kpis = {}
kpis['CO2Intensity'] = pd.read_csv('results/220506/results/CO2Intensity_10th.csv')
kpis['DiscountedInvestmentPerCitizen'] = pd.read_csv('results/220506/results/DiscountedInvestmentPerCitizen_10th.csv')
kpis['LCOE'] = pd.read_csv('results/220506/results/LCOE_10th.csv')

def filter_kpis(data: pd.DataFrame) -> pd.DataFrame:
    data = data[data['YEAR']==2050]
    data = data.drop(['YEAR'], axis=1)
    return data.set_index('REGION')

def normalise_scores(df: pd.DataFrame) -> pd.DataFrame:
    
    df_norm_score = pd.DataFrame(columns=['REGION', 'SCENARIO','VALUE'])
    max_value = df.iloc[0].max()
    score_array = df.iloc[0].to_numpy()

    score_norm = 100 - (score_array / max_value) * 100

    df_norm_score['SCENARIO'] = list(df)
    df_norm_score['VALUE'] = score_norm
    df_norm_score['REGION'] = df.index[0]

    return df_norm_score

def main(kpis: Dict):

    for kpi in kpis:
        kpis[kpi] = filter_kpis(kpis[kpi])
        kpis[kpi] = normalise_scores(kpis[kpi])

    rawScores = []

    for s in kpis['CO2Intensity']['SCENARIO'].unique():
        for c in kpis['CO2Intensity']['REGION'].unique():
            env = kpis['CO2Intensity'][(kpis['CO2Intensity']['REGION']==c)&(kpis['CO2Intensity']['SCENARIO']==s)].iloc[0,2]
            eco = kpis['DiscountedInvestmentPerCitizen'][(kpis['DiscountedInvestmentPerCitizen']['REGION']==c)&(kpis['DiscountedInvestmentPerCitizen']['SCENARIO']==s)].iloc[0,2]
            soc = kpis['LCOE'][(kpis['LCOE']['REGION']==c)&(kpis['LCOE']['SCENARIO']==s)].iloc[0,2]
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
import json
from os import environ
import pandas as pd
from typing import Dict

# for development
# kpis = {}
# kpis['CO2Intensity'] = pd.read_csv('results/220506/results/CO2Intensity_10th.csv')
# kpis['DiscountedInvestmentPerCitizen'] = pd.read_csv('results/220506/results/DiscountedInvestmentPerCitizen_10th.csv')
#kpis['LCOE'] = pd.read_csv('results/220506/results/LCOE_10th.csv')

def filter_kpis(data: pd.DataFrame) -> pd.DataFrame:
    data = data[data['YEAR']==2050]
    data = data[data['REGION']=='EU+CH+NO+UK']
    return data.drop(['REGION', 'YEAR'], axis=1)

def normalise_scores(df: pd.DataFrame) -> pd.DataFrame:
    
    df_norm_score = pd.DataFrame(columns=['SCENARIO','VALUE'])
    max_value = df.iloc[0].max()
    score_array = df.iloc[0].to_numpy()

    score_norm = 100 - (score_array / max_value) * 100

    df_norm_score['SCENARIO'] = list(df)
    df_norm_score['VALUE'] = score_norm

    return df_norm_score

def main(kpis: Dict):

    for kpi in kpis:
        kpis[kpi] = filter_kpis(kpis[kpi])
        kpis[kpi] = normalise_scores(kpis[kpi])

    rawScores = []

    for s in kpis['CO2Intensity']['SCENARIO'].unique():
        env = kpis['CO2Intensity'][kpis['CO2Intensity']['SCENARIO']==s].iloc[0,1]
        eco = kpis['DiscountedInvestmentPerCitizen'][kpis['DiscountedInvestmentPerCitizen']['SCENARIO']==s].iloc[0,1]
        soc = kpis['LCOE'][kpis['LCOE']['SCENARIO']==s].iloc[0,1]
        rawScores.append(
            {
                "scenario": s,
                "env": env,
                "eco": eco,
                "soc": soc
            }
        )

    with open('../data/rawScores.json', 'w') as outfile:
        json.dump(rawScores, outfile)

    return
"""Script to calculate REEEMgame KPIs.
"""
from this import d
import numpy as np
import pandas as pd
from typing import List, Dict

#import kpi_main as km #for development

#%%
def calc_PA(dr: pd.DataFrame, ol: pd.DataFrame) ->pd.DataFrame:
    """
    Function to calculate the Present value Annuity.
    Args:
        dr (DataFrame): Discount Rate
        ol (DataFrame): Operational Life

    Returns:
        DataFrame: Present value Annuity per technology and country.
    """
    dr = dr['VALUE'].iloc[0]

    ol_array = ol['VALUE'].to_numpy()
    pa = (1-(1+dr)**((-1)*ol_array))*((1+dr)/dr)

    d = {'REGION': ol['REGION'], 'TECHNOLOGY': ol['TECHNOLOGY'], 'VALUE': pa}
    df = pd.DataFrame(data=d)

    return df
#%%
def calc_crf(dr: pd.DataFrame, ol: pd.DataFrame) ->pd.DataFrame:
    """
    Function to calculate the Capital Recovery Factor.
    Args:
        dr (DataFrame): Discount Rate
        ol (DataFrame): Operational Life

    Returns:
        DataFrame: Capital Recpvery Factor per technology and country.
    """
    dr = dr['VALUE'].iloc[0]

    ol_array = ol['VALUE'].to_numpy()
    crf = (1-(1+dr)**(-1))/(1-(1+dr)**((-1)*ol_array))

    d = {'REGION': ol['REGION'], 'TECHNOLOGY': ol['TECHNOLOGY'], 'VALUE': crf}
    df = pd.DataFrame(data=d)

    return df

#%%
def calc_aic(cc: pd.DataFrame, ci: pd.DataFrame, crf: pd.DataFrame, pa: pd.DataFrame, ol: pd.DataFrame, rc: pd.DataFrame, years: pd.Series)->pd.DataFrame:
    """
    Function to calculate the Annualised Investment Cost.
    Args:
        ci (DataFrame): Capital Investment
        pa (DataFrame): Present value Annuity
        ol (DataFrame): Operational Life
        rc (DataFrame): Residual Capacity,
        years (Series): Years of interest

    Returns:
        DataFrame: Annualised Investment Cost per country and year.
    """
    df = pd.DataFrame(columns=['REGION','YEAR','VALUE'])

    for r in ci['REGION'].unique():
        for y in years:
            df_w = ci[(ci['REGION']==r)&(ci['YEAR']<=y)]
            df_rc_temp = rc[(rc['REGION']==r)&(rc['YEAR']==y)]
            aic = 0
            for t in df_w['TECHNOLOGY'].unique():
                o_l = ol[ol['TECHNOLOGY']==t]['VALUE'].iloc[0]
                latest_ci = df_w[(df_w['TECHNOLOGY']==t)&(df_w['YEAR']<=y)&(df_w['YEAR']>(y-o_l))]['VALUE'].to_numpy()
                latest_ci = latest_ci / pa[pa['TECHNOLOGY']==t]['VALUE'].iloc[0]
                aic += latest_ci.sum()
            for t in df_rc_temp['TECHNOLOGY'].unique():
                if t in cc['TECHNOLOGY'].unique():
                    aic_rc = df_rc_temp[(df_rc_temp['TECHNOLOGY']==t)&(df_rc_temp['YEAR']==y)]['VALUE'].iloc[0] * cc[(cc['REGION']==r)&(cc['TECHNOLOGY']==t)&(cc['YEAR']==2015)]['VALUE'].iloc[0] * crf[crf['TECHNOLOGY']==t]['VALUE'].iloc[0]
                    aic += aic_rc
            df = pd.concat([df, pd.DataFrame([[r,y,aic]], columns=['REGION','YEAR','VALUE'])])
    return df
#%%
def calc_dp(sad: pd.DataFrame, ni: pd.DataFrame, years: pd.Series)->pd.DataFrame:
    """
    Function to calculate the domestic electricity production.
    Args:
        sad (DataFrame): Specified Annual Demand
        ni (DataFrame): Net electricity Imports
        years (Series): Years of interest

    Returns:
        DataFrame: Domestic electricity Production per country and year.
    """
    print('Net-Imports SI: ', ni[ni['REGION']=='SI'])
    df = pd.DataFrame(columns=['REGION','YEAR','VALUE'])
    for c in sad['REGION'].unique():
        for y in years:
            value = 0
            if c in ni['REGION']:
                if ni[(ni['REGION']==c)&(ni['YEAR']==y)]['VALUE'].iloc[0] > 0 :
                    value = sad[(sad['REGION']==c)&(sad['YEAR']==y)]['VALUE'].iloc[0] - ni[(ni['REGION']==c)&(ni['YEAR']==y)]['VALUE'].iloc[0] * 0.95
                else:
                    value = sad[(sad['REGION']==c)&(sad['YEAR']==y)]['VALUE'].iloc[0] - ni[(ni['REGION']==c)&(ni['YEAR']==y)]['VALUE'].iloc[0]
            else:
                value = sad[(sad['REGION']==c)&(sad['YEAR']==y)]['VALUE'].iloc[0]
            df = pd.concat([df, pd.DataFrame([[c,y,value]], columns=['REGION','YEAR','VALUE'])])
    return df
#%%
def calc_lcode(aic: pd.DataFrame, afoc: pd.DataFrame, avoc: pd.DataFrame, dp: pd.DataFrame)->pd.DataFrame:
    """
    Calculate the Levelised Cost of Domestic Electicity.
    Args:
        aic (DataFrame): Annualised Investment Cost.
        afoc (DataFrame): Annualised Fixed Operating Cost.
        avoc (DataFrame): Annualised Variable Operating Cost.
        dp (DataFrame): Domestic Production.

    Returns:
        DataFrame: Levelised Cost of domestically produced electricity in MEUR/PJ.
    """
    df = pd.DataFrame(columns=['REGION','YEAR','VALUE'])
    aic = aic.sort_values(by=['REGION', 'YEAR'])
    afoc = afoc.sort_values(by=['REGION', 'YEAR'])
    avoc = avoc.sort_values(by=['REGION', 'YEAR'])
    dp = dp.sort_values(by=['REGION', 'YEAR'])

    aic_array = aic['VALUE'].to_numpy()
    afoc_array = afoc['VALUE'].to_numpy()
    avoc_array = avoc['VALUE'].to_numpy()
    dp_array = dp['VALUE'].to_numpy()

    lcode_array = (aic_array + afoc_array + avoc_array) / (dp_array * 277.778)

    df['REGION'] = aic['REGION']
    df['YEAR'] = aic['YEAR']
    df['VALUE'] = lcode_array

    return df
#%%
def calc_CO2_intens(ate: pd.DataFrame, pop: pd.DataFrame, years: pd.Series, year_n:int)-> pd.DataFrame:
    """
    Function to calculate the KPI CO2 intensity per citizen in each modelled country for each year.
    Args:
        ate (DataFrame): Annual Technology Emission
        pop (DataFrame): Population per country and year.
        years (Series): Years of interest.
        year_n (int): Last year of interest.

    Returns:
        DataFrame: CO2 intensity of power generation by country and year.
    """
    countries = pop['iso2'].unique()
    ate_df = pd.DataFrame(index=countries,columns=years)
    pop_df = pd.DataFrame(index=countries, columns=years)
    for r in range(len(ate)):
        if ate.iloc[r]['YEAR']<(int(year_n)+1):
            ate_df[ate.iloc[r]['YEAR']][ate.iloc[r]['REGION']] = ate.iloc[r]['VALUE']
    for r in range(len(pop)):
        if pop.iloc[r]['year']<(int(year_n)+1):
            pop_df[pop.iloc[r]['year']][pop.iloc[r]['iso2']] = pop.iloc[r]['value']

    ate_df = ate_df.fillna(0)

    ate_array = ate_df.to_numpy()
    pop_array = pop_df.to_numpy()

    co2_intensity_array = ate_array*1000/pop_array # Converting emissions from ktCO2 to tCO2
    total_pop = np.sum(pop_array, axis=0)
    pop_shares = pop_array / total_pop
    eu_plus_3_intensity_array = np.sum(co2_intensity_array * pop_shares, axis=0)
    eu_plus_3_intensity = pd.DataFrame(columns=['REGION','YEAR','VALUE'])
    eu_plus_3_intensity['YEAR'] = years
    eu_plus_3_intensity['VALUE'] = eu_plus_3_intensity_array
    eu_plus_3_intensity['REGION'] = 'EU+CH+NO+UK'

    co2_intensity = pd.DataFrame(data=co2_intensity_array, columns=years, index=countries)
    co2_intensity = co2_intensity.stack()
    co2_intensity = co2_intensity.reset_index()

    co2_intensity = co2_intensity.set_axis(['REGION', 'YEAR', 'VALUE'], axis='columns')

    return pd.concat([co2_intensity, eu_plus_3_intensity], ignore_index=True)
#%%
def invest_per_citizen(aic: pd.DataFrame, dr: pd.DataFrame, pop: pd.DataFrame, years: pd.Series)->pd.DataFrame:
    """
    Function to calculate the discounted capital investment per citizen, country, and year.
    Args:
        aic (DataFrame): Annual Investment Cost
        dr (DataFrame): Discount Rate
        pop (DataFrame): Population per country and year
        years (Series):  Years of interest

    Returns:
        DataFrame: Investment per citizen per country and for the EU+CH+NO+UK, and per year.
    """
    aic = aic.sort_values(by=['REGION','YEAR'])
    pop = pop.sort_values(by=['iso2','year'])

    y_y0 = np.arange(years.max()+1-years.min())
    y_y0xr = y_y0
    for r in range(len(aic['REGION'].unique())-1):
        y_y0xr = np.append(y_y0xr, y_y0)
    aic_array = aic['VALUE'].to_numpy()
    dr = dr['VALUE'].iloc[0]
    pop_array = pop['value'].to_numpy()

    dipc = (aic_array / (1+dr)**y_y0xr) / pop_array
    dipc = dipc * 10**6 # Converting MEUR to EUR

    df = pd.DataFrame(columns=['REGION','YEAR','VALUE'])
    df['REGION'] = aic['REGION']
    df['YEAR'] = aic['YEAR']
    df['VALUE'] = dipc

    aic_eu_plus_3 = aic.groupby('YEAR').sum()
    aic_eu_plus_3_array = aic_eu_plus_3['VALUE'].to_numpy()
    pop_eu_plus_3 = pop.groupby('year').sum()
    pop_eu_plus_3_array = pop_eu_plus_3['value'].to_numpy()
    dipc_eu_plus_3 = (aic_eu_plus_3_array / (1+dr)**y_y0) / pop_eu_plus_3_array
    dipc_eu_plus_3 *= 10**6

    df_eu = pd.DataFrame(columns=['REGION','YEAR','VALUE'])
    df_eu['YEAR'] = years
    df_eu['VALUE'] = dipc_eu_plus_3
    df_eu['REGION'] = 'EU+CH+NO+UK'

    return pd.concat([df, df_eu], ignore_index=True)

#%%
def calc_lcoe(dp: pd.DataFrame, sad: pd.DataFrame, lcode: pd.DataFrame, neipc: pd.DataFrame, y_n: int)->pd.DataFrame:
    """
    Function to calculate the Levelised Cost of Electricity (LCOE) per country and year.
    Args:
        dp (DataFrame): Domestic production of electricity per year and country.
        sad (DataFrame): The Specified Annual Demand, from model input.
        lcode (DataFrame): The Levelised Cost of domestic electricity per country and year.
        neipc (DataFrame): The Net-Electricity Imports Per Country and connected-country.
        y_n (int): Last year of interest.

    Returns:
        DataFrame: The LCOE per country and year, and for the entire modelled region (EU+CH+NO+UK).
    """
    countries = pd.Series(sad['REGION'].unique())
    years = pd.Series(sad[sad['YEAR']<(int(y_n)+1)]['YEAR'].unique())
    sad = sad[sad['YEAR']<(int(y_n) + 1)]
    sad = sad.sort_values(by=['REGION', 'YEAR'])
    dp = dp.sort_values(by=['REGION','YEAR'])
    lcode = lcode.sort_values(by=['REGION','YEAR'])

    df_lcoe = pd.DataFrame(columns=['REGION','YEAR','VALUE'])

    for c in countries:
        df = pd.DataFrame(columns=['REGION','YEAR','VALUE'])
        df_i_raw = neipc[neipc['TO']==c]
        df_i = pd.DataFrame(columns=['YEAR','VALUE'])
        
        for y in years:
            lcoe_imp_y = 0
            sad_cy = sad[(sad['REGION']==c)&(sad['YEAR']==y)]['VALUE'].iloc[0]
            lcode_cy = lcode[(lcode['REGION']==c)&(lcode['YEAR']==y)]['VALUE'].iloc[0]
            if not df_i_raw[df_i_raw['YEAR']==y].empty:
                net_imp_y = df_i_raw[df_i_raw['YEAR']==y]

                if (y == 2050)&(c=='SI'):
                    print('Imports SI 2050: ', net_imp_y)
                    print('Specified Annual Demand, SI, 2050', sad_cy)
                for n in net_imp_y['FROM']:
                    imp_y_n = net_imp_y[net_imp_y['FROM']==n]['VALUE'].iloc[0]
                    
                    lcode_n = lcode[(lcode['REGION']==n)&(lcode['YEAR']==y)]['VALUE'].iloc[0]
                    if imp_y_n>0:
                        lcoe_imp_y = lcoe_imp_y + (imp_y_n / (sad_cy/0.95)) * lcode_n
                    elif imp_y_n<0:
                        lcoe_imp_y = lcoe_imp_y + (imp_y_n / (sad_cy/0.95)) * lcode_cy
            
            new_row = pd.Series({'YEAR': y, 'VALUE': lcoe_imp_y})
            df_i = pd.concat([df_i, new_row.to_frame().T], ignore_index=True)
        
        df_i = df_i.sort_values(by=['YEAR'])

        lcoe_import_array = df_i['VALUE'].to_numpy()
        dp_c = dp[dp['REGION']==c]
        dp_array = dp_c['VALUE'].to_numpy()
        sad_c = sad[sad['REGION']==c]
        sad_array = sad_c['VALUE'].to_numpy()
        lcode_c = lcode[lcode['REGION']==c]
        lcode_array = lcode_c['VALUE'].to_numpy()

        if c == 'SI':
            # print('Import LCOE HU: ', df_i)
            # print('Domestic LCOE HU: ', lcode_c)
            print('Domestic El production SI: ', dp_c)

        lcoe = (dp_array/(sad_array/0.95)) * lcode_array + lcoe_import_array
        lcoe *= 3.6 # Conversion from MEUR/PJ to EUR/kWh

        df['VALUE'] = lcoe
        df['YEAR'] = years
        df['REGION'] = c

        df_lcoe = pd.concat([df_lcoe, df])
    
    annual_sad_model = sad.groupby(by='YEAR').sum()
    annual_sad_model_array = annual_sad_model['VALUE'].to_numpy()
    annual_sad_model_xr = annual_sad_model_array
    for c in range(len(countries)-1):
        annual_sad_model_xr = np.append(annual_sad_model_xr, annual_sad_model_array)
    demand_share = sad['VALUE'].to_numpy() / annual_sad_model_xr
    lcoe_array = df_lcoe['VALUE'].to_numpy()
    lcoe_shares = lcoe_array * demand_share
    df = pd.DataFrame(columns=['YEAR','VALUE'])
    df['YEAR'] = sad['YEAR']
    df['VALUE'] = lcoe_shares
    df['VALUE'] = pd.to_numeric(df['VALUE'])
    df = df.groupby('YEAR').sum()
    df = df.reset_index()
    df['REGION'] = 'EU+CH+NO+UK'

    return pd.concat([df_lcoe, df], ignore_index=True)

#%%
def main(data: Dict, y_0: int, y_n: int)->Dict:
    """
    Main function for calculating the three indicators CO2 Intensity, Discounted Investment Per Citizen, and the Levelised Cost of Electricity (LCOE).
    Args:
        data (Dict): A dictionary containing three dictionaries called 'inputs', 'results', and 'others'. 
            Where 'inputs' contains DataFrames of model inputs like operational life, discount rate, and specified annual demand.
            'results' contains DataFrames for the model outputs 'CapitalInvestment', 'AnnualFixedOperatingCost', 'AnnualVariableOperatingCost', and 'AnnualTechnologyEmission'.
        y_0 (int): First year of interest.
        y_n (int): Last year of interest.

    Returns:
        Dict: Containing three DataFrames, one for each indicator.
    """
    kpis = {}
    indi = {}
    population = data['others']['Population'].copy(deep=True)
    sad = data['inputs']['SpecifiedAnnualDemand'].copy(deep=True)

    max_years = []
    result_variables = ['CapitalInvestment', 'AnnualFixedOperatingCost', 'AnnualVariableOperatingCost', 'AnnualTechnologyEmission']

    for v in result_variables:
        max_years.append(data['results'][v]['YEAR'].max())
    max_year = max(max_years)

    if int(max_year) < int(y_n):
        y_n = max_year
        population = population[population['year']<=y_n]
        sad = sad[sad['YEAR']<=y_n]

    analysis_period = int(y_n) - int(y_0) + 1
    years = pd.Series(pd.date_range(str(y_0), freq='Y', periods=analysis_period)).dt.year

    #data = km.main('config.yml', 'results', 'input_data/data') #for development

    indi['PA'] = calc_PA(data['inputs']['DiscountRate'], data['inputs']['OperationalLife'])
    indi['CRF'] = calc_crf(data['inputs']['DiscountRate'], data['inputs']['OperationalLife'])
    indi['AIC'] = calc_aic(data['inputs']['CapitalCost'],data['results']['CapitalInvestment'],indi['CRF'],indi['PA'],data['inputs']['OperationalLife'], data['inputs']['ResidualCapacity'],years)
    indi['DP'] = calc_dp(sad,data['results']['NetElImports'], years)
    print('Net-El-Imports SI: ', data['results']['NetElImports'][data['results']['NetElImports']['REGION']=='SI'])
    indi['LCODE'] = calc_lcode(indi['AIC'], data['results']['AnnualFixedOperatingCost'], data['results']['AnnualVariableOperatingCost'],indi['DP'])

    kpis['CO2Intensity'] = calc_CO2_intens(data['results']['AnnualTechnologyEmission'], population, years, y_n)
    kpis['DiscountedInvestmentPerCitizen'] = invest_per_citizen(indi['AIC'], data['inputs']['DiscountRate'], population, years)
    kpis['LCOE'] = calc_lcoe(indi['DP'], sad, indi['LCODE'], data['results']['NetElImportsPerCountry'], y_n)
    return kpis

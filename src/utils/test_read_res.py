from sys import path
import pandas as pd
import os
from .read_res import read_emissions
#from .read_res import read_new_capacity
from .read_res import read_capacities

class TestEmissions:

    def test_read_emissions(self):

        path = os.path.join("tests","fixtures")
        param = os.path.join("AnnualTechnologyEmission")
        emissions = ["CO2"]

        actual = read_emissions(path,param,emissions)

        data = [
            ["AT", "CO2", 2015, 7805.105844030894],
            ["AT", "CO2", 2016, 11469.9749262577646],
            ["AT", "CO2", 2017, 11413.582905337837],
            ["AT", "CO2", 2018, 11173.6668148631454],
            ["AT", "CO2", 2019, 11538.3227509132378],
            ["AT", "CO2", 2020, 10524.8772486844563],
            ["BE", "CO2", 2015, 2952.244564567897],
            ["BE", "CO2", 2016, 2351.7454582610985],
        ]

        expected = pd.DataFrame(data=data, columns=['REGION','EMISSION','YEAR','VALUE'])

        index = ['REGION', 'EMISSION', 'YEAR']

        pd.testing.assert_frame_equal(actual.set_index(index), expected.set_index(index), check_index_type=False)

class TestInvestment:

    def test_read_capacities(self):

        path = os.path.join("tests","fixtures")
        param = "NewCapacity"

        actual = read_capacities(path, param)

        data = [
            ["AT", "ATBMSTPH3", 2024, 0.1467612125435456],
            ["AT", "ATSOUTPH2", 2040, 0.16646506444839623],
            ["BE", "BEGOCVPH2", 2048, 0.0005842773120016587],
        ]

        expected = pd.DataFrame(data=data, columns=["REGION", "TECHNOLOGY", "YEAR", "VALUE"])

        index = ["REGION","TECHNOLOGY", "YEAR"]

        pd.testing.assert_frame_equal(actual.set_index(index), expected.set_index(index), check_index_type=False)

class TestCapacity:

    def test_read_capacities(self):

        path = os.path.join("tests", "fixtures")
        param = "TotalCapacityAnnual"

        actual = read_capacities(path, param)

        data = [
            ["AT", "ATBFHPFH1", 2021, 0.02941],
            ["AT", "ATBFHPFH1", 2022, 0.02941],
            ["BE", "BEBMSTPH3", 2025, 1.397521389405559],
            ["BE", "BEBMSTPH3", 2026, 1.413453627963394],
        ]

        expected = pd.DataFrame(data=data, columns=["REGION","TECHNOLOGY","YEAR","VALUE"])

        index = ["REGION", "TECHNOLOGY", "YEAR"]

        pd.testing.assert_frame_equal(actual.set_index(index), expected.set_index(index), check_index_type=False)
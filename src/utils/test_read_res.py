import pandas as pd
import os
from .read_res import read_emissions

class TestEmissions:

    def test_read_emissions(self):

        path = os.path.join("tests","fixtures")
        param = os.path.join("AnnualTechnologyEmission")
        emissions = ["CO2"]

        actual = read_emissions(path,param,emissions)

        data = [
            ["AT", "C02", 2015, 7805.105844030894],
            ["AT", "C02", 2016, 11469.9749262577646],
            ["AT", "C02", 2017, 11413.582905337837],
            ["AT", "CO2", 2018, 11173.6668148631454],
            ["AT", "CO2", 2019, 11538.3227509132378],
            ["AT", "CO2", 2020, 10524.8772486844563],
            ["BE", "CO2", 2015, 2952.244564567897],
            ["BE", "CO2", 2016, 2351.7454582610985],
        ]

        excepted = pd.DataFrame(data=data, columns=['REGION','EMISSION','YEAR','VALUE'])

        index = ['REGION', 'EMISSION', 'YEAR']

        pd.testing.assert_frame_equal(actual.set_index(index), excepted.set_index(index), check_index_type=False)









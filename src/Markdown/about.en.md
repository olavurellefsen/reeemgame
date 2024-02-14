<a name="about_en"></a>

## About the Power Decisions Game

The Power Decisions Game is a learning simulation that allows the exploration of possible future European power system designs. The players goal in each round is to maximize the score in 2050, considering the assigned point of view on the priorities regarding the social, environmental and economic dimensions decade by decade.

The game aims to let the player interactively discover how (policy) decisions might affect the development of the European electricity sector in the transition to a low carbon system. At three points in time (2020, 2030, 2040) decisions need to be made concerning the emission reduction pathway, the use of carbon capture and storage technologies, the trans-border electricity transmission between European countries, and import of biomass for power generation.

The following paragraphs provide a detailed description of central components in the Power Decisions Game and illustrate how the game works.

### The Score

The goal for the player in the game is to maximise the score. The score compares the decisions taken with all possible alternatives and is based on three indicators, each representing one dimension of sustainability. In the calculation of the score the three indicators are weighed using the point of view assigned to the player at the beginning of each round. This means that if one repeats exactly the same decision pattern of a round in a following round the score might be different since the point of view and hence the weights for the sustainability dimensions have changed.

### The indicators

The three indicators that the score is based on and of which the development can be explored throughout the game are: 
- Accumulated CO2, representing the environmental dimension
- Discounted Investment, representing the economic dimension
- Levelised Cost of Electricity, representing the social dimension
In the following you find descriptions for each of the three indicators.

#### The Accumulated CO2 per citizen

The indicator `Accumulated CO2` illustrates how much carbon dioxide is emitted per citizen over the years. For the score the indicator is calculated for all countries in the game, i.e., all 27 EU member states, Norway, Switzerland, and the United Kingdom. However, in the map one can also explore the development of emissions in individual countries. The unit of the indicator is tonne of CO2 per citizen. Sinze the indicator measures the accumulated CO2 emissions, the indicator will usuall either increase or remain constant over time. In the latter case no more CO2 is emitted.

#### The Discounted Investment

No matter how the future power system in Europe will look like, it will certainly require investment to build new power plants that replace old power plants and provide sufficient capacity to satisfy the growing demand for electricity. However, the level of required investments might vary depending on what design and policy decision are made. The indicator `Discounted Investment` indicates required investment per citizen. To reduce the volatility of the indicator and distortion due to different technical lifetimes of technologies the investment cost are annualised, i.e., the investment cost for each power plant are spread over it's lifetime. 

#### The Levelised Cost Of Electricity

The indicator `Levelised Cost Of Electricity` (LCOE) shows the cost per unit of electricity consumed. For the score the indicator is calculated for all countries included together, and in the map the indicator can be explored by country. While the LCOE does not represent estimate of future electrcity prices, it indicates how much the generation of electricity costs, i.e., how much in one way or another consumers will need to pay.

### OSeMBE - the underlying model

The indicators illustrated in the game and used for the calculation of the score are derived from the Energy System Optimisation Model [OSeMBE](https://doi.org/10.1016/j.energy.2021.121973). The model is built using the Open Source energy Modelling System (OSeMOSYS) and models the power sector of the EU27, Norway, Switzerland, and the United Kingdom at country resolution year by year from 2015 until 2050. The scope of the model is to provide insights on when and what investments are cost optimal to satisfy the demand for electricity in the modelled countries. For the Power Decisions Game the OSeMBE model was run using the python package [OSeMOSYS_step](https://github.com/KTH-dESA/OSeMOSYS_step). OSeMOSYS_step allows to run models in a myopic setting. This means that a model is not optimised over the entire time horizon modelled, but in steps. For the Power Decisions Game this is needed to be able to model the decisions throughout time in the game.

### Additional Information

All partners within the REEEM project have contributed to the learning simulation by providing feedback throughout the development process.

The Power Decisions Game was part of the [Stakeholder Engagement and Dissemination work package](http://www.reeem.org/index.php/work-packages/) in the REEEM project.

Visit the current version: https://powerdecisionsgame.com/

Source code for the Power Decisions Game https://github.com/ReeemProject/reeemgame

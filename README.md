[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

[![Build Status](https://travis-ci.com/ReeemProject/reeemgame.svg?branch=master)](https://travis-ci.com/ReeemProject/reeemgame)

[Online version of Power Decisions Game](https://game.reeem.org)

# Power Decisions Game
The purpose of this game is to learn about power system.

Participants learn how different decisions affect the power systems and the outcomes for other stakeholders.

The game has been created as part of the [REEEM project](http://www.reeem.org/) and is based on [OSeMBE](https://doi.org/10.1016/j.energy.2021.121973), which is the open source energy model base for the European Union.

The REEEM project was a EU funded project which aimed to gain a better understanding of how energy strategies can help the transition to a low-carbon EU energy society.

![Screenshot](powerDecisionsGame_screenshot.PNG)

## How to play
The game is a simulation of how the future will look depending on how participants decide to act. 

The aim of the game is for participants to maximise their overall combined score in 2050. The overall combined score is calculated as the weighted average of three components: social, economic, and environmental score.

The weights between social, economic, and environmental are reset every time a new game is started, and the participant needs to take this into account when making decisions.

For instance, if the economic score is weighted highly, the participant needs to take decisions that have a high positive impact on the economic score in 2050. Likewise, if the environmental score is weighted highly, the participant needs to take decisions that have a high positive impact on the environmental score in 2050.

In order to take good decisions, the participant can review available data about e.g. electricity demands and emission limits in Europe over time.

## Local version

Prerequisites: [Node.js and npm](https://nodejs.org/en/download/)  Node.js ^6.9.5, npm ^3.10.10

1. Installation: npm install
2. Start Server at port 3000: npm start
3. Go to url [localhost:3000](http://localhost:3000)

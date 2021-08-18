"Script to determine the path of the scenario results of OSeMBE for the REEEMgame."
#%% Import of needed packages
import os
#%% Get scenario names and paths
dirs = [d for d in os.listdir('results') if os.path.isdir(os.path.join('results', d))]
# %%

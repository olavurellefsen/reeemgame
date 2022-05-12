import pandas as pd
def main():
    dic_short = {
        'T': 0,
        'E': 0,
        'C': 0,
        'B': 0
        }

    dic_long = {
        'd1': {
            'T': [0, 1],
            'E': [0, 1, 2],
            'C': [0, 1]
        },
        'd2': {
            'B': [0, 1],
            'E': [0, 1, 2],
            'C': [0, 1]
        },
        'd3': {
            'B': [0, 1],
            'E': [0, 1, 2],
            'C': [0, 1]
        }
    }
    scen_names_long = []
    scen_names_short = []

    deci = list(dic_long.keys())
    param = []
    for d in dic_long:
        param.extend(list(dic_long[d].keys()))
    for t in dic_long[deci[0]][param[0]]:
        for e1 in dic_long[deci[0]][param[1]]:
            for c1 in dic_long[deci[0]][param[2]]:
                for b2 in dic_long[deci[1]][param[3]]:
                    for e2 in dic_long[deci[1]][param[4]]:
                        for c2 in dic_long[deci[1]][param[5]]:
                            for b3 in dic_long[deci[2]][param[6]]:
                                for e3 in dic_long[deci[2]][param[7]]:
                                    for c3 in dic_long[deci[2]][param[8]]:
                                        scen_names_long.append('|'.join([''.join([param[0], str(t), param[1], str(e1), param[2], str(c1)]), ''.join([param[3], str(b2), param[4], str(e2), param[5], str(c2)]), ''.join([param[6], str(b3), param[7], str(e3), param[8], str(c3)])]))
                                        scen_names_short.append(''.join(['T', str(dic_short['T']), 'E', str(dic_short['E']), 'C', str(dic_short['C']), 'B', str(dic_short['B'])]))
                                        dic_short['C'] += 1
                                    dic_short['C'] -= 2
                                    dic_short['E'] += 1
                                dic_short['E'] -= 3
                                dic_short['B'] += 1
                            dic_short['B'] -= 2
                            dic_short['C'] += 2
                        dic_short['C'] -= 4
                        dic_short['E'] += 3
                    dic_short['E'] -= 9
                    dic_short['B'] += 2
                dic_short['B'] -= 4
                dic_short['C'] += 4
            dic_short['C'] -= 8
            dic_short['E'] += 9
        dic_short['E'] -= 27
        dic_short['T'] += 1

    return pd.DataFrame(list(zip(scen_names_long, scen_names_short)), columns=['scen_names_long', 'scen_names_short'])

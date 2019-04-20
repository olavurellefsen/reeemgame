export const decisions = [
  {
    year: '2019',
    header: 'Maximise your score',
    introText:
      'You are in charge of the European climate policy, and will be asked to make some choices in 2020, 2030, and 2040 in order to maximise the combined economic, social, and environmental score',
    submitText: 'START',
  },
  {
    year: '2020',
    header: 'Decisions in 2020',
    introText: 'Which choices do you want to make in order to reach your goal?',
    individualDecisions: [
      {
        name: 'research',
        introText: 'Spending on energy technology (R&D)?',
        options: ['high', 'low'],
      },
      {
        name: 'emissions1',
        introText: 'Emission restrictions?',
        options: ['high', 'medium', 'low'],
      },
    ],
    submitText: 'Submit choices',
  },
  {
    year: '2030',
    header: 'Decisions in 2030',
    introText: 'Which choices do you want to make in order to reach your goal?',
    individualDecisions: [
      {
        name: 'transmission',
        introText:
          'Implement the Ten-Year Network Development Plan for transmissions?',
        options: ['yes', 'no'],
      },
      {
        name: 'emissions2',
        introText: 'Emission restrictions?',
        options: ['high', 'medium', 'low'],
      },
    ],
    submitText: 'Submit choices',
  },
  {
    year: '2040',
    header: 'Decision in 2040',
    introText: 'Which choice do you want to make in order to reach your goal?',
    individualDecisions: [
      {
        name: 'emissions3',
        introText: 'Emission restrictions?',
        options: ['high', 'medium', 'low'],
      },
    ],
    submitText: 'Submit choice',
  },
  {
    year: '2050',
    header: 'Results in 2050',
    introText: 'Above, you can see your total score.',
    submitText: 'Try again!',
  },
]

export const decisions = [
  {
    year: '2019',
    header: 'Decide the future of Europe',
    introText:
      'You are in charge of the European climate policy, and will be asked to make some choices in 2020, 2030, and 2040 in order to maximise the combined economic, social, and environmental score. Your preferences are listed below under the Weight column.',
    submitText: 'START',
  },
  {
    year: '2020',
    header: 'Decisions in 2020',
    introText: 'Which choices do you want to make in order to reach your goal?',
    individualDecisions: [
      {
        name: 'research',
        introText:
          'Should there be extra financial incentives for research and development of renewable/carbon free technologies?',
        options: ['Yes', 'No'],
      },
      {
        name: 'emissions1',
        introText:
          'Which restrictions are you willing to set in order to reach your emission target?',
        options: [
          'Low reduction rate – EU ETS cap',
          'Medium reduction rate - IPPC Pathway Zero Emissions in 2050',
          'High reduction rate - Zero emissions in 2040',
        ],
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
          'Do you want to implement the 10-year network development plan on transboundary grid capacity?',
        options: ['Yes', 'No'],
      },
      {
        name: 'emissions2',
        introText:
          'Do you want to keep your emission reduction rate for the next 10 years or change it?',
        options: [
          'Low reduction rate – EU ETS cap',
          'Medium reduction rate - IPPC Pathway Zero Emissions in 2050',
          'High reduction rate - Zero emissions in 2040',
        ],
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
        introText:
          'Do you want to keep your emission reduction rate for the next 10 years or change it?',
        options: [
          'Low reduction rate – EU ETS cap',
          'Medium reduction rate - IPPC Pathway Zero Emissions in 2050',
          'High reduction rate - Zero emissions in 2040',
        ],
      },
    ],
    submitText: 'Submit choice',
  },
  {
    year: '2050',
    header: 'Results in 2050',
    introText: 'Below, you can see your total score.',
    submitText: 'Try again!',
  },
]

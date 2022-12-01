import { useTranslation } from 'react-i18next'

export const Decisions = () => {
  const { t } = useTranslation()
  return [
    {
      year: '2019',
      header: t('decisions.2019.header'),
      introText: t('decisions.2019.intro'),
      submitText: t('decisions.start'),
    },
    {
      year: '2020',
      header: t('decisions.2020.header'),
      introText: t('decisions.2020.intro'),
      individualDecisions: [
        {
          name: 'transmission',
          introText: t('decisions.2020.transmissionDecision'),
          options: [
            {
              value: 'Yes',
              text: t('general.yes'),
              scenario: { T: 1 },
            },
            {
              value: 'No',
              text: t('general.no'),
              scenario: { T: 0 },
            },
          ],
        },
        {
          name: 'ccs1',
          introText: t('decisions.2020.ccsDecision'),
          options: [
            {
              value: 'Yes',
              text: t('general.yes'),
              scenario: { C: 1 },
            },
            {
              value: 'No',
              text: t('general.no'),
              scenario: { C: 0 },
            },
          ],
        },
        {
          name: 'emissions1',
          introText: t('decisions.2020.emissionsDecision'),
          options: [
            {
              value: 'Low reduction rate – EU ETS cap',
              text: t('decisions.options.lowReduction'),
              scenario: { E: 0 },
            },
            /* {
              value:
                'Medium reduction rate - IPPC Pathway Zero Emissions in 2050',
              text: t('decisions.options.mediumReduction'),
              scenario: { E: 9 },
            }, */
            {
              value: 'High reduction rate - Zero emissions in 2040',
              text: t('decisions.options.highReduction'),
              scenario: { E: 4 },
            },
          ],
        },
      ],
      submitText: t('decisions.submitChoices'),
    },
    {
      year: '2030',
      header: t('decisions.2030.header'),
      introText: t('decisions.2030.intro'),
      individualDecisions: [
        {
          name: 'transmission',
          introText: t('decisions.2030.transmissionDecision'),
          options: [
            {
              value: 'Yes',
              text: t('general.yes'),
              scenario: { T: 0 },
            },
            {
              value: 'No',
              text: t('general.no'),
              scenario: { T: 1 },
            },
          ],
        },
        {
          name: 'emissions2',
          introText: t('decisions.keepEmission'),
          options: [
            {
              value: 'Low reduction rate – EU ETS cap',
              text: t('decisions.options.lowReduction'),
              scenario: { E: 0 },
            },
            /* {
              value:
                'Medium reduction rate - IPPC Pathway Zero Emissions in 2050',
              text: t('decisions.options.mediumReduction'),
              scenario: { E: 3 },
            }, */
            {
              value: 'High reduction rate - Zero emissions in 2040',
              text: t('decisions.options.highReduction'),
              scenario: { E: 2 },
            },
          ],
        },
      ],
      submitText: t('decisions.submitChoices'),
    },
    {
      year: '2040',
      header: t('decisions.2040.header'),
      introText: t('decisions.2040.intro'),
      individualDecisions: [
        {
          name: 'emissions3',
          introText: t('decisions.keepEmission'),
          options: [
            {
              value: 'Low reduction rate – EU ETS cap',
              text: t('decisions.options.lowReduction'),
              scenario: { E: 0 },
            },
            /* {
              value:
                'Medium reduction rate - IPPC Pathway Zero Emissions in 2050',
              text: t('decisions.options.mediumReduction'),
              scenario: { E: 1 },
            }, */
            {
              value: 'High reduction rate - Zero emissions in 2040',
              text: t('decisions.options.highReduction'),
              scenario: { E: 1 },
            },
          ],
        },
      ],
      submitText: t('decisions.submitChoice'),
    },
    {
      year: '2050',
      header: t('decisions.2050.header'),
      introText: t('decisions.2050.intro'),
      submitText: t('decisions.tryAgain'),
    },
  ]
}

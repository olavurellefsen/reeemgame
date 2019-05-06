import { useTranslation } from 'react-i18next'

export const decisions = () => {
  const { t, i18n } = useTranslation()
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
      introText: t('decisions.whichChoices'),
      individualDecisions: [
        {
          name: 'research',
          introText: t('decisions.2020.researchDecision'),
          options: [
            {
              value: 'Yes',
              text: t('general.yes'),
            },
            {
              value: 'No',
              text: t('general.no'),
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
            },
            {
              value:
                'Medium reduction rate - IPPC Pathway Zero Emissions in 2050',
              text: t('decisions.options.mediumReduction'),
            },
            {
              value: 'High reduction rate - Zero emissions in 2040',
              text: t('decisions.options.highReduction'),
            },
          ],
        },
      ],
      submitText: t('decisions.submitChoices'),
    },
    {
      year: '2030',
      header: t('decisions.2030.header'),
      introText: t('decisions.whichChoices'),
      individualDecisions: [
        {
          name: 'transmission',
          introText: t('decisions.2030.transmissionDecision'),
          options: [
            {
              value: 'Yes',
              text: t('general.yes'),
            },
            {
              value: 'No',
              text: t('general.no'),
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
            },
            {
              value:
                'Medium reduction rate - IPPC Pathway Zero Emissions in 2050',
              text: t('decisions.options.mediumReduction'),
            },
            {
              value: 'High reduction rate - Zero emissions in 2040',
              text: t('decisions.options.highReduction'),
            },
          ],
        },
      ],
      submitText: t('decisions.submitChoices'),
    },
    {
      year: '2040',
      header: t('decisions.2040.header'),
      introText: t('decisions.whichChoices'),
      individualDecisions: [
        {
          name: 'emissions3',
          introText: t('decisions.keepEmission'),
          options: [
            {
              value: 'Low reduction rate – EU ETS cap',
              text: t('decisions.options.lowReduction'),
            },
            {
              value:
                'Medium reduction rate - IPPC Pathway Zero Emissions in 2050',
              text: t('decisions.options.mediumReduction'),
            },
            {
              value: 'High reduction rate - Zero emissions in 2040',
              text: t('decisions.options.highReduction'),
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

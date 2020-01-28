export const underwritingQuestions = [
  {
    active: true,
    answers: [
      { answer: '0' },
      { answer: '1' },
      { answer: '2' },
      { answer: '3+' },
      { answer: 'Unknown' }
    ],
    hidden: false,
    name: 'previousClaims',
    order: 2,
    question: 'How many flood claims have been reported at this property?',
    validations: ['required'],
    visible: true
  },
  {
    active: true,
    answers: [
      { answer: 'Definitely' },
      { answer: 'Maybe' },
      { answer: 'Sometimes' },
      { answer: 'Unknown' }
    ],
    hidden: true,
    name: 'fuzzyWuzzy',
    order: 1,
    question: 'Was fuzzy wuzzy a bear?',
    validations: ['required'],
    visible: false
  },
  {
    active: true,
    answers: [
      { answer: '0' },
      { answer: '3-5' },
      { answer: '6-9' },
      { answer: '10-12' }
    ],
    hidden: false,
    name: 'monthsOccupied',
    order: 3,
    question: 'How many months a year does the owner live in the home?',
    validations: ['required'],
    visible: true
  }
];

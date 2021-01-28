const sampleRecords = [
  {
    original: {
      author: 'Ann Patchett,  Bel Canto',
      categories: ['god'],
      text:
        "He realized now he was only just beginning to see the full extent to which it was his destiny to follow, to walk blindly into fates he could never understand. In fate there was reward, in turning over one's heart to God there was a magnificence that lay beyond description. At the moment one is sure that all is lost, look at what is gained!",
    },
    translated: { categories: [] },

    verified: 'NOT_TRANSLATED',
  },
  {
    original: {
      author: 'Beryl Dov',
      categories: [
        'death',
        'faith',
        'god',
        'happiness',
        'hope',
        'humor',
        'inspirational-quotes',
        'knowing-oneself',
        'knowledge',
        'knowledge-education',
        'knowledge-of-self',
        'knowledge-teaching',
        'life',
        'love',
        'master',
        'master-key',
        'master-of-love',
        'masters',
        'mastery',
        'meaning',
        'meditation',
        'mind',
        'mind-body-spirit',
        'mind-power',
        'personal-development',
        'personal-growth',
        'philosophy',
        'poetry',
        'positive-attitude',
        'positive-mindset',
        'positive-motivation',
        'positive-outlook',
        'positive-quotes',
        'positive-thinking',
        'positive-thoughts',
        'power-of-love',
        'power-of-thoughts',
        'power-of-words',
        'powerful-story',
        'purpose',
        'quote',
        'relationships',
        'sacred',
        'sacred-teachings',
        'sacred-wisdom',
        'sage',
        'sage-advice',
        'self-esteem-self-help-book',
        'self-improvement',
        'self-improvement-book',
        'soul',
        'soul-searching',
        'spirit',
        'spiritual-development',
        'spiritual-growth',
        'spiritual-wisdom',
        'spiritualism',
        'suicidal-thoughts',
        'suicide',
        'teachings',
        'truth',
        'unconditional-acceptance',
        'unconditional-love',
        'wisdom',
      ],
      text:
        'Damn You, TripAdvisor! My penis deserves to be a World Heritage Site,judging by the number of tourists trampling on my balls.',
    },
    translated: { categories: [] },

    verified: 'NOT_TRANSLATED',
  },
  {
    original: {
      author: 'Beryl Dov',
      categories: [
        'death',
        'faith',
        'god',
        'happiness',
        'hope',
        'humor',
        'inspirational-quotes',
        'knowing-oneself',
        'knowledge',
        'knowledge-education',
        'knowledge-of-self',
        'knowledge-teaching',
        'life',
        'love',
        'master',
        'master-key',
        'master-of-love',
        'masters',
        'mastery',
        'meaning',
        'meditation',
        'mind',
        'mind-body-spirit',
        'mind-power',
        'personal-development',
        'personal-growth',
        'philosophy',
        'poetry',
        'positive-attitude',
        'positive-mindset',
        'positive-motivation',
        'positive-outlook',
        'positive-quotes',
        'positive-thinking',
        'positive-thoughts',
        'power-of-love',
        'power-of-thoughts',
        'power-of-words',
        'powerful-story',
        'purpose',
        'quote',
        'relationships',
        'sacred',
        'sacred-teachings',
        'sacred-wisdom',
        'sage',
        'sage-advice',
        'self-esteem-self-help-book',
        'self-improvement',
        'self-improvement-book',
        'soul',
        'soul-searching',
        'spirit',
        'spiritual-development',
        'spiritual-growth',
        'spiritual-wisdom',
        'spiritualism',
        'suicidal-thoughts',
        'suicide',
        'teachings',
        'truth',
        'unconditional-acceptance',
        'unconditional-love',
        'wisdom',
      ],
      text:
        'The Stink of Hate {Couplet} When haters write they raise a stink;must be the venom coursing through their ink.',
    },
    translated: { categories: [] },

    verified: 'NOT_TRANSLATED',
  },
  {
    original: {
      author: 'Beryl Dov',
      categories: [
        'death',
        'faith',
        'god',
        'happiness',
        'hope',
        'humor',
        'inspirational-quotes',
        'knowing-oneself',
        'knowledge',
        'knowledge-education',
        'knowledge-of-self',
        'knowledge-teaching',
        'life',
        'love',
        'master',
        'master-key',
        'master-of-love',
        'masters',
        'mastery',
        'meaning',
        'meditation',
        'mind',
        'mind-body-spirit',
        'mind-power',
        'personal-development',
        'personal-growth',
        'philosophy',
        'poetry',
        'positive-attitude',
        'positive-mindset',
        'positive-motivation',
        'positive-outlook',
        'positive-quotes',
        'positive-thinking',
        'positive-thoughts',
        'power-of-love',
        'power-of-thoughts',
        'power-of-words',
        'powerful-story',
        'purpose',
        'quote',
        'relationships',
        'sacred',
        'sacred-teachings',
        'sacred-wisdom',
        'sage',
        'sage-advice',
        'self-esteem-self-help-book',
        'self-improvement',
        'self-improvement-book',
        'soul',
        'soul-searching',
        'spirit',
        'spiritual-development',
        'spiritual-growth',
        'spiritual-wisdom',
        'spiritualism',
        'suicidal-thoughts',
        'suicide',
        'teachings',
        'truth',
        'unconditional-acceptance',
        'unconditional-love',
        'wisdom',
      ],
      text:
        "Catalyst [10w] You're not lying if your lie helps engender the truth.",
    },
    translated: { categories: [] },

    verified: 'NOT_TRANSLATED',
  },
  {
    original: {
      author: 'Criss Jami',
      categories: [
        'apologetics',
        'apologist',
        'arrogance',
        'corruption',
        'defense',
        'defense-of-religion',
        'ego',
        'faith',
        'falsehood',
        'honesty',
        'humility',
        'intelligence',
        'knowledge',
        'lies',
        'logic',
        'love',
        'love-of-truth',
        'motivation',
        'philosophy',
        'philoverity',
        'pride',
        'reason',
        'reasonable-faith',
        'religion',
        'theology',
        'truth',
        'wisdom',
      ],
      text:
        'We must not allow our pride to be the motivation behind our apologetics; rather, philoverity, the love of truth must be the full and complete motivation. For pride corrupts truth.',
    },
    translated: { categories: [] },

    verified: 'NOT_TRANSLATED',
  },
  {
    original: {
      author: 'Bill Moyes',
      categories: ['discontent', 'hope', 'materialism'],
      text:
        'I think at the heart of so much restlessness of the day is a spiritual vacuum. There is a yearning for meaningful lives, a yearning for values we can commonly embrace. I hear an almost inaudible but pervasive discontent with the price we pay for our current materialism. And I hear a fluttering of hope that there might be more to life than bread and circuses.',
    },
    translated: { categories: [] },

    verified: 'NOT_TRANSLATED',
  },
  {
    original: {
      author: 'Beryl Dov',
      categories: [
        'death',
        'faith',
        'god',
        'happiness',
        'hope',
        'humor',
        'inspirational-quotes',
        'knowing-oneself',
        'knowledge',
        'knowledge-education',
        'knowledge-of-self',
        'knowledge-teaching',
        'life',
        'love',
        'master',
        'master-key',
        'master-of-love',
        'masters',
        'mastery',
        'meaning',
        'meditation',
        'mind',
        'mind-body-spirit',
        'mind-power',
        'personal-development',
        'personal-growth',
        'philosophy',
        'poetry',
        'positive-attitude',
        'positive-mindset',
        'positive-motivation',
        'positive-outlook',
        'positive-quotes',
        'positive-thinking',
        'positive-thoughts',
        'power-of-love',
        'power-of-thoughts',
        'power-of-words',
        'powerful-story',
        'purpose',
        'quote',
        'relationships',
        'sacred',
        'sacred-teachings',
        'sacred-wisdom',
        'sage',
        'sage-advice',
        'self-esteem-self-help-book',
        'self-improvement',
        'self-improvement-book',
        'soul',
        'soul-searching',
        'spirit',
        'spiritual-development',
        'spiritual-growth',
        'spiritual-wisdom',
        'spiritualism',
        'suicidal-thoughts',
        'suicide',
        'teachings',
        'truth',
        'unconditional-acceptance',
        'unconditional-love',
        'wisdom',
      ],
      text:
        "Gray [10w] Since gray's the 'new black' things aren't black and white.",
    },
    translated: { categories: [] },

    verified: 'NOT_TRANSLATED',
  },
  {
    original: {
      author: 'Beryl Dov',
      categories: [
        'death',
        'faith',
        'god',
        'happiness',
        'hope',
        'humor',
        'inspirational-quotes',
        'knowing-oneself',
        'knowledge',
        'knowledge-education',
        'knowledge-of-self',
        'knowledge-teaching',
        'life',
        'love',
        'master',
        'master-key',
        'master-of-love',
        'masters',
        'mastery',
        'meaning',
        'meditation',
        'mind',
        'mind-body-spirit',
        'mind-power',
        'personal-development',
        'personal-growth',
        'philosophy',
        'poetry',
        'positive-attitude',
        'positive-mindset',
        'positive-motivation',
        'positive-outlook',
        'positive-quotes',
        'positive-thinking',
        'positive-thoughts',
        'power-of-love',
        'power-of-thoughts',
        'power-of-words',
        'powerful-story',
        'purpose',
        'quote',
        'relationships',
        'sacred',
        'sacred-teachings',
        'sacred-wisdom',
        'sage',
        'sage-advice',
        'self-esteem-self-help-book',
        'self-improvement',
        'self-improvement-book',
        'soul',
        'soul-searching',
        'spirit',
        'spiritual-development',
        'spiritual-growth',
        'spiritual-wisdom',
        'spiritualism',
        'suicidal-thoughts',
        'suicide',
        'teachings',
        'truth',
        'unconditional-acceptance',
        'unconditional-love',
        'wisdom',
      ],
      text:
        'Vapers I bought a vape pen from a vaporium.The vapologist advised meto get the model with the refillable vape tank.When the fuck did smoking become so vapid?',
    },
    translated: { categories: [] },

    verified: 'NOT_TRANSLATED',
  },
  {
    original: {
      author: 'Beryl Dov',
      categories: [
        'death',
        'faith',
        'god',
        'happiness',
        'hope',
        'humor',
        'inspirational-quotes',
        'knowing-oneself',
        'knowledge',
        'knowledge-education',
        'knowledge-of-self',
        'knowledge-teaching',
        'life',
        'love',
        'master',
        'master-key',
        'master-of-love',
        'masters',
        'mastery',
        'meaning',
        'meditation',
        'mind',
        'mind-body-spirit',
        'mind-power',
        'personal-development',
        'personal-growth',
        'philosophy',
        'poetry',
        'positive-attitude',
        'positive-mindset',
        'positive-motivation',
        'positive-outlook',
        'positive-quotes',
        'positive-thinking',
        'positive-thoughts',
        'power-of-love',
        'power-of-thoughts',
        'power-of-words',
        'powerful-story',
        'purpose',
        'quote',
        'relationships',
        'sacred',
        'sacred-teachings',
        'sacred-wisdom',
        'sage',
        'sage-advice',
        'self-esteem-self-help-book',
        'self-improvement',
        'self-improvement-book',
        'soul',
        'soul-searching',
        'spirit',
        'spiritual-development',
        'spiritual-growth',
        'spiritual-wisdom',
        'spiritualism',
        'suicidal-thoughts',
        'suicide',
        'teachings',
        'truth',
        'unconditional-acceptance',
        'unconditional-love',
        'wisdom',
      ],
      text:
        'Imaginary Friends [10w] My imaginary friend insulted me by calling me real.',
    },
    translated: { categories: [] },

    verified: 'NOT_TRANSLATED',
  },
];

export { sampleRecords };
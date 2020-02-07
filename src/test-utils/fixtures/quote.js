export const quote = {
  _id: '5e34c1e8f7a3d40070948b74',
  state: 'FL',
  product: 'AF3',
  companyCode: 'TTIC',
  effectiveDate: '2020-03-01T05:00:00.000Z',
  agencyCode: 20000,
  agentCode: 60000,
  endDate: '2021-03-01T05:00:00.000Z',
  quoteState: 'Quote Qualified',
  quoteInputState: 'Qualified',
  property: {
    townhouseRowhouse: false,
    pool: false,
    poolSecured: false,
    divingBoard: false,
    trampoline: false,
    fireAlarm: false,
    burglarAlarm: false,
    gatedCommunity: false,
    baseFloodElevation: 'Unknown',
    _id: '5e34c1e8f7a3d40070948b75',
    id: '12000000000000001',
    physicalAddress: {
      _id: '5e34c1e8f7a3d40070948b76',
      address1: '4131 TEST ADDRESS',
      address2: '',
      city: 'SARASOTA',
      state: 'FL',
      zip: '00001',
      county: 'SARASOTA',
      latitude: 27.27967,
      longitude: -82.47786
    },
    coverageLimits: {
      dwelling: {
        format: 'Currency',
        amount: '314000',
        displayText: 'Dwelling'
      }
    },
    source: 'CasaClue',
    territory: '715-51',
    floodterritory: '35000',
    protectionClass: 3,
    buildingCodeEffectivenessGrading: 3,
    familyUnits: '1-2',
    squareFeet: 2640,
    yearOfRoof: null,
    timezone: 'AMERICA/NEW_YORK',
    sprinkler: 'N',
    floodZone: 'X',
    distanceToTidalWater: 17740.8,
    distanceToFireHydrant: 264.052744,
    distanceToFireStation: 0.79,
    yearBuilt: 1998,
    constructionType: 'MASONRY',
    residenceType: 'SINGLE FAMILY',
    windMitigation: {
      _id: '5e34c1e8f7a3d40070948b77',
      roofToWallConnection: 'Other',
      roofDeckAttachment: 'Other',
      windBorneDebrisRegion: 'Yes',
      secondaryWaterResistance: 'Other',
      openingProtection: 'Other',
      floridaBuildingCodeWindSpeed: 130,
      terrain: 'B',
      roofCovering: 'Other',
      roofGeometry: 'Other',
      floridaBuildingCodeWindSpeedDesign: 130,
      internalPressureDesign: 'Other'
    },
    poolfence: null,
    birdcage: null,
    FEMAfloodZone: 'X',
    relativeElevation: 99,
    relativeElevation1: null,
    relativeElevation2: null,
    diffToBaseFloodElevation: null
  },
  coverageLimits: {
    building: {
      value: 314000,
      name: 'building',
      required: true,
      amount: 314000,
      letterDesignation: 'A',
      maxAmount: 377000,
      minAmount: 250000,
      initialValue: 314000,
      displayText: 'Building',
      root: true,
      endorsementType: 'Coverage Endorsement'
    },
    personalProperty: {
      value: 0,
      name: 'personalProperty',
      required: true,
      amount: 0,
      letterDesignation: 'B',
      maxAmount: 157000,
      initialValue: 0,
      displayText: 'Personal Property',
      minAmount: 0,
      endorsementType: 'Coverage Endorsement'
    },
    increasedCompliance: {
      value: 30000,
      name: 'increasedCompliance',
      readonly: true,
      amount: 30000,
      displayText: 'Increased Cost of Compliance',
      initialValue: 30000,
      endorsementType: 'Coverage Endorsement'
    },
    lossOfUse: {
      value: 5000,
      name: 'lossOfUse',
      readonly: true,
      amount: 5000,
      displayText: 'Loss of Use',
      initialValue: 5000
    },
    otherCoverages: {
      value: 'Included',
      name: 'otherCoverages',
      readonly: true,
      amount: 'Included',
      displayText: 'Other Coverages',
      initialValue: 'Included',
      type: 'string'
    }
  },
  deductibles: {
    personalPropertyDeductible: {
      value: 5000,
      name: 'personalPropertyDeductible',
      required: true,
      displayText: 'Personal Property Deductible',
      validValues: [
        { value: 500 },
        { value: 1000 },
        { value: 2000 },
        { value: 5000 },
        { value: 10000 }
      ],
      amount: 5000,
      initialValue: 5000,
      endorsementType: 'Deductible Endorsement'
    },
    buildingDeductible: {
      value: 5000,
      name: 'buildingDeductible',
      required: true,
      displayText: 'Building Deductible',
      validValues: [
        { value: 500 },
        { value: 1000 },
        { value: 2000 },
        { value: 5000 },
        { value: 10000 }
      ],
      amount: 5000,
      initialValue: 5000,
      endorsementType: 'Deductible Endorsement'
    }
  },
  coverageOptions: {
    personalPropertyReplacementCost: {
      answer: false,
      name: 'personalPropertyReplacementCost',
      displayText: 'Personal Property Replacement Coverage',
      default: false,
      endorsementType: 'Coverage Endorsement'
    }
  },
  underwritingAnswers: {
    previousFloodClaims: {
      question: 'How many flood claims have been reported at this property?',
      source: 'Customer',
      answer: '0'
    },
    monthsOccupied: {
      question: 'How many months a year does the owner live in the home?',
      source: 'Customer',
      answer: '10-12'
    },
    elevationDifference: {
      question: 'What is the elevation difference for this property?',
      answer: 'Unknown',
      source: 'Customer'
    }
  },
  quoteNumber: '12-5224385-01',
  updatedBy: {
    _id: '5e34c5c9caa662006eb32506',
    userId: 'auth0|SYSTEMUSER|0',
    userName: 'SYSTEMUSER'
  },
  createdBy: {
    _id: '5e34c1e8f7a3d40070948b79',
    userId: 'auth0|consumer|0',
    userName: 'consumer'
  },
  createdAt: '2020-02-01T00:10:16.684Z',
  updatedAt: '2020-02-01T00:26:49.935Z',
  policyHolders: [
    {
      electronicDelivery: false,
      _id: '5e34c1edf7a3d40070948b87',
      order: 0,
      entityType: 'Person'
    }
  ],
  additionalInterests: [],
  underwritingExceptions: [
    {
      fields: [],
      _id: '5e34c5c9caa662006eb32509',
      code: '003',
      displayText: 'Missing Info - Mailing/Billing Info',
      category: 'Coverages & Deductibles',
      action: 'Missing Info',
      agentMessage:
        'Missing required information to complete quote -  Mailing/Billing Info',
      internalMessage:
        'Missing required information to complete quote - Primary Policyholder and/or Mailing/Billing Info',
      customerMessage:
        'Missing required information to complete quote -  Mailing/Billing Info',
      active: true,
      canOverride: false,
      overridden: false,
      overriddenBy: {
        _id: '5e34c5c9caa662006eb3250a',
        userId: null,
        userName: null
      },
      overriddenAt: null
    }
  ],
  __v: 0,
  cost: null,
  rating: {
    coverageARate: 283,
    coverageBRate: 0,
    replacementCostRate: 0,
    icc: 4,
    calculatedPremium: 287,
    netPremium: 287,
    totalFees: 25,
    totalPremium: 312,
    worksheet: {
      inputFields: {
        coverageA: 314000,
        coverageB: 0,
        elevQuestion: 'Unknown',
        replacementCost: false,
        territory: '35000',
        yearBuilt: 1998,
        buildingDeductible: 5000,
        contentsDeductible: 5000
      },
      lookupFields: {
        residentialBaseRate: { coverageA: 0.1, coverageB: 0.14 },
        buildingDeductibleFactor: 0.9,
        contentsDeductibleFactor: 0.9,
        replacementCostFactor: 0,
        icc: 4
      },
      calculatedFields: {
        coverageARate: 282.6,
        coverageBRate: 0,
        replacementCostRate: 0,
        icc: 4,
        calculatedPremium: 286.6,
        netPremium: 286.6,
        totalFees: 25,
        totalPremium: 311.6
      },
      constants: {
        fees: {
          mgaPolicy: { type: 'flat', value: 25 },
          empTrust: { type: 'flat', value: 0 },
          fhcf: { type: 'factor', value: 0 },
          figa: { type: 'factor', value: 0 },
          citizens: { type: 'factor', value: 0 }
        }
      },
      fees: {
        mgaPolicyFee: 25,
        empTrustFee: 0,
        fhcfFee: 0,
        figaFee: 0,
        citizensFee: 0
      }
    },
    rateCode: 201910,
    engineCode: '10004',
    fees: {
      mgaPolicyFee: 25,
      empTrustFee: 0,
      fhcfFee: 0,
      figaFee: 0,
      citizensFee: 0
    },
    _id: '5e34c5c9caa662006eb3250b'
  }
};

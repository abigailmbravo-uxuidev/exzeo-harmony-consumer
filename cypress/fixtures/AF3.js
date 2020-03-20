export const CSP_BASE = '/ttic/fl/flood';
export const KNOWN_ADDRESS = '4131 TEST ADDRESS';
export const UNKNOWN_ADDRESS = '7414 E Swoope St';

export const AF3_QUOTE = {
  search_query: KNOWN_ADDRESS,
  address: KNOWN_ADDRESS,
  underwriting: {
    previousFloodClaims: '0',
    monthsOccupied: '10-12'
  },
  customerInfo: {
    'policyHolders[0].firstName_wrapper': 'Oberyn',
    'policyHolders[0].lastName_wrapper': 'Martell',
    'policyHolders[0].emailAddress_wrapper': 'exzeoqa@exzeo.com',
    'policyHolders[0].primaryPhoneNumber_wrapper': '123 456 7890'
  },

  mortgageeInfo: {
    name1: "AMERICA'S SERVICING",
    name2: 'COMPANY, ISAOA',
    address1: 'PO BOX 5106',
    address2: '',
    city: 'Springfield',
    state: 'OH',
    zip: '45501',
    phoneNumber: '7742194742',
    referenceNumber: 'ref11111'
  },

  shareQuoteInfo: {
    name: 'Batman',
    email: 'exzeoqa@exzeo.com'
  },

  agencyDetails: {
    code: '20003',
    name: 'OMEGA'
  }
};

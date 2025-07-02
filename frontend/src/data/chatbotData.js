export const chatbotNodes = {
  root: {
    id: 'root',
    message: 'Hello! How can I assist you today?',
    options: [
      { text: 'Project Queries', nextId: 'projectQueries' },
      { text: 'Pricing Information', nextId: 'pricingInfo' },
      { text: 'Location Details', nextId: 'locationDetails' },
      { text: 'Contact Support', nextId: 'contactSupport' },
    ],
  },
  projectQueries: {
    id: 'projectQueries',
    message: 'Which project are you interested in?',
    options: [
      { text: 'Project A', nextId: 'projectAOptions' },
      { text: 'Project B', nextId: 'projectBOptions' },
      { text: 'Project C', nextId: 'projectCOptions' },
    ],
  },
  projectAOptions: {
    id: 'projectAOptions',
    message: 'What would you like to know about Project A?',
    options: [
      { text: 'Balcony View', nextId: 'projectAView' },
      { text: 'Floor Plans', nextId: 'projectAFloorPlans' },
    ],
  },
  projectAView: {
    id: 'projectAView',
    message: 'Project A offers a sea-facing balcony with 3BHK and 4BHK options.',
    options: [
      { text: 'Back to Main Menu', nextId: 'root' },
    ],
  },
  projectAFloorPlans: {
    id: 'projectAFloorPlans',
    message: 'Project A has floor plans starting from 1200 sq.ft to 1800 sq.ft.',
    options: [
      { text: 'Back to Main Menu', nextId: 'root' },
    ],
  },
  projectBOptions: {
    id: 'projectBOptions',
    message: 'What would you like to know about Project B?',
    options: [
      { text: 'Balcony View', nextId: 'projectBView' },
      { text: 'Pricing', nextId: 'projectBPricing' },
    ],
  },
  projectBView: {
    id: 'projectBView',
    message: 'Project B offers a city-facing balcony with 2BHK and 3BHK options.',
    options: [
      { text: 'Back to Main Menu', nextId: 'root' },
    ],
  },
  projectBPricing: {
    id: 'projectBPricing',
    message: 'Project B starts at 60 Lakhs onwards.',
    options: [
      { text: 'Back to Main Menu', nextId: 'root' },
    ],
  },
  projectCOptions: {
    id: 'projectCOptions',
    message: 'What would you like to know about Project C?',
    options: [
      { text: 'Amenities', nextId: 'projectCAmenities' },
      { text: 'Availability', nextId: 'projectCAvailability' },
    ],
  },
  projectCAmenities: {
    id: 'projectCAmenities',
    message: 'Project C offers swimming pool, gym, and clubhouse.',
    options: [
      { text: 'Back to Main Menu', nextId: 'root' },
    ],
  },
  projectCAvailability: {
    id: 'projectCAvailability',
    message: 'Project C currently has limited 3BHK availability.',
    options: [
      { text: 'Back to Main Menu', nextId: 'root' },
    ],
  },
  pricingInfo: {
    id: 'pricingInfo',
    message: 'Are you looking for pricing of a specific project?',
    options: [
      { text: 'Yes', nextId: 'projectQueries' },
      { text: 'No, just browsing', nextId: 'thankYou' },
    ],
  },
  locationDetails: {
    id: 'locationDetails',
    message: 'Our projects are located in the following cities:',
    options: [
      { text: 'Delhi', nextId: 'delhiProjects' },
      { text: 'Mumbai', nextId: 'mumbaiProjects' },
    ],
  },
  delhiProjects: {
    id: 'delhiProjects',
    message: 'In Delhi, we have projects in Dwarka and Rohini.',
    options: [
      { text: 'Back to Main Menu', nextId: 'root' },
    ],
  },
  mumbaiProjects: {
    id: 'mumbaiProjects',
    message: 'In Mumbai, we have projects in Andheri and Powai.',
    options: [
      { text: 'Back to Main Menu', nextId: 'root' },
    ],
  },
  contactSupport: {
    id: 'contactSupport',
    message: 'You can reach our support at +91-99999-88888.',
    options: [
      { text: 'Back to Main Menu', nextId: 'root' },
    ],
  },
  thankYou: {
    id: 'thankYou',
    message: 'Thank you for your time! Feel free to explore more.',
    options: [
      { text: 'Start Over', nextId: 'root' },
    ],
  },
};

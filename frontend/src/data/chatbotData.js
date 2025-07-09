export const chatbotNodes = {
  root: {
    id: "root",
    message: `Hey there!\nWelcome to Prehome. India's first rent-to-own platform. \nBut first, we would love to know if you are:`,
    options: [
      { text: "Looking for a Home", nextId: "lookingHome" },
      { text: "Selling a Home", nextId: "sellingHome" },
    ],
  },

  // ---------------- Level 2 for "Looking for a Home" ----------------
  lookingHome: {
    id: "lookingHome",
    message: "How can we help you in your homeownership journey?",
    options: [
      { text: "Assess home budget according to your income", nextId: "assessBudget" },
      { text: "Suggest homes for your preferences", nextId: "suggestHomes" },
      { text: "Help in Renting vs buying decision", nextId: "rentVsBuy" },
    ],
  },

  // Level 3 - "Assess home budget according to your income"
  assessBudget: {
    id: "assessBudget",
    message: "You can use our Home Budget Calculator to estimate your budget.",
    options: [
      { text: "Home Budget calculator", nextId: "openHomeBudgetLink" },
      { text: "Start Over", nextId: "root" },
      { text: "All Good", nextId: "endChat" },
    ],
  },
  openHomeBudgetLink: {
    id: "openHomeBudgetLink",
    message: "Click here: https://prehome.in/monthly-budget-calculator/",
    options: [
      { text: "Start Over", nextId: "root" },
      { text: "All Good", nextId: "endChat" },
    ],
  },

  // Level 3 - "Suggest homes for your preferences"
  suggestHomes: {
    id: "suggestHomes",
    message: "You can browse properties tailored to your needs.",
    options: [
      { text: "Properties listing page", nextId: "openPropertiesLink" },
      { text: "Start Over", nextId: "root" },
      { text: "All Good", nextId: "endChat" },
    ],
  },
  openPropertiesLink: {
    id: "openPropertiesLink",
    message: "Click here: https://prehome.in/",
    options: [
      { text: "Start Over", nextId: "root" },
      { text: "All Good", nextId: "endChat" },
    ],
  },

  // Level 3 - "Help in Renting vs buying decision"
  rentVsBuy: {
    id: "rentVsBuy",
    message: "Check out our blog on renting vs buying to make an informed decision.",
    options: [
      { text: "Renting vs buying blog", nextId: "openRentVsBuyBlog" },
      { text: "Start Over", nextId: "root" },
      { text: "All Good", nextId: "endChat" },
    ],
  },
  openRentVsBuyBlog: {
    id: "openRentVsBuyBlog",
    message: "Click here: https://www.prehome.in/blogs/Building-Wealth-Renting-vs-Buying",
    options: [
      { text: "Start Over", nextId: "root" },
      { text: "All Good", nextId: "endChat" },
    ],
  },

  // ---------------- Level 2 for "Selling a Home" ----------------
  sellingHome: {
    id: "sellingHome",
    message: "How can we help you see returns on your property?",
    options: [
      { text: "Calculate Rental income per month", nextId: "calculateRental" },
      { text: "Calculate my future sale price", nextId: "calculateSalePrice" },
      { text: "Property Management Services", nextId: "propertyManagement" },
    ],
  },

  calculateRental: {
    id: "calculateRental",
    message: "You can estimate rental income using our seller tools.",
    options: [
      { text: "Go to Seller Tools", nextId: "dummySellerLink" },
      { text: "Start Over", nextId: "root" },
      { text: "All Good", nextId: "endChat" },
    ],
  },

  calculateSalePrice: {
    id: "calculateSalePrice",
    message: "Estimate your property's resale value using our calculator.",
    options: [
      { text: "Go to Seller Tools", nextId: "dummySellerLink" },
      { text: "Start Over", nextId: "root" },
      { text: "All Good", nextId: "endChat" },
    ],
  },

  dummySellerLink: {
    id: "dummySellerLink",
    message: "Click here: https://prehome.in/seller-tools",
    options: [
      { text: "Start Over", nextId: "root" },
      { text: "All Good", nextId: "endChat" },
    ],
  },

  propertyManagement: {
    id: "propertyManagement",
    message: `Here’s what we offer:\n- Rent Agreement generation\n- Property Check every quarter\n- Repairs and Maintenance\n- Rent and Security Deposit transfers`,
    options: [
      { text: "Start Over", nextId: "root" },
      { text: "All Good", nextId: "endChat" },
    ],
  },

  // ---------------- End Chat ----------------
  endChat: {
    id: "endChat",
    message: "Thank you for your inputs. Our team will reach out to you soon. Meanwhile, visit www.prehome.in for more information.",
    options: [
      { text: "Start Over", nextId: "root" },
    ],
  },
};

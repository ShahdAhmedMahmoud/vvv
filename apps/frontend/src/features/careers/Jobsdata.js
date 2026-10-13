

// export const departments = ["Contract Management", "Design", "HSE", "IT"];

// export const jobTypes = ["Full-time", "Waiting List"];

// export const locations = [
//   "Head Office",
//   "New Cairo",
//   "New Cairo, Egypt",
//   "Shorouk City",
//   "Various Sites",
// ];

// export const jobs = [
//   {
//     id: 1,
//     title: "Senior Data Analyst",
//     department: "IT",
//     type: "Full-time",
//     locations: ["Head Office", "New Cairo", "Shorouk City", "New Cairo, Egypt"],
//     locationLabel: "Head Office, New Cairo, Shorouk City, New Cairo, Egypt",
//     salaryMin: 35000,
//     salaryMax: 80000,
//     currency: "EGP",
//     overview:
//       "We're looking for a Senior Data Analyst to turn operational and project data from sites across Egypt into insights that guide decision-making across the business.",
//     responsibilities: [
//       "Build and maintain dashboards that track project cost, schedule, and resource utilization across active sites",
//       "Partner with project managers and finance to translate raw data into clear, actionable reporting",
//       "Design and maintain data pipelines pulling from multiple internal systems",
//       "Identify trends and flag risks in project performance before they become costly",
//       "Present findings to senior leadership in a clear, non-technical way",
//     ],
//     requirements: [
//       "5+ years of experience in data analysis, ideally in construction, engineering, or a similarly project-driven industry",
//       "Strong SQL skills and hands-on experience with a BI tool (Power BI, Tableau, or similar)",
//       "Comfortable working with Python or R for deeper analysis",
//       "Excellent communication skills — able to explain data to non-technical stakeholders",
//       "Bachelor's degree in a quantitative field (Statistics, CS, Engineering, or related)",
//     ],
//   },
//   {
//     id: 2,
//     title: "Site Safety Officer",
//     department: "HSE",
//     type: "Waiting List",
//     locations: ["Various Sites"],
//     locationLabel: "Various Sites",
//     salaryMin: 12000,
//     salaryMax: 18000,
//     currency: "EGP",
//     overview:
//       "As Site Safety Officer, you'll be the first line of defense for the people working on our sites — making sure every shift, every day, ends the way it started: safely.",
//     responsibilities: [
//       "Conduct daily site safety inspections and enforce HSE standards across all active work zones",
//       "Investigate incidents and near-misses, and recommend corrective action",
//       "Deliver toolbox talks and safety inductions for new workers and subcontractors",
//       "Maintain accurate records of PPE compliance, permits, and safety audits",
//       "Coordinate with site management to resolve safety hazards quickly",
//     ],
//     requirements: [
//       "3+ years of experience in a site safety or HSE role, ideally on large construction sites",
//       "NEBOSH certification (or equivalent) strongly preferred",
//       "Comfortable spending most of the day on active construction sites",
//       "Strong observational skills and confidence enforcing safety standards under pressure",
//       "Valid driver's license, willing to travel between sites",
//     ],
//   },
//   {
//     id: 3,
//     title: "BIM Coordinator",
//     department: "Design",
//     type: "Full-time",
//     locations: ["New Cairo"],
//     locationLabel: "New Cairo",
//     salaryMin: 15000,
//     salaryMax: 22000,
//     currency: "EGP",
//     overview:
//       "We're hiring a BIM Coordinator to manage building information models across our design and construction teams, keeping every discipline working from the same accurate model.",
//     responsibilities: [
//       "Coordinate BIM models across architectural, structural, and MEP disciplines",
//       "Run clash detection and resolve model conflicts before they reach the site",
//       "Maintain BIM standards, templates, and naming conventions across projects",
//       "Support project teams with model extraction for quantities and drawings",
//       "Train junior team members on BIM workflows and best practices",
//     ],
//     requirements: [
//       "3+ years of experience working with BIM on construction or design projects",
//       "Proficiency in Revit; familiarity with Navisworks is a plus",
//       "Solid understanding of construction documentation and coordination workflows",
//       "Strong attention to detail and comfort managing multiple project models at once",
//       "Bachelor's degree in Architecture, Civil Engineering, or a related field",
//     ],
//   },
//   {
//     id: 4,
//     title: "Procurement Engineer",
//     department: "Contract Management",
//     type: "Waiting List",
//     locations: ["New Cairo"],
//     locationLabel: "New Cairo",
//     salaryMin: 25000,
//     salaryMax: 40000,
//     currency: "EGP",
//     overview:
//       "We're looking for a Procurement Engineer to manage sourcing and supplier relationships that keep our projects supplied, on budget, and on schedule.",
//     responsibilities: [
//       "Source materials and subcontractors, and negotiate pricing and terms",
//       "Prepare and evaluate technical and commercial bids",
//       "Track purchase orders and delivery schedules against project timelines",
//       "Build and maintain relationships with key suppliers and subcontractors",
//       "Work closely with site and project teams to forecast material needs",
//     ],
//     requirements: [
//       "3+ years of experience in procurement or contract management, ideally in construction",
//       "Strong negotiation skills and a good eye for commercial risk",
//       "Familiarity with construction materials, specs, and supplier markets in Egypt",
//       "Comfortable working with ERP or procurement software",
//       "Bachelor's degree in Engineering, Business, or a related field",
//     ],
//   },
// ];



export const departments = [
  "Contract Management",
  "Design",
  "HSE",
  "IT",
];

export const jobTypes = [
  "Full-time",
  "Waiting List",
  "Remote",
  "Part Time",
];

export const locations = [
  "Head Office",
  "New Cairo",
  "New Cairo, Egypt",
  "Shorouk City",
  "Various Sites",
];

export const jobs = [
  {
    id: 1,
    title: "Senior Data Analyst",
    department: "IT",
    type: "Full-time",
    locations: [
      "Head Office",
      "New Cairo",
      "Shorouk City",
      "New Cairo, Egypt",
    ],
    locationLabel:
      "Head Office, New Cairo, Shorouk City, New Cairo, Egypt",
    salaryMin: 35000,
    salaryMax: 80000,
    currency: "EGP",

    overview:
      "We're looking for a Senior Data Analyst to turn operational and project data from sites across Egypt into insights that guide decision-making across the business.",

    responsibilities: [
      "Build and maintain dashboards that track project cost, schedule, and resource utilization across active sites",
      "Partner with project managers and finance to translate raw data into clear, actionable reporting",
      "Design and maintain data pipelines pulling from multiple internal systems",
      "Identify trends and flag risks in project performance before they become costly",
      "Present findings to senior leadership in a clear, non-technical way",
    ],

    requirements: [
      "5+ years of experience in data analysis, ideally in construction, engineering, or a similarly project-driven industry",
      "Strong SQL skills and hands-on experience with a BI tool (Power BI, Tableau, or similar)",
      "Comfortable working with Python or R for deeper analysis",
      "Excellent communication skills — able to explain data to non-technical stakeholders",
      "Bachelor's degree in a quantitative field (Statistics, CS, Engineering, or related)",
    ],
  },

  {
    id: 2,
    title: "Site Safety Officer",
    department: "HSE",
    type: "Waiting List",
    locations: ["Various Sites"],
    locationLabel: "Various Sites",
    salaryMin: 12000,
    salaryMax: 18000,
    currency: "EGP",

    overview:
      "As Site Safety Officer, you'll be the first line of defense for the people working on our sites — making sure every shift, every day, ends the way it started: safely.",

    responsibilities: [
      "Conduct daily site safety inspections and enforce HSE standards across all active work zones",
      "Investigate incidents and near-misses, and recommend corrective action",
      "Deliver toolbox talks and safety inductions for new workers and subcontractors",
      "Maintain accurate records of PPE compliance, permits, and safety audits",
      "Coordinate with site management to resolve safety hazards quickly",
    ],

    requirements: [
      "3+ years of experience in a site safety or HSE role, ideally on large construction sites",
      "NEBOSH certification (or equivalent) strongly preferred",
      "Comfortable spending most of the day on active construction sites",
      "Strong observational skills and confidence enforcing safety standards under pressure",
      "Valid driver's license, willing to travel between sites",
    ],
  },

  {
    id: 3,
    title: "BIM Coordinator",
    department: "Design",
    type: "Full-time",
    locations: ["New Cairo"],
    locationLabel: "New Cairo",
    salaryMin: 15000,
    salaryMax: 22000,
    currency: "EGP",

    overview:
      "We're hiring a BIM Coordinator to manage building information models across our design and construction teams, keeping every discipline working from the same accurate model.",

    responsibilities: [
      "Coordinate BIM models across architectural, structural, and MEP disciplines",
      "Run clash detection and resolve model conflicts before they reach the site",
      "Maintain BIM standards, templates, and naming conventions across projects",
      "Support project teams with model extraction for quantities and drawings",
      "Train junior team members on BIM workflows and best practices",
    ],

    requirements: [
      "3+ years of experience working with BIM on construction or design projects",
      "Proficiency in Revit; familiarity with Navisworks is a plus",
      "Solid understanding of construction documentation and coordination workflows",
      "Strong attention to detail and comfort managing multiple project models at once",
      "Bachelor's degree in Architecture, Civil Engineering, or a related field",
    ],
  },

  {
    id: 4,
    title: "Procurement Engineer",
    department: "Contract Management",
    type: "Waiting List",
    locations: ["New Cairo"],
    locationLabel: "New Cairo",
    salaryMin: 25000,
    salaryMax: 40000,
    currency: "EGP",

    overview:
      "We're looking for a Procurement Engineer to manage sourcing and supplier relationships that keep our projects supplied, on budget, and on schedule.",

    responsibilities: [
      "Source materials and subcontractors, and negotiate pricing and terms",
      "Prepare and evaluate technical and commercial bids",
      "Track purchase orders and delivery schedules against project timelines",
      "Build and maintain relationships with key suppliers and subcontractors",
      "Work closely with site and project teams to forecast material needs",
    ],

    requirements: [
      "3+ years of experience in procurement or contract management, ideally in construction",
      "Strong negotiation skills and a good eye for commercial risk",
      "Familiarity with construction materials, specs, and supplier markets in Egypt",
      "Comfortable working with ERP or procurement software",
      "Bachelor's degree in Engineering, Business, or a related field",
    ],
  },

  // =========================================================
  // REMOTE — TEST JOB
  // =========================================================
  {
    id: 5,
    title: "Remote Project Data Analyst",
    department: "IT",
    type: "Remote",
    locations: ["Head Office"],
    locationLabel: "Remote",
    salaryMin: 18000,
    salaryMax: 30000,
    currency: "EGP",

    overview:
      "We're looking for a Remote Project Data Analyst to transform construction and operational data into clear reports that support project teams and management.",

    responsibilities: [
      "Analyze project data and prepare weekly performance reports",
      "Build dashboards for project cost, progress, and resource tracking",
      "Work remotely with project managers and internal teams",
      "Identify trends and inconsistencies across project datasets",
      "Present analytical findings through clear visual reports",
    ],

    requirements: [
      "2+ years of experience in data analysis",
      "Strong Excel and SQL skills",
      "Experience with Power BI or a similar BI platform",
      "Good understanding of data visualization",
      "Strong communication and documentation skills",
    ],
  },

  // =========================================================
  // PART TIME — TEST JOB
  // =========================================================
  {
    id: 6,
    title: "Part-Time BIM Consultant",
    department: "Design",
    type: "Part Time",
    locations: ["New Cairo"],
    locationLabel: "New Cairo",
    salaryMin: 10000,
    salaryMax: 18000,
    currency: "EGP",

    overview:
      "We're looking for a Part-Time BIM Consultant to support our design and construction teams with model coordination and technical review.",

    responsibilities: [
      "Review BIM models and identify coordination issues",
      "Support architectural, structural, and MEP model coordination",
      "Perform periodic model quality checks",
      "Assist project teams with BIM documentation",
      "Provide technical guidance during coordination meetings",
    ],

    requirements: [
      "2+ years of experience in BIM or architectural coordination",
      "Good knowledge of Autodesk Revit",
      "Understanding of BIM coordination workflows",
      "Strong attention to detail",
      "Ability to work on a flexible part-time schedule",
    ],
  },
  {
    id: 6,
    title: "Part-Time BIM Consultant",
    department: "Design",
    type: "Part Time",
    locations: ["New Cairo"],
    locationLabel: "New Cairo",
    salaryMin: 10000,
    salaryMax: 18000,
    currency: "EGP",

    overview:
      "We're looking for a Part-Time BIM Consultant to support our design and construction teams with model coordination and technical review.",

    responsibilities: [
      "Review BIM models and identify coordination issues",
      "Support architectural, structural, and MEP model coordination",
      "Perform periodic model quality checks",
      "Assist project teams with BIM documentation",
      "Provide technical guidance during coordination meetings",
    ],

    requirements: [
      "2+ years of experience in BIM or architectural coordination",
      "Good knowledge of Autodesk Revit",
      "Understanding of BIM coordination workflows",
      "Strong attention to detail",
      "Ability to work on a flexible part-time schedule",
    ],
  },
  {
    id: 6,
    title: "Part-Time BIM Consultant",
    department: "Design",
    type: "Part Time",
    locations: ["New Cairo"],
    locationLabel: "New Cairo",
    salaryMin: 10000,
    salaryMax: 18000,
    currency: "EGP",

    overview:
      "We're looking for a Part-Time BIM Consultant to support our design and construction teams with model coordination and technical review.",

    responsibilities: [
      "Review BIM models and identify coordination issues",
      "Support architectural, structural, and MEP model coordination",
      "Perform periodic model quality checks",
      "Assist project teams with BIM documentation",
      "Provide technical guidance during coordination meetings",
    ],

    requirements: [
      "2+ years of experience in BIM or architectural coordination",
      "Good knowledge of Autodesk Revit",
      "Understanding of BIM coordination workflows",
      "Strong attention to detail",
      "Ability to work on a flexible part-time schedule",
    ],
  },
  {
    id: 6,
    title: "Part-Time BIM Consultant",
    department: "Design",
    type: "Part Time",
    locations: ["New Cairo"],
    locationLabel: "New Cairo",
    salaryMin: 10000,
    salaryMax: 18000,
    currency: "EGP",

    overview:
      "We're looking for a Part-Time BIM Consultant to support our design and construction teams with model coordination and technical review.",

    responsibilities: [
      "Review BIM models and identify coordination issues",
      "Support architectural, structural, and MEP model coordination",
      "Perform periodic model quality checks",
      "Assist project teams with BIM documentation",
      "Provide technical guidance during coordination meetings",
    ],

    requirements: [
      "2+ years of experience in BIM or architectural coordination",
      "Good knowledge of Autodesk Revit",
      "Understanding of BIM coordination workflows",
      "Strong attention to detail",
      "Ability to work on a flexible part-time schedule",
    ],
  },
  {
    id: 6,
    title: "Part-Time BIM Consultant",
    department: "Design",
    type: "Part Time",
    locations: ["New Cairo"],
    locationLabel: "New Cairo",
    salaryMin: 10000,
    salaryMax: 18000,
    currency: "EGP",

    overview:
      "We're looking for a Part-Time BIM Consultant to support our design and construction teams with model coordination and technical review.",

    responsibilities: [
      "Review BIM models and identify coordination issues",
      "Support architectural, structural, and MEP model coordination",
      "Perform periodic model quality checks",
      "Assist project teams with BIM documentation",
      "Provide technical guidance during coordination meetings",
    ],

    requirements: [
      "2+ years of experience in BIM or architectural coordination",
      "Good knowledge of Autodesk Revit",
      "Understanding of BIM coordination workflows",
      "Strong attention to detail",
      "Ability to work on a flexible part-time schedule",
    ],
  },
  {
    id: 6,
    title: "Part-Time BIM Consultant",
    department: "Design",
    type: "Part Time",
    locations: ["New Cairo"],
    locationLabel: "New Cairo",
    salaryMin: 10000,
    salaryMax: 18000,
    currency: "EGP",

    overview:
      "We're looking for a Part-Time BIM Consultant to support our design and construction teams with model coordination and technical review.",

    responsibilities: [
      "Review BIM models and identify coordination issues",
      "Support architectural, structural, and MEP model coordination",
      "Perform periodic model quality checks",
      "Assist project teams with BIM documentation",
      "Provide technical guidance during coordination meetings",
    ],

    requirements: [
      "2+ years of experience in BIM or architectural coordination",
      "Good knowledge of Autodesk Revit",
      "Understanding of BIM coordination workflows",
      "Strong attention to detail",
      "Ability to work on a flexible part-time schedule",
    ],
  },
  {
    id: 6,
    title: "Part-Time BIM Consultant",
    department: "Design",
    type: "Part Time",
    locations: ["New Cairo"],
    locationLabel: "New Cairo",
    salaryMin: 10000,
    salaryMax: 18000,
    currency: "EGP",

    overview:
      "We're looking for a Part-Time BIM Consultant to support our design and construction teams with model coordination and technical review.",

    responsibilities: [
      "Review BIM models and identify coordination issues",
      "Support architectural, structural, and MEP model coordination",
      "Perform periodic model quality checks",
      "Assist project teams with BIM documentation",
      "Provide technical guidance during coordination meetings",
    ],

    requirements: [
      "2+ years of experience in BIM or architectural coordination",
      "Good knowledge of Autodesk Revit",
      "Understanding of BIM coordination workflows",
      "Strong attention to detail",
      "Ability to work on a flexible part-time schedule",
    ],
  },
  {
    id: 6,
    title: "Part-Time BIM Consultant",
    department: "Design",
    type: "Part Time",
    locations: ["New Cairo"],
    locationLabel: "New Cairo",
    salaryMin: 10000,
    salaryMax: 18000,
    currency: "EGP",

    overview:
      "We're looking for a Part-Time BIM Consultant to support our design and construction teams with model coordination and technical review.",

    responsibilities: [
      "Review BIM models and identify coordination issues",
      "Support architectural, structural, and MEP model coordination",
      "Perform periodic model quality checks",
      "Assist project teams with BIM documentation",
      "Provide technical guidance during coordination meetings",
    ],

    requirements: [
      "2+ years of experience in BIM or architectural coordination",
      "Good knowledge of Autodesk Revit",
      "Understanding of BIM coordination workflows",
      "Strong attention to detail",
      "Ability to work on a flexible part-time schedule",
    ],
  },
  {
    id: 6,
    title: "Part-Time BIM Consultant",
    department: "Design",
    type: "Part Time",
    locations: ["New Cairo"],
    locationLabel: "New Cairo",
    salaryMin: 10000,
    salaryMax: 18000,
    currency: "EGP",

    overview:
      "We're looking for a Part-Time BIM Consultant to support our design and construction teams with model coordination and technical review.",

    responsibilities: [
      "Review BIM models and identify coordination issues",
      "Support architectural, structural, and MEP model coordination",
      "Perform periodic model quality checks",
      "Assist project teams with BIM documentation",
      "Provide technical guidance during coordination meetings",
    ],

    requirements: [
      "2+ years of experience in BIM or architectural coordination",
      "Good knowledge of Autodesk Revit",
      "Understanding of BIM coordination workflows",
      "Strong attention to detail",
      "Ability to work on a flexible part-time schedule",
    ],
  },
  {
    id: 6,
    title: "Part-Time BIM Consultant",
    department: "Design",
    type: "Part Time",
    locations: ["New Cairo"],
    locationLabel: "New Cairo",
    salaryMin: 10000,
    salaryMax: 18000,
    currency: "EGP",

    overview:
      "We're looking for a Part-Time BIM Consultant to support our design and construction teams with model coordination and technical review.",

    responsibilities: [
      "Review BIM models and identify coordination issues",
      "Support architectural, structural, and MEP model coordination",
      "Perform periodic model quality checks",
      "Assist project teams with BIM documentation",
      "Provide technical guidance during coordination meetings",
    ],

    requirements: [
      "2+ years of experience in BIM or architectural coordination",
      "Good knowledge of Autodesk Revit",
      "Understanding of BIM coordination workflows",
      "Strong attention to detail",
      "Ability to work on a flexible part-time schedule",
    ],
  },
  {
    id: 6,
    title: "Part-Time BIM Consultant",
    department: "Design",
    type: "Part Time",
    locations: ["New Cairo"],
    locationLabel: "New Cairo",
    salaryMin: 10000,
    salaryMax: 18000,
    currency: "EGP",

    overview:
      "We're looking for a Part-Time BIM Consultant to support our design and construction teams with model coordination and technical review.",

    responsibilities: [
      "Review BIM models and identify coordination issues",
      "Support architectural, structural, and MEP model coordination",
      "Perform periodic model quality checks",
      "Assist project teams with BIM documentation",
      "Provide technical guidance during coordination meetings",
    ],

    requirements: [
      "2+ years of experience in BIM or architectural coordination",
      "Good knowledge of Autodesk Revit",
      "Understanding of BIM coordination workflows",
      "Strong attention to detail",
      "Ability to work on a flexible part-time schedule",
    ],
  },
  {
    id: 6,
    title: "Part-Time BIM Consultant",
    department: "Design",
    type: "Part Time",
    locations: ["New Cairo"],
    locationLabel: "New Cairo",
    salaryMin: 10000,
    salaryMax: 18000,
    currency: "EGP",

    overview:
      "We're looking for a Part-Time BIM Consultant to support our design and construction teams with model coordination and technical review.",

    responsibilities: [
      "Review BIM models and identify coordination issues",
      "Support architectural, structural, and MEP model coordination",
      "Perform periodic model quality checks",
      "Assist project teams with BIM documentation",
      "Provide technical guidance during coordination meetings",
    ],

    requirements: [
      "2+ years of experience in BIM or architectural coordination",
      "Good knowledge of Autodesk Revit",
      "Understanding of BIM coordination workflows",
      "Strong attention to detail",
      "Ability to work on a flexible part-time schedule",
    ],
  },
  {
    id: 6,
    title: "Part-Time BIM Consultant",
    department: "Design",
    type: "Part Time",
    locations: ["New Cairo"],
    locationLabel: "New Cairo",
    salaryMin: 10000,
    salaryMax: 18000,
    currency: "EGP",

    overview:
      "We're looking for a Part-Time BIM Consultant to support our design and construction teams with model coordination and technical review.",

    responsibilities: [
      "Review BIM models and identify coordination issues",
      "Support architectural, structural, and MEP model coordination",
      "Perform periodic model quality checks",
      "Assist project teams with BIM documentation",
      "Provide technical guidance during coordination meetings",
    ],

    requirements: [
      "2+ years of experience in BIM or architectural coordination",
      "Good knowledge of Autodesk Revit",
      "Understanding of BIM coordination workflows",
      "Strong attention to detail",
      "Ability to work on a flexible part-time schedule",
    ],
  },
  {
    id: 6,
    title: "Part-Time BIM Consultant",
    department: "Design",
    type: "Part Time",
    locations: ["New Cairo"],
    locationLabel: "New Cairo",
    salaryMin: 10000,
    salaryMax: 18000,
    currency: "EGP",

    overview:
      "We're looking for a Part-Time BIM Consultant to support our design and construction teams with model coordination and technical review.",

    responsibilities: [
      "Review BIM models and identify coordination issues",
      "Support architectural, structural, and MEP model coordination",
      "Perform periodic model quality checks",
      "Assist project teams with BIM documentation",
      "Provide technical guidance during coordination meetings",
    ],

    requirements: [
      "2+ years of experience in BIM or architectural coordination",
      "Good knowledge of Autodesk Revit",
      "Understanding of BIM coordination workflows",
      "Strong attention to detail",
      "Ability to work on a flexible part-time schedule",
    ],
  },
  {
    id: 6,
    title: "Part-Time BIM Consultant",
    department: "Design",
    type: "Part Time",
    locations: ["New Cairo"],
    locationLabel: "New Cairo",
    salaryMin: 10000,
    salaryMax: 18000,
    currency: "EGP",

    overview:
      "We're looking for a Part-Time BIM Consultant to support our design and construction teams with model coordination and technical review.",

    responsibilities: [
      "Review BIM models and identify coordination issues",
      "Support architectural, structural, and MEP model coordination",
      "Perform periodic model quality checks",
      "Assist project teams with BIM documentation",
      "Provide technical guidance during coordination meetings",
    ],

    requirements: [
      "2+ years of experience in BIM or architectural coordination",
      "Good knowledge of Autodesk Revit",
      "Understanding of BIM coordination workflows",
      "Strong attention to detail",
      "Ability to work on a flexible part-time schedule",
    ],
  },
  {
    id: 6,
    title: "Part-Time BIM Consultant",
    department: "Design",
    type: "Part Time",
    locations: ["New Cairo"],
    locationLabel: "New Cairo",
    salaryMin: 10000,
    salaryMax: 18000,
    currency: "EGP",

    overview:
      "We're looking for a Part-Time BIM Consultant to support our design and construction teams with model coordination and technical review.",

    responsibilities: [
      "Review BIM models and identify coordination issues",
      "Support architectural, structural, and MEP model coordination",
      "Perform periodic model quality checks",
      "Assist project teams with BIM documentation",
      "Provide technical guidance during coordination meetings",
    ],

    requirements: [
      "2+ years of experience in BIM or architectural coordination",
      "Good knowledge of Autodesk Revit",
      "Understanding of BIM coordination workflows",
      "Strong attention to detail",
      "Ability to work on a flexible part-time schedule",
    ],
  },
  {
    id: 6,
    title: "Part-Time BIM Consultant",
    department: "Design",
    type: "Part Time",
    locations: ["New Cairo"],
    locationLabel: "New Cairo",
    salaryMin: 10000,
    salaryMax: 18000,
    currency: "EGP",

    overview:
      "We're looking for a Part-Time BIM Consultant to support our design and construction teams with model coordination and technical review.",

    responsibilities: [
      "Review BIM models and identify coordination issues",
      "Support architectural, structural, and MEP model coordination",
      "Perform periodic model quality checks",
      "Assist project teams with BIM documentation",
      "Provide technical guidance during coordination meetings",
    ],

    requirements: [
      "2+ years of experience in BIM or architectural coordination",
      "Good knowledge of Autodesk Revit",
      "Understanding of BIM coordination workflows",
      "Strong attention to detail",
      "Ability to work on a flexible part-time schedule",
    ],
  },
  {
    id: 6,
    title: "Part-Time BIM Consultant",
    department: "Design",
    type: "Part Time",
    locations: ["New Cairo"],
    locationLabel: "New Cairo",
    salaryMin: 10000,
    salaryMax: 18000,
    currency: "EGP",

    overview:
      "We're looking for a Part-Time BIM Consultant to support our design and construction teams with model coordination and technical review.",

    responsibilities: [
      "Review BIM models and identify coordination issues",
      "Support architectural, structural, and MEP model coordination",
      "Perform periodic model quality checks",
      "Assist project teams with BIM documentation",
      "Provide technical guidance during coordination meetings",
    ],

    requirements: [
      "2+ years of experience in BIM or architectural coordination",
      "Good knowledge of Autodesk Revit",
      "Understanding of BIM coordination workflows",
      "Strong attention to detail",
      "Ability to work on a flexible part-time schedule",
    ],
  },
  {
    id: 6,
    title: "Part-Time BIM Consultant",
    department: "Design",
    type: "Part Time",
    locations: ["New Cairo"],
    locationLabel: "New Cairo",
    salaryMin: 10000,
    salaryMax: 18000,
    currency: "EGP",

    overview:
      "We're looking for a Part-Time BIM Consultant to support our design and construction teams with model coordination and technical review.",

    responsibilities: [
      "Review BIM models and identify coordination issues",
      "Support architectural, structural, and MEP model coordination",
      "Perform periodic model quality checks",
      "Assist project teams with BIM documentation",
      "Provide technical guidance during coordination meetings",
    ],

    requirements: [
      "2+ years of experience in BIM or architectural coordination",
      "Good knowledge of Autodesk Revit",
      "Understanding of BIM coordination workflows",
      "Strong attention to detail",
      "Ability to work on a flexible part-time schedule",
    ],
  },
  {
    id: 6,
    title: "Part-Time BIM Consultant",
    department: "Design",
    type: "Part Time",
    locations: ["New Cairo"],
    locationLabel: "New Cairo",
    salaryMin: 10000,
    salaryMax: 18000,
    currency: "EGP",

    overview:
      "We're looking for a Part-Time BIM Consultant to support our design and construction teams with model coordination and technical review.",

    responsibilities: [
      "Review BIM models and identify coordination issues",
      "Support architectural, structural, and MEP model coordination",
      "Perform periodic model quality checks",
      "Assist project teams with BIM documentation",
      "Provide technical guidance during coordination meetings",
    ],

    requirements: [
      "2+ years of experience in BIM or architectural coordination",
      "Good knowledge of Autodesk Revit",
      "Understanding of BIM coordination workflows",
      "Strong attention to detail",
      "Ability to work on a flexible part-time schedule",
    ],
  },
  {
    id: 6,
    title: "Part-Time BIM Consultant",
    department: "Design",
    type: "Part Time",
    locations: ["New Cairo"],
    locationLabel: "New Cairo",
    salaryMin: 10000,
    salaryMax: 18000,
    currency: "EGP",

    overview:
      "We're looking for a Part-Time BIM Consultant to support our design and construction teams with model coordination and technical review.",

    responsibilities: [
      "Review BIM models and identify coordination issues",
      "Support architectural, structural, and MEP model coordination",
      "Perform periodic model quality checks",
      "Assist project teams with BIM documentation",
      "Provide technical guidance during coordination meetings",
    ],

    requirements: [
      "2+ years of experience in BIM or architectural coordination",
      "Good knowledge of Autodesk Revit",
      "Understanding of BIM coordination workflows",
      "Strong attention to detail",
      "Ability to work on a flexible part-time schedule",
    ],
  },
  {
    id: 6,
    title: "Part-Time BIM Consultant",
    department: "Design",
    type: "Part Time",
    locations: ["New Cairo"],
    locationLabel: "New Cairo",
    salaryMin: 10000,
    salaryMax: 18000,
    currency: "EGP",

    overview:
      "We're looking for a Part-Time BIM Consultant to support our design and construction teams with model coordination and technical review.",

    responsibilities: [
      "Review BIM models and identify coordination issues",
      "Support architectural, structural, and MEP model coordination",
      "Perform periodic model quality checks",
      "Assist project teams with BIM documentation",
      "Provide technical guidance during coordination meetings",
    ],

    requirements: [
      "2+ years of experience in BIM or architectural coordination",
      "Good knowledge of Autodesk Revit",
      "Understanding of BIM coordination workflows",
      "Strong attention to detail",
      "Ability to work on a flexible part-time schedule",
    ],
  },
  {
    id: 6,
    title: "Part-Time BIM Consultant",
    department: "Design",
    type: "Part Time",
    locations: ["New Cairo"],
    locationLabel: "New Cairo",
    salaryMin: 10000,
    salaryMax: 18000,
    currency: "EGP",

    overview:
      "We're looking for a Part-Time BIM Consultant to support our design and construction teams with model coordination and technical review.",

    responsibilities: [
      "Review BIM models and identify coordination issues",
      "Support architectural, structural, and MEP model coordination",
      "Perform periodic model quality checks",
      "Assist project teams with BIM documentation",
      "Provide technical guidance during coordination meetings",
    ],

    requirements: [
      "2+ years of experience in BIM or architectural coordination",
      "Good knowledge of Autodesk Revit",
      "Understanding of BIM coordination workflows",
      "Strong attention to detail",
      "Ability to work on a flexible part-time schedule",
    ],
  },
  {
    id: 6,
    title: "Part-Time BIM Consultant",
    department: "Design",
    type: "Part Time",
    locations: ["New Cairo"],
    locationLabel: "New Cairo",
    salaryMin: 10000,
    salaryMax: 18000,
    currency: "EGP",

    overview:
      "We're looking for a Part-Time BIM Consultant to support our design and construction teams with model coordination and technical review.",

    responsibilities: [
      "Review BIM models and identify coordination issues",
      "Support architectural, structural, and MEP model coordination",
      "Perform periodic model quality checks",
      "Assist project teams with BIM documentation",
      "Provide technical guidance during coordination meetings",
    ],

    requirements: [
      "2+ years of experience in BIM or architectural coordination",
      "Good knowledge of Autodesk Revit",
      "Understanding of BIM coordination workflows",
      "Strong attention to detail",
      "Ability to work on a flexible part-time schedule",
    ],
  },
  {
    id: 6,
    title: "Part-Time BIM Consultant",
    department: "Design",
    type: "Part Time",
    locations: ["New Cairo"],
    locationLabel: "New Cairo",
    salaryMin: 10000,
    salaryMax: 18000,
    currency: "EGP",

    overview:
      "We're looking for a Part-Time BIM Consultant to support our design and construction teams with model coordination and technical review.",

    responsibilities: [
      "Review BIM models and identify coordination issues",
      "Support architectural, structural, and MEP model coordination",
      "Perform periodic model quality checks",
      "Assist project teams with BIM documentation",
      "Provide technical guidance during coordination meetings",
    ],

    requirements: [
      "2+ years of experience in BIM or architectural coordination",
      "Good knowledge of Autodesk Revit",
      "Understanding of BIM coordination workflows",
      "Strong attention to detail",
      "Ability to work on a flexible part-time schedule",
    ],
  },
  {
    id: 6,
    title: "Part-Time BIM Consultant",
    department: "Design",
    type: "Part Time",
    locations: ["New Cairo"],
    locationLabel: "New Cairo",
    salaryMin: 10000,
    salaryMax: 18000,
    currency: "EGP",

    overview:
      "We're looking for a Part-Time BIM Consultant to support our design and construction teams with model coordination and technical review.",

    responsibilities: [
      "Review BIM models and identify coordination issues",
      "Support architectural, structural, and MEP model coordination",
      "Perform periodic model quality checks",
      "Assist project teams with BIM documentation",
      "Provide technical guidance during coordination meetings",
    ],

    requirements: [
      "2+ years of experience in BIM or architectural coordination",
      "Good knowledge of Autodesk Revit",
      "Understanding of BIM coordination workflows",
      "Strong attention to detail",
      "Ability to work on a flexible part-time schedule",
    ],
  },
];
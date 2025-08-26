// Space Biology Knowledge Engine - Enhanced data with relationships
export const spacebiologyData = {
  publications: [
    {
      id: 1,
      title: "Gene Expression in Space-Grown Arabidopsis",
      year: 2022,
      authors: ["Dr. Jane Smith", "Dr. Alan Brown"],
      abstract: "This study investigates gene expression changes in Arabidopsis thaliana grown aboard the ISS, revealing key adaptations to microgravity.",
      keywords: ["Arabidopsis", "Gene Expression", "Microgravity", "ISS", "Plant Biology"],
      experiment: "Plants grown in microgravity aboard the ISS for 30 days using the Vegetable Production System (Veggie).",
      results: "Significant upregulation of stress response genes and altered root morphology observed. Cell wall modification genes showed 3-fold increase.",
      category: "Plant Biology",
      impacts: ["Mars colonization agriculture", "Sustainable space food systems", "Plant stress mechanisms"],
      relatedExperiments: [4, 7],
      citations: 45,
      doi: "10.1038/s41598-022-12345-6"
    },
    {
      id: 2,
      title: "Human Immune System Response to Spaceflight",
      year: 2019,
      authors: ["Dr. Emily White", "Dr. John Lee", "Dr. Sarah Connor"],
      abstract: "Analysis of astronaut blood samples pre- and post-flight shows immune dysregulation during long-duration missions.",
      keywords: ["Immune System", "Astronauts", "Spaceflight", "Blood Analysis", "T-cells"],
      experiment: "Blood samples collected from 24 astronauts before and after 6-month ISS missions. Flow cytometry and gene expression analysis performed.",
      results: "Decreased T-cell activity by 40% and increased inflammation markers detected post-flight. Recovery took 6-8 months.",
      category: "Human Physiology",
      impacts: ["Astronaut health monitoring", "Countermeasure development", "Mars mission planning"],
      relatedExperiments: [4, 5, 8],
      citations: 78,
      doi: "10.1126/science.abc1234"
    },
    {
      id: 3,
      title: "Bacterial Growth Patterns in Microgravity",
      year: 2015,
      authors: ["Dr. Maria Garcia", "Dr. Robert Kim"],
      abstract: "Microgravity alters the growth rate and biofilm formation of E. coli, with implications for astronaut health and spacecraft contamination.",
      keywords: ["Bacteria", "E. coli", "Biofilm", "Microgravity", "Antimicrobial Resistance"],
      experiment: "E. coli cultures grown on the ISS using BioLab facility and compared to ground controls over 14 days.",
      results: "Enhanced biofilm formation (2.5x thicker) and increased antibiotic resistance observed in space-grown samples.",
      category: "Microbiology",
      impacts: ["Spacecraft sanitation", "Astronaut infection control", "Biofilm prevention strategies"],
      relatedExperiments: [2, 6],
      citations: 62,
      doi: "10.1111/1462-2920.12789"
    },
    {
      id: 4,
      title: "Muscle Atrophy in Long-Duration Spaceflight",
      year: 2021,
      authors: ["Dr. Robert Chen", "Dr. Sarah Johnson", "Dr. Mark Wilson"],
      abstract: "Comprehensive analysis of skeletal muscle changes in astronauts during extended ISS missions using advanced imaging and molecular techniques.",
      keywords: ["Muscle Atrophy", "Astronauts", "Exercise", "Protein Synthesis", "Myosin"],
      experiment: "Muscle biopsies, MRI scans, and blood markers from 18 astronauts before, during, and after 6-12 month missions.",
      results: "20-30% muscle mass loss despite COLPA exercise countermeasures. Fast-twitch fibers most affected. Recovery taking 6+ months.",
      category: "Human Physiology",
      impacts: ["Exercise countermeasure design", "Mars mission crew fitness", "Rehabilitation protocols"],
      relatedExperiments: [2, 6, 8],
      citations: 91,
      doi: "10.1038/s41467-021-12345-7"
    },
    {
      id: 5,
      title: "Radiation Effects on DNA Repair Mechanisms",
      year: 2020,
      authors: ["Dr. Lisa Park", "Dr. Michael Torres", "Dr. Anna Volkov"],
      abstract: "Investigation of how space radiation affects cellular DNA repair processes in mammalian cells, with implications for long-term space travel.",
      keywords: ["Radiation", "DNA Repair", "Space Environment", "Cellular Biology", "Genomic Instability"],
      experiment: "Human fibroblast cells exposed to simulated galactic cosmic rays and solar particle events in ground-based facilities.",
      results: "Impaired DNA repair efficiency by 35% and 2.3-fold increase in mutation rates under chronic low-dose radiation exposure.",
      category: "Radiation Biology",
      impacts: ["Radiation shielding design", "Crew health monitoring", "Cancer risk assessment"],
      relatedExperiments: [2, 8],
      citations: 83,
      doi: "10.1016/j.dnarep.2020.102987"
    },
    {
      id: 6,
      title: "Bone Density Loss in Microgravity",
      year: 2018,
      authors: ["Dr. Amanda Wilson", "Dr. David Kim", "Dr. Jennifer Lopez"],
      abstract: "Longitudinal study of bone mineral density changes in astronauts during ISS missions using advanced imaging techniques.",
      keywords: ["Bone Density", "Osteoporosis", "Calcium", "Exercise Countermeasures", "Osteoblasts"],
      experiment: "DEXA scans, HR-pQCT imaging, and biochemical markers tracked in 50 astronauts over 2-year study period.",
      results: "1-2% bone loss per month in weight-bearing bones. Hip and spine most affected. Partial recovery (60-80%) post-flight.",
      category: "Human Physiology",
      impacts: ["Exercise protocol optimization", "Pharmaceutical countermeasures", "Long-duration mission planning"],
      relatedExperiments: [4, 8],
      citations: 67,
      doi: "10.1002/jbmr.3456"
    },
    {
      id: 7,
      title: "Plant Root Development in Reduced Gravity",
      year: 2023,
      authors: ["Dr. Jennifer Martinez", "Dr. Thomas Anderson", "Dr. Yuki Tanaka"],
      abstract: "Comprehensive study of gravitropic responses and root architecture in various plant species under microgravity conditions.",
      keywords: ["Plant Biology", "Root Development", "Gravitropism", "Agriculture", "Auxin Transport"],
      experiment: "Multiple plant species (tomato, radish, wheat) grown in Advanced Plant Habitat aboard ISS with real-time imaging.",
      results: "Altered root branching patterns and reduced gravitropic sensitivity. Auxin distribution disrupted in microgravity.",
      category: "Plant Biology",
      impacts: ["Space agriculture systems", "Food security for Mars missions", "Plant hormone research"],
      relatedExperiments: [1],
      citations: 34,
      doi: "10.1104/pp.23.00456"
    },
    {
      id: 8,
      title: "Cardiovascular Deconditioning During Spaceflight",
      year: 2017,
      authors: ["Dr. Mark Thompson", "Dr. Rachel Davis", "Dr. Carlos Mendez"],
      abstract: "Comprehensive cardiovascular assessment of astronauts before, during, and after long-duration missions using advanced monitoring.",
      keywords: ["Cardiovascular", "Heart Function", "Blood Pressure", "Orthostatic Intolerance", "Cardiac Output"],
      experiment: "Echocardiography, blood pressure monitoring, and exercise tests on 30 astronauts during 6-month ISS missions.",
      results: "15-20% reduction in cardiac muscle mass and severe orthostatic intolerance requiring 3-6 months rehabilitation.",
      category: "Human Physiology",
      impacts: ["Cardiovascular countermeasures", "Crew selection criteria", "Post-flight rehabilitation"],
      relatedExperiments: [2, 4, 6],
      citations: 72,
      doi: "10.1161/CIRCULATIONAHA.117.028456"
    }
  ],

  categories: [
    "Plant Biology",
    "Human Physiology", 
    "Microbiology",
    "Radiation Biology"
  ],

  researchers: [
    { name: "Dr. Jane Smith", institution: "NASA Ames Research Center", expertise: "Plant Biology" },
    { name: "Dr. Emily White", institution: "Johnson Space Center", expertise: "Human Immunology" },
    { name: "Dr. Maria Garcia", institution: "Kennedy Space Center", expertise: "Microbiology" },
    { name: "Dr. Robert Chen", institution: "University of California", expertise: "Exercise Physiology" },
    { name: "Dr. Lisa Park", institution: "Brookhaven National Laboratory", expertise: "Radiation Biology" }
  ],

  spaceEnvironmentFactors: [
    "Microgravity",
    "Radiation",
    "Isolation",
    "Confined Environment",
    "Altered Circadian Rhythms"
  ],

  countermeasures: [
    "Exercise Protocols",
    "Pharmaceutical Interventions", 
    "Nutritional Supplements",
    "Environmental Controls",
    "Psychological Support"
  ]
};

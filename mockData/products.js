const products = [
  {
    id: 1,
    name: 'Broom And Brush Rack Black',
    price: 1,
    description: 'Drainage of Right Radius, Open Approach',
    image: {
      public_id: 'abc',
      url: 'https://placehold.co/350x350',
    },
    countInStock: 1,
    category: 'Rebar & Wire Mesh Install',
    brand: 'Loratadine and Pseudoephedrine Sulfate',
  },
  {
    id: 2,
    name: 'Tart Shells - Sweet, 4',
    price: 2,
    description: 'Reposition Right Rib, Percutaneous Approach',
    image: {
      public_id: 'abc',
      url: 'https://placehold.co/350x350',
    },
    countInStock: 2,
    category: 'Sitework & Site Utilities',
    brand: '3 CONCEPT EYES SLIM FIT PACT SOFT BEIGE',
  },
  {
    id: 3,
    name: 'Oil - Avocado',
    price: 3,
    description:
      'Insertion of Internal Fixation Device into Left Acetabulum, Open Approach',
    image: {
      public_id: 'abc',
      url: 'https://placehold.co/350x350',
    },
    countInStock: 3,
    category: 'HVAC',
    brand: 'Azithromycin',
  },
  {
    id: 4,
    name: 'Appetizer - Spring Roll, Veg',
    price: 4,
    description: 'Ultrasound Therapy of Head and Neck Vessels, Multiple',
    image: {
      public_id: 'abc',
      url: 'https://placehold.co/350x350',
    },
    countInStock: 4,
    category: 'Framing (Steel)',
    brand: 'Metoprolol Succinate',
  },
  {
    id: 5,
    name: 'Squash - Acorn',
    price: 5,
    description:
      'Replacement of Right Acromioclavicular Joint with Nonautologous Tissue Substitute, Open Approach',
    image: {
      public_id: 'abc',
      url: 'https://placehold.co/350x350',
    },
    countInStock: 5,
    category: 'Electrical and Fire Alarm',
    brand: 'NoblRose Foam Cleanser',
  },
  {
    id: 6,
    name: 'Towel Multifold',
    price: 6,
    description:
      'Insertion of Radioactive Element into Left Hand, Percutaneous Endoscopic Approach',
    image: {
      public_id: 'abc',
      url: 'https://placehold.co/350x350',
    },
    countInStock: 6,
    category: 'Elevator',
    brand: 'Candida albicans',
  },
  {
    id: 7,
    name: 'Cream Of Tartar',
    price: 7,
    description:
      'Resection of Pharynx, Via Natural or Artificial Opening Endoscopic',
    image: {
      public_id: 'abc',
      url: 'https://placehold.co/350x350',
    },
    countInStock: 7,
    category: 'Ornamental Railings',
    brand: 'TINEACIDE',
  },
  {
    id: 8,
    name: 'Clams - Littleneck, Whole',
    price: 8,
    description:
      'Dilation of Left Vertebral Artery, Bifurcation, with Two Drug-eluting Intraluminal Devices, Open Approach',
    image: {
      public_id: 'abc',
      url: 'https://placehold.co/350x350',
    },
    countInStock: 8,
    category: 'Site Furnishings',
    brand: 'Budpak Antifungal Clotrimazole',
  },
  {
    id: 9,
    name: 'Artichoke - Fresh',
    price: 9,
    description:
      'Dilation of Left Renal Artery, Bifurcation, with Three Intraluminal Devices, Percutaneous Endoscopic Approach',
    image: {
      public_id: 'abc',
      url: 'https://placehold.co/350x350',
    },
    countInStock: 9,
    category: 'Waterproofing & Caulking',
    brand: 'Aqualant',
  },
  {
    id: 10,
    name: 'Soup - Campbells Mushroom',
    price: 10,
    description:
      'Revision of Nonautologous Tissue Substitute in Lower Tendon, External Approach',
    image: {
      public_id: 'abc',
      url: 'https://placehold.co/350x350',
    },
    countInStock: 10,
    category: 'Roofing (Asphalt)',
    brand: 'QUETIAPINE FUMARATE',
  },
  {
    id: 11,
    name: 'Beef - Rouladin, Sliced',
    price: 11,
    description:
      'Extirpation of Matter from Lumbosacral Joint, Percutaneous Endoscopic Approach',
    image: {
      public_id: 'abc',
      url: 'https://placehold.co/350x350',
    },
    countInStock: 11,
    category: 'Roofing (Metal)',
    brand: 'citroma',
  },
  {
    id: 12,
    name: 'Cheese - Montery Jack',
    price: 12,
    description:
      'Dilation of Right Posterior Tibial Artery, Bifurcation, with Two Intraluminal Devices, Percutaneous Endoscopic Approach',
    image: {
      public_id: 'abc',
      url: 'https://placehold.co/350x350',
    },
    countInStock: 12,
    category: 'Retaining Wall and Brick Pavers',
    brand: 'Banana Boat UltraMist Baby Tear Free Continuous SPF 50',
  },
  {
    id: 13,
    name: 'Emulsifier',
    price: 13,
    description:
      'Revision of Autologous Tissue Substitute in Right Knee Joint, External Approach',
    image: {
      public_id: 'abc',
      url: 'https://placehold.co/350x350',
    },
    countInStock: 13,
    category: 'Epoxy Flooring',
    brand: 'Quik-Care',
  },
  {
    id: 14,
    name: 'Sauce - Roasted Red Pepper',
    price: 14,
    description: 'Repair Parathyroid Gland, Open Approach',
    image: {
      public_id: 'abc',
      url: 'https://placehold.co/350x350',
    },
    countInStock: 14,
    category: 'Overhead Doors',
    brand: 'Antimonium Crudum Kit Refill',
  },
  {
    id: 15,
    name: 'Bagelers - Cinn / Brown Sugar',
    price: 15,
    description:
      'Extirpation of Matter from Cervical Vertebral Joint, Open Approach',
    image: {
      public_id: 'abc',
      url: 'https://placehold.co/350x350',
    },
    countInStock: 15,
    category: 'Temp Fencing, Decorative Fencing and Gates',
    brand: 'DE LA CRUZ SODIUM BICARBONATE ANTACID',
  },
  {
    id: 16,
    name: 'Bagelers - Cinn / Brown Sugar',
    price: 16,
    description:
      'Plain Radiography of Right External Carotid Artery using Other Contrast',
    image: {
      public_id: 'abc',
      url: 'https://placehold.co/350x350',
    },
    countInStock: 16,
    category: 'Drywall & Acoustical (MOB)',
    brand: 'Sheer Defense Tinted Moisturizer SPF 15 ML 30',
  },
  {
    id: 17,
    name: 'Oil - Cooking Spray',
    price: 17,
    description:
      'Removal of Nonautologous Tissue Substitute from Right Glenoid Cavity, Open Approach',
    image: {
      public_id: 'abc',
      url: 'https://placehold.co/350x350',
    },
    countInStock: 17,
    category: 'Ornamental Railings',
    brand: 'ENALAPRIL MALEATE',
  },
  {
    id: 18,
    name: 'Mussels - Frozen',
    price: 18,
    description: 'Excision of Face, Percutaneous Endoscopic Approach',
    image: {
      public_id: 'abc',
      url: 'https://placehold.co/350x350',
    },
    countInStock: 18,
    category: 'Waterproofing & Caulking',
    brand: 'Cetirizine Hydrochloride',
  },
  {
    id: 19,
    name: 'Wine - Ej Gallo Sonoma',
    price: 19,
    description:
      'Transfer Right Neck Muscle with Subcutaneous Tissue, Open Approach',
    image: {
      public_id: 'abc',
      url: 'https://placehold.co/350x350',
    },
    countInStock: 19,
    category: 'Electrical and Fire Alarm',
    brand: 'CYZONE',
  },
  {
    id: 20,
    name: 'Tomatoes - Diced, Canned',
    price: 20,
    description:
      'Supplement Right Maxilla with Autologous Tissue Substitute, Open Approach',
    image: {
      public_id: 'abc',
      url: 'https://placehold.co/350x350',
    },
    countInStock: 20,
    category: 'Electrical',
    brand: 'ATORVASTATIN CALCIUM',
  },
  {
    id: 21,
    name: 'Sponge Cake Mix - Vanilla',
    price: 21,
    description:
      'Low Dose Rate (LDR) Brachytherapy of Pelvis Lymphatics using Other Isotope',
    image: {
      public_id: 'abc',
      url: 'https://placehold.co/350x350',
    },
    countInStock: 21,
    category: 'Painting & Vinyl Wall Covering',
    brand: 'METFORMIN HYDROCHLORIDE',
  },
  {
    id: 22,
    name: 'Tray - 12in Rnd Blk',
    price: 22,
    description: 'Excision of Cecum, Percutaneous Endoscopic Approach',
    image: {
      public_id: 'abc',
      url: 'https://placehold.co/350x350',
    },
    countInStock: 22,
    category: 'Asphalt Paving',
    brand: 'ziprasidone hydrochloride',
  },
  {
    id: 23,
    name: 'Chicken - Wieners',
    price: 23,
    description: 'Drainage of Lumbar Plexus, Open Approach, Diagnostic',
    image: {
      public_id: 'abc',
      url: 'https://placehold.co/350x350',
    },
    countInStock: 23,
    category: 'Sitework & Site Utilities',
    brand: 'Avant Original Instant Hand Sanitizer',
  },
  {
    id: 24,
    name: 'Pork - Bacon,back Peameal',
    price: 24,
    description:
      'Fusion of Cervical Vertebral Joint with Autologous Tissue Substitute, Posterior Approach, Anterior Column, Percutaneous Approach',
    image: {
      public_id: 'abc',
      url: 'https://placehold.co/350x350',
    },
    countInStock: 24,
    category: 'Exterior Signage',
    brand: 'ACNE SOLUTIONS',
  },
  {
    id: 25,
    name: 'Juice - Ocean Spray Kiwi',
    price: 25,
    description:
      'Removal of Nonautologous Tissue Substitute from Left Shoulder Joint, Percutaneous Endoscopic Approach',
    image: {
      public_id: 'abc',
      url: 'https://placehold.co/350x350',
    },
    countInStock: 25,
    category: 'Electrical',
    brand: 'Lisinopril',
  },
  {
    id: 26,
    name: 'Wine - Vovray Sec Domaine Huet',
    price: 26,
    description:
      'Revision of Autologous Tissue Substitute in Left Upper Extremity, Percutaneous Endoscopic Approach',
    image: {
      public_id: 'abc',
      url: 'https://placehold.co/350x350',
    },
    countInStock: 26,
    category: 'EIFS',
    brand: 'Losartan Potassium and Hydrochlorothiazide',
  },
  {
    id: 27,
    name: 'Vol Au Vents',
    price: 27,
    description:
      'Revision of Tissue Expander in Upper Extremity Subcutaneous Tissue and Fascia, Open Approach',
    image: {
      public_id: 'abc',
      url: 'https://placehold.co/350x350',
    },
    countInStock: 27,
    category: 'Marlite Panels (FED)',
    brand: 'Antibacterial',
  },
  {
    id: 28,
    name: 'Pepper - Chillies, Crushed',
    price: 28,
    description:
      'Replacement of Right Temporal Bone with Synthetic Substitute, Open Approach',
    image: {
      public_id: 'abc',
      url: 'https://placehold.co/350x350',
    },
    countInStock: 28,
    category: 'Masonry & Precast',
    brand: 'Zanaflex',
  },
  {
    id: 29,
    name: 'Bowl 12 Oz - Showcase 92012',
    price: 29,
    description:
      'Drainage of Right Testis with Drainage Device, Percutaneous Endoscopic Approach',
    image: {
      public_id: 'abc',
      url: 'https://placehold.co/350x350',
    },
    countInStock: 29,
    category: 'Plumbing & Medical Gas',
    brand: 'Fluoxetine Hydrochloride',
  },
  {
    id: 30,
    name: 'Muffin Mix - Carrot',
    price: 30,
    description:
      'Supplement Left Neck Muscle with Autologous Tissue Substitute, Open Approach',
    image: {
      public_id: 'abc',
      url: 'https://placehold.co/350x350',
    },
    countInStock: 30,
    category: 'Rebar & Wire Mesh Install',
    brand: 'NARS',
  },
]

export default products

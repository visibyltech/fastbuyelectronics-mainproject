import { Product, BankAccountConfig, NigerianStateDelivery, SaveToBuyPlan, Order } from '../types';

export const INITIAL_BANK_CONFIG: BankAccountConfig = {
  bankName: 'Zenith Bank Plc',
  accountName: 'FASTBUY ELECTRONICS NIGERIA LTD',
  accountNumber: '1018992044',
  branch: 'Alaba International Market Branch, Lagos',
  transferInstructions: 'Please include your Order ID or Save-To-Buy ID as the transfer narration/reference. After payment, take a screenshot of your debit alert or receipt and upload it below.',
  whatsappSupportNumber: '07013990666'
};

export const STORE_INFO = {
  name: 'FASTBUY ELECTRONICS',
  address: '26 F Line, Alaba International Market, Ojo, Lagos, Nigeria',
  phone: '07013990666',
  whatsapp: '07013990666',
  email: 'sales@fastbuyelectronics.ng',
  operatingHours: 'Mon - Sat: 8:00 AM - 6:00 PM (West Africa Time)',
  logoUrl: '/assets/aistudio/IMG-20261106-WA0001_8fa093ef.jpg'
};

export const NIGERIAN_STATES: NigerianStateDelivery[] = [
  { name: 'Lagos (Mainland)', zone: 'South West', fee: 4500, estimatedDays: '1-2 Days' },
  { name: 'Lagos (Island / Lekki / Ajah)', zone: 'South West', fee: 6500, estimatedDays: '1-2 Days' },
  { name: 'Ogun State', zone: 'South West', fee: 8500, estimatedDays: '2-3 Days' },
  { name: 'Oyo State (Ibadan)', zone: 'South West', fee: 9500, estimatedDays: '2-3 Days' },
  { name: 'Abuja (FCT)', zone: 'North Central', fee: 14500, estimatedDays: '3-4 Days' },
  { name: 'Rivers State (Port Harcourt)', zone: 'South South', fee: 16500, estimatedDays: '3-4 Days' },
  { name: 'Anambra State (Onitsha / Awka)', zone: 'South East', fee: 13500, estimatedDays: '2-3 Days' },
  { name: 'Enugu State', zone: 'South East', fee: 14000, estimatedDays: '3-4 Days' },
  { name: 'Delta State (Asaba / Warri)', zone: 'South South', fee: 14500, estimatedDays: '3-4 Days' },
  { name: 'Kano State', zone: 'North West', fee: 18500, estimatedDays: '4-5 Days' },
  { name: 'Kaduna State', zone: 'North West', fee: 17500, estimatedDays: '4-5 Days' },
  { name: 'Edo State (Benin City)', zone: 'South South', fee: 13000, estimatedDays: '2-3 Days' },
  { name: 'Abia State (Aba / Umuahia)', zone: 'South East', fee: 14000, estimatedDays: '3-4 Days' },
  { name: 'Imo State (Owerri)', zone: 'South East', fee: 14500, estimatedDays: '3-4 Days' },
  { name: 'Akwa Ibom State (Uyo)', zone: 'South South', fee: 16000, estimatedDays: '3-5 Days' },
  { name: 'Cross River State (Calabar)', zone: 'South South', fee: 17000, estimatedDays: '3-5 Days' },
  { name: 'Osun State', zone: 'South West', fee: 10500, estimatedDays: '2-4 Days' },
  { name: 'Ondo State', zone: 'South West', fee: 11000, estimatedDays: '2-4 Days' },
  { name: 'Ekiti State', zone: 'South West', fee: 11500, estimatedDays: '3-4 Days' },
  { name: 'Kwara State (Ilorin)', zone: 'North Central', fee: 13000, estimatedDays: '3-4 Days' },
  { name: 'Plateau State (Jos)', zone: 'North Central', fee: 16500, estimatedDays: '4-5 Days' },
  { name: 'Benue State (Makurdi)', zone: 'North Central', fee: 15500, estimatedDays: '4-5 Days' },
  { name: 'Kogi State (Lokoja)', zone: 'North Central', fee: 13500, estimatedDays: '3-4 Days' },
  { name: 'Nasarawa State', zone: 'North Central', fee: 14500, estimatedDays: '3-4 Days' },
  { name: 'Niger State', zone: 'North Central', fee: 15000, estimatedDays: '4-5 Days' },
  { name: 'Sokoto State', zone: 'North West', fee: 20000, estimatedDays: '5-6 Days' },
  { name: 'Katsina State', zone: 'North West', fee: 19500, estimatedDays: '5-6 Days' },
  { name: 'Borno State (Maiduguri)', zone: 'North East', fee: 22000, estimatedDays: '5-7 Days' },
  { name: 'Adamawa State', zone: 'North East', fee: 21000, estimatedDays: '5-7 Days' },
  { name: 'Bauchi State', zone: 'North East', border: 'North East', fee: 19000, estimatedDays: '4-6 Days' } as any
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'fbe-tv-01',
    name: 'LG 65-Inch OLED evo C3 4K Cinema Smart TV',
    brand: 'LG',
    category: 'TVs',
    condition: 'BRAND NEW',
    price: 1850000,
    originalPrice: 2150000,
    stock: 8,
    rating: 4.9,
    reviewCount: 34,
    images: [
      '/src/assets/images/product_oled_smart_tv_1793977433232.jpg'
    ],
    description: 'The pinnacle of television technology. LG self-lit OLED pixels glow independently with 100% color fidelity and infinite contrast. Features α9 AI Processor Gen6, 120Hz native refresh rate, Dolby Vision, Dolby Atmos, and webOS 23.',
    keyFeatures: [
      'Self-lit OLED pixels with Infinite Contrast & 0ms response time',
      'α9 AI Processor Gen6 with 4K Super Upscaling',
      'Cinema HDR with Dolby Vision IQ & Dolby Atmos surround audio',
      'Native 120Hz refresh rate with 4x HDMI 2.1 ports for PS5 / Xbox Series X',
      'Alaba Official 2-Year LG Nigeria Manufacturer Warranty'
    ],
    specifications: {
      'Screen Size': '65 Inches',
      'Display Technology': 'OLED evo 4K UHD',
      'Resolution': '3840 x 2160 pixels',
      'Refresh Rate': '120Hz Native',
      'Smart OS': 'LG webOS 23 with ThinQ AI',
      'Connectivity': '4x HDMI 2.1, 3x USB, Wi-Fi 6, Bluetooth 5.2, Optical Audio',
      'Audio Output': '40W (2.2 Channel with Down Firing)'
    },
    warranty: '2 Years Manufacturer Warranty + Receipt',
    isFeatured: true,
    isBestSeller: true,
    isSpecialDeal: true
  },
  {
    id: 'fbe-fridge-01',
    name: 'Samsung 4-Door French Door Smart Hub Refrigerator 620L',
    brand: 'Samsung',
    category: 'Refrigerators',
    condition: 'BRAND NEW',
    price: 2450000,
    originalPrice: 2850000,
    stock: 5,
    rating: 4.9,
    reviewCount: 28,
    images: [
      '/src/assets/images/product_smart_refrigerator_1793977434129.jpg'
    ],
    description: 'Transform your kitchen with Samsung Smart Hub 4-Door French Refrigerator. Equipped with built-in Wi-Fi touchscreen display, internal cameras to view inside from your phone, auto-fill water pitcher, dual ice maker, and Triple Cooling technology.',
    keyFeatures: [
      '620 Litres high-capacity storage with FlexZone convertible compartment',
      'Family Hub 21.5" touchscreen for recipes, music, and calendar',
      'Digital Inverter Compressor with 20-Year Compressor Warranty',
      'Dual Auto Ice Maker (Cubed & Ice Bites)',
      'Built-in Beverage Center with antimicrobial dispenser'
    ],
    specifications: {
      'Total Capacity': '620 Litres',
      'Refrigeration Type': 'Frost Free Inverter French Door',
      'Compressor': 'Digital Inverter (Low Power Consumption for Solar/Inverter)',
      'Dimensions': '912 x 1825 x 723 mm (W x H x D)',
      'Cooling System': 'Triple Cooling & Metal Cooling',
      'Color Finish': 'Black Caviar Brushed Stainless Steel'
    },
    warranty: '2 Years Full Unit + 10 Years Inverter Compressor Warranty',
    isFeatured: true,
    isBestSeller: true
  },
  {
    id: 'fbe-ac-01',
    name: 'Daikin 1.5HP Inverter Split Air Conditioner (Copper Coil)',
    brand: 'Daikin',
    category: 'Air Conditioners',
    condition: 'BRAND NEW',
    price: 520000,
    originalPrice: 590000,
    stock: 14,
    rating: 4.8,
    reviewCount: 52,
    images: [
      '/src/assets/images/product_inverter_ac_1793977434537.jpg'
    ],
    description: 'Engineered for Nigerian tropical climate and erratic voltage fluctuations. Daikin Inverter technology delivers ultra-fast turbo cooling with up to 60% power savings. Operates smoothly on generator or solar inverter system.',
    keyFeatures: [
      '100% Pure Grooved Copper Condenser & Evaporator Coils',
      'Eco-Friendly R32 Refrigerant for high thermodynamic efficiency',
      'Low Voltage Startup (130V - 265V Wide Voltage Operation)',
      'Titanium Apatite Photocatalytic Air-Purifying Filter',
      'Whisper-quiet operation at only 22dB sound level'
    ],
    specifications: {
      'Horsepower': '1.5 HP (12,000 BTU/h)',
      'Cooling Type': 'Inverter Energy Saving',
      'Refrigerant': 'R-32',
      'Voltage Range': '130V - 265V 50Hz',
      'Pipe Type': '100% Copper Tubes with Anti-Corrosion Gold Fin'
    },
    warranty: '1 Year Full Warranty + 3 Years Compressor Warranty',
    isFeatured: true,
    isBestSeller: true,
    isSpecialDeal: true
  },
  {
    id: 'fbe-gen-01',
    name: 'Nexus Silent Pro 8500Di Heavy-Duty Diesel Inverter Generator',
    brand: 'Nexus',
    category: 'Generators',
    condition: 'BRAND NEW',
    price: 1650000,
    originalPrice: 1900000,
    stock: 6,
    rating: 4.9,
    reviewCount: 41,
    images: [
      '/src/assets/images/product_silent_generator_1793977434099.jpg'
    ],
    description: 'Ultimate power reliability for residential and business premises. Nexus Silent Pro 8500Di outputs clean pure-sine wave electricity safe for sensitive electronics, TVs, medical tools, and inverter ACs. Features key electric start, remote control, and soundproof casing.',
    keyFeatures: [
      '8.5kVA Maximum Output / 8.0kVA Rated Output (Pure Copper Alternator)',
      'Super Silent Soundproof Enclosure (<68dB at 7 meters)',
      'Pure Sine Wave Inverter Technology (THD < 2.5%)',
      'Heavy-duty 4-Stroke Direct Injection Air-Cooled Diesel Engine',
      'Digital Smart LCD Multi-Meter (Voltage, Frequency, Running Hours, Fuel Level)'
    ],
    specifications: {
      'Max Power': '8.5 kVA (6,800 Watts)',
      'Rated Power': '8.0 kVA (6,400 Watts)',
      'Starting System': 'Key Electric Start + Wireless Remote + Recoil Backup',
      'Fuel Tank Capacity': '16 Litres Diesel (10-14 Hours Run Time)',
      'Weight': '138 kg with Heavy-Duty 360° Industrial Wheels'
    },
    warranty: '1 Year Comprehensive Warranty + Free 1st Oil Service at Alaba',
    isFeatured: true,
    isBestSeller: true
  },
  {
    id: 'fbe-tv-02',
    name: 'Samsung 55-Inch Crystal 4K UHD Smart TV (UK Used)',
    brand: 'Samsung',
    category: 'TVs',
    condition: 'UK USED',
    ukUsedGrade: 'Grade A+',
    price: 360000,
    originalPrice: 620000,
    stock: 11,
    rating: 4.7,
    reviewCount: 46,
    images: [
      '/src/assets/images/product_oled_smart_tv_1793977433232.jpg'
    ],
    description: 'Clean UK Used Grade A+ Samsung 55-inch Crystal UHD 4K Smart TV directly imported from London warehouse. Rigorously tested by our Alaba International electronic engineers. Crisp screen, original Samsung remote, factory bezel with pristine condition.',
    keyFeatures: [
      'Grade A+ UK Used with Zero Screen Lines, Zero Bleeding, Zero Scratches',
      'Crystal Processor 4K with HDR10+ Dynamic Color',
      'Tizen OS with Netflix, YouTube, Prime Video, DStv Now, Apple TV preinstalled',
      '3x HDMI, 2x USB, Optical Out, Bluetooth Audio',
      'Supplied with Original Samsung One Remote Control and Power Lead'
    ],
    specifications: {
      'Screen Size': '55 Inches',
      'Condition Details': 'Grade A+ London Used (Tested 100% Functional)',
      'Resolution': '3840 x 2160 UHD 4K',
      'Connectivity': '3x HDMI, 2x USB, Wi-Fi 5, Bluetooth',
      'Audio': '20W Dolby Digital Plus'
    },
    warranty: '6 Months Alaba Store Replacement Warranty',
    isFeatured: true,
    isSpecialDeal: true
  },
  {
    id: 'fbe-laptop-01',
    name: 'Apple MacBook Pro 16-Inch M3 Pro (18GB RAM / 512GB SSD) UK Used',
    brand: 'Apple',
    category: 'Laptops',
    condition: 'UK USED',
    ukUsedGrade: 'Grade A',
    price: 1950000,
    originalPrice: 3200000,
    stock: 4,
    rating: 5.0,
    reviewCount: 19,
    images: [
      '/src/assets/images/hero_flagship_electronics_1793977432202.jpg'
    ],
    description: 'Immaculate UK Used Space Black Apple MacBook Pro 16" with revolutionary Apple M3 Pro chip (12-core CPU, 18-core GPU). 100% Battery health with less than 28 cycle counts. Flawless Liquid Retina XDR display.',
    keyFeatures: [
      'Apple M3 Pro Chip with 12-core CPU and 18-core GPU',
      '18GB Unified High-Speed Memory & 512GB NVMe SSD',
      '16.2-inch Liquid Retina XDR screen with 120Hz ProMotion & 1600 nits peak HDR',
      'Battery Health: 99% (Original Apple 140W USB-C GaN Charger included)',
      '6-Speaker Sound System with Force-Cancelling Woofers & Studio Mics'
    ],
    specifications: {
      'Processor': 'Apple M3 Pro (12 Cores)',
      'RAM': '18GB Unified RAM',
      'Storage': '512GB Ultrafast NVMe SSD',
      'Display': '16.2" Mini-LED (3456 x 2234)',
      'Ports': '3x Thunderbolt 4 / USB 4, HDMI 2.1, SDXC slot, MagSafe 3'
    },
    warranty: '6 Months Full Store Warranty with Free Diagnostic Support',
    isFeatured: true,
    isSpecialDeal: true
  },
  {
    id: 'fbe-laptop-02',
    name: 'HP Envy x360 2-in-1 Touchscreen 15.6" Intel Core i7 13th Gen',
    brand: 'HP',
    category: 'Laptops',
    condition: 'BRAND NEW',
    price: 1180000,
    originalPrice: 1350000,
    stock: 9,
    rating: 4.8,
    reviewCount: 22,
    images: [
      '/src/assets/images/hero_flagship_electronics_1793977432202.jpg'
    ],
    description: 'Factory Sealed Brand New HP Envy x360 convertible laptop. Premium all-aluminum chassis, Intel Core i7-1355U (up to 5.0 GHz), 16GB DDR5 RAM, 1TB PCIe NVMe SSD, Bang & Olufsen sound, and edge-to-edge FHD OLED touch display.',
    keyFeatures: [
      'Intel Core i7-1355U 10-Core Processor (13th Generation)',
      '16GB LPDDR5 High-Frequency RAM & 1TB PCIe Gen4 SSD',
      '360° Convertible Hinge (Laptop, Stand, Tent, Tablet modes)',
      'Full HD IPS Micro-Edge Touchscreen with HP Active Stylus Pen included',
      'Factory Sealed in HP Retail Box with 1-Year HP Global Warranty'
    ],
    specifications: {
      'Processor': 'Intel Core i7-1355U (10 Cores, 12 Threads)',
      'RAM': '16GB LPDDR5 5200MHz',
      'Storage': '1TB PCIe Gen4 NVMe M.2 SSD',
      'Display': '15.6" Full HD (1920 x 1080) Multitouch Edge-to-Edge Glass',
      'Battery Life': 'Up to 11 Hours with HP Fast Charge (50% in 30 mins)'
    },
    warranty: '1 Year Official HP Manufacturer Warranty',
    isFeatured: false,
    isBestSeller: true
  },
  {
    id: 'fbe-phone-01',
    name: 'Apple iPhone 15 Pro Max 256GB Natural Titanium (UK Used Grade A+)',
    brand: 'Apple',
    category: 'Phones',
    condition: 'UK USED',
    ukUsedGrade: 'Grade A+',
    price: 1280000,
    originalPrice: 1750000,
    stock: 7,
    rating: 4.9,
    reviewCount: 65,
    images: [
      '/src/assets/images/hero_flagship_electronics_1793977432202.jpg'
    ],
    description: 'Clean UK Used Grade A+ Apple iPhone 15 Pro Max 256GB Natural Titanium. Factory unlocked to all Nigerian networks (MTN, Airtel, Glo, 9mobile). 96%+ Battery health, Face ID 100% active, 5x optical telephoto lens, and aerospace-grade titanium frame.',
    keyFeatures: [
      'Grade A+ UK import with zero dings or glass micro-scratches',
      'Apple A17 Pro 3nm gaming chip with hardware ray tracing',
      'Pro 48MP Camera System with 5x Periscope Optical Zoom',
      'Super Retina XDR OLED with Always-On display & 120Hz ProMotion',
      'Factory Unlocked (Physical SIM + eSIM supported)'
    ],
    specifications: {
      'Screen Size': '6.7 Inches Super Retina XDR OLED',
      'Storage': '256GB NVMe',
      'Battery Health': '95% - 98% Original Apple Battery',
      'Camera': '48MP Main + 12MP Ultra-Wide + 12MP 5x Telephoto',
      'Condition': 'Grade A+ Clean (Includes fast braided USB-C Cable)'
    },
    warranty: '6 Months Alaba Store Replacement Warranty',
    isFeatured: true,
    isBestSeller: true,
    isSpecialDeal: true
  },
  {
    id: 'fbe-phone-02',
    name: 'Samsung Galaxy S24 Ultra 5G 512GB Titanium Black',
    brand: 'Samsung',
    category: 'Phones',
    condition: 'BRAND NEW',
    price: 1780000,
    originalPrice: 2050000,
    stock: 6,
    rating: 4.9,
    reviewCount: 39,
    images: [
      '/src/assets/images/hero_flagship_electronics_1793977432202.jpg'
    ],
    description: 'Factory Sealed Brand New Samsung Galaxy S24 Ultra. The titan of Android smartphones with Galaxy AI (Live Translate, Circle to Search), 200MP camera, built-in S Pen stylus, Corning Gorilla Armor anti-reflective glass, and Snapdragon 8 Gen 3 for Galaxy.',
    keyFeatures: [
      'Qualcomm Snapdragon 8 Gen 3 for Galaxy (4nm)',
      '12GB LPDDR5X RAM with 512GB UFS 4.0 Storage',
      '200MP Quad Telephoto Camera with 100x Space Zoom & 8K Video',
      'Integrated Bluetooth S Pen with Air Actions',
      'Official Samsung Nigeria Sealed Stock with 24 Months Warranty'
    ],
    specifications: {
      'Display': '6.8" Dynamic LTPO AMOLED 2X (1-120Hz, 2600 nits)',
      'RAM / ROM': '12GB / 512GB',
      'Battery': '5000mAh with 45W Fast Charging',
      'Network': 'Dual SIM 5G (Nano + eSIM)'
    },
    warranty: '24 Months Samsung Care+ Official Warranty',
    isFeatured: true
  },
  {
    id: 'fbe-wash-01',
    name: 'Haier Thermocool 10.5KG Front Load Inverter Washing Machine',
    brand: 'Haier Thermocool',
    category: 'Washing Machines',
    condition: 'BRAND NEW',
    price: 680000,
    originalPrice: 790000,
    stock: 12,
    rating: 4.8,
    reviewCount: 31,
    images: [
      '/src/assets/images/hero_flagship_electronics_1793977432202.jpg'
    ],
    description: 'Nigeria’s most trusted laundry champion. Direct Motion Inverter Motor connected directly to the drum for zero noise and long-lasting durability. ABT (Anti-Bacterial Treatment) eliminates 99.9% of bacteria, allergens, and germs from clothes.',
    keyFeatures: [
      '10.5KG Large Wash Capacity with Super Drum 525mm diameter',
      'Direct Motion Inverter Motor with 10-Year Motor Warranty',
      'Steam Refresh cycle for allergen-free, wrinkle-free garments',
      'Energy Rating: A+++ (-40% power consumption, ideal for inverters)',
      'Laser Seamless Welding Drum preserves delicate Nigerian laces & native wears'
    ],
    specifications: {
      'Capacity': '10.5 KG Wash / Spin',
      'Spin Speed': '1400 RPM',
      'Programs': '16 Wash Cycles including Quick 15 min, Duvet, Baby Care, Wool',
      'Dimensions': '595 x 600 x 850 mm'
    },
    warranty: '3 Years Full Warranty + 10 Years Inverter Motor Warranty',
    isFeatured: true,
    isBestSeller: true
  },
  {
    id: 'fbe-kitchen-01',
    name: 'Scanfrost 4-Burner + 2 Electric Hotplates Cooker with Double Oven',
    brand: 'Scanfrost',
    category: 'Kitchen Appliances',
    condition: 'BRAND NEW',
    price: 490000,
    originalPrice: 560000,
    stock: 10,
    rating: 4.7,
    reviewCount: 26,
    images: [
      '/src/assets/images/hero_flagship_electronics_1793977432202.jpg'
    ],
    description: 'Heavy duty 90x60cm stainless steel gas cooker by Scanfrost. Features 4 rapid brass gas burners, 2 rapid heating electric hotplates, dual separate grill and oven compartments, turnspit rotisserie, and digital timer.',
    keyFeatures: [
      '4 Gas Burners (1 Triple Ring Wok Burner) + 2 Electric Hotplates',
      'Heavy Cast Iron Pan Supports for heavy pots and caterers',
      'Double Cavity Oven with Rotisserie Chicken Turnspit & Interior Lamp',
      'Auto-ignition with Flame Failure Safety Device on all burners',
      'Premium Brushed Inox Stainless Steel finish'
    ],
    specifications: {
      'Size': '90cm x 60cm Professional Cooker',
      'Burners': '4 Gas + 2 Electric Solid Plates',
      'Oven Type': 'Gas Oven & Electric Grill with Thermostat',
      'Ignition': 'One-Touch Electric Spark Ignition'
    },
    warranty: '2 Years Scanfrost Official Warranty',
    isFeatured: false,
    isBestSeller: true
  },
  {
    id: 'fbe-kitchen-02',
    name: 'Panasonic 32L Inverter Sensor Microwave & Grill (UK Used Grade A)',
    brand: 'Panasonic',
    category: 'Kitchen Appliances',
    condition: 'UK USED',
    ukUsedGrade: 'Grade A',
    price: 135000,
    originalPrice: 220000,
    stock: 15,
    rating: 4.8,
    reviewCount: 38,
    images: [
      '/src/assets/images/hero_flagship_electronics_1793977432202.jpg'
    ],
    description: 'Heavy-duty Panasonic Inverter microwave with quartz grill directly imported from Manchester, UK. True inverter technology produces continuous graduated power to reheat food evenly without rubbery textures.',
    keyFeatures: [
      'Grade A UK Used with spotless stainless steel interior cavity',
      'Panasonic True Inverter Technology (1000W Microwave / 1100W Quartz Grill)',
      '32 Litres generous volume accommodates large roasting dishes',
      'Genius Sensor automatic reheat and defrost programs',
      'Easy wipe clean coating and scratch-resistant tempered door'
    ],
    specifications: {
      'Volume': '32 Litres',
      'Microwave Power': '1000 Watts Inverter',
      'Grill Power': '1100 Watts',
      'Condition': 'Grade A UK Used (Pre-tested 100% at Alaba workshop)'
    },
    warranty: '6 Months Alaba Store Warranty',
    isFeatured: false,
    isSpecialDeal: true
  },
  {
    id: 'fbe-access-01',
    name: 'Felicity Solar 5KVA 48V Pure Sine Wave Hybrid Inverter + MPPT',
    brand: 'Felicity Solar',
    category: 'Electronics Accessories',
    condition: 'BRAND NEW',
    price: 640000,
    originalPrice: 750000,
    stock: 8,
    rating: 4.9,
    reviewCount: 42,
    images: [
      '/src/assets/images/hero_flagship_electronics_1793977432202.jpg'
    ],
    description: 'The golden standard in Nigerian residential power backup. Felicity Solar 5KVA 48V hybrid inverter combines an intelligent pure sine wave inverter, built-in 80A MPPT solar charge controller, and AC utility charger in a single wall-mounted unit.',
    keyFeatures: [
      '5000VA / 5000W Pure Sine Wave Output (Power Factor 1.0)',
      'Built-in 80A MPPT Solar Charge Controller (Handles up to 450V PV Array)',
      'Compatible with Lithium LiFePO4 batteries and Lead Acid/Tubular batteries',
      'Zero transfer switch time (<10ms) prevents TV or computer reboot',
      'Smart LCD display with mobile app Wi-Fi monitoring support'
    ],
    specifications: {
      'Output Capacity': '5000VA / 5000W',
      'Nominal Battery Voltage': '48V DC',
      'Max Solar Input Voltage': '450V DC',
      'Output Voltage': '230V AC ± 5% 50Hz'
    },
    warranty: '2 Years Manufacturer Warranty',
    isFeatured: true,
    isSpecialDeal: true
  },
  {
    id: 'fbe-home-01',
    name: 'OX 20-Inch Heavy-Duty Plus Industrial Standing Fan (Original Copper)',
    brand: 'OX',
    category: 'Home Appliances',
    condition: 'BRAND NEW',
    price: 48500,
    originalPrice: 58000,
    stock: 35,
    rating: 4.9,
    reviewCount: 88,
    images: [
      '/src/assets/images/hero_flagship_electronics_1793977432202.jpg'
    ],
    description: 'The legendary Nigerian cooling powerhouse. 100% original OX 20-Inch standing fan with high-velocity pure copper coil motor. Delivers storm-grade airflow across large living rooms, churches, and shops.',
    keyFeatures: [
      '100% High-Grade Pure Copper Motor (Heavyweight Alaba Original)',
      'Heavy-duty cast iron round base prevents vibration or toppling',
      '3-Speed airflow selector with 90° wide angle oscillation',
      'Rust-proof powder coated safety mesh grill',
      'Low power consumption (130W) running smoothly on inverters and small generators'
    ],
    specifications: {
      'Blade Size': '20 Inches (3 Heavy Aerodynamic Metal Blades)',
      'Motor Type': 'Pure Copper High-Torque',
      'Power Rating': '130 Watts',
      'Color': 'Black & Chrome'
    },
    warranty: '1 Year Full Replacement Guarantee on Motor',
    isFeatured: false,
    isBestSeller: true
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'FBE-2026-8819',
    customerName: 'Chinedu Ezeokafor',
    phone: '08034458921',
    email: 'chinedu.eze@gmail.com',
    address: 'Plot 14 Admiralty Way, Lekki Phase 1',
    state: 'Lagos (Island / Lekki / Ajah)',
    city: 'Lekki',
    deliveryMethod: 'delivery',
    paymentMethod: 'buy_now',
    items: [
      {
        product: INITIAL_PRODUCTS[0],
        quantity: 1
      }
    ],
    subtotal: 1850000,
    deliveryFee: 6500,
    totalAmount: 1856500,
    paymentStatus: 'verified',
    orderStatus: 'processing',
    receiptFileName: 'zenith_bank_transfer_1856500_ref991.pdf',
    transferReference: 'ZEN-NIP-991823901',
    createdAt: '2026-11-05T14:32:00.000Z',
    notes: 'Please double-box and test HDMI 2.1 before dispatch.'
  },
  {
    id: 'FBE-2026-8794',
    customerName: 'Amina Bello',
    phone: '08023190844',
    email: 'amina.bello@abuja-law.ng',
    address: 'Block C, 26 F Line, Alaba Store Pickup Desk',
    state: 'Lagos (Mainland)',
    city: 'Ojo',
    deliveryMethod: 'pickup',
    paymentMethod: 'buy_now',
    items: [
      {
        product: INITIAL_PRODUCTS[2],
        quantity: 1
      }
    ],
    subtotal: 520000,
    deliveryFee: 0,
    totalAmount: 520000,
    paymentStatus: 'verified',
    orderStatus: 'ready_for_pickup',
    receiptFileName: 'gtbank_transfer_receipt_520000.jpg',
    transferReference: 'GTB-TRF-48201',
    createdAt: '2026-11-04T09:15:00.000Z',
    notes: 'Customer brother picking up on Saturday.'
  }
];

export const INITIAL_SAVE_TO_BUY_PLANS: SaveToBuyPlan[] = [
  {
    id: 'STB-2026-104',
    customerName: 'Oluwaseun Adeleke',
    phone: '08169902311',
    email: 'seun.adeleke@yahoo.com',
    productId: 'fbe-fridge-01',
    productName: 'Samsung 4-Door French Door Smart Hub Refrigerator 620L',
    productImage: '/src/assets/images/product_smart_refrigerator_1793977434129.jpg',
    productCondition: 'BRAND NEW',
    totalPrice: 2450000,
    depositedAmount: 1470000,
    outstandingBalance: 980000,
    durationMonths: 3,
    paymentFrequency: 'monthly',
    installmentAmount: 490000,
    nextPaymentDate: '2026-11-28',
    deliveryMethod: 'delivery',
    deliveryAddress: '24 Allen Avenue, Ikeja',
    deliveryState: 'Lagos (Mainland)',
    status: 'active',
    createdAt: '2026-09-28T10:00:00.000Z',
    payments: [
      {
        id: 'PAY-01',
        date: '2026-09-28',
        amount: 735000,
        status: 'verified',
        receiptFileName: 'initial_deposit_30_percent.pdf',
        reference: 'ACC-8831-SEP',
        note: 'Initial 30% Commitment Deposit'
      },
      {
        id: 'PAY-02',
        date: '2026-10-28',
        amount: 735000,
        status: 'verified',
        receiptFileName: 'october_installment_receipt.png',
        reference: 'ACC-9921-OCT',
        note: 'Month 2 Installment'
      }
    ]
  },
  {
    id: 'STB-2026-118',
    customerName: 'Emeka Nwachukwu',
    phone: '09038812904',
    email: 'emeka.nwa@business.ng',
    productId: 'fbe-gen-01',
    productName: 'Nexus Silent Pro 8500Di Heavy-Duty Diesel Inverter Generator',
    productImage: '/src/assets/images/product_silent_generator_1793977434099.jpg',
    productCondition: 'BRAND NEW',
    totalPrice: 1650000,
    depositedAmount: 500000,
    outstandingBalance: 1150000,
    durationMonths: 2,
    paymentFrequency: 'bi-weekly',
    installmentAmount: 287500,
    nextPaymentDate: '2026-11-15',
    deliveryMethod: 'pickup',
    deliveryAddress: 'FASTBUY Showroom, 26 F Line, Alaba International Market',
    deliveryState: 'Lagos (Mainland)',
    status: 'active',
    createdAt: '2026-10-15T12:00:00.000Z',
    payments: [
      {
        id: 'PAY-GEN-01',
        date: '2026-10-15',
        amount: 500000,
        status: 'verified',
        receiptFileName: 'first_bank_slip_500k.jpg',
        reference: 'FBN-99210-GEN',
        note: 'First deposit paid via transfer'
      }
    ]
  }
];

export const INITIAL_REVIEWS = [
  {
    id: 'rev-01',
    author: 'Chief Kenneth Okoye',
    location: 'Festac Town, Lagos',
    rating: 5,
    date: '2 days ago',
    comment: 'I came directly to their shop at 26 F Line Alaba after seeing them online. Tested the 65-inch LG OLED right in front of me with the generator running. Genuine product with warranty card. Delivered to my house in Festac that same evening. Very reliable guys!',
    verifiedPurchase: true,
    productCondition: 'BRAND NEW' as const
  },
  {
    id: 'rev-02',
    author: 'Dr. Fatima Sanusi',
    location: 'Garki 2, Abuja',
    rating: 5,
    date: '1 week ago',
    comment: 'Used the SAVE TO BUY option for the Samsung smart refrigerator. Paid 30% first, then completed the remaining in 2 installments. The moment my final payment cleared, they dispatched it via GIG Logistics to Abuja. Unboxed in mint factory condition.',
    verifiedPurchase: true,
    productCondition: 'BRAND NEW' as const
  },
  {
    id: 'rev-03',
    author: 'Tunde Oladipo',
    location: 'Ibadan, Oyo State',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Bought the UK Used iPhone 15 Pro Max and Samsung 55 Crystal TV. Honestly looks brand new! Battery health was 97% on the iPhone, zero scratches. Alaba prices without the hassle of wandering through the market crowd.',
    verifiedPurchase: true,
    productCondition: 'UK USED' as const
  }
];

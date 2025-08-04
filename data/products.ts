export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: 'herbs' | 'oils' | 'books';
  images: string[];
  description: string;
  usage: string;
  benefits: string[]; // ← changed from string to string[]
}


export const products: Product[] = [
{
  id: '1',
  name: 'Cloves (herb)',
  slug: 'cloves-herb',
  price: 350,
  category: 'herbs',
  images: ['/assets/cloves1.jpg', '/assets/cloves2.jpg', '/assets/cloves3.jpg'],
  description: 'Cloves are aromatic flower buds known for their strong flavor and medicinal uses.',
  usage: 'Use in teas, cooking, or chew a bud for oral health. External oil application for pain.',
  benefits: [
    'Relieves toothaches – natural analgesic effect.',
    'Improves digestion – reduces bloating and gas.',
    'Fights bacteria – strong antimicrobial properties.',
    'Freshens breath – combats oral bacteria.',
    'Supports liver function – rich in antioxidants.'
  ]
},



{
  id: '2',
  name: 'Coconut Oil (Virgin Cold-Pressed)',
  slug: 'coconut-oil',
  price: 350,
  category: 'oils',
  images: ['/assets/coconut2.jpg', '/assets/coconut1.jpg', '/assets/coconut3.jpg'],
  description: 'Coconut oil is a multipurpose natural oil extracted from mature coconut meat through cold pressing. Celebrated by herbalists for its powerful antibacterial, antiviral, and nourishing properties.',
  usage: 'Take 1 tbsp daily for internal health. Apply directly to skin, hair, or scalp for external therapy. Safe for oil pulling and baby care.',
  benefits: [
    'Boosts immunity – contains lauric acid that fights viruses and bacteria.',
    'Supports brain function – rich in MCTs for quick energy.',
    'Nourishes skin – heals dryness, eczema, and rashes.',
    'Strengthens hair – prevents breakage and promotes growth.',
    'Aids digestion – improves nutrient absorption and gut health.',
    'Balances hormones – supports thyroid and adrenal glands.',
    'Acts as a natural deodorant – antibacterial effect on skin.',
    'Relieves inflammation – soothes joint and muscle pain.',
    'Good for oil pulling – removes toxins and freshens breath.',
    'Safe for infants – treats diaper rash and moisturizes baby skin.'
  ]
},
   {
    id: '3',

  name: 'Cayenne Pepper (herb)',
  slug: 'powerful-cayenne',
  price: 350,
  category: 'herbs',
  images: ['/assets/cayene1.jpg', '/assets/cayene2.jpg', '/assets/cayene3.jpg'],
  description: 'Cayenne pepper is a hot chili pepper from the Capsicum annuum family. It’s dried and ground into a bright red powder used both as a spice and medicinal herb.',
  usage: 'Add 1/4 tsp to warm water, tea, or meals daily. Use topically for pain relief. Start with small amounts.',
  benefits: [
    'Boosts metabolism – burns calories faster.',
    'Improves digestion – stimulates enzymes and saliva.',
    'Relieves pain – blocks nerve signals when used externally.',
    'Clears nasal congestion – acts as a natural decongestant.',
    'Supports heart health – improves circulation and reduces clot risk.',
    'Aids detox – activates lymphatic and digestive systems.',
    'Strengthens immunity – rich in vitamin C and antioxidants.',
    'Fights inflammation – reduces swelling and joint pain.',
    'Stops minor bleeding – natural clotting when applied to cuts.',
    'Suppresses appetite – helps manage weight naturally.'
  ]
    
  },

{
  id: '4',
  name: 'King James Version (KJV) Bible',
  slug: 'kjv-bible',
  price: 800,
  category: 'books',
  images: ['/assets/kjv1.jpg', '/assets/kjv2.jpg', '/assets/kjv3.jpg'],
  description: 'Tranlated out of the original tongues,and with the former tranlations.The King James Version (KJV) Bible is a classic English translation of the Holy Scriptures, widely respected for its poetic style and accuracy.',
  usage: 'Read daily for personal devotion, study, or sharing spiritual truth. Use with prayer and reflection.',
  benefits: [
    'Guides daily life – provides moral and spiritual instruction.',
    'Strengthens faith – builds trust in God’s promises.',
    'Teaches truth – the foundation of biblical doctrine.',
    'Offers comfort – brings peace in times of trouble.',
    'Improves character – transforms the heart and mind.',
    'Inspires devotion – encourages prayer and meditation.',
    'Unifies believers – trusted translation among much churches.',
    'Equips for evangelism – clear, direct message of salvation.'
  ]
},   
{
  id: '5',
  name: 'Stevia Leaf (sweetning herb)',
  slug: 'natural-sweetener',
  price: 379,
  category: 'herbs',
  images: ['/assets/stevia1.jpg', '/assets/stevia2.jpg', '/assets/stevia3.jpg'],
  description: 'Stevia is a plant-based natural sweetener extracted from the leaves of *Stevia rebaudiana*. Trusted by herbalists for its ability to sweeten without raising blood sugar, and packed with health benefits.',
  usage: 'Use dried leaves or powder to sweeten tea, porridge, or smoothies. Start with a small pinch as it is intensely sweet. Ideal for diabetics and weight watchers.',
  benefits: [
    'Zero calories – ideal for weight management and sugar-free diets.',
    'Diabetic-safe – does not spike blood glucose levels.',
    'Improves pancreatic function – supports insulin sensitivity.',
    'Prevents tooth decay – does not feed oral bacteria.',
    'Supports heart health – may reduce blood pressure.',
    'Rich in antioxidants – helps fight free radicals.',
    'Reduces sugar cravings – naturally satisfies sweet tooth.',
    'May help lower cholesterol – supports cardiovascular health.',
    'Alkalizes the body – supports pH balance.',
    'Good for children – safe, natural sugar alternative.'
  ]
},

{
  id: '6',
  name: 'Fenugreek Powder(herbs)',
  slug: 'fenugreek-powder',
  price: 450,
  category: 'herbs',
  images: ['/assets/fenpowder1.jpg', '/assets/fenpowder2.jpg', '/assets/fenpowder3.jpg'],
  description: 'Fenugreek powder is made by grinding dried fenugreek seeds.',
  usage: 'Add 1 tsp to warm water, smoothies, or use in cooking.',
  benefits: [
    'Boosts milk production – helpful for lactating mothers.',
    'Lowers blood sugar – improves insulin response.',
    'Reduces inflammation – soothes skin and joints.',
    'Enhances digestion – rich in fiber.',
    'Balances hormones – eases menstrual issues.'
  ]
},
{
  id: '7',
  name: 'Fenugreek Seeds (herbs)',
  slug: 'fenugreek-seeds',
  price: 400,
  category: 'herbs',
 images: ['/assets/fenugrik.jpg', '/assets/fenugrik2.jpg', '/assets/fenugrik3.jpg'],
  description: 'Fenugreek seeds are small, golden seeds with powerful health properties.',
  usage: 'Soak overnight and drink water, or grind and use in meals.',
  benefits: [
    'Controls diabetes – lowers blood glucose.',
    'Improves libido – supports testosterone levels.',
    'Reduces appetite – supports weight loss.',
    'Relieves menstrual cramps – natural pain reliever.',
    'Enhances hair growth – nourishes scalp.'
  ]
},


  
{
  id: '8',
  name: 'Eucalyptus Oil (oils)',
  slug: 'eucalyptus-oil',
  price: 700,
  category: 'oils',
  images: ['/assets/euca1.jpg', '/assets/euca2.jpg', '/assets/euca3.jpg'],
  description: 'Eucalyptus oil is a powerful essential oil known for its cooling, menthol-like aroma.',
  usage: 'Inhale in steam, diffuse in room, or dilute for massage.',
  benefits: [
    'Clears sinuses – relieves nasal congestion.',
    'Soothes sore muscles – anti-inflammatory.',
    'Freshens air – natural deodorizer.',
    'Fights cold/flu – supports respiratory health.',
    'Kills germs – natural disinfectant.'
  ]
},
{
  id: '14',
  name: 'Neem Oil (oils)',
  slug: 'neem-oil',
  price: 700,
  category: 'oils',
  images: ['/assets/neem1.jpg', '/assets/neem2.jpg', '/assets/neem3.jpg'],
  description: 'Neem oil is extracted from neem seeds and known for its medicinal uses.',
  usage: 'Apply diluted to skin or scalp. Avoid eye contact.',
  benefits: [
    'Treats acne – antibacterial properties.',
    'Repels insects – natural pest control.',
    'Fights fungal infections – anti-fungal effect.',
    'Soothes eczema – calms skin irritation.',
    'Promotes scalp health – reduces dandruff.'
  ]
},
{
  id: '15',
  name: 'Castor Oil (oils)',
  slug: 'castor-oil',
  price: 700,
  category: 'oils',
  images: ['/assets/castor1.jpg', '/assets/castor2.jpg', '/assets/castor3.jpg'],
  description: 'Castor oil is a thick, nourishing oil derived from castor beans.',
  usage: 'Use for scalp massage, eyelashes, or as natural laxative (oral with caution).',
  benefits: [
    'Promotes hair growth – stimulates roots.',
    'Thickens eyelashes – natural enhancement.',
    'Relieves constipation – gentle laxative.',
    'Heals dry skin – intense moisturizer.',
    'Reduces joint pain – anti-inflammatory.'
  ]
},
{
  id: '17',
  name: 'Peppermint oil (oils)',
  slug: 'peppermint-oil',
  price: 700,
  category: 'herbs',
  images: ['/assets/mint1.jpg', '/assets/mint2.jpg','/assets/mint3.jpg'],
  description: 'Peppermint is a cooling herb used for digestion and freshness.',
  usage: 'Brew as tea or add to meals and smoothies.',
  benefits: [
    'Eases bloating – calms the digestive tract.',
    'Relieves headache – cooling menthol effect.',
    'Freshens breath – kills odor-causing bacteria.',
    'Boosts focus – stimulates brain function.',
    'Clears sinuses – natural decongestant.'
  ]
},
{
  id: '18',
  name: 'Moringa Seeds (herbs)',
  slug: 'moringa-seeds',
  price: 250,
  category: 'herbs',
  images: ['/assets/nseed1.jpg', '/assets/nseed2.jpg', '/assets/nseed3.jpg'],
  description: 'Moringa seeds are nutrient-dense and packed with antioxidants.',
  usage: 'Chew raw, or crush and mix with water or juice.',
  benefits: [
    'Lowers cholesterol – supports heart health.',
    'Detoxifies body – purifies blood and liver.',
    'Controls blood sugar – aids diabetes management.',
    'Improves skin health – rich in vitamins.',
    'Boosts energy – revitalizes body.'
  ]
},



{
  id: '19',
  name: 'Dandelion Powder (herbs)',
  slug: 'dandelion-powder',
  price: 350,
  category: 'herbs',
  images: ['/assets/dandelion1.jpg', '/assets/dandelion2.jpg', '/assets/dandelion3.jpg'],
  description: 'Dandelion powder is made from dried root/leaves with detox properties.',
  usage: 'Mix in teas, smoothies, or sprinkle over food.',
  benefits: [
    'Supports liver detox – cleanses naturally.',
    'Improves digestion – stimulates bile flow.',
    'Rich in vitamins – especially A, C, K.',
    'Reduces water retention – acts as diuretic.',
    'Fights inflammation – calms tissues.'
  ]
},
{
  id: '20',
  name: 'Ginger Powder (herbs)',
  slug: 'ginger-powder',
  price: 250,
  category: 'herbs',
  images: ['/assets/ginger1.jpg', '/assets/ginger2.jpg', '/assets/ginger3.jpg'],
  description: 'Ginger powder is made from dried ginger root and is used for flavor and healing.',
  usage: 'Add to teas, soups, or food. Start with 1/2 tsp daily.',
  benefits: [
    'Reduces nausea – especially motion sickness.',
    'Eases inflammation – helps joint pain.',
    'Boosts immunity – antimicrobial properties.',
    'Improves digestion – calms stomach lining.',
    'Lowers blood sugar – supports metabolism.'
  ]
},
{
  id: '21',
  name: 'Hibiscus Powder  (herbs)',
  slug: 'hibiscus-powder',
  price: 300,
  category: 'herbs',
  images: ['/assets/hibiscus1.jpg', '/assets/hibiscus2.jpg', '/assets/hibiscus3.jpg'],
  description: 'Hibiscus powder is made from dried petals of hibiscus flowers.',
  usage: 'Steep in hot water for tea or mix in drinks.',
  benefits: [
    'Lowers blood pressure – heart-protective.',
    'Improves skin glow – rich in vitamin C.',
    'Supports liver – detoxifying effects.',
    'Boosts immunity – antioxidants-rich.',
    'Aids digestion – soothes gut lining.'
  ]
},
{
  id: '22',
  name: 'Lemon grass (herbs)',
  slug: 'lemongrass',
  price: 250,
  category: 'herbs',
  images: ['/assets/lemon1.jpg', '/assets/lemon2.jpg', '/assets/lemon3.jpg'],
  description: 'Lemongrass is a fragrant herb used in teas and medicine.',
  usage: 'Brew fresh/dried leaves in tea or add to food.',
  benefits: [
    'Reduces inflammation – calms the body.',
    'Supports digestion – relieves bloating.',
    'Fights infections – antimicrobial action.',
    'Relieves anxiety – calming aroma.',
    'Detoxes kidneys – acts as diuretic.'
  ]
},
{
  id: '23',
  name: 'Black Castor Oil (oils)',
  slug: 'black-castor',
  price: 800,
  category: 'oils',
  images: ['/assets/blackcastor1.jpg', '/assets/blackcastor2.jpg', '/assets/blackcastor3.jpg'],
  description: 'Black castor oil is made from roasted castor beans and is thicker than regular castor oil.',
  usage: 'Apply to scalp or mix in hair masks for strength.',
  benefits: [
    'cancers, arthritis.',
    'Stimulates hair growth – deeply nourishing.',
    'Thickens eyebrows – natural volume booster.',
    'Treats split ends – restores hair structure.',
    'Soothes scalp – antifungal properties.',
    'Seals moisture – hydrates hair strands.'
  ]
},
{
  id: '24',
  name: 'Himalayan Salt (herbs)',
  slug: 'himalayan-salt',
  price: 300,
  category: 'herbs',
  images: ['/assets/himalayan1.jpg','/assets/himalayan2.jpg', '/assets/himalayan3.jpg'],
  description: 'Himalayan salt is pink rock salt rich in minerals.',
  usage: 'Use as table salt or add to bath water for detox.',
  benefits: [
    'Balances pH – supports metabolism.',
    'Improves hydration – balances electrolytes.',
    'Relaxes muscles – rich in magnesium.',
    'Detoxifies skin – used in salt scrubs.',
    'Enhances flavor – mineral-rich seasoning.'
  ]
},
{
  id: '25',
  name: 'Stinging Nettle (herbs)',
  slug: 'stinging-nettle',
  price: 280,
  category: 'herbs',
  images: ['/assets/nettle1.jpg', '/assets/nettle2.jpg', '/assets/nettle3.jpg'],
  description: 'Stinging nettle is a leafy herb used for joint health and blood building.',
  usage: 'Steep in tea or use powdered in smoothies or capsules.',
  benefits: [
    'Builds blood – rich in iron and chlorophyll.',
    'Eases joint pain – natural anti-inflammatory.',
    'Supports urinary health – gentle diuretic.',
    'Boosts energy – replenishes nutrients.',
    'Balances hormones – helps with PMS.'
  ]
},


  {
  id: '26',
  name: 'Pumpkin Seeds (herbs)',
  slug: 'pumpkin-seeds',
  price: 480,
  category: 'herbs',
  images: ['/assets/pumpseed1.jpg', '/assets/pumpseed2.jpg', '/assets/pumpseed3.jpg'],
  description: 'Pumpkin seeds are nutrient-rich seeds packed with protein, healthy fats, and essential minerals.',
  usage: 'Eat raw, roasted, or add to smoothies, salads, and cereals.',
  benefits: [
    'Supports prostate health – rich in zinc.',
    'Improves sleep – contains tryptophan and magnesium.',
    'Boosts heart health – loaded with healthy fats.',
    'Enhances immunity – high in antioxidants.',
    'Regulates blood sugar – supports insulin balance.'
  ]
},

{
  id: '27',
  name: 'Crystals(oils)',
  slug: 'eucalyptus-crystals',
  price: 290,
  category: 'oils',
  images: ['/assets/crystals1.jpg','/assets/crystals2.jpg','/assets/crystals3.jpg'],
  description: 'Eucalyptus crystals are concentrated menthol and eucalyptus oil compounds used for inhalation therapy.',
  usage: 'Dissolve a few crystals in hot water and inhale the steam for respiratory relief.',
  benefits: [
    'Clears nasal passages – powerful decongestant.',
    'Relieves cold and flu symptoms – opens airways.',
    'Soothes sinus headaches – menthol cooling effect.',
    'Fights bacteria – antimicrobial steam therapy.',
    'Boosts breathing – ideal for asthma and bronchitis.'
  ]
},

{
  id: '28',
  name: 'M-Dent Herbal Toothpaste',
  slug: 'm-dent-herbal-toothpaste',
  price: 350,
  category: 'herbs',
  images: ['/assets/dent1.jpg', '/assets/dent2.jpg', '/assets/dent3.jpg'],
  description: 'M-Dent is a natural herbal toothpaste formulated with plant-based ingredients to promote oral hygiene.',
  usage: 'Brush teeth twice daily using a pea-sized amount. Do not swallow.',
  benefits: [
    'Fights cavities – herbal antibacterial formula.',
    'Strengthens gums – improves oral health.',
    'Whitens teeth – gently removes stains.',
    'Freshens breath – contains natural mint.',
    'Reduces sensitivity – soothes nerve endings.'
  ]
},
{
  id: '29',
  name: 'Senna Leaf Powder (herb)',
  slug: 'senna-leaf-powder',
  price: 250,
  category: 'herbs',
  images: ['/assets/sena1.jpg', '/assets/sena2.jpg', '/assets/sena3.jpg'],
  description: 'Senna leaf powder is a natural herbal laxative made from dried and ground Senna leaves.',
  usage: 'Mix 1/2 tsp with warm water or herbal tea before bedtime. Use occasionally.',
  benefits: [
    'Relieves constipation – stimulates bowel movements.',
    'Cleanses the colon – supports detox programs.',
    'Reduces bloating – eliminates waste build-up.',
    'Aids weight loss – supports temporary cleansing.',
    'Promotes digestive health – encourages regularity.'
  ]
},

{
  id: '30',
  name: 'Activated Charcoal',
  slug: 'activated-charcoal',
  price: 289,
  category: 'herbs',
  images: ['/assets/active1.jpg', '/assets/active2.jpg', '/assets/active3.jpg'],
  description: 'Activated charcoal is a fine, odorless black powder made from natural substances like coconut shells and wood, processed to have high absorbency for detoxification purposes.',
  usage: 'Mix 1/2 tsp in water, juice, or smoothies. Can also be used externally for skin or teeth care. Use sparingly and not with medication.',
  benefits: [
    'Detoxifies the body – binds and flushes out toxins.',
    'Relieves gas and bloating – absorbs intestinal gases.',
    'Whitens teeth – removes surface stains naturally.',
    'Treats poisoning – used in emergency toxin absorption.',
    'Supports kidney function – filters toxins from blood.',
    'Clears skin – draws out impurities from pores.',
    'Freshens breath – neutralizes oral toxins.',
    'Aids hangover recovery – absorbs leftover alcohol toxins.',
    'Balances pH – reduces acidity in the body.',
    'Purifies water – removes chemicals and heavy metals.'
  ]
},
{
  id: '31',
  name: 'Pain Be Gone (Herbal Balm)',
  slug: 'pain-be-gone-balm',
  price: 700,
  category: 'oils',
  images: ['/assets/begone1.jpg', '/assets/begone2.jpg', '/assets/begone3.jpg'],
  description: 'Pain Be Gone is a natural herbal balm formulated with essential oils and medicinal herbs to relieve pain, inflammation, and muscle tension.',
  usage: 'Apply a small amount to the affected area and massage gently. Use 2–3 times daily or as needed. For external use only.',
  benefits: [
    'Relieves joint and muscle pain – anti-inflammatory action.',
    'Reduces swelling – calms inflamed tissues.',
    'Eases back and neck stiffness – penetrates deeply.',
    'Soothes arthritis discomfort – herbal support for joints.',
    'Relieves headaches – apply to temples and neck.',
    'Stimulates blood flow – promotes faster healing.',
    'Relaxes tired muscles – ideal after physical activity.',
    'Clears congestion – apply to chest for respiratory relief.',
    'Soothes sprains and strains – cooling relief.',
    'Natural alternative to synthetic painkillers – no side effects.'
  ]
},


];



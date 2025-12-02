import { Region } from './GameContext';

export const GAME_REGIONS: Region[] = [
  {
    id: 1,
    name: 'jungle',
    displayName: 'Jungle Village',
    description: 'Tropical paradise with exotic fruits',
    theme: '🌴',
    color: '#10b981',
    bgGradient: 'from-green-400 via-emerald-500 to-teal-600',
    fruits: [
      {
        id: 'mango',
        name: 'Mango',
        emoji: '🥭',
        region: 'jungle',
        position: { x: 20, y: 30 },
        quiz: {
          type: 'multiple-choice',
          question: 'What color is a ripe mango?',
          answer: 'Yellow or Orange',
          options: ['Purple', 'Blue', 'Yellow or Orange', 'Black'],
          hint: 'Think of the sun!'
        },
        funFact: 'Mangoes are called the "King of Fruits" and come in over 1,000 different types!'
      },
      {
        id: 'banana',
        name: 'Banana',
        emoji: '🍌',
        region: 'jungle',
        position: { x: 65, y: 25 },
        quiz: {
          type: 'jumbled-word',
          question: 'Unscramble this: YOWLLE',
          answer: 'YELLOW',
          jumbled: 'YOWLLE',
          hint: 'What color is a banana?'
        },
        funFact: 'Bananas are actually berries! They grow pointing upward, not down.'
      },
      {
        id: 'pineapple',
        name: 'Pineapple',
        emoji: '🍍',
        region: 'jungle',
        position: { x: 40, y: 60 },
        quiz: {
          type: 'multiple-choice',
          question: 'How long does it take for a pineapple to grow?',
          answer: '2-3 years',
          options: ['2 weeks', '2 months', '2-3 years', '10 years'],
          hint: 'Pineapples need patience!'
        },
        funFact: 'One pineapple plant produces only one pineapple per year, and it takes 2-3 years to grow!'
      },
      {
        id: 'coconut',
        name: 'Coconut',
        emoji: '🥥',
        region: 'jungle',
        position: { x: 75, y: 55 },
        quiz: {
          type: 'text-input',
          question: 'Coconuts can float on _____? (Type: water, land, or air)',
          answer: 'water',
          hint: 'Coconuts travel across the ocean!'
        },
        funFact: 'Coconuts can float on water for months and travel across oceans to grow on new islands!'
      },
      {
        id: 'papaya',
        name: 'Papaya',
        emoji: '🫐',
        region: 'jungle',
        position: { x: 30, y: 75 },
        quiz: {
          type: 'multiple-choice',
          question: 'What shape are the seeds inside a papaya?',
          answer: 'Round and black',
          options: ['Square and white', 'Round and black', 'Star-shaped', 'Triangle'],
          hint: 'They look like tiny black pearls!'
        },
        funFact: 'Papaya seeds are edible and taste peppery! The fruit helps your tummy feel better.'
      },
      {
        id: 'passion-fruit',
        name: 'Passion Fruit',
        emoji: '🟣',
        region: 'jungle',
        position: { x: 55, y: 70 },
        quiz: {
          type: 'jumbled-word',
          question: 'Unscramble: PUPLRE',
          answer: 'PURPLE',
          jumbled: 'PUPLRE',
          hint: 'The color of passion fruit skin!'
        },
        funFact: 'Passion fruit is called "passion" because it grows on beautiful flowers that reminded explorers of a crown!'
      },
      {
        id: 'guava',
        name: 'Guava',
        emoji: '🍐',
        region: 'jungle',
        position: { x: 15, y: 50 },
        quiz: {
          type: 'multiple-choice',
          question: 'Guava has more Vitamin C than which fruit?',
          answer: 'Orange',
          options: ['Orange', 'Banana', 'Grape', 'Apple'],
          hint: 'A citrus fruit!'
        },
        funFact: 'Guavas have 4 times more Vitamin C than oranges! They help keep you healthy and strong.'
      },
      {
        id: 'dragon-fruit',
        name: 'Dragon Fruit',
        emoji: '🐉',
        region: 'jungle',
        position: { x: 80, y: 40 },
        quiz: {
          type: 'multiple-choice',
          question: 'What does dragon fruit grow on?',
          answer: 'A cactus',
          options: ['A tree', 'A cactus', 'Underground', 'A bush'],
          hint: 'It grows on something prickly!'
        },
        funFact: 'Dragon fruit grows on a special cactus that only blooms at night!'
      },
      {
        id: 'lychee',
        name: 'Lychee',
        emoji: '🍒',
        region: 'jungle',
        position: { x: 45, y: 40 },
        quiz: {
          type: 'text-input',
          question: 'What color is lychee inside? (Type: white, red, or blue)',
          answer: 'white',
          hint: 'Like snow or clouds!'
        },
        funFact: 'Lychees have a bumpy red shell outside but are white and sweet inside, like a grape!'
      },
      {
        id: 'starfruit',
        name: 'Star Fruit',
        emoji: '⭐',
        region: 'jungle',
        position: { x: 25, y: 15 },
        quiz: {
          type: 'multiple-choice',
          question: 'What shape do you see when you slice a star fruit?',
          answer: 'A star',
          options: ['A circle', 'A square', 'A star', 'A heart'],
          hint: 'It\'s in the name!'
        },
        funFact: 'When you slice a star fruit, each piece looks like a perfect star! That\'s why it\'s called star fruit!'
      },
      {
        id: 'avocado',
        name: 'Avocado',
        emoji: '🥑',
        region: 'jungle',
        position: { x: 60, y: 80 },
        quiz: {
          type: 'jumbled-word',
          question: 'Unscramble: NEEGR',
          answer: 'GREEN',
          jumbled: 'NEEGR',
          hint: 'The color of avocado!'
        },
        funFact: 'Avocados are actually a fruit, not a vegetable! They have healthy fats that help your brain grow.'
      },
      {
        id: 'jackfruit',
        name: 'Jackfruit',
        emoji: '🟡',
        region: 'jungle',
        position: { x: 70, y: 15 },
        quiz: {
          type: 'multiple-choice',
          question: 'Jackfruit is the world\'s largest _____ fruit?',
          answer: 'Tree',
          options: ['Tree', 'Underground', 'Bush', 'Vine'],
          hint: 'It grows up high!'
        },
        funFact: 'Jackfruit can weigh up to 80 pounds - that\'s heavier than most kids! It\'s the biggest tree fruit in the world.'
      },
      {
        id: 'kiwi',
        name: 'Kiwi',
        emoji: '🥝',
        region: 'jungle',
        position: { x: 35, y: 25 },
        quiz: {
          type: 'text-input',
          question: 'What color is the inside of a kiwi? (Type: green, red, or yellow)',
          answer: 'green',
          hint: 'Like grass and leaves!'
        },
        funFact: 'Kiwis are named after New Zealand\'s national bird! You can eat the fuzzy skin too - it\'s healthy!'
      }
    ]
  },
  {
    id: 2,
    name: 'desert',
    displayName: 'Desert Ruins',
    description: 'Ancient sands hiding sweet treasures',
    theme: '🏜️',
    color: '#f59e0b',
    bgGradient: 'from-yellow-400 via-amber-500 to-orange-600',
    fruits: [
      {
        id: 'date',
        name: 'Date',
        emoji: '🟤',
        region: 'desert',
        position: { x: 30, y: 40 },
        quiz: {
          type: 'multiple-choice',
          question: 'What tree do dates grow on?',
          answer: 'Palm tree',
          options: ['Oak tree', 'Pine tree', 'Palm tree', 'Apple tree'],
          hint: 'Think of desert trees!'
        },
        funFact: 'Dates have been grown for over 6,000 years! They give you lots of energy and taste like candy.'
      },
      {
        id: 'fig',
        name: 'Fig',
        emoji: '🫐',
        region: 'desert',
        position: { x: 65, y: 35 },
        quiz: {
          type: 'jumbled-word',
          question: 'Unscramble: TEEWS',
          answer: 'SWEET',
          jumbled: 'TEEWS',
          hint: 'How figs taste!'
        },
        funFact: 'Figs are one of the oldest fruits! Ancient Olympic athletes ate figs to run faster and jump higher.'
      },
      {
        id: 'pomegranate',
        name: 'Pomegranate',
        emoji: '🔴',
        region: 'desert',
        position: { x: 50, y: 60 },
        quiz: {
          type: 'multiple-choice',
          question: 'How many seeds can be inside one pomegranate?',
          answer: 'About 600',
          options: ['About 10', 'About 50', 'About 600', 'About 5'],
          hint: 'Lots and lots!'
        },
        funFact: 'One pomegranate can have over 600 tiny, juicy seeds inside! Each seed is full of healthy stuff.'
      },
      {
        id: 'apricot',
        name: 'Apricot',
        emoji: '🍑',
        region: 'desert',
        position: { x: 75, y: 50 },
        quiz: {
          type: 'text-input',
          question: 'What color is an apricot? (Type: orange, blue, or green)',
          answer: 'orange',
          hint: 'Like a sunset!'
        },
        funFact: 'Apricots are related to peaches! They\'re smaller and grow best in warm, sunny places.'
      },
      {
        id: 'persimmon',
        name: 'Persimmon',
        emoji: '🟠',
        region: 'desert',
        position: { x: 20, y: 70 },
        quiz: {
          type: 'multiple-choice',
          question: 'When should you eat a persimmon?',
          answer: 'When it\'s soft and ripe',
          options: ['When it\'s hard', 'When it\'s soft and ripe', 'When it\'s green', 'Before it grows'],
          hint: 'Wait until it\'s ready!'
        },
        funFact: 'Persimmons taste best when they\'re super soft and sweet, like honey!'
      },
      {
        id: 'olive',
        name: 'Olive',
        emoji: '🫒',
        region: 'desert',
        position: { x: 40, y: 25 },
        quiz: {
          type: 'jumbled-word',
          question: 'Unscramble: RETE',
          answer: 'TREE',
          jumbled: 'ERET',
          hint: 'Where olives grow!'
        },
        funFact: 'Olive trees can live for over 2,000 years! Some olive trees are older than pyramids.'
      },
      {
        id: 'cactus-pear',
        name: 'Cactus Pear',
        emoji: '🌵',
        region: 'desert',
        position: { x: 80, y: 65 },
        quiz: {
          type: 'multiple-choice',
          question: 'What do you need to remove before eating a cactus pear?',
          answer: 'Tiny spines',
          options: ['Seeds', 'Tiny spines', 'Leaves', 'Roots'],
          hint: 'They can poke you!'
        },
        funFact: 'Cactus pears grow on prickly pear cacti! They\'re juicy and pink inside, but watch out for tiny spines on the outside.'
      },
      {
        id: 'carob',
        name: 'Carob',
        emoji: '🟫',
        region: 'desert',
        position: { x: 55, y: 45 },
        quiz: {
          type: 'text-input',
          question: 'Carob tastes like _____? (Type: chocolate, mint, or lemon)',
          answer: 'chocolate',
          hint: 'A sweet brown treat!'
        },
        funFact: 'Carob tastes like chocolate! It comes from long pods that grow on carob trees in the desert.'
      },
      {
        id: 'tamarind',
        name: 'Tamarind',
        emoji: '🫘',
        region: 'desert',
        position: { x: 25, y: 55 },
        quiz: {
          type: 'multiple-choice',
          question: 'Tamarind is used to make candy in many countries. What does it taste like?',
          answer: 'Sweet and sour',
          options: ['Only sweet', 'Sweet and sour', 'Only sour', 'Spicy'],
          hint: 'Two tastes together!'
        },
        funFact: 'Tamarind is both sweet AND sour! It grows in brown pods and is used to make yummy candy and drinks.'
      },
      {
        id: 'quince',
        name: 'Quince',
        emoji: '🍐',
        region: 'desert',
        position: { x: 70, y: 20 },
        quiz: {
          type: 'multiple-choice',
          question: 'Quince must be _____ before you eat it?',
          answer: 'Cooked',
          options: ['Frozen', 'Cooked', 'Painted', 'Hidden'],
          hint: 'Make it warm!'
        },
        funFact: 'You can\'t eat quince raw - it\'s too hard! But when you cook it, it becomes sweet and yummy.'
      },
      {
        id: 'jujube',
        name: 'Jujube',
        emoji: '🔴',
        region: 'desert',
        position: { x: 15, y: 25 },
        quiz: {
          type: 'jumbled-word',
          question: 'Unscramble: EADT',
          answer: 'DATE',
          jumbled: 'EADT',
          hint: 'A fruit that looks similar!'
        },
        funFact: 'Jujube looks like a small date! It\'s crunchy like an apple when fresh, and chewy like candy when dried.'
      },
      {
        id: 'medjool',
        name: 'Medjool Date',
        emoji: '🟫',
        region: 'desert',
        position: { x: 60, y: 75 },
        quiz: {
          type: 'text-input',
          question: 'Medjool dates are extra _____? (Type: big, tiny, or square)',
          answer: 'big',
          hint: 'Bigger than regular dates!'
        },
        funFact: 'Medjool dates are the king of dates! They\'re extra big, extra sweet, and full of natural energy.'
      },
      {
        id: 'almond-fruit',
        name: 'Almond Fruit',
        emoji: '🌰',
        region: 'desert',
        position: { x: 45, y: 80 },
        quiz: {
          type: 'multiple-choice',
          question: 'Almonds grow inside a _____?',
          answer: 'Fuzzy fruit shell',
          options: ['Fuzzy fruit shell', 'Leaf', 'Rock', 'Flower'],
          hint: 'It protects the nut!'
        },
        funFact: 'Almonds grow inside fuzzy green fruits! The fruit splits open to show the almond shell inside.'
      }
    ]
  },
  {
    id: 3,
    name: 'snowy',
    displayName: 'Snowy Mountain',
    description: 'Frozen peaks with cold-loving berries',
    theme: '⛰️',
    color: '#60a5fa',
    bgGradient: 'from-blue-300 via-cyan-400 to-blue-500',
    fruits: [
      {
        id: 'blueberry',
        name: 'Blueberry',
        emoji: '🫐',
        region: 'snowy',
        position: { x: 25, y: 35 },
        quiz: {
          type: 'multiple-choice',
          question: 'What color are blueberries?',
          answer: 'Blue',
          options: ['Red', 'Blue', 'Yellow', 'Green'],
          hint: 'It\'s in the name!'
        },
        funFact: 'Blueberries are one of the only blue foods in nature! They make your brain super smart.'
      },
      {
        id: 'raspberry',
        name: 'Raspberry',
        emoji: '🍇',
        region: 'snowy',
        position: { x: 60, y: 40 },
        quiz: {
          type: 'jumbled-word',
          question: 'Unscramble: ERD',
          answer: 'RED',
          jumbled: 'ERD',
          hint: 'The color of raspberries!'
        },
        funFact: 'Raspberries are made up of lots of tiny round balls called drupelets - about 100 in each berry!'
      },
      {
        id: 'strawberry',
        name: 'Strawberry',
        emoji: '🍓',
        region: 'snowy',
        position: { x: 40, y: 60 },
        quiz: {
          type: 'multiple-choice',
          question: 'Where are strawberry seeds?',
          answer: 'On the outside',
          options: ['On the outside', 'Inside', 'At the top', 'No seeds'],
          hint: 'You can see them!'
        },
        funFact: 'Strawberries are the only fruit with seeds on the OUTSIDE! One strawberry has about 200 tiny seeds.'
      },
      {
        id: 'cranberry',
        name: 'Cranberry',
        emoji: '🔴',
        region: 'snowy',
        position: { x: 70, y: 50 },
        quiz: {
          type: 'text-input',
          question: 'Cranberries grow in _____? (Type: water, trees, or sky)',
          answer: 'water',
          hint: 'They float in bogs!'
        },
        funFact: 'Cranberries grow in water! Farmers flood the fields and the berries float to the top for harvesting.'
      },
      {
        id: 'blackberry',
        name: 'Blackberry',
        emoji: '⚫',
        region: 'snowy',
        position: { x: 30, y: 75 },
        quiz: {
          type: 'multiple-choice',
          question: 'Blackberries grow on prickly _____?',
          answer: 'Bushes',
          options: ['Bushes', 'Trees', 'Vines', 'Flowers'],
          hint: 'Watch out for thorns!'
        },
        funFact: 'Blackberries grow on thorny bushes! Ancient Romans used blackberry juice as hair dye.'
      },
      {
        id: 'elderberry',
        name: 'Elderberry',
        emoji: '🫐',
        region: 'snowy',
        position: { x: 55, y: 70 },
        quiz: {
          type: 'jumbled-word',
          question: 'Unscramble: LPURPE',
          answer: 'PURPLE',
          jumbled: 'LPURPE',
          hint: 'The color of elderberries!'
        },
        funFact: 'Elderberries are tiny purple berries that grow in bunches! They help keep you healthy during winter.'
      },
      {
        id: 'gooseberry',
        name: 'Gooseberry',
        emoji: '🟢',
        region: 'snowy',
        position: { x: 15, y: 50 },
        quiz: {
          type: 'multiple-choice',
          question: 'Gooseberries have _____ on them?',
          answer: 'Stripes',
          options: ['Stripes', 'Dots', 'Stars', 'Squares'],
          hint: 'Lines like a zebra!'
        },
        funFact: 'Gooseberries look like tiny striped balloons! They can be green, red, or yellow.'
      },
      {
        id: 'lingonberry',
        name: 'Lingonberry',
        emoji: '🔴',
        region: 'snowy',
        position: { x: 75, y: 35 },
        quiz: {
          type: 'text-input',
          question: 'Lingonberries love _____ weather? (Type: cold, hot, or rainy)',
          answer: 'cold',
          hint: 'They grow in the snow!'
        },
        funFact: 'Lingonberries love cold weather! They grow in the snowy forests of Sweden and taste tangy and sweet.'
      },
      {
        id: 'cloudberry',
        name: 'Cloudberry',
        emoji: '🟡',
        region: 'snowy',
        position: { x: 45, y: 25 },
        quiz: {
          type: 'multiple-choice',
          question: 'What color do cloudberries turn when ripe?',
          answer: 'Golden orange',
          options: ['Blue', 'Green', 'Golden orange', 'Purple'],
          hint: 'Like a sunset!'
        },
        funFact: 'Cloudberries start red but turn golden orange when ripe! They\'re so rare, they\'re called "Arctic gold."'
      },
      {
        id: 'acai',
        name: 'Acai',
        emoji: '🫐',
        region: 'snowy',
        position: { x: 20, y: 20 },
        quiz: {
          type: 'multiple-choice',
          question: 'Acai berries are super good for _____?',
          answer: 'Your health',
          options: ['Your health', 'Building houses', 'Making toys', 'Playing games'],
          hint: 'They make you strong!'
        },
        funFact: 'Acai berries are called a "superfood" because they\'re packed with vitamins that make you super healthy!'
      },
      {
        id: 'mulberry',
        name: 'Mulberry',
        emoji: '🍇',
        region: 'snowy',
        position: { x: 65, y: 65 },
        quiz: {
          type: 'jumbled-word',
          question: 'Unscramble: KBCAL',
          answer: 'BLACK',
          jumbled: 'KBCAL',
          hint: 'One color mulberries can be!'
        },
        funFact: 'Mulberries can be white, red, or black! Silkworms love eating mulberry leaves to make silk.'
      },
      {
        id: 'cherry',
        name: 'Cherry',
        emoji: '🍒',
        region: 'snowy',
        position: { x: 50, y: 80 },
        quiz: {
          type: 'text-input',
          question: 'How many cherries usually grow together? (Type: two, one, or ten)',
          answer: 'two',
          hint: 'They come in pairs!'
        },
        funFact: 'Cherries usually grow in pairs on the same stem! They\'re like best friends hanging out together.'
      },
      {
        id: 'sloe',
        name: 'Sloe Berry',
        emoji: '🔵',
        region: 'snowy',
        position: { x: 35, y: 45 },
        quiz: {
          type: 'multiple-choice',
          question: 'Sloe berries taste better after _____?',
          answer: 'The first frost',
          options: ['Summer', 'The first frost', 'Spring', 'Never'],
          hint: 'Cold makes them sweeter!'
        },
        funFact: 'Sloe berries taste better after the first frost! The cold weather makes them less sour and sweeter.'
      }
    ]
  },
  {
    id: 4,
    name: 'island',
    displayName: 'Island Harbor',
    description: 'Coastal paradise with citrus delights',
    theme: '🏝️',
    color: '#06b6d4',
    bgGradient: 'from-cyan-300 via-blue-400 to-teal-500',
    fruits: [
      {
        id: 'orange',
        name: 'Orange',
        emoji: '🍊',
        region: 'island',
        position: { x: 30, y: 40 },
        quiz: {
          type: 'multiple-choice',
          question: 'Oranges are full of which vitamin?',
          answer: 'Vitamin C',
          options: ['Vitamin A', 'Vitamin B', 'Vitamin C', 'Vitamin D'],
          hint: 'It helps you stay healthy!'
        },
        funFact: 'One orange gives you all the Vitamin C you need for the whole day! It keeps you from getting sick.'
      },
      {
        id: 'lemon',
        name: 'Lemon',
        emoji: '🍋',
        region: 'island',
        position: { x: 60, y: 35 },
        quiz: {
          type: 'jumbled-word',
          question: 'Unscramble: OSRU',
          answer: 'SOUR',
          jumbled: 'OSRU',
          hint: 'How lemons taste!'
        },
        funFact: 'Lemons are super sour! But they can make water, fish, and desserts taste amazing.'
      },
      {
        id: 'lime',
        name: 'Lime',
        emoji: '🟢',
        region: 'island',
        position: { x: 45, y: 60 },
        quiz: {
          type: 'text-input',
          question: 'What color is a lime? (Type: green, yellow, or red)',
          answer: 'green',
          hint: 'Like grass!'
        },
        funFact: 'Limes are green lemons\' cousins! Sailors used to eat limes on ships to stay healthy during long trips.'
      },
      {
        id: 'grapefruit',
        name: 'Grapefruit',
        emoji: '🍊',
        region: 'island',
        position: { x: 70, y: 50 },
        quiz: {
          type: 'multiple-choice',
          question: 'Why is it called grapefruit?',
          answer: 'They grow in bunches like grapes',
          options: ['It tastes like grapes', 'They grow in bunches like grapes', 'It\'s purple', 'It\'s small'],
          hint: 'Look how they grow!'
        },
        funFact: 'Grapefruits are called that because they grow in clusters like grapes! They\'re big, juicy, and tangy.'
      },
      {
        id: 'tangerine',
        name: 'Tangerine',
        emoji: '🍊',
        region: 'island',
        position: { x: 25, y: 70 },
        quiz: {
          type: 'multiple-choice',
          question: 'Tangerines are easier to _____ than oranges?',
          answer: 'Peel',
          options: ['Peel', 'Cook', 'Plant', 'Hide'],
          hint: 'The skin comes off easily!'
        },
        funFact: 'Tangerines are like baby oranges that are super easy to peel! Perfect for lunch boxes.'
      },
      {
        id: 'mandarin',
        name: 'Mandarin',
        emoji: '🍊',
        region: 'island',
        position: { x: 55, y: 70 },
        quiz: {
          type: 'jumbled-word',
          question: 'Unscramble: LLASM',
          answer: 'SMALL',
          jumbled: 'LLAMS',
          hint: 'Size of mandarins!'
        },
        funFact: 'Mandarins are the sweetest citrus fruits! They\'re small, seedless, and perfect for snacking.'
      },
      {
        id: 'kumquat',
        name: 'Kumquat',
        emoji: '🟠',
        region: 'island',
        position: { x: 15, y: 50 },
        quiz: {
          type: 'multiple-choice',
          question: 'What\'s special about eating kumquats?',
          answer: 'You eat the whole thing, even the peel',
          options: ['You eat the whole thing, even the peel', 'They\'re blue inside', 'They jump', 'They glow'],
          hint: 'Don\'t peel them!'
        },
        funFact: 'Kumquats are tiny citrus fruits you eat WHOLE - skin and all! The skin is sweet and the inside is sour.'
      },
      {
        id: 'blood-orange',
        name: 'Blood Orange',
        emoji: '🔴',
        region: 'island',
        position: { x: 75, y: 35 },
        quiz: {
          type: 'text-input',
          question: 'What color is the inside of a blood orange? (Type: red, blue, or yellow)',
          answer: 'red',
          hint: 'Like the name suggests!'
        },
        funFact: 'Blood oranges are red inside! They get their color from special antioxidants that make them super healthy.'
      },
      {
        id: 'clementine',
        name: 'Clementine',
        emoji: '🍊',
        region: 'island',
        position: { x: 40, y: 25 },
        quiz: {
          type: 'multiple-choice',
          question: 'Clementines have _____ seeds?',
          answer: 'Very few or no',
          options: ['Hundreds', 'Very few or no', 'Exactly 50', 'Green'],
          hint: 'Easy to eat!'
        },
        funFact: 'Clementines are the sweetest! They have almost no seeds, making them perfect for kids.'
      },
      {
        id: 'pomelo',
        name: 'Pomelo',
        emoji: '🟡',
        region: 'island',
        position: { x: 65, y: 65 },
        quiz: {
          type: 'multiple-choice',
          question: 'Pomelo is the _____ citrus fruit?',
          answer: 'Biggest',
          options: ['Smallest', 'Biggest', 'Fastest', 'Loudest'],
          hint: 'It\'s huge!'
        },
        funFact: 'Pomelos are the BIGGEST citrus fruits! They can be as big as a basketball and taste like a sweet grapefruit.'
      },
      {
        id: 'yuzu',
        name: 'Yuzu',
        emoji: '🟡',
        region: 'island',
        position: { x: 20, y: 25 },
        quiz: {
          type: 'jumbled-word',
          question: 'Unscramble: PAJNA',
          answer: 'JAPAN',
          jumbled: 'PAJNA',
          hint: 'Country where yuzu is popular!'
        },
        funFact: 'Yuzu comes from Japan and smells amazing! It\'s used in food, candy, and even bath time!'
      },
      {
        id: 'key-lime',
        name: 'Key Lime',
        emoji: '🟢',
        region: 'island',
        position: { x: 50, y: 45 },
        quiz: {
          type: 'text-input',
          question: 'Key limes are _____ than regular limes? (Type: smaller, bigger, or same)',
          answer: 'smaller',
          hint: 'Tiny limes!'
        },
        funFact: 'Key limes are tiny but mighty! They make the famous Key Lime Pie taste super delicious.'
      }
    ]
  }
];

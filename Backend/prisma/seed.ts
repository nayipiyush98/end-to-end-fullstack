import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../src/generated/prisma/client.js'
import 'dotenv/config'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Clearing old data...')
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  console.log('Seeding 10 Categories...')
  const categories = [
    { name: 'Dairy, Bread & Eggs', slug: 'dairy-bread-eggs' }, // 1
    { name: 'Fruits & Vegetables', slug: 'fruits-vegetables' }, // 2
    { name: 'Snacks & Munchies', slug: 'snacks-munchies' }, // 3
    { name: 'Cold Drinks & Juices', slug: 'cold-drinks-juices' }, // 4
    { name: 'Instant Food & Pasta', slug: 'instant-food-pasta' }, // 5
    { name: 'Tea, Coffee & Health Drinks', slug: 'tea-coffee-health' }, // 6
    { name: 'Bakery & Biscuits', slug: 'bakery-biscuits' }, // 7
    { name: 'Sweet Tooth', slug: 'sweet-tooth' }, // 8
    { name: 'Atta, Rice & Dal', slug: 'atta-rice-dal' }, // 9
    { name: 'Personal Care', slug: 'personal-care' }, // 10
  ]

  const createdCategories = await Promise.all(
    categories.map((cat) => prisma.category.create({ data: cat }))
  )

  console.log('Seeding 100 Realistic Blinkit Products...')
  
  // Real products grouped by the 10 categories above (10 products per category)
  const productData = [
    // 1. Dairy, Bread & Eggs
    ...[
      { n: 'Amul Taaza Toned Fresh Milk', p: 27 }, { n: 'Amul Gold Full Cream Milk', p: 33 }, { n: 'Amul Salted Butter (100g)', p: 58 },
      { n: 'Britannia Daily Fresh White Bread', p: 40 }, { n: 'Harvest Gold Brown Bread', p: 50 }, { n: 'Farm Fresh White Eggs (6 pcs)', p: 45 },
      { n: 'Amul Masti Spiced Buttermilk', p: 15 }, { n: 'Mother Dairy Classic Paneer', p: 85 }, { n: 'Epigamia Greek Yogurt (Blueberry)', p: 70 },
      { n: 'Amul Cheese Slices (100g)', p: 75 }
    ].map(item => ({ ...item, cat: 0 })),

    // 2. Fruits & Vegetables
    ...[
      { n: 'Fresh Onion (1 kg)', p: 35 }, { n: 'Fresh Potato (1 kg)', p: 30 }, { n: 'Hybrid Tomato (500 g)', p: 25 },
      { n: 'Robusta Banana (6 pcs)', p: 40 }, { n: 'Kashmir Apples (4 pcs)', p: 120 }, { n: 'Fresh Coriander (100 g)', p: 15 },
      { n: 'Green Chillies (100 g)', p: 12 }, { n: 'Lemon (250 g)', p: 40 }, { n: 'Fresh Garlic (200 g)', p: 55 },
      { n: 'Carrot (500 g)', p: 35 }
    ].map(item => ({ ...item, cat: 1 })),

    // 3. Snacks & Munchies
    ...[
      { n: "Lay's India's Magic Masala", p: 20 }, { n: 'Kurkure Masala Munch', p: 20 }, { n: 'Haldiram Bhujia Sev', p: 55 },
      { n: 'Bingo Mad Angles', p: 20 }, { n: 'Doritos Nacho Cheese', p: 30 }, { n: 'Pringles Original', p: 110 },
      { n: 'Haldiram Moong Dal', p: 55 }, { n: 'Too Yumm! Veggie Stix', p: 20 }, { n: 'Yellow Diamond Rings', p: 10 },
      { n: 'Cheetos Cheese Puffs', p: 20 }
    ].map(item => ({ ...item, cat: 2 })),

    // 4. Cold Drinks & Juices
    ...[
      { n: 'Coca-Cola (750 ml)', p: 40 }, { n: 'Thumbs Up (750 ml)', p: 40 }, { n: 'Sprite (750 ml)', p: 40 },
      { n: 'Red Bull Energy Drink', p: 125 }, { n: 'Real Fruit Power Mixed Fruit', p: 110 }, { n: 'Paper Boat Aamras', p: 35 },
      { n: 'Tropicana 100% Orange Juice', p: 120 }, { n: 'Gatorade Blue Bolt', p: 50 }, { n: 'Kinley Club Soda', p: 20 },
      { n: 'Bisleri Mineral Water (1 L)', p: 20 }
    ].map(item => ({ ...item, cat: 3 })),

    // 5. Instant Food & Pasta
    ...[
      { n: 'Maggi 2-Minute Noodles', p: 14 }, { n: 'Sunfeast Yippee Magic Masala', p: 14 }, { n: 'Knorr Classic Tomato Soup', p: 55 },
      { n: 'Bambino Roasted Vermicelli', p: 45 }, { n: "Ching's Secret Schezwan Chutney", p: 85 }, { n: 'Smith & Jones Pasta Masala', p: 10 },
      { n: 'Saffola Masala Oats', p: 180 }, { n: "Kellogg's Corn Flakes", p: 190 }, { n: 'Kissan Fresh Tomato Ketchup', p: 130 },
      { n: "Veeba Eggless Mayonnaise", p: 115 }
    ].map(item => ({ ...item, cat: 4 })),

    // 6. Tea, Coffee & Health Drinks
    ...[
      { n: 'Brooke Bond Red Label Tea', p: 135 }, { n: 'Tata Tea Premium', p: 145 }, { n: 'Taj Mahal Tea', p: 175 },
      { n: 'Nescafe Classic Instant Coffee', p: 165 }, { n: 'Bru Gold Instant Coffee', p: 155 }, { n: 'Bournvita Health Drink', p: 220 },
      { n: 'Horlicks Classic Malt', p: 245 }, { n: 'Complan Royale Chocolate', p: 260 }, { n: 'Lipton Green Tea (25 bags)', p: 150 },
      { n: 'Society Tea', p: 140 }
    ].map(item => ({ ...item, cat: 5 })),

    // 7. Bakery & Biscuits
    ...[
      { n: 'Parle-G Gold Biscuits', p: 25 }, { n: 'Britannia Good Day Cashew', p: 30 }, { n: 'Oreo Vanilla Creme', p: 35 },
      { n: 'Sunfeast Dark Fantasy Choco Fills', p: 40 }, { n: 'Britannia Marie Gold', p: 15 }, { n: 'Britannia Little Hearts', p: 20 },
      { n: 'Parle Monaco Salted', p: 15 }, { n: 'Britannia NutriChoice Digestive', p: 50 }, { n: 'Unibic Choco Chip Cookies', p: 60 },
      { n: 'Hide & Seek Chocolate Chip', p: 30 }
    ].map(item => ({ ...item, cat: 6 })),

    // 8. Sweet Tooth
    ...[
      { n: 'Cadbury Dairy Milk Silk', p: 80 }, { n: 'Snickers Peanut Chocolate', p: 45 }, { n: 'Ferrero Rocher (4 pcs)', p: 149 },
      { n: 'KitKat Dessert Delight', p: 55 }, { n: 'Amul Dark Chocolate', p: 110 }, { n: 'Kinder Joy (For Boys)', p: 45 },
      { n: 'Kwality Wall’s Cornetto', p: 60 }, { n: 'Magnum Almond Ice Cream', p: 90 }, { n: 'Haldiram Rasgulla (1 kg)', p: 220 },
      { n: 'Bikano Gulab Jamun (1 kg)', p: 200 }
    ].map(item => ({ ...item, cat: 7 })),

    // 9. Atta, Rice & Dal
    ...[
      { n: 'Aashirvaad Shudh Chakki Atta (5kg)', p: 225 }, { n: 'Fortune Chakki Fresh Atta (5kg)', p: 210 }, { n: 'India Gate Basmati Rice (1kg)', p: 180 },
      { n: 'Daawat Rozana Basmati Rice (1kg)', p: 115 }, { n: 'Tata Sampann Toor Dal (1kg)', p: 165 }, { n: 'Tata Sampann Chana Dal (1kg)', p: 120 },
      { n: 'Organic Tattva Moong Dal (500g)', p: 95 }, { n: 'Fortune Sunlite Refined Oil (1L)', p: 145 }, { n: 'Dhara Kachi Ghani Mustard Oil (1L)', p: 155 },
      { n: 'Tata Salt (1kg)', p: 25 }
    ].map(item => ({ ...item, cat: 8 })),

    // 10. Personal Care
    ...[
      { n: 'Dove Cream Beauty Bathing Bar', p: 60 }, { n: 'Dettol Original Soap', p: 40 }, { n: 'Colgate Strong Teeth Toothpaste', p: 95 },
      { n: 'Sensodyne Fresh Gel', p: 120 }, { n: 'Head & Shoulders Anti Dandruff', p: 185 }, { n: 'Sunsilk Stunning Black Shine', p: 165 },
      { n: 'Nivea Soft Moisturizing Cream', p: 160 }, { n: 'Gillette Mach 3 Razor', p: 299 }, { n: 'Whisper Choice Ultra (6 pads)', p: 45 },
      { n: 'Dettol Liquid Handwash', p: 99 }
    ].map(item => ({ ...item, cat: 9 }))
  ]

  const productsToCreate = productData.map((prod, index) => {
    // Generate SKU padded with zeroes (e.g. BLNKT-001)
    const formattedIndex = (index + 1).toString().padStart(3, '0');
    
    return {
      name: prod.n,
      description: `Premium quality ${prod.n} delivered directly to your doorstep in 10 minutes. 100% authentic product.`,
      price: prod.p,
      stock: Math.floor(Math.random() * 150) + 10, // Stock between 10 and 160
      sku: `BLNKT-${formattedIndex}`,
      // Points exactly to the images you generated in the previous step
      images: [`/images/rc-upload-1781155438653-${100 + (index + 1)}.png`],
      categoryId: createdCategories[prod.cat].id,
      isArchived: false, 
    }
  })

  await prisma.product.createMany({
    data: productsToCreate,
  })

  console.log('✅ Seeding complete! Inserted 10 categories and 100 real Indian grocery products.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
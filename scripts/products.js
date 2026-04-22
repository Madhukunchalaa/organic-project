/**
 * Product Catalog for Nature's Gold
 * 62 premium organic products — with weight variants
 */

// Weight pricing multipliers relative to base (250g)
// 250g = 1x, 500g = 1.85x, 1kg = 3.4x
const WEIGHT_VARIANTS = [
  { label: '250g', multiplier: 1 },
  { label: '500g', multiplier: 1.85 },
  { label: '1kg',  multiplier: 3.4 }
];

const PRODUCTS = [
    {
        id: 1,
        name: "ALPHA ALPHA SEEDS",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/ALFHA-SEEDS-406x406.jpg",
        priceRange: "₹149.00 – ₹449.00",
        priceNumeric: 149,
        category: "Seeds",
        ingredients: ["Raw Alfalfa Seeds"],
        nutrition: { Protein: "4g", Fiber: "2g", Calcium: "32mg" }
    },
    {
        id: 2,
        name: "AMCHUR POWDER",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/AMCHUR-POWDER-406x406.jpg",
        priceRange: "₹149.00 – ₹399.00",
        priceNumeric: 149,
        category: "Powders",
        ingredients: ["Dried Raw Mango"],
        nutrition: { "Vitamin C": "46mg", Fiber: "3g" }
    },
    {
        id: 3,
        name: "AMLA PICKEL",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-12-at-08.57.53-406x406.jpeg",
        priceRange: "₹249.00 – ₹749.00",
        priceNumeric: 249,
        category: "Pickles",
        ingredients: ["Indian Gooseberry", "Salt", "Mustard", "Turmeric"],
        nutrition: { "Vitamin C": "600mg", Antioxidants: "High" }
    },
    {
        id: 4,
        name: "AMLA POWDER",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/08/Group-158-406x406.jpg",
        priceRange: "₹149.00 – ₹399.00",
        priceNumeric: 149,
        category: "Powders",
        ingredients: ["Dried Indian Gooseberry"],
        nutrition: { "Vitamin C": "600mg", Iron: "1.2mg" }
    },
    {
        id: 5,
        name: "BAHUBALI PROTEIN POWDER",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/WhatsApp-Image-2024-09-14-at-3.27.27-PM-406x406.webp",
        priceRange: "₹349.00 – ₹999.00",
        priceNumeric: 349,
        category: "Health",
        ingredients: ["Sprouted Grains", "Nuts", "Seeds Blend"],
        nutrition: { Protein: "22g", Carbs: "45g", Fat: "8g" }
    },
    {
        id: 6,
        name: "BASIL SEEDS (SABJA SEEDS)",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/WhatsApp-Image-2024-09-18-at-2.11.42-PM-406x406.jpeg",
        priceRange: "₹149.00 – ₹449.00",
        priceNumeric: 149,
        category: "Seeds",
        ingredients: ["Raw Sabja Seeds"],
        nutrition: { Fiber: "7g", Calcium: "177mg", Iron: "2.5mg" }
    },
    {
        id: 7,
        name: "BEETROOT POWDER",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/BEETROOT-POWDER-406x406.jpg",
        priceRange: "₹149.00 – ₹399.00",
        priceNumeric: 149,
        category: "Powders",
        ingredients: ["Dehydrated Beetroot"],
        nutrition: { Iron: "0.8mg", "Vitamin B9": "109mcg" }
    },
    {
        id: 8,
        name: "BROWNTOP MILLET COOKIES",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-13-at-12.40.11-406x406.jpeg",
        priceRange: "₹349.00 – ₹899.00",
        priceNumeric: 349,
        category: "Cookies",
        ingredients: ["Browntop Millet Flour", "Palm Jaggery", "Ghee"],
        nutrition: { Carbs: "60g", Protein: "7g", Fat: "12g" }
    },
    {
        id: 9,
        name: "CARROT POWDER",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/Carrot-powder-406x406.jpg",
        priceRange: "₹149.00 – ₹399.00",
        priceNumeric: 149,
        category: "Powders",
        ingredients: ["Dehydrated Carrot"],
        nutrition: { "Vitamin A": "1800mcg", Fiber: "3g" }
    },
    {
        id: 10,
        name: "CASHEWS (KAAJU)",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2023/01/Kaaju-1-406x406.jpg",
        priceRange: "₹149.00 – ₹1,149.00",
        priceNumeric: 149,
        category: "Dry Fruits",
        ingredients: ["Raw Cashews"],
        nutrition: { Protein: "18g", Fat: "44g", Magnesium: "292mg" }
    },
    {
        id: 11,
        name: "CHIA SEEDS",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/Chia-seeds-406x406.jpg",
        priceRange: "₹149.00 – ₹449.00",
        priceNumeric: 149,
        category: "Seeds",
        ingredients: ["Raw Chia Seeds"],
        nutrition: { Omega3: "5g", Fiber: "11g", Protein: "4g" }
    },
    {
        id: 12,
        name: "COOKIES COMBO",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-15-at-14.34.01-406x406.jpeg",
        priceRange: "₹799.00",
        priceNumeric: 799,
        category: "Combos",
        ingredients: ["Assorted Millet Flours", "Palm Jaggery", "Ghee"],
        nutrition: { Carbs: "55g", Protein: "8g", Fat: "14g" }
    },
    {
        id: 13,
        name: "CORIANDER LEAVES PICKEL",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-12-at-09.16.29-406x406.jpeg",
        priceRange: "₹249.00 – ₹749.00",
        priceNumeric: 249,
        category: "Pickles",
        ingredients: ["Coriander Leaves", "Salt", "Chilli", "Mustard Oil"],
        nutrition: { "Vitamin K": "310mcg", "Vitamin C": "27mg" }
    },
    {
        id: 14,
        name: "CORIANDER LEAVES POWDER",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/CORIANDER-LEAVES-POWDER-406x406.jpg",
        priceRange: "₹149.00 – ₹399.00",
        priceNumeric: 149,
        category: "Powders",
        ingredients: ["Dried Coriander Leaves"],
        nutrition: { "Vitamin K": "310mcg", Iron: "1.8mg" }
    },
    {
        id: 15,
        name: "CURRY LEAVES POWDER",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/CURRY-LEAVE-S-POWDER-406x406.jpg",
        priceRange: "₹149.00 – ₹399.00",
        priceNumeric: 149,
        category: "Powders",
        ingredients: ["Dried Curry Leaves"],
        nutrition: { Iron: "0.9mg", Calcium: "830mg" }
    },
    {
        id: 16,
        name: "DATES DRY FRUIT LADDU",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2023/01/Group-161-406x406.jpg",
        priceRange: "₹349.00 – ₹849.00",
        priceNumeric: 349,
        category: "Laddus",
        ingredients: ["Medjool Dates", "Almonds", "Cashews", "Ghee"],
        nutrition: { Calories: "380kcal", Sugar: "30g", Protein: "5g" }
    },
    {
        id: 17,
        name: "DATES GROUNDNUT LADDU",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/WhatsApp-Image-2024-09-18-at-2.11.39-PM-1-406x406.jpeg",
        priceRange: "₹249.00 – ₹699.00",
        priceNumeric: 249,
        category: "Laddus",
        ingredients: ["Dates", "Groundnuts", "Jaggery"],
        nutrition: { Protein: "8g", Fat: "12g" }
    },
    {
        id: 18,
        name: "DATES PUMPKIN SEED LADDU",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/DATES-PUMPKIN-SEED-LADOO-406x406.jpg",
        priceRange: "₹249.00 – ₹749.00",
        priceNumeric: 249,
        category: "Laddus",
        ingredients: ["Dates", "Pumpkin Seeds", "Jaggery"],
        nutrition: { Magnesium: "150mg", Zinc: "2.2mg" }
    },
    {
        id: 19,
        name: "DATES SESAME LADDU",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/DATES-SEESAME-LADOO-406x406.jpg",
        priceRange: "₹249.00 – ₹749.00",
        priceNumeric: 249,
        category: "Laddus",
        ingredients: ["Dates", "Sesame Seeds", "Jaggery"],
        nutrition: { Calcium: "975mg", Iron: "14.5mg" }
    },
    {
        id: 20,
        name: "DATES SUNFLOWER SEEDS LADDU",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/DATES-SUNFLOWER-SEED-LADOO-406x406.jpg",
        priceRange: "₹249.00 – ₹749.00",
        priceNumeric: 249,
        category: "Laddus",
        ingredients: ["Dates", "Sunflower Seeds", "Jaggery"],
        nutrition: { "Vitamin E": "7.4mg", Selenium: "53mcg" }
    },
    {
        id: 21,
        name: "DRY DATES POWDER",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/dry-dates-406x406.jpg",
        priceRange: "₹249.00 – ₹749.00",
        priceNumeric: 249,
        category: "Powders",
        ingredients: ["Dried Dates"],
        nutrition: { Iron: "1mg", Potassium: "656mg" }
    },
    {
        id: 22,
        name: "Dry Fruits Combo",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2025/09/Kaundinya-Poster_01-406x406.jpg",
        priceRange: "₹1,099.00",
        priceNumeric: 1099,
        category: "Combos",
        ingredients: ["Almonds", "Cashews", "Walnuts", "Raisins", "Pistachios"],
        nutrition: { Protein: "20g", Fat: "50g" }
    },
    {
        id: 23,
        name: "FLAX SEED LADDU",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/WhatsApp-Image-2024-09-18-at-2.11.40-PM-406x406.jpeg",
        priceRange: "₹249.00 – ₹749.00",
        priceNumeric: 249,
        category: "Laddus",
        ingredients: ["Flax Seeds", "Jaggery", "Ghee"],
        nutrition: { Omega3: "6.4g", Fiber: "5.6g" }
    },
    {
        id: 24,
        name: "FLAX SEEDS",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/Flax-seeds-406x406.jpg",
        priceRange: "₹99.00 – ₹249.00",
        priceNumeric: 99,
        category: "Seeds",
        ingredients: ["Raw Flax Seeds"],
        nutrition: { Omega3: "6.4g", Fiber: "5.6g", Protein: "4.6g" }
    },
    {
        id: 25,
        name: "FOXTAIL MILLET (కొర్రలు)",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-15-at-14.59.19-406x406.jpeg",
        priceRange: "₹199.00",
        priceNumeric: 199,
        category: "Millets",
        ingredients: ["Foxtail Millet Grains"],
        nutrition: { Protein: "12g", Fiber: "8g", Iron: "2.8mg" }
    },
    {
        id: 26,
        name: "FOXTAIL MILLET COOKIES",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-13-at-12.40.01-406x406.jpeg",
        priceRange: "₹349.00 – ₹899.00",
        priceNumeric: 349,
        category: "Cookies",
        ingredients: ["Foxtail Millet Flour", "Palm Jaggery", "Ghee"],
        nutrition: { Carbs: "58g", Protein: "6g", Fat: "10g" }
    },
    {
        id: 27,
        name: "GINGER PICKEL",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-12-at-09.02.18-406x406.jpeg",
        priceRange: "₹249.00 – ₹749.00",
        priceNumeric: 249,
        category: "Pickles",
        ingredients: ["Fresh Ginger", "Salt", "Mustard", "Chilli"],
        nutrition: { Gingerol: "High", "Anti-inflammatory": "Yes" }
    },
    {
        id: 28,
        name: "GONGURA PICKLE",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-07-at-11.04.49-406x406.jpeg",
        priceRange: "₹249.00 – ₹749.00",
        priceNumeric: 249,
        category: "Pickles",
        ingredients: ["Gongura Leaves", "Chilli", "Mustard Oil", "Salt"],
        nutrition: { Iron: "3.9mg", "Vitamin C": "30mg" }
    },
    {
        id: 29,
        name: "GREEN CHILLI PICKEL",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-12-at-09.08.05-406x406.jpeg",
        priceRange: "₹249.00 – ₹749.00",
        priceNumeric: 249,
        category: "Pickles",
        ingredients: ["Green Chillies", "Salt", "Mustard Oil"],
        nutrition: { Capsaicin: "High", "Vitamin C": "242mg" }
    },
    {
        id: 30,
        name: "HAPPY HORMONE BALANCE BOX",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-30-at-12.26.27_97983a3d-406x406.jpg",
        priceRange: "₹599.00",
        priceNumeric: 599,
        category: "Wellness",
        ingredients: ["Shatavari", "Ashwagandha", "Fenugreek", "Flaxseed"],
        nutrition: { Adaptogens: "High", Phytoestrogens: "Present" }
    },
    {
        id: 31,
        name: "JOWAR COOKIES",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-13-at-12.40.01-406x406.jpeg",
        priceRange: "₹349.00 – ₹899.00",
        priceNumeric: 349,
        category: "Cookies",
        ingredients: ["Jowar Flour", "Palm Jaggery", "Ghee"],
        nutrition: { Carbs: "62g", Protein: "7g", Fiber: "3g" }
    },
    {
        id: 32,
        name: "KAUNDINYA MACADAMIA NUTS",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/09/MACADAMIA-NUTS-406x406.jpg",
        priceRange: "₹349.00 – ₹749.00",
        priceNumeric: 349,
        category: "Dry Fruits",
        ingredients: ["Raw Macadamia Nuts"],
        nutrition: { Fat: "75g", "Vitamin B1": "1mg", Manganese: "3.6mg" }
    },
    {
        id: 33,
        name: "KAUNDINYA PALM JAGGERY",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/Jaggery-406x406.jpg",
        priceRange: "₹149.00 – ₹499.00",
        priceNumeric: 149,
        category: "Sweeteners",
        ingredients: ["Pure Palm Sap"],
        nutrition: { Iron: "11mg", Calcium: "40mg", Potassium: "1056mg" }
    },
    {
        id: 34,
        name: "KAUNDINYA'S DRIED BLUEBERRIES",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/09/BLUEBERRIES-406x406.jpg",
        priceRange: "₹199.00 – ₹399.00",
        priceNumeric: 199,
        category: "Dry Fruits",
        ingredients: ["Dried Blueberries"],
        nutrition: { Antioxidants: "Very High", "Vitamin C": "9.7mg" }
    },
    {
        id: 35,
        name: "KAUNDINYA'S DRIED CRANBERRIES",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/09/Cranberries-406x406.jpg",
        priceRange: "₹99.00 – ₹199.00",
        priceNumeric: 99,
        category: "Dry Fruits",
        ingredients: ["Dried Cranberries"],
        nutrition: { "Vitamin C": "13mg", Fiber: "4g" }
    },
    {
        id: 36,
        name: "KAUNDINYA'S DRIED PINEAPPLE",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/09/Dried-Pineapple-406x406.jpg",
        priceRange: "₹99.00 – ₹199.00",
        priceNumeric: 99,
        category: "Dry Fruits",
        ingredients: ["Dried Pineapple Slices"],
        nutrition: { "Vitamin C": "47mg", Manganese: "1.5mg" }
    },
    {
        id: 37,
        name: "KAUNDINYA'S DRIED STRAWBERRIES",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/09/DRIED-STRAWBERRY-406x406.jpg",
        priceRange: "₹99.00 – ₹199.00",
        priceNumeric: 99,
        category: "Dry Fruits",
        ingredients: ["Dried Strawberries"],
        nutrition: { "Vitamin C": "59mg", Folate: "24mcg" }
    },
    {
        id: 38,
        name: "KAUNDINYA'S NATURAL RAISINS",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/09/Kissmiss-406x406.jpg",
        priceRange: "₹99.00 – ₹649.00",
        priceNumeric: 99,
        category: "Dry Fruits",
        ingredients: ["Sundried Grapes"],
        nutrition: { Iron: "1.9mg", Potassium: "749mg", Fiber: "3.3g" }
    },
    {
        id: 39,
        name: "KAUNDINYA'S PREMIUM ANJEER",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/09/anjeer-1-406x406.jpg",
        priceRange: "₹499.00 – ₹1,599.00",
        priceNumeric: 499,
        category: "Dry Fruits",
        ingredients: ["Premium Dried Figs"],
        nutrition: { Calcium: "162mg", Iron: "2mg", Fiber: "9.8g" }
    },
    {
        id: 40,
        name: "KAUNDINYA'S PREMIUM PISTACHIOS",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/08/Pista-406x406.jpg",
        priceRange: "₹299.00 – ₹1,349.00",
        priceNumeric: 299,
        category: "Dry Fruits",
        ingredients: ["Raw Pistachios"],
        nutrition: { Protein: "20g", "Vitamin B6": "1.7mg" }
    },
    {
        id: 41,
        name: "KAUNDINYA'S PREMIUM WALNUTS",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/09/Walnuts-1-406x406.jpg",
        priceRange: "₹249.00 – ₹1,849.00",
        priceNumeric: 249,
        category: "Dry Fruits",
        ingredients: ["Premium Walnuts"],
        nutrition: { Omega3: "9g", Protein: "15g", Magnesium: "158mg" }
    },
    {
        id: 42,
        name: "KAUNDINYA'S PURE HONEY",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/09/Honey-Img-406x406.jpg",
        priceRange: "₹149.00 – ₹449.00",
        priceNumeric: 149,
        category: "Wellness",
        ingredients: ["Raw Unfiltered Honey"],
        nutrition: { Antioxidants: "High", Calories: "304kcal" }
    },
    {
        id: 43,
        name: "LEMON PICKEL",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-12-at-09.19.37-1-406x406.jpeg",
        priceRange: "₹249.00 – ₹749.00",
        priceNumeric: 249,
        category: "Pickles",
        ingredients: ["Lemon", "Salt", "Chilli", "Mustard"],
        nutrition: { "Vitamin C": "53mg", Citric: "High" }
    },
    {
        id: 44,
        name: "MAHABEERA SEEDS",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/WhatsApp-Image-2024-09-18-at-2.11.41-PM-1-406x320.jpeg",
        priceRange: "₹149.00 – ₹449.00",
        priceNumeric: 149,
        category: "Seeds",
        ingredients: ["Raw Mahabeera Seeds"],
        nutrition: { Protein: "5g", Fiber: "6g" }
    },
    {
        id: 45,
        name: "MORINGA LEAVES POWDER",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/Moringa-Leaves-Powder-406x406.jpg",
        priceRange: "₹149.00 – ₹399.00",
        priceNumeric: 149,
        category: "Powders",
        ingredients: ["Dried Moringa Leaves"],
        nutrition: { Protein: "9g", "Vitamin C": "51g", Calcium: "2003mg" }
    },
    {
        id: 46,
        name: "NATURAL BATH POWDER",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/NATURAL-BATH-POWDER-406x406.jpg",
        priceRange: "₹149.00 – ₹449.00",
        priceNumeric: 149,
        category: "Wellness",
        ingredients: ["Turmeric", "Neem", "Orange Peel", "Rose Petals"],
        nutrition: {}
    },
    {
        id: 47,
        name: "NATURAL TOOTH POWDER",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/NATURAL-TOOTH-POWDER-406x406.jpg",
        priceRange: "₹149.00 – ₹299.00",
        priceNumeric: 149,
        category: "Wellness",
        ingredients: ["Neem", "Charcoal", "Clove", "Mint"],
        nutrition: {}
    },
    {
        id: 48,
        name: "PALM JAGGERY POWDER",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/Jaggery-powder-406x406.jpg",
        priceRange: "₹189.00 – ₹549.00",
        priceNumeric: 189,
        category: "Sweeteners",
        ingredients: ["Pure Palm Jaggery, Ground"],
        nutrition: { Iron: "11mg", Calcium: "40mg", Potassium: "1056mg" }
    },
    {
        id: 49,
        name: "Premium Dry Fruits Mix Trial",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-14-at-10.39.49_62de60be-406x406.jpg",
        priceRange: "₹899.00",
        priceNumeric: 899,
        category: "Combos",
        ingredients: ["Almonds", "Cashews", "Dates", "Raisins"],
        nutrition: { Protein: "15g", Fat: "40g" }
    },
    {
        id: 50,
        name: "PREMIUM PINE NUTS (CHILGOZA)",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/09/Pine-Nuts-406x406.jpg",
        priceRange: "₹899.00",
        priceNumeric: 899,
        category: "Dry Fruits",
        ingredients: ["Raw Pine Nuts"],
        nutrition: { Protein: "14g", "Vitamin K": "53.9mcg", Zinc: "6.5mg" }
    },
    {
        id: 51,
        name: "PUDINA LEAF POWDER",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/Phudina-Leaves-Powder-406x406.jpg",
        priceRange: "₹149.00 – ₹399.00",
        priceNumeric: 149,
        category: "Powders",
        ingredients: ["Dried Pudina Leaves"],
        nutrition: { Iron: "17.4mg", Calcium: "243mg", "Vitamin A": "854mcg" }
    },
    {
        id: 52,
        name: "RAAGI COOKIES",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-13-at-12.39.48-406x406.jpeg",
        priceRange: "₹349.00 – ₹899.00",
        priceNumeric: 349,
        category: "Cookies",
        ingredients: ["Ragi Flour", "Palm Jaggery", "Ghee"],
        nutrition: { Calcium: "344mg", Protein: "7g", Fiber: "3.6g" }
    },
    {
        id: 53,
        name: "RAW PUMPKIN SEEDS",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/08/ing-pumpkin-406x406.jpg",
        priceRange: "₹249.00 – ₹699.00",
        priceNumeric: 249,
        category: "Seeds",
        ingredients: ["Raw Pumpkin Seeds"],
        nutrition: { Magnesium: "592mg", Zinc: "10.3mg", Protein: "30g" }
    },
    {
        id: 54,
        name: "RIPE CHILLI PICKEL",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-12-at-09.12.08-406x406.jpeg",
        priceRange: "₹249.00 – ₹749.00",
        priceNumeric: 249,
        category: "Pickles",
        ingredients: ["Red Chillies", "Salt", "Mustard Oil"],
        nutrition: { Capsaicin: "High", "Vitamin C": "144mg" }
    },
    {
        id: 55,
        name: "SPROUTED RAAGI FLOUR",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/Group-166-406x406.jpg",
        priceRange: "₹199.00 – ₹549.00",
        priceNumeric: 199,
        category: "Flours",
        ingredients: ["Sprouted Ragi"],
        nutrition: { Calcium: "344mg", Protein: "7.9g", Iron: "4.6mg" }
    },
    {
        id: 56,
        name: "SUNFLOWER SEEDS",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2023/01/WhatsApp-Image-2024-09-18-at-2.11.42-PM-1-406x406.jpeg",
        priceRange: "₹149.00 – ₹399.00",
        priceNumeric: 149,
        category: "Seeds",
        ingredients: ["Raw Sunflower Seeds"],
        nutrition: { "Vitamin E": "35mg", Selenium: "78mcg", Protein: "21g" }
    },
    {
        id: 57,
        name: "SUPER SIX SPROUTED POWDER",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/Group-153-406x406.jpg",
        priceRange: "₹199.00 – ₹549.00",
        priceNumeric: 199,
        category: "Health",
        ingredients: ["Fenugreek", "Barley", "Wheat", "Green Gram", "Brown Rice", "Soya"],
        nutrition: { Protein: "18g", Fiber: "8g" }
    },
    {
        id: 58,
        name: "TOMATO PICKEL",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-12-at-08.52.59-406x406.jpeg",
        priceRange: "₹249.00 – ₹749.00",
        priceNumeric: 249,
        category: "Pickles",
        ingredients: ["Sun-ripened Tomatoes", "Chilli", "Salt", "Mustard"],
        nutrition: { Lycopene: "High", "Vitamin C": "23mg" }
    },
    {
        id: 59,
        name: "TULASI LEAVES POWDER",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/Tulasi-Leaves-Powder-406x406.jpg",
        priceRange: "₹149.00 – ₹399.00",
        priceNumeric: 149,
        category: "Powders",
        ingredients: ["Dried Tulsi Leaves"],
        nutrition: { Antioxidants: "Very High", "Vitamin K": "414mcg" }
    },
    {
        id: 60,
        name: "WATERMELON SEEDS",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/Watermilon-Seeds-406x406.jpg",
        priceRange: "₹299.00 – ₹899.00",
        priceNumeric: 299,
        category: "Seeds",
        ingredients: ["Raw Watermelon Seeds"],
        nutrition: { Magnesium: "515mg", Protein: "28g", Fat: "47g" }
    },
    {
        id: 61,
        name: "WHEAT GRASS POWDER",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2023/01/WHEAT-GRASS-POWDE-406x406.jpg",
        priceRange: "₹199.00 – ₹399.00",
        priceNumeric: 199,
        category: "Powders",
        ingredients: ["Dehydrated Wheatgrass"],
        nutrition: { Chlorophyll: "High", "Vitamin A": "1200mcg", Iron: "0.6mg" }
    },
    {
        id: 62,
        name: "ALMONDS",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2023/01/Almond-406x406.jpg",
        priceRange: "₹299.00 – ₹999.00",
        priceNumeric: 299,
        category: "Dry Fruits",
        ingredients: ["Raw Almonds"],
        nutrition: { Protein: "21g", "Vitamin E": "25mg", Magnesium: "270mg" }
    }
];

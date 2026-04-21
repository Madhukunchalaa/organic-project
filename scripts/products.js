/**
 * Product Catalog for Nature's Gold
 * 62 premium organic products
 */

const PRODUCTS = [
    {
        id: 1,
        name: "ALPHA ALPHA SEEDS",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/ALFHA-SEEDS-406x406.jpg",
        priceRange: "₹149.00 – ₹449.00",
        priceNumeric: 149,
        category: "Seeds"
    },
    {
        id: 2,
        name: "AMCHUR POWDER",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/AMCHUR-POWDER-406x406.jpg",
        priceRange: "₹149.00 – ₹399.00",
        priceNumeric: 149,
        category: "Powders"
    },
    {
        id: 3,
        name: "AMLA PICKEL",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-12-at-08.57.53-406x406.jpeg",
        priceRange: "₹249.00 – ₹749.00",
        priceNumeric: 249,
        category: "Pickles"
    },
    {
        id: 4,
        name: "AMLA POWDER",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/08/Group-158-406x406.jpg",
        priceRange: "₹149.00 – ₹399.00",
        priceNumeric: 149,
        category: "Powders"
    },
    {
        id: 5,
        name: "BAHUBALI PROTEIN POWDER",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/WhatsApp-Image-2024-09-14-at-3.27.27-PM-406x406.webp",
        priceRange: "₹349.00 – ₹999.00",
        priceNumeric: 349,
        category: "Health"
    },
    {
        id: 6,
        name: "BASIL SEEDS (SABJA SEEDS)",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/WhatsApp-Image-2024-09-18-at-2.11.42-PM-406x406.jpeg",
        priceRange: "₹149.00 – ₹449.00",
        priceNumeric: 149,
        category: "Seeds"
    },
    {
        id: 7,
        name: "BEETROOT POWDER",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/BEETROOT-POWDER-406x406.jpg",
        priceRange: "₹149.00 – ₹399.00",
        priceNumeric: 149,
        category: "Powders"
    },
    {
        id: 8,
        name: "BROWNTOP MILLET COOKIES",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-13-at-12.40.11-406x406.jpeg",
        priceRange: "₹349.00 – ₹899.00",
        priceNumeric: 349,
        category: "Cookies"
    },
    {
        id: 9,
        name: "CARROT POWDER",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/Carrot-powder-406x406.jpg",
        priceRange: "₹149.00 – ₹399.00",
        priceNumeric: 149,
        category: "Powders"
    },
    {
        id: 10,
        name: "CASHEWS (KAAJU)",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2023/01/Kaaju-1-406x406.jpg",
        priceRange: "₹149.00 – ₹1,149.00",
        priceNumeric: 149,
        category: "Dry Fruits"
    },
    {
        id: 11,
        name: "CHIA SEEDS",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/Chia-seeds-406x406.jpg",
        priceRange: "₹149.00 – ₹449.00",
        priceNumeric: 149,
        category: "Seeds"
    },
    {
        id: 12,
        name: "COOKIES COMBO",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-15-at-14.34.01-406x406.jpeg",
        priceRange: "₹799.00",
        priceNumeric: 799,
        category: "Combos"
    },
    {
        id: 13,
        name: "CORIANDER LEAVES PICKEL",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-12-at-09.16.29-406x406.jpeg",
        priceRange: "₹249.00 – ₹749.00",
        priceNumeric: 249,
        category: "Pickles"
    },
    {
        id: 14,
        name: "CORIANDER LEAVES POWDER",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/CORIANDER-LEAVES-POWDER-406x406.jpg",
        priceRange: "₹149.00 – ₹399.00",
        priceNumeric: 149,
        category: "Powders"
    },
    {
        id: 15,
        name: "CURRY LEAVES POWDER",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/CURRY-LEAVE-S-POWDER-406x406.jpg",
        priceRange: "₹149.00 – ₹399.00",
        priceNumeric: 149,
        category: "Powders"
    },
    {
        id: 16,
        name: "DATES DRY FRUIT LADDU",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2023/01/Group-161-406x406.jpg",
        priceRange: "₹349.00 – ₹849.00",
        priceNumeric: 349,
        category: "Laddus"
    },
    {
        id: 17,
        name: "DATES GROUNDNUT LADDU",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/WhatsApp-Image-2024-09-18-at-2.11.39-PM-1-406x406.jpeg",
        priceRange: "₹249.00 – ₹699.00",
        priceNumeric: 249,
        category: "Laddus"
    },
    {
        id: 18,
        name: "DATES PUMPKIN SEED LADDU",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/DATES-PUMPKIN-SEED-LADOO-406x406.jpg",
        priceRange: "₹249.00 – ₹749.00",
        priceNumeric: 249,
        category: "Laddus"
    },
    {
        id: 19,
        name: "DATES SESAME LADDU",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/DATES-SEESAME-LADOO-406x406.jpg",
        priceRange: "₹249.00 – ₹749.00",
        priceNumeric: 249,
        category: "Laddus"
    },
    {
        id: 20,
        name: "DATES SUNFLOWER SEEDS LADDU",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/DATES-SUNFLOWER-SEED-LADOO-406x406.jpg",
        priceRange: "₹249.00 – ₹749.00",
        priceNumeric: 249,
        category: "Laddus"
    },
    {
        id: 21,
        name: "DRY DATES POWDER",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/dry-dates-406x406.jpg",
        priceRange: "₹249.00 – ₹749.00",
        priceNumeric: 249,
        category: "Powders"
    },
    {
        id: 22,
        name: "Dry Fruits Combo",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2025/09/Kaundinya-Poster_01-406x406.jpg",
        priceRange: "₹1,099.00",
        priceNumeric: 1099,
        category: "Combos"
    },
    {
        id: 23,
        name: "FLAX SEED LADDU",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/WhatsApp-Image-2024-09-18-at-2.11.40-PM-406x406.jpeg",
        priceRange: "₹249.00 – ₹749.00",
        priceNumeric: 249,
        category: "Laddus"
    },
    {
        id: 24,
        name: "FLAX SEEDS",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/Flax-seeds-406x406.jpg",
        priceRange: "₹99.00 – ₹249.00",
        priceNumeric: 99,
        category: "Seeds"
    },
    {
        id: 25,
        name: "FOXTAIL MILLET (కొర్రలు)",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-15-at-14.59.19-406x406.jpeg",
        priceRange: "₹199.00",
        priceNumeric: 199,
        category: "Millets"
    },
    {
        id: 26,
        name: "FOXTAIL MILLET COOKIES",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-13-at-12.40.01-406x406.jpeg",
        priceRange: "₹349.00 – ₹899.00",
        priceNumeric: 349,
        category: "Cookies"
    },
    {
        id: 27,
        name: "GINGER PICKEL",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-12-at-09.02.18-406x406.jpeg",
        priceRange: "₹249.00 – ₹749.00",
        priceNumeric: 249,
        category: "Pickles"
    },
    {
        id: 28,
        name: "GONGURA PICKLE",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-07-at-11.04.49-406x406.jpeg",
        priceRange: "₹249.00 – ₹749.00",
        priceNumeric: 249,
        category: "Pickles"
    },
    {
        id: 29,
        name: "GREEN CHILLI PICKEL",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-12-at-09.08.05-406x406.jpeg",
        priceRange: "₹249.00 – ₹749.00",
        priceNumeric: 249,
        category: "Pickles"
    },
    {
        id: 30,
        name: "HAPPY HORMONE BALANCE BOX",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-30-at-12.26.27_97983a3d-406x406.jpg",
        priceRange: "₹599.00",
        priceNumeric: 599,
        category: "Wellness"
    },
    {
        id: 31,
        name: "JOWAR COOKIES",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-13-at-12.40.01-406x406.jpeg",
        priceRange: "₹349.00 – ₹899.00",
        priceNumeric: 349,
        category: "Cookies"
    },
    {
        id: 32,
        name: "KAUNDINYA MACADAMIA NUTS",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/09/MACADAMIA-NUTS-406x406.jpg",
        priceRange: "₹349.00 – ₹749.00",
        priceNumeric: 349,
        category: "Dry Fruits"
    },
    {
        id: 33,
        name: "KAUNDINYA PALM JAGGERY",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/Jaggery-406x406.jpg",
        priceRange: "₹149.00 – ₹499.00",
        priceNumeric: 149,
        category: "Sweeteners"
    },
    {
        id: 34,
        name: "KAUNDINYA'S DRIED BLUEBERRIES",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/09/BLUEBERRIES-406x406.jpg",
        priceRange: "₹199.00 – ₹399.00",
        priceNumeric: 199,
        category: "Dry Fruits"
    },
    {
        id: 35,
        name: "KAUNDINYA'S DRIED CRANBERRIES",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/09/Cranberries-406x406.jpg",
        priceRange: "₹99.00 – ₹199.00",
        priceNumeric: 99,
        category: "Dry Fruits"
    },
    {
        id: 36,
        name: "KAUNDINYA'S DRIED PINEAPPLE",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/09/Dried-Pineapple-406x406.jpg",
        priceRange: "₹99.00 – ₹199.00",
        priceNumeric: 99,
        category: "Dry Fruits"
    },
    {
        id: 37,
        name: "KAUNDINYA'S DRIED STRAWBERRIES",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/09/DRIED-STRAWBERRY-406x406.jpg",
        priceRange: "₹99.00 – ₹199.00",
        priceNumeric: 99,
        category: "Dry Fruits"
    },
    {
        id: 38,
        name: "KAUNDINYA'S NATURAL RAISINS",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/09/Kissmiss-406x406.jpg",
        priceRange: "₹99.00 – ₹649.00",
        priceNumeric: 99,
        category: "Dry Fruits"
    },
    {
        id: 39,
        name: "KAUNDINYA'S PREMIUM ANJEER",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/09/anjeer-1-406x406.jpg",
        priceRange: "₹499.00 – ₹1,599.00",
        priceNumeric: 499,
        category: "Dry Fruits"
    },
    {
        id: 40,
        name: "KAUNDINYA'S PREMIUM PISTACHIOS",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/08/Pista-406x406.jpg",
        priceRange: "₹299.00 – ₹1,349.00",
        priceNumeric: 299,
        category: "Dry Fruits"
    },
    {
        id: 41,
        name: "KAUNDINYA'S PREMIUM WALNUTS",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/09/Walnuts-1-406x406.jpg",
        priceRange: "₹249.00 – ₹1,849.00",
        priceNumeric: 249,
        category: "Dry Fruits"
    },
    {
        id: 42,
        name: "KAUNDINYA'S PURE HONEY",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/09/Honey-Img-406x406.jpg",
        priceRange: "₹149.00 – ₹449.00",
        priceNumeric: 149,
        category: "Wellness"
    },
    {
        id: 43,
        name: "LEMON PICKEL",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-12-at-09.19.37-1-406x406.jpeg",
        priceRange: "₹249.00 – ₹749.00",
        priceNumeric: 249,
        category: "Pickles"
    },
    {
        id: 44,
        name: "MAHABEERA SEEDS",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/WhatsApp-Image-2024-09-18-at-2.11.41-PM-1-406x320.jpeg",
        priceRange: "₹149.00 – ₹449.00",
        priceNumeric: 149,
        category: "Seeds"
    },
    {
        id: 45,
        name: "MORINGA LEAVES POWDER",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/Moringa-Leaves-Powder-406x406.jpg",
        priceRange: "₹149.00 – ₹399.00",
        priceNumeric: 149,
        category: "Powders"
    },
    {
        id: 46,
        name: "NATURAL BATH POWDER",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/NATURAL-BATH-POWDER-406x406.jpg",
        priceRange: "₹149.00 – ₹449.00",
        priceNumeric: 149,
        category: "Wellness"
    },
    {
        id: 47,
        name: "NATURAL TOOTH POWDER",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/NATURAL-TOOTH-POWDER-406x406.jpg",
        priceRange: "₹149.00 – ₹299.00",
        priceNumeric: 149,
        category: "Wellness"
    },
    {
        id: 48,
        name: "PALM JAGGERY POWDER",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/Jaggery-powder-406x406.jpg",
        priceRange: "₹189.00 – ₹549.00",
        priceNumeric: 189,
        category: "Sweeteners"
    },
    {
        id: 49,
        name: "Premium Dry Fruits Mix Trial",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-14-at-10.39.49_62de60be-406x406.jpg",
        priceRange: "₹899.00",
        priceNumeric: 899,
        category: "Combos"
    },
    {
        id: 50,
        name: "PREMIUM PINE NUTS (CHILGOZA)",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/09/Pine-Nuts-406x406.jpg",
        priceRange: "₹899.00",
        priceNumeric: 899,
        category: "Dry Fruits"
    },
    {
        id: 51,
        name: "PUDINA LEAF POWDER",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/Phudina-Leaves-Powder-406x406.jpg",
        priceRange: "₹149.00 – ₹399.00",
        priceNumeric: 149,
        category: "Powders"
    },
    {
        id: 52,
        name: "RAAGI COOKIES",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-13-at-12.39.48-406x406.jpeg",
        priceRange: "₹349.00 – ₹899.00",
        priceNumeric: 349,
        category: "Cookies"
    },
    {
        id: 53,
        name: "RAW PUMPKIN SEEDS",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/08/ing-pumpkin-406x406.jpg",
        priceRange: "₹249.00 – ₹699.00",
        priceNumeric: 249,
        category: "Seeds"
    },
    {
        id: 54,
        name: "RIPE CHILLI PICKEL",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-12-at-09.12.08-406x406.jpeg",
        priceRange: "₹249.00 – ₹749.00",
        priceNumeric: 249,
        category: "Pickles"
    },
    {
        id: 55,
        name: "SPROUTED RAAGI FLOUR",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/Group-166-406x406.jpg",
        priceRange: "₹199.00 – ₹549.00",
        priceNumeric: 199,
        category: "Flours"
    },
    {
        id: 56,
        name: "SUNFLOWER SEEDS",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2023/01/WhatsApp-Image-2024-09-18-at-2.11.42-PM-1-406x406.jpeg",
        priceRange: "₹149.00 – ₹399.00",
        priceNumeric: 149,
        category: "Seeds"
    },
    {
        id: 57,
        name: "SUPER SIX SPROUTED POWDER",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/Group-153-406x406.jpg",
        priceRange: "₹199.00 – ₹549.00",
        priceNumeric: 199,
        category: "Health"
    },
    {
        id: 58,
        name: "TOMATO PICKEL",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-12-at-08.52.59-406x406.jpeg",
        priceRange: "₹249.00 – ₹749.00",
        priceNumeric: 249,
        category: "Pickles"
    },
    {
        id: 59,
        name: "TULASI LEAVES POWDER",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/Tulasi-Leaves-Powder-406x406.jpg",
        priceRange: "₹149.00 – ₹399.00",
        priceNumeric: 149,
        category: "Powders"
    },
    {
        id: 60,
        name: "WATERMELON SEEDS",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2022/08/Watermilon-Seeds-406x406.jpg",
        priceRange: "₹299.00 – ₹899.00",
        priceNumeric: 299,
        category: "Seeds"
    },
    {
        id: 61,
        name: "WHEAT GRASS POWDER",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2023/01/WHEAT-GRASS-POWDE-406x406.jpg",
        priceRange: "₹199.00 – ₹399.00",
        priceNumeric: 199,
        category: "Powders"
    },
    {
        id: 62,
        name: "ALMONDS",
        img: "https://kaundinyanaturals.com/wp-content/uploads/2023/01/Almond-406x406.jpg",
        priceRange: "₹299.00 – ₹999.00",
        priceNumeric: 299,
        category: "Dry Fruits"
    }
];

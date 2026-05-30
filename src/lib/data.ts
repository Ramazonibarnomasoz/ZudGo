export type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  reviews: number;
  deliveryMin: number;
  deliveryFee: number;
  image: string;
  cover: string;
  tags: string[];
  promo?: string;
};

export type Dish = {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

export const categories = [
  { id: "tj", name: "Tajik", emoji: "🍲" },
  { id: "plov", name: "Plov", emoji: "🍚" },
  { id: "kebab", name: "Kebab", emoji: "🍢" },
  { id: "burger", name: "Burgers", emoji: "🍔" },
  { id: "pizza", name: "Pizza", emoji: "🍕" },
  { id: "sushi", name: "Sushi", emoji: "🍣" },
  { id: "dessert", name: "Sweets", emoji: "🍰" },
  { id: "drinks", name: "Drinks", emoji: "🥤" },
];

const img = (q: string, w = 800) =>
  `https://images.unsplash.com/${q}?auto=format&fit=crop&w=${w}&q=80`;

export const restaurants: Restaurant[] = [
  {
    id: "r1",
    name: "Rohat Plov House",
    cuisine: "Tajik · Plov",
    rating: 4.9,
    reviews: 1284,
    deliveryMin: 25,
    deliveryFee: 0,
    image: img("photo-1604908176997-125f25cc6f3d"),
    cover: img("photo-1504674900247-0877df9cc836", 1200),
    tags: ["Top rated", "Free delivery"],
    promo: "−20%",
  },
  {
    id: "r2",
    name: "Dushanbe Kebab Co.",
    cuisine: "Kebab · Grill",
    rating: 4.8,
    reviews: 942,
    deliveryMin: 30,
    deliveryFee: 15,
    image: img("photo-1529193591184-b1d58069ecdd"),
    cover: img("photo-1555939594-58d7cb561ad1", 1200),
    tags: ["Popular"],
  },
  {
    id: "r3",
    name: "Sogd Sushi",
    cuisine: "Japanese · Sushi",
    rating: 4.7,
    reviews: 654,
    deliveryMin: 35,
    deliveryFee: 20,
    image: img("photo-1579871494447-9811cf80d66c"),
    cover: img("photo-1546069901-ba9599a7e63c", 1200),
    tags: ["Fast"],
    promo: "−15%",
  },
  {
    id: "r4",
    name: "Pamir Pizzeria",
    cuisine: "Pizza · Italian",
    rating: 4.6,
    reviews: 1109,
    deliveryMin: 28,
    deliveryFee: 10,
    image: img("photo-1513104890138-7c749659a591"),
    cover: img("photo-1565299624946-b28f40a0ae38", 1200),
    tags: ["Family"],
  },
  {
    id: "r5",
    name: "Varzob Burger Lab",
    cuisine: "Burgers · Fast food",
    rating: 4.7,
    reviews: 720,
    deliveryMin: 20,
    deliveryFee: 12,
    image: img("photo-1568901346375-23c9450c58cd"),
    cover: img("photo-1568901346375-23c9450c58cd", 1200),
    tags: ["Fast"],
  },
  {
    id: "r6",
    name: "Shirin Desserts",
    cuisine: "Desserts · Coffee",
    rating: 4.8,
    reviews: 480,
    deliveryMin: 22,
    deliveryFee: 0,
    image: img("photo-1565958011703-44f9829ba187"),
    cover: img("photo-1551024601-bec78aea704b", 1200),
    tags: ["Free delivery"],
  },
];

export const dishes: Dish[] = [
  { id: "d1", restaurantId: "r1", name: "Osh Tajik", description: "Classic plov with lamb, carrots and chickpeas", price: 45, image: img("photo-1604908176997-125f25cc6f3d"), category: "Mains" },
  { id: "d2", restaurantId: "r1", name: "Manti", description: "Steamed dumplings with seasoned lamb", price: 38, image: img("photo-1496116218417-1a781b1c416c"), category: "Mains" },
  { id: "d3", restaurantId: "r1", name: "Shurbo", description: "Hot Tajik soup with lamb and vegetables", price: 30, image: img("photo-1547592180-85f173990554"), category: "Soups" },
  { id: "d4", restaurantId: "r2", name: "Lamb Shashlik", description: "Marinated charcoal-grilled lamb skewers", price: 55, image: img("photo-1529193591184-b1d58069ecdd"), category: "Grill" },
  { id: "d5", restaurantId: "r2", name: "Chicken Kebab", description: "Tender chicken skewers with herbs", price: 40, image: img("photo-1555939594-58d7cb561ad1"), category: "Grill" },
  { id: "d6", restaurantId: "r3", name: "Philadelphia Roll", description: "Salmon, cream cheese, cucumber", price: 65, image: img("photo-1579871494447-9811cf80d66c"), category: "Rolls" },
  { id: "d7", restaurantId: "r3", name: "Spicy Tuna", description: "Tuna, chili mayo, scallion", price: 70, image: img("photo-1617196034796-73dfa7b1fd56"), category: "Rolls" },
  { id: "d8", restaurantId: "r4", name: "Margherita", description: "Tomato, mozzarella, fresh basil", price: 50, image: img("photo-1513104890138-7c749659a591"), category: "Pizza" },
  { id: "d9", restaurantId: "r4", name: "Pepperoni", description: "Spicy pepperoni and mozzarella", price: 60, image: img("photo-1628840042765-356cda07504e"), category: "Pizza" },
  { id: "d10", restaurantId: "r5", name: "ZudGo Smashburger", description: "Double smash patty, cheddar, special sauce", price: 48, image: img("photo-1568901346375-23c9450c58cd"), category: "Burgers" },
  { id: "d11", restaurantId: "r5", name: "Crispy Chicken", description: "Buttermilk fried chicken sandwich", price: 42, image: img("photo-1606755962773-d324e0a13086"), category: "Burgers" },
  { id: "d12", restaurantId: "r6", name: "Honey Baklava", description: "Layered pastry with pistachio and honey", price: 25, image: img("photo-1565958011703-44f9829ba187"), category: "Desserts" },
  { id: "d13", restaurantId: "r6", name: "Iced Latte", description: "House espresso, milk, ice", price: 18, image: img("photo-1517701550927-30cf4ba1dba5"), category: "Drinks" },
];

export const promotions = [
  { id: "p1", title: "−20% on first order", subtitle: "Use code ZUDGO20", color: "from-[#35577D] to-[#141E30]" },
  { id: "p2", title: "Free delivery weekend", subtitle: "On orders over 100 TJS", color: "from-[#1f3a5f] to-[#0b1322]" },
  { id: "p3", title: "Refer & earn 50 TJS", subtitle: "Invite friends to ZudGo", color: "from-[#3b6ea5] to-[#1a2a44]" },
];

export const paymentMethods = [
  { id: "cash", name: "Cash", icon: "💵" },
  { id: "card", name: "Bank Card", icon: "💳" },
  { id: "alif", name: "Alif", icon: "🅰️" },
  { id: "dc", name: "Dushanbe City", icon: "🏙️" },
];

export const formatPrice = (n: number) => `${n.toFixed(0)} TJS`;

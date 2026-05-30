import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "tg" | "ru" | "en";

const dict = {
  tg: {
    appTagline: "Зуд ва осон",
    continue: "Идома",
    skip: "Гузарондан",
    next: "Баъдӣ",
    getStarted: "Оғоз кардан",
    selectLanguage: "Забонро интихоб кунед",
    welcome: "Хуш омадед ба ZudGo",
    onb1Title: "Расондани фаврии хӯрок",
    onb1Sub: "Хӯроки дӯстдоштаатонро дар чанд дақиқа гиред",
    onb2Title: "Беҳтарин тарабхонаҳо",
    onb2Sub: "Интихоби васеъ аз тарабхонаҳои маъруфи Тоҷикистон",
    onb3Title: "Пайгирии фармоиш",
    onb3Sub: "Дар вақти воқеӣ фармоиши худро пайгирӣ кунед",
    onb4Title: "Пардохти осон",
    onb4Sub: "Нақд, корт, Алиф ё Душанбе Сити",
    onb5Title: "Хуш омадед ба ZudGo",
    onb5Sub: "Биёед оғоз кунем",
    signIn: "Воридшавӣ",
    signUp: "Бақайдгирӣ",
    phoneNumber: "Рақами телефон",
    sendCode: "Фиристодани код",
    verifyOtp: "Тасдиқи код",
    enterOtp: "Кодро аз СМС ворид кунед",
    verify: "Тасдиқ",
    home: "Хона", search: "Ҷустуҷӯ", orders: "Фармоишҳо", favorites: "Дӯстдошта", profile: "Профил",
    searchPlaceholder: "Тарабхона ё хӯрок ҷустуҷӯ кунед",
    deliverTo: "Расондан ба",
    categories: "Категорияҳо", popular: "Маъруфтарин", recommended: "Тавсияшуда",
    promotions: "Аксияҳо", featured: "Махсус", topRated: "Беҳтарин", fastDelivery: "Расондани зуд",
    addToCart: "Илова ба сабад", cart: "Сабад", checkout: "Расмисозӣ",
    deliveryFee: "Хароҷоти расондан", total: "Ҷамъ", promo: "Промокод",
    address: "Суроға", payment: "Тарзи пардохт", placeOrder: "Фармоиш додан",
    tracking: "Пайгирӣ", driver: "Ронанда", eta: "Вақти расидан",
    settings: "Танзимот", language: "Забон", orderHistory: "Таърихи фармоишҳо",
    logout: "Баромадан",
    min: "дақ", free: "Ройгон",
  },
  ru: {
    appTagline: "Быстро и удобно",
    continue: "Продолжить",
    skip: "Пропустить",
    next: "Далее",
    getStarted: "Начать",
    selectLanguage: "Выберите язык",
    welcome: "Добро пожаловать в ZudGo",
    onb1Title: "Быстрая доставка еды",
    onb1Sub: "Получите любимую еду за считанные минуты",
    onb2Title: "Лучшие рестораны",
    onb2Sub: "Широкий выбор ресторанов Таджикистана",
    onb3Title: "Отслеживание заказа",
    onb3Sub: "Следите за заказом в реальном времени",
    onb4Title: "Удобная оплата",
    onb4Sub: "Наличные, карта, Алиф или Душанбе Сити",
    onb5Title: "Добро пожаловать в ZudGo",
    onb5Sub: "Давайте начнём",
    signIn: "Войти",
    signUp: "Регистрация",
    phoneNumber: "Номер телефона",
    sendCode: "Отправить код",
    verifyOtp: "Подтверждение",
    enterOtp: "Введите код из СМС",
    verify: "Подтвердить",
    home: "Главная", search: "Поиск", orders: "Заказы", favorites: "Избранное", profile: "Профиль",
    searchPlaceholder: "Найти ресторан или блюдо",
    deliverTo: "Доставка в",
    categories: "Категории", popular: "Популярные", recommended: "Рекомендуем",
    promotions: "Акции", featured: "Хиты", topRated: "Топ рейтинга", fastDelivery: "Быстрая доставка",
    addToCart: "В корзину", cart: "Корзина", checkout: "Оформление",
    deliveryFee: "Доставка", total: "Итого", promo: "Промокод",
    address: "Адрес", payment: "Способ оплаты", placeOrder: "Оформить заказ",
    tracking: "Отслеживание", driver: "Курьер", eta: "Прибытие через",
    settings: "Настройки", language: "Язык", orderHistory: "История заказов",
    logout: "Выйти",
    min: "мин", free: "Бесплатно",
  },
  en: {
    appTagline: "Fast and easy",
    continue: "Continue",
    skip: "Skip",
    next: "Next",
    getStarted: "Get Started",
    selectLanguage: "Select your language",
    welcome: "Welcome to ZudGo",
    onb1Title: "Fast food delivery",
    onb1Sub: "Get your favorite meals delivered in minutes",
    onb2Title: "Best restaurants",
    onb2Sub: "A wide selection of top restaurants in Tajikistan",
    onb3Title: "Real-time tracking",
    onb3Sub: "Track your order live, every step of the way",
    onb4Title: "Easy payments",
    onb4Sub: "Cash, card, Alif or Dushanbe City",
    onb5Title: "Welcome to ZudGo",
    onb5Sub: "Let's get started",
    signIn: "Sign in",
    signUp: "Sign up",
    phoneNumber: "Phone number",
    sendCode: "Send code",
    verifyOtp: "Verify code",
    enterOtp: "Enter the code from SMS",
    verify: "Verify",
    home: "Home", search: "Search", orders: "Orders", favorites: "Favorites", profile: "Profile",
    searchPlaceholder: "Search restaurants or dishes",
    deliverTo: "Deliver to",
    categories: "Categories", popular: "Popular", recommended: "Recommended",
    promotions: "Promotions", featured: "Featured", topRated: "Top rated", fastDelivery: "Fast delivery",
    addToCart: "Add to cart", cart: "Cart", checkout: "Checkout",
    deliveryFee: "Delivery fee", total: "Total", promo: "Promo code",
    address: "Address", payment: "Payment method", placeOrder: "Place order",
    tracking: "Tracking", driver: "Driver", eta: "Arrives in",
    settings: "Settings", language: "Language", orderHistory: "Order history",
    logout: "Log out",
    min: "min", free: "Free",
  },
} as const;

type Key = keyof typeof dict.en;

const I18nCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: Key) => string }>({
  lang: "en", setLang: () => {}, t: (k) => k,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    const stored = typeof window !== "undefined" ? (localStorage.getItem("zudgo.lang") as Lang | null) : null;
    if (stored) setLangState(stored);
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("zudgo.lang", l);
  };
  const t = (k: Key) => dict[lang][k] ?? dict.en[k] ?? k;
  return <I18nCtx.Provider value={{ lang, setLang, t }}>{children}</I18nCtx.Provider>;
}

export const useI18n = () => useContext(I18nCtx);
export const LANGS: { code: Lang; label: string; native: string; flag: string }[] = [
  { code: "tg", label: "Tajik", native: "Тоҷикӣ", flag: "🇹🇯" },
  { code: "ru", label: "Russian", native: "Русский", flag: "🇷🇺" },
  { code: "en", label: "English", native: "English", flag: "🇬🇧" },
];

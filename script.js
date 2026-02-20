// ========== STATE ==========
let page = 'landing', step = 0, ui = {}, saved = [], fb = {}, res = [];
let currentUser = null;
let authMode = 'login';

// ========== 24 REAL-WORLD PERFUMES ==========
const perfumes = [
    { id: 1, name: "Sauvage", brand: "Dior", gender: ["Male", "Unisex"], scentFamily: "Fresh", topNotes: ["Bergamot", "Pepper"], middleNotes: ["Lavender", "Geranium"], baseNotes: ["Ambroxan", "Cedar"], mood: ["Confident", "Adventurous"], personality: ["Extrovert", "Ambivert"], occasion: ["Daily Wear", "Office"], weather: ["Hot & Humid", "Mild"], skinType: ["Oily", "Combination"], priceMin: 6500, priceMax: 10000, priceRange: "Luxury", description: "A bold, magnetic woody-fresh trail", emoji: "🌊", reviews: [{ user: "Alex M.", r: 5, t: "Absolutely magnetic. I get compliments every time I wear it." }, { user: "Jordan T.", r: 4, t: "Great fresh scent, lasts about 6 hours on me." }] },
    { id: 2, name: "Chanel No. 5", brand: "Chanel", gender: ["Female"], scentFamily: "Floral", topNotes: ["Ylang-Ylang", "Neroli"], middleNotes: ["Rose", "Jasmine"], baseNotes: ["Sandalwood", "Vanilla"], mood: ["Romantic", "Calm"], personality: ["Introvert", "Creative"], occasion: ["Special Event", "Date Night"], weather: ["Cool & Dry", "Mild"], skinType: ["Dry", "Normal"], priceMin: 8000, priceMax: 14000, priceRange: "Luxury", description: "The world's most iconic floral aldehyde", emoji: "🌹", reviews: [{ user: "Sarah L.", r: 5, t: "Timeless elegance. Nothing compares to the original." }, { user: "Emily R.", r: 5, t: "My signature scent for special evenings. Pure class." }] },
    { id: 3, name: "Black Orchid", brand: "Tom Ford", gender: ["Unisex", "Female"], scentFamily: "Oriental", topNotes: ["Black Truffle", "Bergamot"], middleNotes: ["Black Orchid", "Lotus Wood"], baseNotes: ["Patchouli", "Vanilla"], mood: ["Mysterious", "Confident"], personality: ["Introvert", "Creative"], occasion: ["Special Event", "Date Night"], weather: ["Cool & Dry", "Rainy"], skinType: ["Dry", "Normal"], priceMin: 10000, priceMax: 15000, priceRange: "Luxury", description: "A luxurious dark floral of opulent depth", emoji: "🖤", reviews: [{ user: "David K.", r: 5, t: "Dark, seductive, and powerful. Not for the faint of heart." }, { user: "Lisa P.", r: 4, t: "Incredible longevity, but definitely a winter scent." }] },
    { id: 4, name: "Acqua di Gio", brand: "Giorgio Armani", gender: ["Male", "Unisex"], scentFamily: "Fresh", topNotes: ["Bergamot", "Neroli"], middleNotes: ["Sea Notes", "Rosemary"], baseNotes: ["Cedarwood", "Musk"], mood: ["Happy", "Calm"], personality: ["Ambivert", "Free Spirit"], occasion: ["Daily Wear", "Outdoor"], weather: ["Hot & Humid", "Mild"], skinType: ["Oily", "Combination"], priceMin: 5500, priceMax: 9000, priceRange: "Premium", description: "A Mediterranean breeze in a bottle", emoji: "🏖️", reviews: [{ user: "Mike S.", r: 5, t: "The perfect summer fragrance. Clean and refreshing." }, { user: "Chris B.", r: 4, t: "Classic for a reason. Great for daily office wear." }] },
    { id: 5, name: "Black Opium", brand: "Yves Saint Laurent", gender: ["Female"], scentFamily: "Gourmand", topNotes: ["Pink Pepper", "Orange Blossom"], middleNotes: ["Coffee", "Jasmine"], baseNotes: ["Vanilla", "Cedar"], mood: ["Confident", "Mysterious"], personality: ["Extrovert", "Creative"], occasion: ["Party", "Date Night"], weather: ["Cool & Dry", "Rainy"], skinType: ["Normal", "Dry"], priceMin: 6000, priceMax: 10000, priceRange: "Luxury", description: "An addictive coffee-vanilla adrenaline rush", emoji: "☕", reviews: [{ user: "Jessica W.", r: 5, t: "Addictive! The coffee note is just perfect." }, { user: "Ashley M.", r: 5, t: "My go-to party perfume. Sexy and sweet." }] },
    { id: 6, name: "Cool Water", brand: "Davidoff", gender: ["Male"], scentFamily: "Fresh", topNotes: ["Mint", "Green Notes", "Calone"], middleNotes: ["Lavender", "Jasmine"], baseNotes: ["Sandalwood", "Musk"], mood: ["Happy", "Adventurous"], personality: ["Extrovert", "Free Spirit"], occasion: ["Daily Wear", "Outdoor"], weather: ["Hot & Humid", "Mild"], skinType: ["Oily", "Combination"], priceMin: 1500, priceMax: 2800, priceRange: "Mid-Range", description: "A fresh aquatic classic since 1988", emoji: "💧", reviews: [{ user: "Tom H.", r: 4, t: "Affordable and reliable. Smells like the ocean." }, { user: "Ryan G.", r: 5, t: "Best budget freshie out there. Can't go wrong." }] },
    { id: 7, name: "CK One", brand: "Calvin Klein", gender: ["Unisex"], scentFamily: "Citrus", topNotes: ["Bergamot", "Lemon", "Pineapple"], middleNotes: ["Jasmine", "Rose", "Nutmeg"], baseNotes: ["Musk", "Cedar", "Amber"], mood: ["Happy", "Calm"], personality: ["Ambivert", "Free Spirit"], occasion: ["Daily Wear", "Office"], weather: ["Hot & Humid", "Mild"], skinType: ["Normal", "Combination"], priceMin: 1800, priceMax: 3500, priceRange: "Mid-Range", description: "The original clean unisex fragrance", emoji: "✨", reviews: [{ user: "Jamie L.", r: 4, t: "Clean, light, and inoffensive. Perfect for work." }, { user: "Sam D.", r: 5, t: "Nostalgic and fresh. Love that anyone can wear it." }] },
    { id: 8, name: "English Pear & Freesia", brand: "Jo Malone", gender: ["Female", "Unisex"], scentFamily: "Floral", topNotes: ["Pear", "Melon"], middleNotes: ["Freesia", "Rose"], baseNotes: ["Patchouli", "Musk"], mood: ["Calm", "Happy"], personality: ["Creative", "Introvert"], occasion: ["Office", "Daily Wear"], weather: ["Mild", "Cool & Dry"], skinType: ["Normal", "Dry"], priceMin: 5500, priceMax: 9500, priceRange: "Premium", description: "An elegant autumnal pear garden", emoji: "🍐", reviews: [{ user: "Olivia C.", r: 5, t: "So crisp and elegant. Makes me feel put together." }, { user: "Grace T.", r: 4, t: "Beautiful scent, wish it lasted a bit longer." }] },
    { id: 9, name: "Bloom", brand: "Gucci", gender: ["Female"], scentFamily: "Floral", topNotes: ["Rangoon Creeper"], middleNotes: ["Tuberose", "Jasmine"], baseNotes: ["Sandalwood", "Musk"], mood: ["Romantic", "Calm"], personality: ["Introvert", "Creative"], occasion: ["Date Night", "Special Event"], weather: ["Mild", "Cool & Dry"], skinType: ["Normal", "Dry"], priceMin: 5000, priceMax: 8500, priceRange: "Premium", description: "A rich white floral garden in bloom", emoji: "🌸", reviews: [{ user: "Sophia R.", r: 5, t: "Like walking into a garden. Tuberose heaven." }, { user: "Chloe B.", r: 5, t: "Very natural floral scent. Stunning bottle too." }] },
    { id: 10, name: "Pour Homme", brand: "Versace", gender: ["Male"], scentFamily: "Citrus", topNotes: ["Lemon", "Bergamot", "Neroli"], middleNotes: ["Cedar", "Sage"], baseNotes: ["Amber", "Musk"], mood: ["Confident", "Happy"], personality: ["Extrovert", "Ambivert"], occasion: ["Office", "Daily Wear"], weather: ["Hot & Humid", "Mild"], skinType: ["Oily", "Normal"], priceMin: 3500, priceMax: 5500, priceRange: "Premium", description: "A refined Mediterranean citrus-amber elegance", emoji: "🍋", reviews: [{ user: "Daniel K.", r: 5, t: "Classy and versatile. My daily driver." }, { user: "Mark P.", r: 4, t: "Sharp citrus opening that settles beautifully." }] },
    { id: 11, name: "Her", brand: "Burberry", gender: ["Female"], scentFamily: "Gourmand", topNotes: ["Dark Berries", "Blackcurrant"], middleNotes: ["Jasmine", "Violet"], baseNotes: ["Musk", "Amber", "Cashmeran"], mood: ["Happy", "Romantic"], personality: ["Creative", "Ambivert"], occasion: ["Date Night", "Party"], weather: ["Cool & Dry", "Mild"], skinType: ["Normal", "Dry"], priceMin: 4500, priceMax: 7500, priceRange: "Premium", description: "A vibrant London berry-musk embrace", emoji: "🫐", reviews: [{ user: "Ella F.", r: 5, t: "Sweet, fruity, and fun! Reminds me of strawberry milkshake." }, { user: "Mia S.", r: 4, t: "Great longevity. Very youthful and chic." }] },
    { id: 12, name: "La Nuit de L'Homme", brand: "Yves Saint Laurent", gender: ["Male"], scentFamily: "Woody", topNotes: ["Cardamom", "Bergamot"], middleNotes: ["Lavender", "Cedar"], baseNotes: ["Vetiver", "Coumarin"], mood: ["Romantic", "Mysterious"], personality: ["Introvert", "Analytical"], occasion: ["Date Night", "Special Event"], weather: ["Cool & Dry", "Rainy"], skinType: ["Dry", "Normal"], priceMin: 5500, priceMax: 9000, priceRange: "Premium", description: "A seductive spiced-lavender evening scent", emoji: "🌙", reviews: [{ user: "Jason L.", r: 5, t: "The ultimate date night fragrance. Women love it." }, { user: "Kevin W.", r: 4, t: "Spicy and warm. performance is average but smell is 10/10." }] },
    { id: 13, name: "Bottled", brand: "Hugo Boss", gender: ["Male"], scentFamily: "Woody", topNotes: ["Apple", "Citrus", "Plum"], middleNotes: ["Geranium", "Cinnamon"], baseNotes: ["Sandalwood", "Cedar", "Vetiver"], mood: ["Confident", "Calm"], personality: ["Analytical", "Ambivert"], occasion: ["Office", "Daily Wear"], weather: ["Cool & Dry", "Mild"], skinType: ["Normal", "Combination"], priceMin: 3000, priceMax: 5000, priceRange: "Mid-Range", description: "A confident fruity-woody boardroom classic", emoji: "🍎", reviews: [{ user: "Robert D.", r: 5, t: "Professional and clean. Apple pie vibes but masculine." }, { user: "Steve M.", r: 4, t: "Solid choice for the office. Can't offend anyone." }] },
    { id: 14, name: "Voyage", brand: "Nautica", gender: ["Male", "Unisex"], scentFamily: "Fresh", topNotes: ["Green Leaf", "Apple"], middleNotes: ["Mimosa", "Lotus"], baseNotes: ["Cedarwood", "Musk"], mood: ["Adventurous", "Happy"], personality: ["Free Spirit", "Extrovert"], occasion: ["Outdoor", "Daily Wear"], weather: ["Hot & Humid", "Mild"], skinType: ["Oily", "Combination"], priceMin: 1000, priceMax: 2200, priceRange: "Budget", description: "A fresh aquatic adventure for everyday wear", emoji: "⛵", reviews: [{ user: "Tyler J.", r: 5, t: "Best bang for your buck. Smells way more expensive." }, { user: "Connor B.", r: 4, t: "Great gym scent. Fresh and salty." }] },
    { id: 15, name: "Coco Mademoiselle", brand: "Chanel", gender: ["Female"], scentFamily: "Oriental", topNotes: ["Orange", "Bergamot"], middleNotes: ["Rose", "Jasmine", "Lychee"], baseNotes: ["Patchouli", "Vetiver", "Musk"], mood: ["Confident", "Romantic"], personality: ["Ambivert", "Creative"], occasion: ["Office", "Special Event"], weather: ["Cool & Dry", "Mild"], skinType: ["Normal", "Dry"], priceMin: 8000, priceMax: 13000, priceRange: "Luxury", description: "An irresistible oriental-fresh sophistication", emoji: "💎", reviews: [{ user: "Victoria H.", r: 5, t: "Sophisticated and chic. I feel powerful wearing this." }, { user: "Amanda C.", r: 5, t: "Worth every penny. Lasts all day long." }] },
    { id: 16, name: "Miss Dior", brand: "Dior", gender: ["Female"], scentFamily: "Floral", topNotes: ["Blood Orange", "Mandarin"], middleNotes: ["Rose", "Peony"], baseNotes: ["Patchouli", "Musk"], mood: ["Romantic", "Happy"], personality: ["Creative", "Free Spirit"], occasion: ["Date Night", "Daily Wear"], weather: ["Mild", "Hot & Humid"], skinType: ["Normal", "Combination"], priceMin: 6000, priceMax: 10000, priceRange: "Luxury", description: "A radiant rose-peony declaration of love", emoji: "🌺", reviews: [{ user: "Lily G.", r: 5, t: "So romantic and feminine. My wedding scent." }, { user: "Hannah K.", r: 4, t: "Beautiful rose scent, very sweet and airy." }] },
    { id: 17, name: "Luna Rossa Carbon", brand: "Prada", gender: ["Male"], scentFamily: "Woody", topNotes: ["Bergamot", "Pepper"], middleNotes: ["Lavender", "Metallic Accord"], baseNotes: ["Ambroxan", "Patchouli"], mood: ["Confident", "Adventurous"], personality: ["Analytical", "Extrovert"], occasion: ["Office", "Outdoor"], weather: ["Hot & Humid", "Mild"], skinType: ["Oily", "Combination"], priceMin: 5000, priceMax: 8500, priceRange: "Premium", description: "A modern metallic-woody powerhouse", emoji: "🏎️", reviews: [{ user: "Brandon S.", r: 5, t: "Clean, soapy, metallic. Like a freshly ironed shirt." }, { user: "Eric T.", r: 5, t: "Updates the Sauvage DNA but smoother. Love it." }] },
    { id: 18, name: "White Musk", brand: "The Body Shop", gender: ["Unisex", "Female"], scentFamily: "Fresh", topNotes: ["Peach Nectar", "Lily"], middleNotes: ["Rose", "Jasmine"], baseNotes: ["White Musk", "Cashmeran"], mood: ["Calm", "Happy"], personality: ["Introvert", "Free Spirit"], occasion: ["Daily Wear", "Office"], weather: ["Mild", "Cool & Dry"], skinType: ["Normal", "Dry"], priceMin: 800, priceMax: 1600, priceRange: "Budget", description: "A clean, ethical everyday musk", emoji: "🤍", reviews: [{ user: "Nina P.", r: 5, t: "So comforting and soft. My bedtime scent." }, { user: "Rachel M.", r: 4, t: "Clean laundry vibes. Simple and lovely." }] },
    { id: 19, name: "Eros", brand: "Versace", gender: ["Male"], scentFamily: "Oriental", topNotes: ["Mint", "Green Apple", "Lemon"], middleNotes: ["Tonka Bean", "Geranium"], baseNotes: ["Vanilla", "Vetiver", "Oakmoss"], mood: ["Confident", "Adventurous"], personality: ["Extrovert", "Ambivert"], occasion: ["Party", "Date Night"], weather: ["Cool & Dry", "Mild"], skinType: ["Normal", "Combination"], priceMin: 4000, priceMax: 7000, priceRange: "Premium", description: "A bold sweet-fresh god of love", emoji: "💙", reviews: [{ user: "Justin B.", r: 5, t: "Beast mode projection! Perfect primarily for clubbing." }, { user: "Matt R.", r: 4, t: "Sweet minty vanilla. Ladies love it." }] },
    { id: 20, name: "Bombshell", brand: "Victoria's Secret", gender: ["Female"], scentFamily: "Floral", topNotes: ["Purple Passion Fruit", "Peony"], middleNotes: ["Vanilla Orchid", "Jasmine"], baseNotes: ["Musk", "Velvet Moss"], mood: ["Happy", "Confident"], personality: ["Extrovert", "Free Spirit"], occasion: ["Party", "Daily Wear"], weather: ["Hot & Humid", "Mild"], skinType: ["Oily", "Normal"], priceMin: 3000, priceMax: 5500, priceRange: "Mid-Range", description: "A playful fruity-floral bestseller", emoji: "💜", reviews: [{ user: "Kylie J.", r: 5, t: "Fruity and fresh! Always makes me feel happy." }, { user: "Megan F.", r: 4, t: "Great scent, just have to reapply often." }] },
    { id: 21, name: "Red", brand: "Wild Stone", gender: ["Male"], scentFamily: "Oriental", topNotes: ["Bergamot", "Cinnamon"], middleNotes: ["Cedar", "Sandalwood"], baseNotes: ["Musk", "Vanilla"], mood: ["Confident", "Mysterious"], personality: ["Analytical", "Introvert"], occasion: ["Daily Wear", "Office"], weather: ["Hot & Humid", "Mild"], skinType: ["Oily", "Combination"], priceMin: 500, priceMax: 900, priceRange: "Budget", description: "A warm spicy oriental for everyday confidence", emoji: "🔴", reviews: [{ user: "Rahul S.", r: 5, t: "Unbeatable for the price. Smells very premium." }, { user: "Vikram A.", r: 4, t: "Punchy and spicy. Great for daily use." }] },
    { id: 22, name: "Zara Red Vanilla", brand: "Zara", gender: ["Unisex", "Female"], scentFamily: "Gourmand", topNotes: ["Red Apple", "Bergamot"], middleNotes: ["Vanilla", "Cinnamon"], baseNotes: ["Tonka Bean", "Musk"], mood: ["Romantic", "Happy"], personality: ["Creative", "Free Spirit"], occasion: ["Date Night", "Daily Wear"], weather: ["Cool & Dry", "Mild"], skinType: ["Normal", "Dry"], priceMin: 1200, priceMax: 2200, priceRange: "Budget", description: "A cozy vanilla-apple sweetness at a steal", emoji: "🍎", reviews: [{ user: "Priya M.", r: 5, t: "Dupe for LVEB! So warm and delicious." }, { user: "Anjali K.", r: 4, t: "Sweet and cozy. Perfect for winter days." }] },
    { id: 23, name: "Light Blue", brand: "Dolce & Gabbana", gender: ["Unisex", "Female"], scentFamily: "Citrus", topNotes: ["Sicilian Lemon", "Apple", "Bluebell"], middleNotes: ["Jasmine", "Bamboo", "Rose"], baseNotes: ["Cedarwood", "Amber", "Musk"], mood: ["Happy", "Adventurous"], personality: ["Free Spirit", "Extrovert"], occasion: ["Outdoor", "Daily Wear"], weather: ["Hot & Humid", "Mild"], skinType: ["Oily", "Combination"], priceMin: 4500, priceMax: 7500, priceRange: "Premium", description: "A sunny Sicilian citrus Mediterranean escape", emoji: "🍋", reviews: [{ user: "Maria C.", r: 5, t: "Summer in a bottle. Zesty and uplifting." }, { user: "Sophie T.", r: 5, t: "My signature summer scent for 10 years." }] },
    { id: 24, name: "Velvet Rose & Oud", brand: "Jo Malone", gender: ["Unisex"], scentFamily: "Woody", topNotes: ["Clove", "Praline"], middleNotes: ["Damask Rose", "Oud"], baseNotes: ["Smoky Wood", "Cashmere"], mood: ["Mysterious", "Romantic"], personality: ["Introvert", "Analytical"], occasion: ["Special Event", "Date Night"], weather: ["Cool & Dry", "Rainy"], skinType: ["Dry", "Normal"], priceMin: 9000, priceMax: 15000, priceRange: "Luxury", description: "A sumptuous rose-oud evening masterpiece", emoji: "🥀", reviews: [{ user: "Aisha N.", r: 5, t: "Rich, jammy rose wrapped in velvet oud. Stunning." }, { user: "Zara Q.", r: 5, t: "Intoxicating and deep. Perfect for formal events." }] }
];

// ========== QUIZ STEPS ==========
let userCurrency = localStorage.getItem('veloura_cur') || 'INR';
const currencyConfig = {
    INR: { rate: 1, symbol: '₹', locale: 'en-IN' },
    USD: { rate: 0.012, symbol: '$', locale: 'en-US' },
    EUR: { rate: 0.011, symbol: '€', locale: 'de-DE' },
    CNY: { rate: 0.086, symbol: '¥', locale: 'zh-CN' },
    JPY: { rate: 1.81, symbol: '¥', locale: 'ja-JP' }
};

function toggleCurDropdown() {
    document.getElementById('curOptions').classList.toggle('active');
}

function selectCurrency(cur) {
    userCurrency = cur;
    localStorage.setItem('veloura_cur', cur);
    updateCurDisplay();
    document.getElementById('curOptions').classList.remove('active');

    if (page === 'quiz') renderQuiz();
    if (page === 'results') renderResults();
    if (page === 'explore') filterExplore();

    toast(`Currency changed to ${cur} ${currencyConfig[cur].symbol}`);
}

function updateCurDisplay() {
    const cfg = currencyConfig[userCurrency];
    const el = document.getElementById('curSelectedText');
    if (el) el.textContent = `${cfg.symbol} ${userCurrency}`;
}

// Close dropdown on click outside
window.addEventListener('click', (e) => {
    if (!e.target.closest('#curSelectContainer')) {
        const opt = document.getElementById('curOptions');
        if (opt) opt.classList.remove('active');
    }
});

function formatPrice(amt) {
    const cfg = currencyConfig[userCurrency];
    const val = Math.round(amt * cfg.rate);
    return cfg.symbol + val.toLocaleString(cfg.locale);
}

function changeCurrency(cur) {
    userCurrency = cur;
    localStorage.setItem('veloura_cur', cur);
    if (page === 'quiz') renderQuiz();
    if (page === 'results') renderResults();
    if (page === 'explore') filterExplore();
}

// ========== QUIZ STEPS ==========
const steps = [
    {
        key: "gender", title: "Who are you shopping for?", sub: "Fragrance knows no boundaries — pick what suits you best", cols: 4, opts: [
            { v: "Male", e: "👨", l: "Male" }, { v: "Female", e: "👩", l: "Female" },
            { v: "Unisex", e: "⚧️", l: "Unisex" }, { v: "Non-binary", e: "🌈", l: "Non-binary" }]
    },
    {
        key: "mood", title: "What's your current mood?", sub: "Choose the energy you want your scent to reflect", cols: 3, opts: [
            { v: "Happy", e: "😄", l: "Happy" }, { v: "Romantic", e: "💕", l: "Romantic" },
            { v: "Confident", e: "💪", l: "Confident" }, { v: "Calm", e: "🧘", l: "Calm" },
            { v: "Adventurous", e: "🏔️", l: "Adventurous" }, { v: "Mysterious", e: "🌑", l: "Mysterious" }]
    },
    {
        key: "personality", title: "How would you describe yourself?", sub: "Your personality shapes how a scent feels on you", cols: 3, opts: [
            { v: "Introvert", e: "📖", l: "Introvert" }, { v: "Extrovert", e: "🎉", l: "Extrovert" },
            { v: "Ambivert", e: "⚖️", l: "Ambivert" }, { v: "Creative", e: "🎨", l: "Creative" },
            { v: "Analytical", e: "🔬", l: "Analytical" }, { v: "Free Spirit", e: "🦋", l: "Free Spirit" }]
    },
    {
        key: "occasion", title: "Where will you wear this?", sub: "The right scent for the right moment", cols: 3, opts: [
            { v: "Daily Wear", e: "☀️", l: "Daily Wear" }, { v: "Date Night", e: "🌹", l: "Date Night" },
            { v: "Office", e: "💼", l: "Office" }, { v: "Party", e: "🎊", l: "Party" },
            { v: "Outdoor", e: "🏕️", l: "Outdoor" }, { v: "Special Event", e: "👑", l: "Special Event" }]
    },
    {
        key: "scentFamily", title: "Which scent world calls to you?", sub: "Each family has a distinct character", cols: 3, opts: [
            { v: "Floral", e: "🌹", l: "Floral", d: "Rose, jasmine, peony" },
            { v: "Woody", e: "🪵", l: "Woody", d: "Sandalwood, cedar, vetiver" },
            { v: "Fresh", e: "💧", l: "Fresh", d: "Aquatic, green, ozonic" },
            { v: "Oriental", e: "✦", l: "Oriental", d: "Amber, spice, incense" },
            { v: "Citrus", e: "🍋", l: "Citrus", d: "Lemon, bergamot, orange" },
            { v: "Gourmand", e: "🍫", l: "Gourmand", d: "Vanilla, coffee, caramel" }]
    },
    {
        key: "weather", title: "What's the typical weather?", sub: "Temperature affects how perfume projects", cols: 4, opts: [
            { v: "Hot & Humid", e: "☀️", l: "Hot & Humid" }, { v: "Cold", e: "❄️", l: "Cold / Winter" },
            { v: "Temperate", e: "🌤️", l: "Temperate / Spring" }, { v: "Hot & Dry", e: "🌵", l: "Hot & Dry" }]
    },
    {
        key: "skinType", title: "What's your skin type?", sub: "Skin chemistry affects longevity & projection", cols: 3, opts: [
            { v: "Oily", e: "💧", l: "Oily", d: "Holds scent longer" },
            { v: "Dry", e: "🌵", l: "Dry", d: "Needs stronger notes" },
            { v: "Normal", e: "✨", l: "Normal", d: "Balanced performance" },
            { v: "Combination", e: "🔄", l: "Combination", d: "Mixed zones" },
            { v: "Sensitive", e: "🌿", l: "Sensitive", d: "Gentle formulas" },
            { v: "Hyperhidrosis", e: "💦", l: "Hyperhidrosis", d: "Sweat-resistant" }]
    },
    {
        key: "budget", title: "What's your budget?", sub: "We have options for every price point", type: 'slider'
    }
];

// ========== NAVIGATION ==========
function showPage(p) {
    document.querySelectorAll('.page').forEach(x => x.classList.remove('active'));
    document.getElementById('page-' + p).classList.add('active');
    page = p;
    if (p === 'quiz') renderQuiz();
    if (p === 'loading') runLoader();
    window.scrollTo(0, 0);
}

// ========== QUIZ (VERTICAL SCROLL) ==========
function renderQuiz() {
    const container = document.getElementById('quiz-sections');
    let html = '';
    steps.forEach((s, i) => {
        html += `<div class="q-section" id="q-${s.key}">`;
        html += `<div class="q-num">Question ${i + 1} of ${steps.length}</div>`;
        html += `<h2>${s.title}</h2>`;
        html += `<p class="q-sub">${s.sub}</p>`;

        if (s.type === 'slider') {
            const v = ui.budget || 3000;
            html += `<div class="budget-wrap">
                        <div class="bv" id="bv">${formatPrice(v)}</div>
                        <div class="bt" id="bt">${tier(v)}</div>
                        <input type="range" id="bslider" min="500" max="50000" step="500" value="${v}">
                        <div class="range-labels"><span>${formatPrice(500)}</span><span>${formatPrice(50000)}+</span></div>
                    </div>`;
        } else {
            html += `<div class="opts${s.cols === 4 ? ' col4' : ''}">`;
            s.opts.forEach(o => {
                const sel = ui[s.key] === o.v ? ' picked' : '';
                html += `<div class="opt${sel}" onclick="pick('${s.key}','${o.v.replace(/'/g, "\\'")}',this)">
                            <span class="oe">${o.e}</span>${o.l}${o.d ? `<span class="od">${o.d}</span>` : ''}
                        </div>`;
            });
            html += '</div>';
        }

        // Navigation Buttons (Next/Back) per section
        html += `<div class="quiz-nav">
                    ${i > 0 ? `<button class="nav-btn prev" onclick="scrollToQ(${i - 1})">← Back</button>` : '<div></div>'}
                    ${i < steps.length - 1
                ? `<button class="nav-btn next" onclick="scrollToQ(${i + 1})">Next →</button>`
                : ''}
                </div>`;
        html += '</div>';
    });

    // Final Submit Button
    html += `<div class="quiz-submit-row">
                <button class="cta" onclick="submitQuiz()">Find Matches ✨</button>
             </div>`;

    container.innerHTML = html;

    // Budget slider
    if (!ui.budget) ui.budget = 3000;
    const slider = document.getElementById('bslider');
    if (slider) {
        slider.addEventListener('input', function () {
            ui.budget = +this.value;
            document.getElementById('bv').textContent = formatPrice(this.value);
            document.getElementById('bt').textContent = tier(this.value);
        });
    }

    // Show submit button row container if hidden
    const btnRow = document.getElementById('quiz-result-btn');
    if (btnRow) btnRow.style.display = 'none'; // We render it inside container now
}

function scrollToQ(idx) {
    const el = document.querySelectorAll('.q-section')[idx];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function tier(v) {
    v = +v;
    const r = currencyConfig[userCurrency].rate;
    if (v <= 2000 * r) return 'Budget Friendly';
    if (v <= 6000 * r) return 'Mid-Range';
    if (v <= 15000 * r) return 'Premium';
    if (v <= 30000 * r) return 'Luxury';
    return 'Ultra Luxury';
}

function pick(k, v, el) {
    ui[k] = v;
    el.closest('.opts').querySelectorAll('.opt').forEach(c => c.classList.remove('picked'));
    el.classList.add('picked');

    // Auto-scroll to next unanswered or next section
    const currentIdx = steps.findIndex(s => s.key === k);
    if (currentIdx < steps.length - 1) {
        setTimeout(() => scrollToQ(currentIdx + 1), 400);
    }
    updateProgress();
}

function updateProgress() {
    const required = ['gender', 'mood', 'personality', 'occasion', 'scentFamily', 'skinType', 'weather'];
    const filled = required.filter(k => ui[k]).length;
    const pct = Math.round((filled / required.length) * 100);
    const bar = document.getElementById('quiz-progress-fill');
    if (bar) bar.style.width = pct + '%';
}

function submitQuiz() {
    const required = ['gender', 'mood', 'personality', 'occasion', 'scentFamily', 'skinType', 'weather'];
    const missing = required.filter(k => !ui[k]);
    if (missing.length > 0) {
        toast(`Please answer all questions (${missing.length} left)`);
        const idx = steps.findIndex(s => s.key === missing[0]);
        scrollToQ(idx);
        return;
    }
    if (!ui.budget) ui.budget = 3000;
    showPage('loading');
}

// ========== LOADER ==========
function runLoader() {
    const msgs = ["Analyzing your personality…", "Mapping scent profiles…", "Calculating compatibility…", "Curating your collection…"];
    let i = 0; const el = document.getElementById('loader-text');
    const iv = setInterval(() => { i++; if (i < msgs.length) el.textContent = msgs[i] }, 800);
    setTimeout(() => { clearInterval(iv); calcResults(); showPage('results') }, 3400);
}

// ========== SCORING ==========
function score(p) {
    let s = 0;
    if (ui.gender === 'Non-binary' || ui.gender === 'Unisex' || p.gender.includes(ui.gender) || p.gender.includes('Unisex')) s += 10;
    if (p.mood.includes(ui.mood)) s += 25;
    if (p.personality.includes(ui.personality)) s += 20;
    if (p.scentFamily === ui.scentFamily) s += 30;
    if (p.occasion.includes(ui.occasion)) s += 15;
    if (p.weather.includes(ui.weather)) s += 10;
    if (p.skinType.includes(ui.skinType)) s += 10;
    if (ui.budget >= p.priceMin) s += 15;
    s += (fb[p.id] || 0);
    return Math.min(100, Math.max(0, Math.round(s / 135 * 100)));
}
function calcResults() {
    res = perfumes.map(p => ({ ...p, match: score(p) })).sort((a, b) => b.match - a.match).slice(0, 6);
    renderResults();
}

function generateExplanation(p) {
    const reasons = [];
    if (p.mood.includes(ui.mood)) reasons.push(`Matches your **${ui.mood}** mood perfectly.`);
    if (p.scentFamily === ui.scentFamily) reasons.push(`Features the **${ui.scentFamily}** family you prefer.`);
    if (p.personality.includes(ui.personality)) reasons.push(`Fits your **${ui.personality}** character.`);
    if (p.occasion.includes(ui.occasion)) reasons.push(`Ideal for **${ui.occasion}** settings.`);
    if (p.weather.includes(ui.weather)) reasons.push(`Works great in **${ui.weather}** conditions.`);

    return reasons.length > 0
        ? reasons.join(' ')
        : "A balanced choice that aligns with your overall style and budget preferences.";
}

function renderResults() {
    document.getElementById('summary').innerHTML = `Based on your <strong>${ui.mood}</strong> mood, <strong>${ui.personality}</strong> personality, for <strong>${ui.occasion}</strong> — here are your top matches`;
    let h = '';
    res.forEach((p, i) => {
        const sv = saved.includes(p.id), fw = fb[p.id] || 0;
        const sf = 'sf-' + p.scentFamily.toLowerCase();

        // Intensity percentages for Note Bars (simulated)
        const topInt = 80 + Math.floor(Math.random() * 20);
        const midInt = 60 + Math.floor(Math.random() * 30);
        const baseInt = 40 + Math.floor(Math.random() * 40);

        // Reviews HTML
        const reviewsHtml = (p.reviews || []).map(r => `
            <div class="review-card">
                <div class="rev-head">
                    <span class="rev-user">${r.user}</span>
                    <span class="rev-stars">${'★'.repeat(r.r)}${'☆'.repeat(5 - r.r)}</span>
                </div>
                <p class="rev-text">"${r.t}"</p>
            </div>
        `).join('');

        h += `<div class="p-card" style="animation-delay:${i * .08}s">
      <div class="p-head">
        <span class="p-emoji">${p.emoji}</span>
        <div>
            <span class="p-match">${p.match}%</span>
            <span class="p-match-label">match</span>
        </div>
      </div>
      
      <div class="p-name">${p.name}</div>
      <div class="p-brand">${p.brand}</div>
      <span class="s-badge ${sf}">${p.scentFamily}</span>

      <div class="ai-exp-box">
        <button class="ai-exp-toggle" onclick="this.nextElementSibling.classList.toggle('hidden')">
            <span>✨ Why this perfume?</span>
            <span class="chevron">▾</span>
        </button>
        <div class="ai-exp-text hidden">${generateExplanation(p)}</div>
      </div>

      <div class="notes-viz">
        <div class="note-bar">
            <div class="note-info"><span>Top Notes</span><small>${p.topNotes[0]}</small></div>
            <div class="note-track"><div class="note-fill top" style="width:${topInt}%"></div></div>
        </div>
        <div class="note-bar">
            <div class="note-info"><span>Heart Notes</span><small>${p.middleNotes[0]}</small></div>
            <div class="note-track"><div class="note-fill mid" style="width:${midInt}%"></div></div>
        </div>
        <div class="note-bar">
            <div class="note-info"><span>Base Notes</span><small>${p.baseNotes[0]}</small></div>
            <div class="note-track"><div class="note-fill base" style="width:${baseInt}%"></div></div>
        </div>
      </div>

      <div class="p-price">${formatPrice(p.priceMin)} – ${formatPrice(p.priceMax)}  ·  ${p.priceRange}</div>
      <div class="occ-tags">${p.occasion.map(o => `<span class="occ-tag">${o}</span>`).join('')}</div>
      
      <button class="rev-toggle-btn" onclick="toggleReviews(${p.id}, this)">
        See ${p.reviews ? p.reviews.length : 0} Reviews 💬
      </button>
      <div id="rev-${p.id}" class="perfume-reviews hidden">
        ${reviewsHtml}
      </div>

      <div class="p-actions">
        <button id="sv-${p.id}" class="${sv ? 'saved' : ''}" onclick="doSave(${p.id})">💾 ${sv ? 'Saved' : 'Save'}</button>
        <button id="lk-${p.id}" class="${fw > 0 ? 'liked' : ''}" onclick="doLike(${p.id})">👍</button>
        <button id="dl-${p.id}" class="${fw < 0 ? 'disliked' : ''}" onclick="doDis(${p.id})">👎</button>
      </div>
    </div>`;
    });
    document.getElementById('r-grid').innerHTML = h;
}

function toggleReviews(id, btn) {
    const el = document.getElementById('rev-' + id);
    const isHidden = el.classList.contains('hidden');
    el.classList.toggle('hidden');
    btn.textContent = isHidden ? 'Hide Reviews ▲' : `See Reviews 💬`;
    btn.classList.toggle('active', isHidden);
}

// ========== FEEDBACK ==========
function doSave(id) { const i = saved.indexOf(id); if (i > -1) saved.splice(i, 1); else saved.push(id); const b = document.getElementById('sv-' + id); b.classList.toggle('saved'); b.textContent = saved.includes(id) ? '💾 Saved' : '💾 Save'; toast(saved.includes(id) ? 'Added to your collection 💾' : 'Removed from collection') }
function doLike(id) { fb[id] = 5; document.getElementById('lk-' + id).classList.add('liked'); document.getElementById('dl-' + id).classList.remove('disliked'); toast('Preference saved — results improved 🎯') }
function doDis(id) { fb[id] = -10; document.getElementById('dl-' + id).classList.add('disliked'); document.getElementById('lk-' + id).classList.remove('liked'); toast("We'll adjust your recommendations 🎯") }
function toast(m) { const t = document.createElement('div'); t.className = 'toast'; t.textContent = m; document.body.appendChild(t); setTimeout(() => t.remove(), 3200) }
function retake() { ui = {}; res = []; showPage('landing') }

// ========== THEME TOGGLE ==========
function toggleTheme() {
    const html = document.documentElement;
    const isLight = html.getAttribute('data-theme') === 'light';
    html.setAttribute('data-theme', isLight ? 'dark' : 'light');
    document.getElementById('themeToggle').classList.toggle('light', !isLight);
    document.getElementById('toggleBall').textContent = isLight ? '🌙' : '☀️';
    localStorage.setItem('veloura_theme', isLight ? 'dark' : 'light');
}

// ========== AUTH SYSTEM ==========
const API = ''; // same origin

function switchTab(mode) {
    authMode = mode;
    document.getElementById('tab-login').classList.toggle('active', mode === 'login');
    document.getElementById('tab-signup').classList.toggle('active', mode === 'signup');
    document.getElementById('fg-name').style.display = mode === 'signup' ? 'block' : 'none';
    document.getElementById('auth-btn').textContent = mode === 'signup' ? 'Create Account' : 'Sign In';
    document.getElementById('auth-error').textContent = '';
}

async function handleAuth(e) {
    e.preventDefault();
    const email = document.getElementById('auth-email').value.trim();
    const pass = document.getElementById('auth-pass').value;
    const name = document.getElementById('auth-name').value.trim();
    const errEl = document.getElementById('auth-error');
    errEl.textContent = '';

    try {
        if (authMode === 'signup') {
            if (!name) { errEl.textContent = 'Please enter your name'; return false; }
            const resp = await fetch(API + '/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password: pass })
            });
            const data = await resp.json();
            if (!resp.ok) { errEl.textContent = data.error; return false; }
            loginAs(data.user.email, data.user.name, [], {});
            toast('Account created — welcome to VELOURA! ✨');
        } else {
            const resp = await fetch(API + '/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password: pass })
            });
            const data = await resp.json();
            if (!resp.ok) { errEl.textContent = data.error; return false; }
            loginAs(data.user.email, data.user.name, data.user.saved || [], data.user.fb || {});
            toast('Welcome back, ' + data.user.name + '! ✨');
        }
    } catch (err) {
        errEl.textContent = 'Server unavailable — please try again';
        console.error('Auth error:', err);
    }
    return false;
}

function loginAs(email, name, sv, feedback) {
    currentUser = { email, name };
    saved = sv;
    fb = feedback;
    localStorage.setItem('veloura_session', JSON.stringify(currentUser));
    updateNavUser();
    showPage('landing');
}

function guestLogin() {
    currentUser = { email: 'guest', name: 'Guest' };
    localStorage.setItem('veloura_session', JSON.stringify(currentUser));
    updateNavUser();
    showPage('landing');
    toast('Browsing as guest — sign up to save preferences');
}

function doLogout() {
    if (!confirm('Sign out of VELOURA?')) return;
    saveUserData();
    currentUser = null;
    localStorage.removeItem('veloura_session');
    saved = []; fb = {};
    document.getElementById('navUser').style.display = 'none';
    showPage('login');
    toast('Signed out successfully');
}

function updateNavUser() {
    const nu = document.getElementById('navUser');
    if (currentUser) {
        nu.style.display = 'flex';
        document.getElementById('navAvatar').textContent = currentUser.name.charAt(0).toUpperCase();
        document.getElementById('navName').textContent = currentUser.name;
    } else {
        nu.style.display = 'none';
    }
}

function saveUserData() {
    if (!currentUser || currentUser.email === 'guest') return;
    fetch(API + '/api/save-prefs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: currentUser.email, saved, fb })
    }).catch(err => console.error('Save prefs error:', err));
}

// Save data on feedback actions
const origSave = doSave, origLike = doLike, origDis = doDis;
doSave = function (id) { origSave(id); saveUserData(); };
doLike = function (id) { origLike(id); saveUserData(); };
doDis = function (id) { origDis(id); saveUserData(); };

// ========== INIT ==========
(async function init() {
    // Restore currency selection
    updateCurDisplay();

    // Restore theme
    const savedTheme = localStorage.getItem('veloura_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'light') {
        document.getElementById('themeToggle').classList.add('light');
        document.getElementById('toggleBall').textContent = '☀️';
    }
    // Auto-login from session
    const session = JSON.parse(localStorage.getItem('veloura_session') || 'null');
    if (session) {
        currentUser = session;
        if (session.email !== 'guest') {
            // Try to load user data from server
            try {
                const resp = await fetch(API + '/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: session.email, password: '__session_restore__' })
                });
                // Silent fail — user will need to re-login if session is invalid
            } catch (e) { /* server offline, use cached session */ }
        }
        updateNavUser();
        showPage('landing');
    } else {
        showPage('login');
    }
})();

// ========== NAV SCROLL ==========
window.addEventListener('scroll', () => { document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 40) });

// ========== FEEDBACK & QUERIES ==========
let fbMode = 'feedback';
let fbRating = 0;

function switchFbTab(mode) {
    fbMode = mode;
    document.getElementById('fb-tab-feedback').classList.toggle('active', mode === 'feedback');
    document.getElementById('fb-tab-query').classList.toggle('active', mode === 'query');
    document.getElementById('fb-rating-group').style.display = mode === 'feedback' ? 'block' : 'none';
    document.getElementById('fb-category-group').style.display = mode === 'query' ? 'block' : 'none';
    document.getElementById('fb-message-label').textContent = mode === 'feedback' ? 'Your Feedback' : 'Your Question';
    document.getElementById('fb-message').placeholder = mode === 'feedback' ? 'Tell us what you think...' : 'What would you like to know?';
    document.getElementById('fb-submit-btn').innerHTML = mode === 'feedback' ? 'Send Feedback <span class="cta-arrow">→</span>' : 'Submit Query <span class="cta-arrow">→</span>';
    document.getElementById('fb-success').textContent = '';
}

function rateStar(val) {
    fbRating = val;
    document.querySelectorAll('.star-rating .star').forEach(s => {
        s.classList.toggle('active', +s.dataset.val <= val);
    });
}

async function submitFeedback(e) {
    e.preventDefault();
    const name = document.getElementById('fb-name').value.trim();
    const email = document.getElementById('fb-email').value.trim();
    const message = document.getElementById('fb-message').value.trim();

    if (!name || !email || !message) return false;
    if (fbMode === 'feedback' && fbRating === 0) {
        document.getElementById('fb-success').textContent = 'Please select a star rating';
        document.getElementById('fb-success').style.color = '#f87171';
        return false;
    }

    const entry = {
        type: fbMode,
        name,
        email,
        message,
        rating: fbMode === 'feedback' ? fbRating : null,
        category: fbMode === 'query' ? document.getElementById('fb-category').value : null
    };

    try {
        // Save to server
        const resp = await fetch(API + '/api/feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(entry)
        });
        if (!resp.ok) throw new Error('Server error');

        // Show success
        const successEl = document.getElementById('fb-success');
        successEl.style.color = '';
        successEl.textContent = fbMode === 'feedback'
            ? '✨ Thank you for your feedback! We truly appreciate it.'
            : '✨ Your query has been submitted! We\'ll get back to you soon.';

        // Reset form
        document.getElementById('fb-message').value = '';
        fbRating = 0;
        document.querySelectorAll('.star-rating .star').forEach(s => s.classList.remove('active'));

        // Refresh history
        renderFbHistory();
        toast(fbMode === 'feedback' ? 'Feedback sent! 💬' : 'Query submitted! ❓');
    } catch (err) {
        document.getElementById('fb-success').textContent = 'Failed to submit — please try again';
        document.getElementById('fb-success').style.color = '#f87171';
        console.error('Feedback error:', err);
    }

    return false;
}

async function renderFbHistory() {
    const list = document.getElementById('fb-history-list');
    const container = document.getElementById('fb-history');
    const email = currentUser ? currentUser.email : null;

    if (!email || email === 'guest') {
        container.style.display = 'none';
        return;
    }

    try {
        const resp = await fetch(API + '/api/feedback/' + encodeURIComponent(email));
        const data = await resp.json();
        const history = data.feedback || [];

        if (history.length === 0) {
            container.style.display = 'none';
            return;
        }
        container.style.display = 'block';

        list.innerHTML = history.slice(0, 10).map(item => {
            const d = new Date(item.date);
            const dateStr = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) + ' · ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
            const typeClass = item.type === 'query' ? 'query' : '';
            const stars = item.rating ? '<div class="fb-item-stars">' + '★'.repeat(item.rating) + '☆'.repeat(5 - item.rating) + '</div>' : '';
            const cat = item.category ? ` · ${item.category}` : '';
            return `<div class="fb-item">
                        <div class="fb-item-header">
                            <span class="fb-item-type ${typeClass}">${item.type}${cat}</span>
                            <span class="fb-item-date">${dateStr}</span>
                        </div>
                        ${stars}
                        <div class="fb-item-msg">${item.message}</div>
                    </div>`;
        }).join('');
    } catch (err) {
        container.style.display = 'none';
        console.error('Load history error:', err);
    }
}

// Auto-fill feedback form with logged-in user info
function prefillFeedbackForm() {
    if (currentUser && currentUser.email !== 'guest') {
        const nameEl = document.getElementById('fb-name');
        const emailEl = document.getElementById('fb-email');
        if (nameEl && !nameEl.value) nameEl.value = currentUser.name;
        if (emailEl && !emailEl.value) emailEl.value = currentUser.email;
    }
    renderFbHistory();
}

// Patch showPage to handle feedback
const _origShowPage = showPage;
showPage = function (p) {
    _origShowPage(p);
    if (p === 'feedback') prefillFeedbackForm();
};

// ========== DEMO MODE ==========
function startDemo() {
    // 1. Set guest user
    currentUser = { email: 'demo@veloura.app', name: 'Demo Visitor' };
    localStorage.setItem('veloura_session', JSON.stringify(currentUser));
    updateNavUser();

    // 2. Randomly fill quiz
    ui = { budget: 5000 + Math.floor(Math.random() * 10000) };
    const randomPick = (arr) => arr[Math.floor(Math.random() * arr.length)];

    // Extract options from steps
    steps.forEach(s => {
        if (s.opts) {
            ui[s.key] = randomPick(s.opts).v;
        }
    });

    // 3. Show loading -> results
    toast('⚡ Demo Mode: Generating results...');
    showPage('loading');
}

// ========== PROFILE ==========
function showProfile() {
    showPage('profile');
    const p = generateScentProfile();
    const card = document.getElementById('profile-card');

    // Trait bars HTML
    const traitsHtml = p.traits.map(t => `
        <div class="trait-row">
            <span class="trait-label">${t.label}</span>
            <div class="trait-track">
                <div class="trait-fill" style="width: ${t.val}%"></div>
            </div>
            <span class="trait-val">${t.val}%</span>
        </div>
    `).join('');

    card.innerHTML = `
        <div class="profile-header">
            <div class="profile-icon">${p.icon}</div>
            <h2>${p.title}</h2>
            <p class="profile-desc">${p.desc}</p>
        </div>
        <div class="profile-traits">
            <h3>Your Olfactory DNA</h3>
            ${traitsHtml}
        </div>
        <div class="profile-quote">"${p.quote}"</div>
    `;
}

function generateScentProfile() {
    // Determine archetype based on mood + family
    let title = "The Modern Minimalist";
    let desc = "You appreciate clean lines, subtle elegance, and fragrances that whisper rather than shout.";
    let icon = "🌿";
    let quote = "Simplicity is the ultimate sophistication.";

    const mood = ui.mood || '';
    const family = ui.scentFamily || '';

    if (mood === 'Romantic' || family === 'Floral') {
        title = "The Hopeless Romantic";
        desc = "Driven by emotion and beauty, you seek scents that tell a love story.";
        icon = "🌹";
        quote = "Where there is love, there is life.";
    } else if (mood === 'Confident' || mood === 'Adventurous') {
        title = "The Bold Trailblazer";
        desc = "You're not afraid to stand out. Your scent is your armor and statement piece.";
        icon = "🔥";
        quote = "Fortune favors the bold.";
    } else if (family === 'Oriental' || family === 'Woody') {
        title = "The Mysterious Enigma";
        desc = "Complex and deep, you prefer fragrances with layers that reveal themselves slowly.";
        icon = "🌙";
        quote = "Mystery is the key to attraction.";
    } else if (ui.budget > 10000) {
        title = "The Luxury Connoisseur";
        desc = "You have refined taste and appreciate the craftsmanship of niche perfumery.";
        icon = "💎";
        quote = "Quality is not an act, it is a habit.";
    }

    // Generate Trait scores (pseudo-random based on selections)
    return {
        title, desc, icon, quote,
        traits: [
            { label: 'Boldness', val: (mood === 'Confident' ? 92 : 55) },
            { label: 'Warmth', val: (family === 'Oriental' || family === 'Woody' ? 88 : 42) },
            { label: 'Complexity', val: (ui.budget > 8000 ? 85 : 45) },
            { label: 'Freshness', val: (family === 'Fresh' || family === 'Citrus' ? 90 : 35) }
        ]
    };
}

function shareProfile() {
    if (navigator.share) {
        navigator.share({
            title: 'My VELOURA Scent Profile',
            text: `I'm a "${generateScentProfile().title}"! Find your signature scent on Veloura.`,
            url: window.location.href
        });
    } else {
        toast('Link copied to clipboard! 📋');
        navigator.clipboard.writeText(window.location.href);
    }
}

// ========== EXPLORE & COMPARE ==========
let compareList = [];

function filterExplore() {
    const q = document.getElementById('explore-search').value.toLowerCase();
    const fam = document.getElementById('explore-family').value;
    const price = document.getElementById('explore-price').value;

    const filtered = perfumes.filter(p => {
        const matchesQ = p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
        const matchesFam = !fam || p.scentFamily === fam;
        let matchesPrice = true;
        if (price === 'low') matchesPrice = p.priceMin < 5000;
        if (price === 'mid') matchesPrice = p.priceMin >= 5000 && p.priceMin <= 15000;
        if (price === 'high') matchesPrice = p.priceMin > 15000;

        return matchesQ && matchesFam && matchesPrice;
    });

    renderExplore(filtered);
}

function renderExplore(list) {
    if (!list) return filterExplore(); // Initial call

    const grid = document.getElementById('explore-grid');
    if (!grid) return;

    if (list.length === 0) {
        grid.innerHTML = '<div class="no-results">No perfumes found matching your criteria.</div>';
        return;
    }

    grid.innerHTML = list.map((p, i) => `
        <div class="p-card" style="animation-delay: ${Math.min(i * 50, 500)}ms">
            <div class="p-emoji">${p.emoji}</div>
            <div class="p-info">
                <h3>${p.name}</h3>
                <p class="p-brand">${p.brand}</p>
                <div class="p-tags">
                    <span class="p-tag">${p.scentFamily}</span>
                    <span class="p-tag">₹${p.priceMin.toLocaleString()}</span>
                </div>
                <!-- Compare Toggle -->
                <button class="compare-btn ${compareList.includes(p.id) ? 'active' : ''}" 
                        onclick="toggleCompare(${p.id}, this)">
                    ${compareList.includes(p.id) ? '✓ Compare' : '+ Compare'}
                </button>
            </div>
        </div>
    `).join('');
}

function toggleCompare(id, btn) {
    if (compareList.includes(id)) {
        compareList = compareList.filter(pid => pid !== id);
        if (btn) {
            btn.classList.remove('active');
            btn.innerHTML = '+ Compare';
        }
    } else {
        if (compareList.length >= 3) return toast('Select up to 3 perfumes to compare');
        compareList.push(id);
        if (btn) {
            btn.classList.add('active');
            btn.innerHTML = '✓ Compare';
        }
    }
    updateCompareUI();
}

function updateCompareUI() {
    const fab = document.getElementById('compare-fab');
    if (!fab) return;
    fab.textContent = `Compare (${compareList.length})`;
    if (compareList.length > 0) fab.classList.remove('hidden');
    else fab.classList.add('hidden');

    // If on compare page, re-render
    if (page === 'compare') renderCompare();
}

function renderCompare() {
    const contain = document.getElementById('compare-grid');
    if (!contain) return;

    if (compareList.length === 0) {
        contain.innerHTML = '<div class="empty-state">Select perfumes from the Directory to compare.</div>';
        return;
    }

    const items = perfumes.filter(p => compareList.includes(p.id));

    let html = `<div class="compare-table">`;
    // Header Row with Images/Names
    html += `<div class="c-row header"><div class="c-cell label">Feature</div>`;
    items.forEach(p => {
        html += `<div class="c-cell item">
                    <div class="c-emoji">${p.emoji}</div>
                    <b>${p.name}</b>
                    <small>${p.brand}</small>
                    <button class="remove-btn" onclick="toggleCompare(${p.id})">Remove</button>
                 </div>`;
    });
    html += `</div>`; // end header row

    // Data Rows
    const rows = [
        { l: 'Family', k: 'scentFamily' },
        { l: 'Price Range', f: p => `₹${p.priceMin.toLocaleString()} - ₹${p.priceMax.toLocaleString()}` },
        { l: 'Mood', f: p => p.mood.join(', ') },
        { l: 'Occasion', f: p => p.occasion.join(', ') },
        { l: 'Top Notes', f: p => p.topNotes.join(', ') },
        { l: 'Heart Notes', f: p => p.middleNotes.join(', ') },
        { l: 'Base Notes', f: p => p.baseNotes.join(', ') }
    ];

    rows.forEach(r => {
        html += `<div class="c-row"><div class="c-cell label">${r.l}</div>`;
        items.forEach(p => {
            const val = r.k ? p[r.k] : r.f(p);
            html += `<div class="c-cell">${val}</div>`;
        });
        html += `</div>`;
    });
    html += `</div>`;
    contain.innerHTML = html;
}

// Hook into showPage
const _superShowPage2 = showPage;
showPage = function (p) {
    _superShowPage2(p);
    if (p === 'explore') setTimeout(filterExplore, 0);
    if (p === 'compare') setTimeout(renderCompare, 0);
};

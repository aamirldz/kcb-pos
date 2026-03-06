// KCB Menu Categories
export const CATEGORIES = [
    { id: 'all', name: 'All Items', icon: '🍽️' },
    { id: 'combo', name: 'Combo', icon: '🎁' },
    { id: 'tandoori-momos', name: 'Tandoori Momos', icon: '🔥' },
    { id: 'fish', name: 'Fish', icon: '🐟' },
    { id: 'soup', name: 'Soup', icon: '🍲' },
    { id: 'chicken-soup', name: 'Chicken Soup', icon: '🍗' },
    { id: 'vegetables', name: 'Vegetables', icon: '🥦' },
    { id: 'chopsuey', name: 'Chopsuey', icon: '🥡' },
    { id: 'thuppa', name: 'Thuppa', icon: '🍲' },
    { id: 'egg-magic', name: 'Egg Magic', icon: '🥚' },
    { id: 'snacks', name: 'Snacks', icon: '🍗' },
    { id: 'pasta', name: 'Pasta', icon: '🍝' },
    { id: 'kurkure-momos', name: 'Kurkure Momos', icon: '🍟' },
    { id: 'spring-roll', name: 'Spring Roll', icon: '🌯' },
    { id: 'noodles', name: 'Noodles', icon: '🍜' },
    { id: 'momos', name: 'Momos', icon: '🥟' },
    { id: 'rice', name: 'Fried Rice', icon: '🍚' },
    { id: 'mocktails', name: 'Mocktails', icon: '🍹' },
    { id: 'shakes', name: 'Shakes', icon: '🥤' },
    { id: 'bobba', name: 'Bobba Tea', icon: '🧋' },
    { id: 'popping-tea', name: 'Popping Tea', icon: '🍵' },
    { id: 'ramen', name: 'Ramen', icon: '🍜' },
    { id: 'laphing', name: 'Laphing', icon: '🥡' },
    { id: 'cold-drink', name: 'Cold Drinks', icon: '🥤' },
];

// ==================================================
//  FULL KCB MENU — Updated March 7, 2026
// ==================================================
export const MENU_ITEMS = [
    // ────────────── COMBO ──────────────
    { id: 'spl-kcf-veg-combo-noodles-rice-manchurian-cheese-chilli-momos', name: 'Spl. KCF Veg Combo (Noodles + Rice + Manchurian + Cheese Chilli + Momos)', price: 350, category: 'combo', spice: 2, veg: true, tags: [], avail: true },
    { id: 'spl-kcf-non-veg-combo-chicken-noodles-chicken-rice-chicken-manchurian-chicken-chilli-chicken-momos', name: 'Spl. KCF Non Veg Combo (Chicken Noodles + Chicken Rice + Chicken Manchurian + Chicken Chilli + Chicken Momos)', price: 450, category: 'combo', spice: 2, veg: false, tags: [], avail: true },

    // ────────────── TANDOORI MOMOS ──────────────
    { id: 'tandoori-sauce-veg-momo', name: 'Tandoori Sauce Veg Momo', price: 250, category: 'tandoori-momos', spice: 1, veg: true, tags: [], avail: true, halfPrice: 160 },
    { id: 'tandoori-sauce-non-veg-momos', name: 'Tandoori Sauce Non Veg Momos', price: 290, category: 'tandoori-momos', spice: 1, veg: false, tags: [], avail: true, halfPrice: 180 },
    { id: 'tandoori-sauce-paneer-momos', name: 'Tandoori Sauce Paneer Momos', price: 250, category: 'tandoori-momos', spice: 1, veg: true, tags: [], avail: true, halfPrice: 200 },
    { id: 'white-gravy-sauce-veg-momos', name: 'White Gravy Sauce Veg Momos', price: 250, category: 'tandoori-momos', spice: 1, veg: true, tags: [], avail: true, halfPrice: 160 },
    { id: 'white-gravy-sauce-n-veg-momo', name: 'White Gravy Sauce N. Veg Momo', price: 290, category: 'tandoori-momos', spice: 1, veg: false, tags: [], avail: true, halfPrice: 180 },
    { id: 'white-gravy-paneer-momos', name: 'White Gravy Paneer Momos', price: 290, category: 'tandoori-momos', spice: 1, veg: true, tags: [], avail: true, halfPrice: 180 },
    { id: 'red-gravy-sauce-veg-momos', name: 'Red Gravy Sauce Veg Momos', price: 250, category: 'tandoori-momos', spice: 1, veg: true, tags: [], avail: true, halfPrice: 170 },
    { id: 'red-gravy-sauce-non-veg-momo', name: 'Red Gravy Sauce Non Veg Momo', price: 290, category: 'tandoori-momos', spice: 1, veg: false, tags: [], avail: true, halfPrice: 190 },
    { id: 'red-gravy-paneer-momos', name: 'Red Gravy Paneer Momos', price: 290, category: 'tandoori-momos', spice: 1, veg: true, tags: [], avail: true, halfPrice: 190 },

    // ────────────── FISH ──────────────
    { id: 'chilli-fish', name: 'Chilli Fish', price: 490, category: 'fish', spice: 2, veg: false, tags: [], avail: true, halfPrice: 350 },
    { id: 'fish-fry', name: 'Fish Fry', price: 490, category: 'fish', spice: 1, veg: false, tags: [], avail: true, halfPrice: 350 },
    { id: 'kurkure-fish', name: 'Kurkure Fish', price: 490, category: 'fish', spice: 1, veg: false, tags: [], avail: true, halfPrice: 350 },
    { id: 'fish-finger', name: 'Fish Finger', price: 490, category: 'fish', spice: 1, veg: false, tags: [], avail: true, halfPrice: 350 },

    // ────────────── SOUP ──────────────
    { id: 'veg-special-soup', name: 'Veg Special Soup', price: 150, category: 'soup', spice: 1, veg: true, tags: [], avail: true },
    { id: 'veg-tallumein-soup', name: 'Veg Tallumein Soup', price: 170, category: 'soup', spice: 1, veg: true, tags: [], avail: true },
    { id: 'veg-manchow-soup', name: 'Veg Manchow Soup', price: 160, category: 'soup', spice: 1, veg: true, tags: [], avail: true },
    { id: 'veg-sweet-corn-soup', name: 'Veg Sweet Corn Soup', price: 150, category: 'soup', spice: 0, veg: true, tags: [], avail: true },
    { id: 'veg-hot-saur-soup', name: 'Veg Hot & Saur Soup', price: 150, category: 'soup', spice: 2, veg: true, tags: [], avail: true },

    // ────────────── CHICKEN SOUP ──────────────
    { id: 'chicken-soup', name: 'Chicken Soup', price: 180, category: 'chicken-soup', spice: 1, veg: false, tags: [], avail: true },
    { id: 'chicken-manchow-soup', name: 'Chicken Manchow Soup', price: 200, category: 'chicken-soup', spice: 1, veg: false, tags: [], avail: true },
    { id: 'chicken-hot-sour-soup', name: 'Chicken Hot & Sour Soup', price: 230, category: 'chicken-soup', spice: 2, veg: false, tags: [], avail: true },
    { id: 'chicken-tallumein-soup', name: 'Chicken Tallumein Soup', price: 200, category: 'chicken-soup', spice: 1, veg: false, tags: [], avail: true },
    { id: 'chicken-sweet-corn-soup', name: 'Chicken Sweet Corn Soup', price: 200, category: 'chicken-soup', spice: 0, veg: false, tags: [], avail: true },

    // ────────────── VEGETABLES ──────────────
    { id: 'mushroom-manchurian-dry', name: 'Mushroom Manchurian (Dry)', price: 280, category: 'vegetables', spice: 1, veg: true, tags: [], avail: true, halfPrice: 200 },
    { id: 'mushroom-manchurian-gravy', name: 'Mushroom Manchurian (Gravy)', price: 280, category: 'vegetables', spice: 1, veg: true, tags: [], avail: true, halfPrice: 200 },
    { id: 'paneer-manchurian-dry', name: 'Paneer Manchurian (Dry)', price: 280, category: 'vegetables', spice: 1, veg: true, tags: [], avail: true, halfPrice: 200 },
    { id: 'paneer-manchurian-gravy', name: 'Paneer Manchurian (Gravy)', price: 280, category: 'vegetables', spice: 1, veg: true, tags: [], avail: true, halfPrice: 200 },
    { id: 'veg-manchurian-dry', name: 'Veg Manchurian (Dry)', price: 270, category: 'vegetables', spice: 1, veg: true, tags: [], avail: true, halfPrice: 190 },
    { id: 'veg-manchurian-gravy', name: 'Veg Manchurian (Gravy)', price: 270, category: 'vegetables', spice: 1, veg: true, tags: [], avail: true, halfPrice: 190 },
    { id: 'cheese-chilly-dry', name: 'Cheese Chilly (Dry)', price: 250, category: 'vegetables', spice: 2, veg: true, tags: [], avail: true, halfPrice: 180 },
    { id: 'cheese-chilly-gravy', name: 'Cheese Chilly (Gravy)', price: 270, category: 'vegetables', spice: 2, veg: true, tags: [], avail: true, halfPrice: 180 },
    { id: 'mushroom-chilly-dry', name: 'Mushroom Chilly (Dry)', price: 280, category: 'vegetables', spice: 2, veg: true, tags: [], avail: true, halfPrice: 190 },
    { id: 'mushroom-chilly-gravy', name: 'Mushroom Chilly (Gravy)', price: 280, category: 'vegetables', spice: 2, veg: true, tags: [], avail: true, halfPrice: 190 },
    { id: 'mushroom-duplex', name: 'Mushroom Duplex', price: 260, category: 'vegetables', spice: 1, veg: true, tags: [], avail: true, halfPrice: 180 },
    { id: 'mushroom-popcorn', name: 'Mushroom Popcorn', price: 350, category: 'vegetables', spice: 0, veg: true, tags: [], avail: true, halfPrice: 250 },
    { id: 'honey-cauliflower', name: 'Honey Cauliflower', price: 270, category: 'vegetables', spice: 1, veg: true, tags: [], avail: true, halfPrice: 170 },
    { id: 'honey-chilli-potato', name: 'Honey Chilli Potato', price: 270, category: 'vegetables', spice: 2, veg: true, tags: [], avail: true, halfPrice: 170 },
    { id: 'chilly-potato', name: 'Chilly Potato', price: 240, category: 'vegetables', spice: 2, veg: true, tags: [], avail: true, halfPrice: 150 },
    { id: 'chilly-cauliflower', name: 'Chilly Cauliflower', price: 230, category: 'vegetables', spice: 2, veg: true, tags: [], avail: true, halfPrice: 150 },
    { id: 'potato-mix-cauliflower', name: 'Potato Mix Cauliflower', price: 280, category: 'vegetables', spice: 1, veg: true, tags: [], avail: true, halfPrice: 200 },

    // ────────────── CHOPSUEY ──────────────
    { id: 'veg-chopsuey', name: 'Veg Chopsuey', price: 270, category: 'chopsuey', spice: 1, veg: true, tags: [], avail: true },
    { id: 'chicken-chopsuey', name: 'Chicken Chopsuey', price: 290, category: 'chopsuey', spice: 1, veg: false, tags: [], avail: true },
    { id: 'non-veg-american-chopsuey', name: 'Non Veg American Chopsuey', price: 300, category: 'chopsuey', spice: 1, veg: false, tags: [], avail: true },
    { id: 'chinese-chopsuey-veg', name: 'Chinese Chopsuey Veg', price: 280, category: 'chopsuey', spice: 1, veg: true, tags: [], avail: true },
    { id: 'chinese-chopsuey-non-veg', name: 'Chinese Chopsuey Non Veg.', price: 290, category: 'chopsuey', spice: 1, veg: false, tags: [], avail: true },

    // ────────────── THUPPA ──────────────
    { id: 'veg-thuppa', name: 'Veg Thuppa', price: 250, category: 'thuppa', spice: 1, veg: true, tags: [], avail: true, halfPrice: 150 },
    { id: 'veg-mix-thuppa', name: 'Veg Mix Thuppa', price: 270, category: 'thuppa', spice: 1, veg: true, tags: [], avail: true, halfPrice: 190 },
    { id: 'paneer-thuppa', name: 'Paneer Thuppa', price: 260, category: 'thuppa', spice: 1, veg: true, tags: [], avail: true, halfPrice: 180 },
    { id: 'paneer-mix-thuppa', name: 'Paneer Mix Thuppa', price: 270, category: 'thuppa', spice: 1, veg: true, tags: [], avail: true, halfPrice: 200 },
    { id: 'mushroom-thuppa', name: 'Mushroom Thuppa', price: 270, category: 'thuppa', spice: 1, veg: true, tags: [], avail: true, halfPrice: 200 },
    { id: 'chicken-thuppa', name: 'Chicken Thuppa', price: 280, category: 'thuppa', spice: 1, veg: false, tags: [], avail: true, halfPrice: 180 },
    { id: 'chicken-mix-thuppa', name: 'Chicken Mix Thuppa', price: 300, category: 'thuppa', spice: 1, veg: false, tags: [], avail: true, halfPrice: 210 },
    { id: 'mutton-thuppa', name: 'Mutton Thuppa', price: 300, category: 'thuppa', spice: 1, veg: false, tags: [], avail: true, halfPrice: 230 },
    { id: 'mutton-mix-thuppa', name: 'Mutton Mix Thuppa', price: 340, category: 'thuppa', spice: 1, veg: false, tags: [], avail: true, halfPrice: 250 },
    { id: 'veg-thantuk', name: 'Veg. Thantuk', price: 280, category: 'thuppa', spice: 1, veg: true, tags: [], avail: true, halfPrice: 200 },
    { id: 'chicken-thantuk', name: 'Chicken Thantuk', price: 300, category: 'thuppa', spice: 1, veg: false, tags: [], avail: true, halfPrice: 220 },
    { id: 'mutton-thantuk', name: 'Mutton Thantuk', price: 320, category: 'thuppa', spice: 1, veg: false, tags: [], avail: true, halfPrice: 230 },

    // ────────────── EGG MAGIC ──────────────
    { id: 'egg-kurkure', name: 'Egg Kurkure', price: 280, category: 'egg-magic', spice: 1, veg: false, tags: [], avail: true, halfPrice: 180 },
    { id: 'egg-chilly', name: 'Egg Chilly', price: 250, category: 'egg-magic', spice: 2, veg: false, tags: [], avail: true, halfPrice: 180 },
    { id: 'egg-fry', name: 'Egg Fry', price: 220, category: 'egg-magic', spice: 1, veg: false, tags: [], avail: true, halfPrice: 160 },

    // ────────────── SNACKS ──────────────
    { id: 'chicken-chilly-with-bone-dry', name: 'Chicken Chilly With Bone (Dry)', price: 499, category: 'snacks', spice: 2, veg: false, tags: [], avail: true, halfPrice: 299 },
    { id: 'chicken-chilly-with-bone-gravy', name: 'Chicken Chilly With Bone (Gravy)', price: 499, category: 'snacks', spice: 2, veg: false, tags: [], avail: true, halfPrice: 299 },
    { id: 'chicken-chilly-boneless-dry', name: 'Chicken Chilly Boneless (Dry)', price: 499, category: 'snacks', spice: 2, veg: false, tags: [], avail: true, halfPrice: 299 },
    { id: 'chicken-chilly-boneless-gravy', name: 'Chicken Chilly Boneless (Gravy)', price: 499, category: 'snacks', spice: 2, veg: false, tags: [], avail: true, halfPrice: 299 },
    { id: 'honey-chilly-chicken', name: 'Honey Chilly Chicken', price: 550, category: 'snacks', spice: 2, veg: false, tags: [], avail: true, halfPrice: 350 },
    { id: 'fried-chicken', name: 'Fried Chicken', price: 499, category: 'snacks', spice: 1, veg: false, tags: [], avail: true, halfPrice: 299 },
    { id: 'chicken-manchurian-dry', name: 'Chicken Manchurian (Dry)', price: 499, category: 'snacks', spice: 1, veg: false, tags: [], avail: true, halfPrice: 299 },
    { id: 'chicken-manchurian-gravy', name: 'Chicken Manchurian (Gravy)', price: 550, category: 'snacks', spice: 1, veg: false, tags: [], avail: true, halfPrice: 350 },
    { id: 'chicken-garlic-dry', name: 'Chicken Garlic (Dry)', price: 550, category: 'snacks', spice: 2, veg: false, tags: [], avail: true, halfPrice: 350 },
    { id: 'chicken-chillypop-gravy', name: 'Chicken Chillypop (Gravy)', price: 499, category: 'snacks', spice: 2, veg: false, tags: [], avail: true, halfPrice: 299 },
    { id: 'chicken-chillypop-dry', name: 'Chicken Chillypop (Dry)', price: 499, category: 'snacks', spice: 2, veg: false, tags: [], avail: true, halfPrice: 299 },
    { id: 'kurkure-chicken', name: 'Kurkure Chicken', price: 499, category: 'snacks', spice: 1, veg: false, tags: [], avail: true, halfPrice: 299 },
    { id: 'chicken-wings', name: 'Chicken Wings', price: 380, category: 'snacks', spice: 1, veg: false, tags: [], avail: true, halfPrice: 299 },
    { id: 'chicken-lollypop', name: 'Chicken Lollypop', price: 390, category: 'snacks', spice: 1, veg: false, tags: [], avail: true, halfPrice: 300 },
    { id: 'chicken-popcorn', name: 'Chicken Popcorn', price: 499, category: 'snacks', spice: 0, veg: false, tags: [], avail: true, halfPrice: 299 },

    // ────────────── PASTA ──────────────
    { id: 'white-sauce-veg-pasta', name: 'White Sauce Veg. Pasta', price: 250, category: 'pasta', spice: 0, veg: true, tags: [], avail: true, halfPrice: 150 },
    { id: 'white-sauce-mushroom-pasta', name: 'White Sauce Mushroom Pasta', price: 260, category: 'pasta', spice: 0, veg: true, tags: [], avail: true, halfPrice: 170 },
    { id: 'white-sauce-paneer-pasta', name: 'White Sauce Paneer Pasta', price: 270, category: 'pasta', spice: 0, veg: true, tags: [], avail: true, halfPrice: 170 },
    { id: 'white-sauce-chicken-pasta', name: 'White Sauce Chicken Pasta', price: 280, category: 'pasta', spice: 0, veg: false, tags: [], avail: true, halfPrice: 190 },
    { id: 'red-sauce-veg-pasta', name: 'Red Sauce Veg. Pasta', price: 270, category: 'pasta', spice: 1, veg: true, tags: [], avail: true, halfPrice: 190 },
    { id: 'red-sauce-mashroom-pasta', name: 'Red Sauce Mashroom Pasta', price: 280, category: 'pasta', spice: 1, veg: true, tags: [], avail: true, halfPrice: 170 },
    { id: 'red-sauce-paneer-pasta', name: 'Red Sauce Paneer Pasta', price: 280, category: 'pasta', spice: 1, veg: true, tags: [], avail: true, halfPrice: 170 },
    { id: 'red-sauce-chicken-pasta', name: 'Red Sauce Chicken Pasta', price: 290, category: 'pasta', spice: 1, veg: false, tags: [], avail: true, halfPrice: 200 },
    { id: 'mix-sauce-veg-pasta', name: 'Mix Sauce Veg. Pasta', price: 270, category: 'pasta', spice: 1, veg: true, tags: [], avail: true, halfPrice: 170 },
    { id: 'mix-sauce-chicken-pasta', name: 'Mix Sauce Chicken Pasta', price: 290, category: 'pasta', spice: 1, veg: false, tags: [], avail: true, halfPrice: 190 },
    { id: 'veg-tandoori-sauce-pasta', name: 'Veg Tandoori Sauce Pasta', price: 280, category: 'pasta', spice: 1, veg: true, tags: [], avail: true, halfPrice: 190 },
    { id: 'non-veg-tandoori-sauce-pasta', name: 'Non Veg Tandoori Sauce Pasta', price: 300, category: 'pasta', spice: 1, veg: false, tags: [], avail: true, halfPrice: 200 },
    { id: 'white-sauce-corn-pasta', name: 'White Sauce Corn Pasta', price: 260, category: 'pasta', spice: 0, veg: true, tags: [], avail: true, halfPrice: 160 },
    { id: 'white-sauce-potato', name: 'White Sauce Potato', price: 250, category: 'pasta', spice: 0, veg: true, tags: [], avail: true, halfPrice: 150 },
    { id: 'mix-sauce-potato', name: 'Mix Sauce Potato', price: 280, category: 'pasta', spice: 1, veg: true, tags: [], avail: true, halfPrice: 180 },
    { id: 'tandoori-sauce-potato', name: 'Tandoori Sauce Potato', price: 280, category: 'pasta', spice: 1, veg: true, tags: [], avail: true, halfPrice: 190 },

    // ────────────── KURKURE MOMOS ──────────────
    { id: 'veg-kurkure-momos', name: 'Veg Kurkure Momos', price: 230, category: 'kurkure-momos', spice: 1, veg: true, tags: [], avail: true, halfPrice: 130 },
    { id: 'non-veg-kurkure-momos', name: 'Non Veg Kurkure Momos', price: 240, category: 'kurkure-momos', spice: 1, veg: false, tags: [], avail: true, halfPrice: 170 },
    { id: 'paneer-kurkure-momos', name: 'Paneer Kurkure Momos', price: 240, category: 'kurkure-momos', spice: 1, veg: true, tags: [], avail: true, halfPrice: 170 },
    { id: 'mutton-kurkere-momos', name: 'Mutton Kurkere Momos', price: 300, category: 'kurkure-momos', spice: 1, veg: false, tags: [], avail: true, halfPrice: 200 },
    { id: 'paneer-finger-crunchy', name: 'Paneer Finger Crunchy', price: 250, category: 'kurkure-momos', spice: 1, veg: true, tags: [], avail: true, halfPrice: 190 },
    { id: 'french-fries', name: 'French Fries', price: 190, category: 'kurkure-momos', spice: 1, veg: true, tags: [], avail: true, halfPrice: 140 },
    { id: 'kurkure-potato-spiral', name: 'Kurkure Potato Spiral', price: 250, category: 'kurkure-momos', spice: 1, veg: true, tags: [], avail: true, halfPrice: 190 },
    { id: 'crispy-corn', name: 'Crispy Corn', price: 260, category: 'kurkure-momos', spice: 0, veg: true, tags: [], avail: true, halfPrice: 190 },

    // ────────────── SPRING ROLL ──────────────
    { id: 'veg-spring-roll', name: 'Veg Spring Roll', price: 230, category: 'spring-roll', spice: 1, veg: true, tags: [], avail: true, halfPrice: 120 },
    { id: 'chicken-spring-roll', name: 'Chicken Spring Roll', price: 250, category: 'spring-roll', spice: 1, veg: false, tags: [], avail: true, halfPrice: 150 },
    { id: 'veg-kurkure-roll', name: 'Veg Kurkure Roll', price: 240, category: 'spring-roll', spice: 1, veg: true, tags: [], avail: true, halfPrice: 160 },
    { id: 'chicken-kurkure-roll', name: 'Chicken Kurkure Roll', price: 250, category: 'spring-roll', spice: 1, veg: false, tags: [], avail: true, halfPrice: 180 },

    // ────────────── CHINESE FOOD ──────────────
    { id: 'green-noodles', name: 'Green Noodles', price: 280, category: 'noodles', spice: 1, veg: true, tags: [], avail: true, halfPrice: 170 },
    { id: 'veg-noodles', name: 'Veg. Noodles', price: 199, category: 'noodles', spice: 1, veg: true, tags: [], avail: true, halfPrice: 140 },
    { id: 'veg-special-noodles', name: 'Veg. Special Noodles', price: 230, category: 'noodles', spice: 1, veg: true, tags: [], avail: true, halfPrice: 170 },
    { id: 'non-veg-special-noodles', name: 'Non Veg. Special Noodles', price: 280, category: 'noodles', spice: 1, veg: false, tags: [], avail: true, halfPrice: 190 },
    { id: 'mushroom-noodles', name: 'Mushroom Noodles', price: 250, category: 'noodles', spice: 1, veg: true, tags: [], avail: true, halfPrice: 160 },
    { id: 'paneer-noodles', name: 'Paneer Noodles', price: 250, category: 'noodles', spice: 1, veg: true, tags: [], avail: true, halfPrice: 160 },
    { id: 'paneer-mix-noodles', name: 'Paneer Mix Noodles', price: 280, category: 'noodles', spice: 1, veg: true, tags: [], avail: true, halfPrice: 180 },
    { id: 'mutton-noodles', name: 'Mutton Noodles', price: 290, category: 'noodles', spice: 1, veg: false, tags: [], avail: true, halfPrice: 180 },
    { id: 'egg-noodles', name: 'Egg Noodles', price: 240, category: 'noodles', spice: 1, veg: false, tags: [], avail: true, halfPrice: 150 },
    { id: 'veg-mix-noodles', name: 'Veg Mix Noodles', price: 230, category: 'noodles', spice: 1, veg: true, tags: [], avail: true, halfPrice: 180 },
    { id: 'chicken-schezwan-noodles', name: 'Chicken Schezwan Noodles', price: 250, category: 'noodles', spice: 2, veg: false, tags: [], avail: true, halfPrice: 160 },
    { id: 'mutton-schezwan-noodles', name: 'Mutton Schezwan Noodles', price: 320, category: 'noodles', spice: 2, veg: false, tags: [], avail: true, halfPrice: 230 },
    { id: 'veg-schezwan-noodles', name: 'Veg Schezwan Noodles', price: 230, category: 'noodles', spice: 2, veg: true, tags: [], avail: true, halfPrice: 150 },
    { id: 'chicken-mix-noodles', name: 'Chicken Mix Noodles', price: 280, category: 'noodles', spice: 1, veg: false, tags: [], avail: true, halfPrice: 200 },
    { id: 'mutton-mix-noodles', name: 'Mutton Mix Noodles', price: 300, category: 'noodles', spice: 1, veg: false, tags: [], avail: true, halfPrice: 220 },
    { id: 'veg-singapuri-noodles', name: 'Veg Singapuri Noodles', price: 250, category: 'noodles', spice: 1, veg: true, tags: [], avail: true, halfPrice: 170 },
    { id: 'chicken-singapuri-noodles', name: 'Chicken Singapuri Noodles', price: 290, category: 'noodles', spice: 1, veg: false, tags: [], avail: true, halfPrice: 190 },
    { id: 'mutton-singapuri-noodles', name: 'Mutton Singapuri Noodles', price: 320, category: 'noodles', spice: 1, veg: false, tags: [], avail: true, halfPrice: 220 },
    { id: 'veg-hakka-noodles', name: 'Veg Hakka Noodles', price: 240, category: 'noodles', spice: 1, veg: true, tags: [], avail: true, halfPrice: 170 },
    { id: 'chicken-hakka-noodles', name: 'Chicken Hakka Noodles', price: 280, category: 'noodles', spice: 1, veg: false, tags: [], avail: true, halfPrice: 180 },
    { id: 'chicken-noodles', name: 'Chicken Noodles', price: 250, category: 'noodles', spice: 1, veg: false, tags: [], avail: true, halfPrice: 170 },
    { id: 'veg-gravy-noodles', name: 'Veg Gravy Noodles', price: 250, category: 'noodles', spice: 1, veg: true, tags: [], avail: true, halfPrice: 180 },
    { id: 'chicken-gravy-noodles', name: 'Chicken Gravy Noodles', price: 280, category: 'noodles', spice: 1, veg: false, tags: [], avail: true, halfPrice: 190 },
    { id: 'mutton-gravy-noodles', name: 'Mutton Gravy Noodles', price: 330, category: 'noodles', spice: 1, veg: false, tags: [], avail: true, halfPrice: 200 },
    { id: 'veg-noodles-chilli-garlic', name: 'Veg Noodles Chilli Garlic', price: 240, category: 'noodles', spice: 2, veg: true, tags: [], avail: true, halfPrice: 180 },
    { id: 'chicken-chilli-garlic-noodles', name: 'Chicken Chilli Garlic Noodles', price: 280, category: 'noodles', spice: 2, veg: false, tags: [], avail: true, halfPrice: 190 },
    { id: 'mutton-chilli-garlic-noodles', name: 'Mutton Chilli Garlic Noodles', price: 320, category: 'noodles', spice: 2, veg: false, tags: [], avail: true, halfPrice: 220 },

    // ────────────── MOMOS ──────────────
    { id: 'veg-momos', name: 'Veg Momos', price: 150, category: 'momos', spice: 1, veg: true, tags: [], avail: true, halfPrice: 110 },
    { id: 'chicken-momos', name: 'Chicken Momos', price: 200, category: 'momos', spice: 1, veg: false, tags: [], avail: true, halfPrice: 140 },
    { id: 'chicken-fry-momos', name: 'Chicken Fry Momos', price: 230, category: 'momos', spice: 1, veg: false, tags: [], avail: true, halfPrice: 200 },
    { id: 'chicken-sea-chilly-momos', name: 'Chicken Sea Chilly Momos', price: 270, category: 'momos', spice: 2, veg: false, tags: [], avail: true, halfPrice: 170 },
    { id: 'veg-sea-chilly-momos', name: 'Veg Sea Chilly Momos', price: 250, category: 'momos', spice: 2, veg: true, tags: [], avail: true, halfPrice: 160 },
    { id: 'veg-fry-momos', name: 'Veg Fry Momos', price: 180, category: 'momos', spice: 1, veg: true, tags: [], avail: true, halfPrice: 140 },
    { id: 'mutton-sea-chilly-momos', name: 'Mutton Sea Chilly Momos', price: 350, category: 'momos', spice: 2, veg: false, tags: [], avail: true, halfPrice: 250 },
    { id: 'mutton-momos', name: 'Mutton Momos', price: 270, category: 'momos', spice: 1, veg: false, tags: [], avail: true, halfPrice: 180 },
    { id: 'mutton-fried-momo', name: 'Mutton Fried Momo', price: 290, category: 'momos', spice: 1, veg: false, tags: [], avail: true, halfPrice: 200 },
    { id: 'paneer-momo', name: 'Paneer Momo', price: 200, category: 'momos', spice: 1, veg: true, tags: [], avail: true, halfPrice: 140 },
    { id: 'paneer-sea-chilly-momos', name: 'Paneer Sea Chilly Momos', price: 270, category: 'momos', spice: 2, veg: true, tags: [], avail: true, halfPrice: 170 },

    // ────────────── RICE ──────────────
    { id: 'veg-special-fried-rice', name: 'Veg Special Fried Rice', price: 230, category: 'rice', spice: 0, veg: true, tags: [], avail: true, halfPrice: 160 },
    { id: 'non-veg-special-fried-rice', name: 'Non Veg Special Fried Rice', price: 270, category: 'rice', spice: 0, veg: false, tags: [], avail: true, halfPrice: 200 },
    { id: 'veg-fried-rice', name: 'Veg Fried Rice', price: 220, category: 'rice', spice: 0, veg: true, tags: [], avail: true, halfPrice: 150 },
    { id: 'chicken-fried-rice', name: 'Chicken Fried Rice', price: 250, category: 'rice', spice: 0, veg: false, tags: [], avail: true, halfPrice: 170 },
    { id: 'chicken-schzwan-rice', name: 'Chicken Schzwan Rice', price: 260, category: 'rice', spice: 2, veg: false, tags: [], avail: true, halfPrice: 180 },
    { id: 'mutton-schzwan-rice', name: 'Mutton Schzwan Rice', price: 320, category: 'rice', spice: 2, veg: false, tags: [], avail: true, halfPrice: 230 },
    { id: 'veg-schzwan-rice', name: 'Veg Schzwan Rice', price: 240, category: 'rice', spice: 2, veg: true, tags: [], avail: true, halfPrice: 150 },
    { id: 'chicken-gravy-rice', name: 'Chicken Gravy Rice', price: 290, category: 'rice', spice: 0, veg: false, tags: [], avail: true, halfPrice: 220 },
    { id: 'mutton-gravy-rice', name: 'Mutton Gravy Rice', price: 320, category: 'rice', spice: 0, veg: false, tags: [], avail: true, halfPrice: 240 },
    { id: 'mutton-rice', name: 'Mutton Rice', price: 290, category: 'rice', spice: 0, veg: false, tags: [], avail: true, halfPrice: 210 },
    { id: 'paneer-fried-rice', name: 'Paneer Fried Rice', price: 260, category: 'rice', spice: 0, veg: true, tags: [], avail: true, halfPrice: 170 },
    { id: 'paneer-mix-rice', name: 'Paneer Mix Rice', price: 280, category: 'rice', spice: 0, veg: true, tags: [], avail: true, halfPrice: 220 },
    { id: 'mushroom-fried-rice', name: 'Mushroom Fried Rice', price: 290, category: 'rice', spice: 0, veg: true, tags: [], avail: true, halfPrice: 190 },
    { id: 'egg-fried-rice', name: 'Egg Fried Rice', price: 280, category: 'rice', spice: 0, veg: false, tags: [], avail: true, halfPrice: 170 },
    { id: 'veg-combination', name: 'Veg Combination', price: 260, category: 'rice', spice: 1, veg: true, tags: [], avail: true, halfPrice: 190 },
    { id: 'chicken-combo-fried-rice', name: 'Chicken Combo Fried Rice', price: 280, category: 'rice', spice: 0, veg: false, tags: [], avail: true, halfPrice: 200 },
    { id: 'mutton-combo-fried-rice', name: 'Mutton Combo Fried Rice', price: 340, category: 'rice', spice: 0, veg: false, tags: [], avail: true, halfPrice: 240 },
    { id: 'veg-mix-fried-rice', name: 'Veg Mix Fried Rice', price: 280, category: 'rice', spice: 0, veg: true, tags: [], avail: true, halfPrice: 210 },
    { id: 'chicken-mix-fried-rice', name: 'Chicken Mix Fried Rice', price: 270, category: 'rice', spice: 0, veg: false, tags: [], avail: true, halfPrice: 220 },
    { id: 'mutton-mix-fried-rice', name: 'Mutton Mix Fried Rice', price: 340, category: 'rice', spice: 0, veg: false, tags: [], avail: true, halfPrice: 250 },
    { id: 'veg-gravy-fried-rice', name: 'Veg Gravy Fried Rice', price: 250, category: 'rice', spice: 0, veg: true, tags: [], avail: true, halfPrice: 200 },
    { id: 'mutton-gravy-fried-rice', name: 'Mutton Gravy Fried Rice', price: 340, category: 'rice', spice: 0, veg: false, tags: [], avail: true, halfPrice: 240 },
    { id: 'veg-singapuri-fried-rice', name: 'Veg Singapuri Fried Rice', price: 270, category: 'rice', spice: 0, veg: true, tags: [], avail: true, halfPrice: 180 },
    { id: 'chicken-singapuri-fried-rice', name: 'Chicken Singapuri Fried Rice', price: 290, category: 'rice', spice: 0, veg: false, tags: [], avail: true, halfPrice: 200 },
    { id: 'mutton-singapuri-fried-rice', name: 'Mutton Singapuri Fried Rice', price: 320, category: 'rice', spice: 0, veg: false, tags: [], avail: true, halfPrice: 220 },

    // ────────────── MOCKTAILS ──────────────
    { id: 'virgin-mojito', name: 'Virgin Mojito', price: 140, category: 'mocktails', spice: 0, veg: true, tags: [], avail: true },
    { id: 'watermelon-mojito', name: 'Watermelon Mojito', price: 150, category: 'mocktails', spice: 0, veg: true, tags: [], avail: true },
    { id: 'green-apple-mojito', name: 'Green Apple Mojito', price: 150, category: 'mocktails', spice: 0, veg: true, tags: [], avail: true },
    { id: 'red-ice', name: 'Red Ice', price: 130, category: 'mocktails', spice: 0, veg: true, tags: [], avail: true },
    { id: 'blue-ice', name: 'Blue Ice', price: 130, category: 'mocktails', spice: 0, veg: true, tags: [], avail: true },
    { id: 'lime-soda', name: 'Lime Soda', price: 120, category: 'mocktails', spice: 0, veg: true, tags: [], avail: true },
    { id: 'lime-water', name: 'Lime Water', price: 120, category: 'mocktails', spice: 0, veg: true, tags: [], avail: true },

    // ────────────── SHAKES ──────────────
    { id: 'banana-shake', name: 'Banana Shake', price: 140, category: 'shakes', spice: 0, veg: true, tags: [], avail: true },
    { id: 'mango-shake', name: 'Mango Shake', price: 140, category: 'shakes', spice: 0, veg: true, tags: [], avail: true },
    { id: 'strawberry-shake', name: 'Strawberry Shake', price: 140, category: 'shakes', spice: 0, veg: true, tags: [], avail: true },
    { id: 'butterscotch-shake', name: 'Butterscotch Shake', price: 140, category: 'shakes', spice: 0, veg: true, tags: [], avail: true },
    { id: 'vanila-shake', name: 'Vanila Shake', price: 140, category: 'shakes', spice: 0, veg: true, tags: [], avail: true },
    { id: 'oreo-shake', name: 'Oreo Shake', price: 150, category: 'shakes', spice: 0, veg: true, tags: [], avail: true },
    { id: 'chocolate-shake', name: 'Chocolate Shake', price: 170, category: 'shakes', spice: 0, veg: true, tags: [], avail: true },
    { id: 'kitkat-shake', name: 'Kitkat Shake', price: 170, category: 'shakes', spice: 0, veg: true, tags: [], avail: true },
    { id: 'cold-coffee', name: 'Cold Coffee', price: 170, category: 'shakes', spice: 0, veg: true, tags: [], avail: true },
    { id: 'mix-berry-shake', name: 'Mix Berry Shake', price: 150, category: 'shakes', spice: 0, veg: true, tags: [], avail: true },
    { id: 'apple-pai-shake', name: 'Apple Pai Shake', price: 140, category: 'shakes', spice: 0, veg: true, tags: [], avail: true },
    { id: 'sweet-lassi', name: 'Sweet Lassi', price: 120, category: 'shakes', spice: 0, veg: true, tags: [], avail: true },
    { id: 'namkeen-lassi', name: 'Namkeen Lassi', price: 140, category: 'shakes', spice: 0, veg: true, tags: [], avail: true },
    { id: 'fruit-beet', name: 'Fruit Beet', price: 110, category: 'shakes', spice: 1, veg: true, tags: [], avail: true },

    // ────────────── BOBBA MILK BASE ──────────────
    { id: 'taro', name: 'Taro', price: 240, category: 'bobba', spice: 1, veg: true, tags: [], avail: true },
    { id: 'matcha', name: 'Matcha', price: 240, category: 'bobba', spice: 1, veg: true, tags: [], avail: true },
    { id: 'thai-tea', name: 'Thai Tea', price: 250, category: 'bobba', spice: 0, veg: true, tags: [], avail: true },
    { id: 'honey-dew', name: 'Honey Dew', price: 250, category: 'bobba', spice: 1, veg: true, tags: [], avail: true },
    { id: 'ice-coffee', name: 'Ice Coffee', price: 240, category: 'bobba', spice: 0, veg: true, tags: [], avail: true },
    { id: 'creamy-coffee', name: 'Creamy Coffee', price: 240, category: 'bobba', spice: 0, veg: true, tags: [], avail: true },
    { id: 'mango', name: 'Mango', price: 240, category: 'bobba', spice: 1, veg: true, tags: [], avail: true },
    { id: 'strawberry', name: 'Strawberry', price: 240, category: 'bobba', spice: 1, veg: true, tags: [], avail: true },
    { id: 'bubblegum', name: 'Bubblegum', price: 250, category: 'bobba', spice: 1, veg: true, tags: [], avail: true },
    { id: 'watermelon', name: 'Watermelon', price: 250, category: 'bobba', spice: 0, veg: true, tags: [], avail: true },
    { id: 'chocolate', name: 'Chocolate', price: 270, category: 'bobba', spice: 1, veg: true, tags: [], avail: true },
    { id: 'peanutbutter', name: 'Peanutbutter', price: 240, category: 'bobba', spice: 1, veg: true, tags: [], avail: true },
    { id: 'hazelnut', name: 'Hazelnut', price: 270, category: 'bobba', spice: 1, veg: true, tags: [], avail: true },
    { id: 'vanila', name: 'Vanila', price: 270, category: 'bobba', spice: 1, veg: true, tags: [], avail: true },
    { id: 'blueberry', name: 'Blueberry', price: 270, category: 'bobba', spice: 1, veg: true, tags: [], avail: true },

    // ────────────── POPPING TEA ──────────────
    { id: 'green-apple', name: 'Green Apple', price: 210, category: 'popping-tea', spice: 1, veg: true, tags: [], avail: true },
    { id: 'lime', name: 'Lime', price: 210, category: 'popping-tea', spice: 1, veg: true, tags: [], avail: true },
    { id: 'strawberry-2', name: 'Strawberry', price: 210, category: 'popping-tea', spice: 1, veg: true, tags: [], avail: true },
    { id: 'peach', name: 'Peach', price: 210, category: 'popping-tea', spice: 1, veg: true, tags: [], avail: true },
    { id: 'blueberry-2', name: 'Blueberry', price: 220, category: 'popping-tea', spice: 1, veg: true, tags: [], avail: true },
    { id: 'butterfly-pea', name: 'Butterfly Pea', price: 210, category: 'popping-tea', spice: 1, veg: true, tags: [], avail: true },
    { id: 'watermelon-2', name: 'Watermelon', price: 210, category: 'popping-tea', spice: 0, veg: true, tags: [], avail: true },
    { id: 'mango-2', name: 'Mango', price: 210, category: 'popping-tea', spice: 1, veg: true, tags: [], avail: true },
    { id: 'litchi', name: 'Litchi', price: 210, category: 'popping-tea', spice: 1, veg: true, tags: [], avail: true },
    { id: 'hibiscus', name: 'Hibiscus', price: 220, category: 'popping-tea', spice: 1, veg: true, tags: [], avail: true },
    { id: 'orange', name: 'Orange', price: 210, category: 'popping-tea', spice: 1, veg: true, tags: [], avail: true },

    // ────────────── RAMEN ──────────────
    { id: 'veg-korean-special-ramen', name: 'Veg Korean Special Ramen', price: 400, category: 'ramen', spice: 1, veg: true, tags: [], avail: true },
    { id: 'veg-korean-spicy-ramen-with-soup', name: 'Veg Korean Spicy Ramen with Soup', price: 300, category: 'ramen', spice: 2, veg: true, tags: [], avail: true },
    { id: 'veg-korean-shin-ramen-noodles', name: 'Veg Korean Shin Ramen Noodles', price: 300, category: 'ramen', spice: 1, veg: true, tags: [], avail: true },
    { id: 'chicken-korean-special-ramen', name: 'Chicken Korean Special Ramen', price: 500, category: 'ramen', spice: 1, veg: false, tags: [], avail: true },
    { id: 'chicken-korean-spicy-ramen-with-soup', name: 'Chicken Korean Spicy Ramen with Soup', price: 410, category: 'ramen', spice: 2, veg: false, tags: [], avail: true },
    { id: 'chicken-korean-shin-ramen-noodles', name: 'Chicken Korean Shin Ramen Noodles', price: 410, category: 'ramen', spice: 1, veg: false, tags: [], avail: true },
    { id: 'mutton-korean-special-ramen', name: 'Mutton Korean Special Ramen', price: 540, category: 'ramen', spice: 1, veg: false, tags: [], avail: true },
    { id: 'mutton-korean-spicy-ramen-with-soup', name: 'Mutton Korean Spicy Ramen with Soup', price: 420, category: 'ramen', spice: 2, veg: false, tags: [], avail: true },
    { id: 'mutton-korean-shin-ramen-noodles', name: 'Mutton Korean Shin Ramen Noodles', price: 420, category: 'ramen', spice: 1, veg: false, tags: [], avail: true },

    // ────────────── LAPHING ──────────────
    { id: 'plane-laphing', name: 'Plane Laphing', price: 160, category: 'laphing', spice: 1, veg: true, tags: [], avail: true },
    { id: 'mix-meat-laphing', name: 'Mix Meat Laphing', price: 230, category: 'laphing', spice: 1, veg: false, tags: [], avail: true },
    { id: 'wai-wai-laphing', name: 'Wai Wai Laphing', price: 160, category: 'laphing', spice: 1, veg: true, tags: [], avail: true },

    // ────────────── COLD DRINK ──────────────
    { id: 'coke-250ml', name: 'Coke 250ml', price: 20, category: 'cold-drink', spice: 0, veg: true, tags: [], avail: true },
    { id: 'coke-750ml', name: 'Coke 750ml', price: 40, category: 'cold-drink', spice: 0, veg: true, tags: [], avail: true },
    { id: 'coke-2l', name: 'Coke 2L', price: 100, category: 'cold-drink', spice: 0, veg: true, tags: [], avail: true },
    { id: 'coke-1l', name: 'Coke 1L', price: 50, category: 'cold-drink', spice: 0, veg: true, tags: [], avail: true },
    { id: 'water', name: 'Water', price: 20, category: 'cold-drink', spice: 0, veg: true, tags: [], avail: true },
    { id: 'coke-500ml', name: 'Coke 500ml', price: 30, category: 'cold-drink', spice: 0, veg: true, tags: [], avail: true },
];


// Sample Data
export let TABLES = Array.from({ length: 20 }, (_, i) => {
    return { id: i + 1, status: 'available', guests: 0, amount: 0 };
});

export const CUSTOMERS = [];
export const STAFF = [];
export const INVENTORY = [];

// Modifiers / Customizations
export const MODIFIERS = [
    { id: 'extra-spicy', name: 'Extra Spicy', price: 0, icon: '🌶️' },
    { id: 'less-spicy', name: 'Less Spicy', price: 0, icon: '🫑' },
    { id: 'no-onion', name: 'No Onion', price: 0, icon: '🚫' },
    { id: 'no-garlic', name: 'No Garlic', price: 0, icon: '🚫' },
    { id: 'extra-cheese', name: 'Extra Cheese', price: 40, icon: '🧀' },
    { id: 'extra-chicken', name: 'Extra Chicken', price: 60, icon: '🍗' },
    { id: 'extra-veggies', name: 'Extra Veggies', price: 30, icon: '🥬' },
    { id: 'extra-egg', name: 'Extra Egg', price: 25, icon: '🥚' },
    { id: 'extra-paneer', name: 'Extra Paneer', price: 50, icon: '🧈' },
    { id: 'extra-sauce', name: 'Extra Sauce', price: 20, icon: '🫙' },
    { id: 'pack-separate', name: 'Pack Separately', price: 10, icon: '📦' },
    { id: 'jain', name: 'Jain (No Root Veg)', price: 0, icon: '🌿' },
];

// Discount Coupons
export const DISCOUNT_COUPONS = [
    { id: 'WELCOME10', name: '10% Welcome', type: 'percent', value: 10, maxDiscount: 200, minOrder: 300, active: true },
    { id: 'FLAT50', name: '₹50 Off', type: 'fixed', value: 50, maxDiscount: 50, minOrder: 500, active: true },
    { id: 'KCB100', name: '₹100 Off', type: 'fixed', value: 100, maxDiscount: 100, minOrder: 1000, active: true },
    { id: 'HAPPY20', name: 'Happy Hour 20%', type: 'percent', value: 20, maxDiscount: 500, minOrder: 400, active: true, happyHour: { start: 15, end: 18 } },
];

// Kitchen Stations
export const KITCHEN_STATIONS = [
    { id: 'wok', name: 'Wok Station', icon: '🔥', categories: ['noodles', 'rice', 'chopsuey', 'ramen'] },
    { id: 'grill', name: 'Grill & Fry', icon: '🍳', categories: ['snacks', 'spring-roll', 'egg-magic', 'fish', 'kurkure-momos'] },
    { id: 'steam', name: 'Steam & Momo', icon: '♨️', categories: ['momos', 'tandoori-momos', 'thuppa', 'soup', 'chicken-soup', 'laphing'] },
    { id: 'pasta-stn', name: 'Pasta Station', icon: '🍝', categories: ['pasta'] },
    { id: 'prep', name: 'Prep & Veg', icon: '🥦', categories: ['vegetables', 'combo'] },
    { id: 'drinks', name: 'Drinks Station', icon: '🍹', categories: ['mocktails', 'shakes', 'bobba', 'popping-tea', 'cold-drink'] },
];

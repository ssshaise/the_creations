export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: Category;
  badge?: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  featured: boolean;
  materials: string[];
  dimensions?: string;
}

export type Category = 'tables' | 'coasters' | 'trays' | 'frames' | 'showpieces' | 'accessories';

export interface CategoryInfo {
  id: Category;
  name: string;
  description: string;
  icon: string;
}

export const categories: CategoryInfo[] = [
  { id: 'tables', name: 'River Tables', description: 'Bespoke resin river tables', icon: '🪵' },
  { id: 'coasters', name: 'Coasters', description: 'Ocean-inspired coaster sets', icon: '🌊' },
  { id: 'trays', name: 'Trays', description: 'Geode & crystal serving trays', icon: '💎' },
  { id: 'frames', name: 'Wall Art', description: 'Gallery-worthy resin frames', icon: '🖼️' },
  { id: 'showpieces', name: 'Showpieces', description: 'Collectible art sculptures', icon: '✨' },
  { id: 'accessories', name: 'Accessories', description: 'Clocks, boxes & more', icon: '🎁' },
];

export const products: Product[] = [
  {
    id: 'river-table-azure',
    name: 'Azure River Table',
    description: 'Live-edge walnut with deep turquoise resin river',
    longDescription: 'A masterpiece of functional art — this live-edge walnut table features a mesmerizing turquoise resin river that catches light from every angle. Each piece is hand-poured and unique, with natural wood grain patterns that tell their own story. The X-frame steel base adds an industrial counterpoint to the organic beauty above.',
    price: 45999,
    originalPrice: 52999,
    image: '/images/products/river-table.jpg',
    category: 'tables',
    badge: 'Bestseller',
    rating: 4.9,
    reviews: 47,
    inStock: true,
    featured: true,
    materials: ['Walnut Wood', 'Epoxy Resin', 'Steel Base'],
    dimensions: '120cm × 60cm × 45cm',
  },
  {
    id: 'ocean-coaster-set',
    name: 'Ocean Wave Coasters',
    description: 'Set of 4 hand-poured ocean wave coasters with gold leaf',
    longDescription: 'Bring the ocean to your coffee table with these stunning hand-poured coasters. Each coaster features layers of deep blue, teal, and white resin creating realistic wave patterns, finished with genuine gold leaf accents. Comes as a set of 4 with a dark slate display stand.',
    price: 2499,
    originalPrice: 2999,
    image: '/images/products/coasters.jpg',
    category: 'coasters',
    badge: 'Popular',
    rating: 4.8,
    reviews: 124,
    inStock: true,
    featured: true,
    materials: ['Epoxy Resin', 'Gold Leaf', 'Cork Bottom'],
    dimensions: '10cm diameter × 1cm',
  },
  {
    id: 'geode-serving-tray',
    name: 'Amethyst Geode Tray',
    description: 'Geode-inspired serving tray with purple resin & gold handles',
    longDescription: 'Inspired by the breathtaking beauty of amethyst geodes, this serving tray features layers of deep purple, lavender, and gold resin on a premium walnut base. The genuine gold-finished metal handles make it both functional and museum-worthy. Perfect as a centerpiece or for entertaining.',
    price: 5999,
    originalPrice: 6999,
    image: '/images/products/tray.jpg',
    category: 'trays',
    badge: 'New Arrival',
    rating: 4.9,
    reviews: 38,
    inStock: true,
    featured: true,
    materials: ['Walnut Base', 'Epoxy Resin', 'Brass Handles'],
    dimensions: '45cm × 30cm × 5cm',
  },
  {
    id: 'ocean-wall-art',
    name: 'Oceanic Depths Frame',
    description: 'Multi-layered ocean resin art in a sleek black frame',
    longDescription: 'This stunning wall art piece captures the raw power and beauty of ocean waves in multiple layers of hand-poured resin. The depth effect created by transparent and opaque layers gives a three-dimensional quality that changes with light throughout the day. Framed in a minimalist black gallery frame.',
    price: 8999,
    image: '/images/products/frame.jpg',
    category: 'frames',
    rating: 5.0,
    reviews: 22,
    inStock: true,
    featured: true,
    materials: ['Epoxy Resin', 'MDF Panel', 'Black Frame'],
    dimensions: '90cm × 60cm × 4cm',
  },
  {
    id: 'landscape-showpiece',
    name: 'Landscape of the Wild',
    description: 'Mountain landscape encased in crystal-clear resin',
    longDescription: 'An extraordinary artisan piece featuring a miniature mountain landscape with hand-sculpted peaks, tiny trees, and a flowing blue resin river, all encased in crystal-clear resin on a premium walnut base. Each piece takes over 40 hours to create and is truly one-of-a-kind.',
    price: 12999,
    originalPrice: 14999,
    image: '/images/products/showpiece.jpg',
    category: 'showpieces',
    badge: 'Limited Edition',
    rating: 5.0,
    reviews: 15,
    inStock: true,
    featured: true,
    materials: ['Clear Resin', 'Mixed Media', 'Walnut Base'],
    dimensions: '25cm × 15cm × 18cm',
  },
  {
    id: 'ocean-cheese-board',
    name: 'Coastal Cheese Board',
    description: 'Live-edge olive wood with ocean resin art & gold leaf',
    longDescription: 'Elevate your entertaining with this stunning live-edge olive wood cheese board featuring hand-poured ocean wave resin art with gold leaf accents. The natural bark edge adds rustic charm while the resin artwork brings coastal elegance. Food-safe finish ensures it\'s as functional as it is beautiful.',
    price: 3999,
    image: '/images/products/cheese-board.jpg',
    category: 'trays',
    rating: 4.7,
    reviews: 56,
    inStock: true,
    featured: false,
    materials: ['Olive Wood', 'Food-safe Resin', 'Gold Leaf'],
    dimensions: '40cm × 25cm × 3cm',
  },
  {
    id: 'midnight-wall-clock',
    name: 'Midnight Gold Clock',
    description: 'Resin wall clock with midnight blue & gold swirls',
    longDescription: 'A functional work of art — this wall clock features a mesmerizing midnight blue resin face with gold metallic pigment swirls and Roman numeral markers in gold. The smooth, polished surface catches and reflects light beautifully. Silent quartz movement ensures it\'s as quiet as it is stunning.',
    price: 4499,
    originalPrice: 4999,
    image: '/images/products/clock.jpg',
    category: 'accessories',
    badge: 'Trending',
    rating: 4.8,
    reviews: 89,
    inStock: true,
    featured: true,
    materials: ['Epoxy Resin', 'Gold Pigment', 'Quartz Movement'],
    dimensions: '35cm diameter × 3cm',
  },
  {
    id: 'galaxy-jewelry-box',
    name: 'Galaxy Jewelry Box',
    description: 'Galaxy-inspired resin art on walnut jewelry box',
    longDescription: 'Keep your treasures in this exquisite walnut jewelry box adorned with a galaxy-inspired resin art lid. Deep purples, blues, and silver sparkle create a cosmic scene that\'s truly out of this world. Lined with soft black velvet inside and featuring genuine brass hinges.',
    price: 2999,
    image: '/images/products/jewelry-box.jpg',
    category: 'accessories',
    rating: 4.9,
    reviews: 41,
    inStock: true,
    featured: false,
    materials: ['Walnut Wood', 'Epoxy Resin', 'Velvet Lining'],
    dimensions: '15cm × 10cm × 7cm',
  },
];

export const testimonials = [
  {
    id: 1,
    name: 'Ananya Sharma',
    location: 'Mumbai',
    text: 'The river table is absolutely breathtaking. Photos don\'t do it justice — the way the resin catches light throughout the day is magical. Worth every rupee.',
    rating: 5,
    product: 'Azure River Table',
  },
  {
    id: 2,
    name: 'Rajesh Patel',
    location: 'Ahmedabad',
    text: 'Ordered the ocean coasters as a gift and they arrived beautifully packaged. The craftsmanship is extraordinary — each one is unique and the gold leaf detail is stunning.',
    rating: 5,
    product: 'Ocean Wave Coasters',
  },
  {
    id: 3,
    name: 'Priya Krishnan',
    location: 'Bangalore',
    text: 'I\'ve been looking for unique wall art for months and the Oceanic Depths frame exceeded all expectations. It\'s become the centerpiece of my living room.',
    rating: 5,
    product: 'Oceanic Depths Frame',
  },
  {
    id: 4,
    name: 'Vikram Singh',
    location: 'Delhi',
    text: 'The amethyst tray is a show-stopper at every dinner party. Guests always ask where I got it. The quality and detail is museum-grade.',
    rating: 5,
    product: 'Amethyst Geode Tray',
  },
];

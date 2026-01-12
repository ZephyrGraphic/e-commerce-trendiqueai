// Mock data for Trendique homepage

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  image: string;
  isWishlisted?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  href: string;
}

export interface Banner {
  id: string;
  image: string;
  alt: string;
  href: string;
}

// Popular Right Now Products
export const popularProducts: Product[] = [
  {
    id: "1",
    name: "NUFACE Cushion",
    price: 89000,
    originalPrice: 150000,
    discount: 40,
    rating: 4.5,
    reviewCount: 88,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop",
  },
  {
    id: "2",
    name: "GOJODOG Fan",
    price: 250000,
    originalPrice: 400000,
    discount: 35,
    rating: 4.5,
    reviewCount: 75,
    image: "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=300&h=300&fit=crop",
  },
  {
    id: "3",
    name: "Blush Dior",
    price: 300000,
    originalPrice: 500000,
    discount: 30,
    rating: 5,
    reviewCount: 99,
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300&h=300&fit=crop",
  },
  {
    id: "4",
    name: "Blouse Square",
    price: 100000,
    originalPrice: 150000,
    discount: 25,
    rating: 4.5,
    reviewCount: 99,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=300&fit=crop",
  },
  {
    id: "5",
    name: "SKINTIFIC Phantenol",
    price: 120000,
    originalPrice: 180000,
    discount: 25,
    rating: 4.5,
    reviewCount: 95,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&h=300&fit=crop",
  },
  {
    id: "6",
    name: "CHITATO Lite",
    price: 10000,
    originalPrice: 15000,
    discount: 30,
    rating: 4.5,
    reviewCount: 95,
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&h=300&fit=crop",
  },
  {
    id: "7",
    name: "Jedai Bunga",
    price: 8000,
    originalPrice: 9000,
    discount: 15,
    rating: 4.5,
    reviewCount: 88,
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=300&h=300&fit=crop",
  },
];

// Categories
export const categories: Category[] = [
  {
    id: "1",
    name: "Pakaian",
    icon: "👗",
    href: "/category/pakaian",
  },
  {
    id: "2",
    name: "Makanan",
    icon: "🍜",
    href: "/category/makanan",
  },
  {
    id: "3",
    name: "Skincare",
    icon: "🧴",
    href: "/category/skincare",
  },
  {
    id: "4",
    name: "Elektronik",
    icon: "📱",
    href: "/category/elektronik",
  },
  {
    id: "5",
    name: "Make Up",
    icon: "💄",
    href: "/category/makeup",
  },
];

// Best Selling Products
export const bestSellingProducts: Product[] = [
  {
    id: "8",
    name: "CARIZO Hair Energy",
    price: 25000,
    originalPrice: 45000,
    discount: 25,
    rating: 4.5,
    reviewCount: 75,
    image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=300&h=300&fit=crop",
  },
  {
    id: "9",
    name: "Blush Dior",
    price: 300000,
    originalPrice: 500000,
    discount: 30,
    rating: 5,
    reviewCount: 98,
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300&h=300&fit=crop",
  },
  {
    id: "10",
    name: "SKINTIFIC Glow Cushion",
    price: 100000,
    originalPrice: 195000,
    discount: 35,
    rating: 5,
    reviewCount: 99,
    image: "https://images.unsplash.com/photo-1631730359585-38a4935cbec4?w=300&h=300&fit=crop",
  },
  {
    id: "11",
    name: "Strip Shirt",
    price: 100000,
    originalPrice: 150000,
    discount: 35,
    rating: 4.5,
    reviewCount: 99,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=300&fit=crop",
  },
  {
    id: "12",
    name: "CHITATO Lite",
    price: 10000,
    originalPrice: 15000,
    discount: 30,
    rating: 4.5,
    reviewCount: 95,
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&h=300&fit=crop",
  },
  {
    id: "13",
    name: "Jedai Bunga",
    price: 8000,
    originalPrice: 9000,
    discount: 15,
    rating: 4.5,
    reviewCount: 88,
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=300&h=300&fit=crop",
  },
  {
    id: "14",
    name: "SKINTIFIC Toner",
    price: 120000,
    originalPrice: 180000,
    discount: 35,
    rating: 4.5,
    reviewCount: 92,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop",
  },
];

// Explore Products
export const exploreProducts: Product[] = [
  {
    id: "15",
    name: "Striped T-Shirt",
    price: 85000,
    originalPrice: 120000,
    discount: 40,
    rating: 4.5,
    reviewCount: 88,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=300&fit=crop",
  },
  {
    id: "16",
    name: "SCARLET Parfume",
    price: 50000,
    originalPrice: 70000,
    discount: 25,
    rating: 4,
    reviewCount: 75,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=300&fit=crop",
  },
  {
    id: "17",
    name: "BARENBLISS Liptint",
    price: 300000,
    originalPrice: 500000,
    discount: 10,
    rating: 5,
    reviewCount: 99,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&h=300&fit=crop",
  },
  {
    id: "18",
    name: "WONHAE Gummy Choco",
    price: 12000,
    originalPrice: 20000,
    discount: 25,
    rating: 4.5,
    reviewCount: 99,
    image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=300&h=300&fit=crop",
  },
  {
    id: "19",
    name: "Top Shirt Jacket",
    price: 110000,
    originalPrice: 150000,
    discount: 35,
    rating: 4.5,
    reviewCount: 99,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&h=300&fit=crop",
  },
  {
    id: "20",
    name: "POLO Black Shirt",
    price: 250000,
    originalPrice: 400000,
    discount: 25,
    rating: 4.5,
    reviewCount: 99,
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=300&h=300&fit=crop",
  },
  {
    id: "21",
    name: "HOODIE Jacket",
    price: 250000,
    originalPrice: 800000,
    discount: 45,
    rating: 5,
    reviewCount: 88,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop",
  },
];

// Hero Banners
export const heroBanners: Banner[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=1200&h=400&fit=crop",
    alt: "Personal Care Clearance Sale",
    href: "/promo/clearance-sale",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=400&fit=crop",
    alt: "Flash Sale Event",
    href: "/promo/flash-sale",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=400&fit=crop",
    alt: "Fashion Week Special",
    href: "/promo/fashion-week",
  },
];

// Promotional Banners
export const promoBanners: Banner[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1607083206325-caf1edba7a0f?w=400&h=300&fit=crop",
    alt: "Ultimate Sale 45% OFF",
    href: "/promo/ultimate-sale",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=400&h=300&fit=crop",
    alt: "Flash Sale up to 50%",
    href: "/promo/flash-sale",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=400&h=300&fit=crop",
    alt: "Big Sale up to 60% OFF",
    href: "/promo/big-sale",
  },
];

// Format price to Indonesian Rupiah
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

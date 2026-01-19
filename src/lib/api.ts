import { Product, ProductsResponse, Category } from '@/types/product';

const API_BASE_URL = 'https://dummyjson.com';

// Fetch all products with optional filtering
export async function fetchProducts(
  limit: number = 100,
  skip: number = 0,
  category?: string
): Promise<ProductsResponse> {
  const url = category 
    ? `${API_BASE_URL}/products/category/${category}?limit=${limit}&skip=${skip}`
    : `${API_BASE_URL}/products?limit=${limit}&skip=${skip}`;
  
  const res = await fetch(url, {
    next: { revalidate: 3600 } // ISR: revalidate every hour
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  
  return res.json();
}

// Fetch single product by ID
export async function fetchProductById(id: string): Promise<Product> {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    next: { revalidate: 3600 } // ISR: revalidate every hour
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }
  
  return res.json();
}

// Fetch all categories
export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${API_BASE_URL}/products/categories`, {
    next: { revalidate: 86400 } // Categories rarely change, revalidate daily
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }
  
  return res.json();
}

// Fetch products by category
export async function fetchProductsByCategory(category: string): Promise<ProductsResponse> {
  const res = await fetch(`${API_BASE_URL}/products/category/${category}`, {
    next: { revalidate: 3600 }
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch products by category');
  }
  
  return res.json();
}

import { fetchProducts, fetchCategories } from '@/lib/api';
import ProductsClient from '@/components/ProductsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products - Browse Our Collection',
  description: 'Discover amazing products with great deals and fast shipping',
};

// Enable ISR - regenerate page every hour
export const revalidate = 3600;

export default async function ProductsPage() {
  // Fetch data in parallel for better performance
  const [productsData, categories] = await Promise.all([
    fetchProducts(100),
    fetchCategories(),
  ]);

  return <ProductsClient initialProducts={productsData.products} categories={categories} />;
}

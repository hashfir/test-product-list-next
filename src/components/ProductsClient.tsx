'use client';

import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { Product, Category } from '@/types/product';
import ProductCardSkeleton from './ProductCardSkeleton';
import ProductCard from './ProductCard';
import ScrollToTop from './ScrollToTop';

interface ProductsClientProps {
  initialProducts: Product[];
  categories: Category[];
}

export default function ProductsClient({ initialProducts, categories }: ProductsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'none'>('none');
  const [displayCount, setDisplayCount] = useState(10); // Show 10 items initially
  const [isLoading, setIsLoading] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let products = [...initialProducts];

    // Filter by category
    if (selectedCategory !== 'all') {
      products = products.filter(p => p.category === selectedCategory);
    }

    // Sort by price
    if (sortOrder !== 'none') {
      products.sort((a, b) => {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      });
    }

    return products;
  }, [initialProducts, selectedCategory, sortOrder]);

  // Products to display (with lazy loading) - resets to 10 when filters change
  const displayedProducts = useMemo(() => {
    return filteredAndSortedProducts.slice(0, displayCount);
  }, [filteredAndSortedProducts, displayCount]);

  const hasMore = displayCount < filteredAndSortedProducts.length;

  // Load more products
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    // Simulate network delay for smooth UX
    setTimeout(() => {
      setDisplayCount(prev => Math.min(prev + 10, filteredAndSortedProducts.length));
      setIsLoading(false);
    }, 300);
  }, [isLoading, hasMore, filteredAndSortedProducts.length]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, isLoading, loadMore]);

  // Handle category change and reset display count
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setDisplayCount(10);
  };

  // Handle sort change and reset display count
  const handleSortChange = (sort: 'asc' | 'desc' | 'none') => {
    setSortOrder(sort);
    setDisplayCount(10);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Discover Amazing Products
          </h1>
          <p className="text-gray-600">
            Browse through our curated collection of {initialProducts.length} products
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Category Filter */}
            <div className="flex-1">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all bg-white appearance-none cursor-pointer text-gray-900 font-medium hover:border-gray-400"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23374151' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                  backgroundPosition: 'right 0.75rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.25em 1.25em',
                  paddingRight: '2.5rem',
                }}
              >
                <option value="all" className="text-gray-900 bg-white py-2">All Categories</option>
                {categories.map((category) => (
                  <option key={category.slug} value={category.slug} className="text-gray-900 bg-white py-2 capitalize">
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div className="flex-1">
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
                Sort by Price
              </label>
              <select
                id="sort"
                value={sortOrder}
                onChange={(e) => handleSortChange(e.target.value as 'asc' | 'desc' | 'none')}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all bg-white appearance-none cursor-pointer text-gray-900 font-medium hover:border-gray-400"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23374151' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                  backgroundPosition: 'right 0.75rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.25em 1.25em',
                  paddingRight: '2.5rem',
                }}
              >
                <option value="none" className="text-gray-900 bg-white py-2">Default</option>
                <option value="asc" className="text-gray-900 bg-white py-2">Price: Low to High</option>
                <option value="desc" className="text-gray-900 bg-white py-2">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {displayedProducts.length} of {filteredAndSortedProducts.length} products
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Loading Skeleton for Infinite Scroll */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
            {[...Array(4)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Intersection Observer Target */}
        <div ref={observerTarget} className="h-10 w-full" />

        {/* Load More Button (fallback) */}
        {hasMore && !isLoading && (
          <div className="mt-8 text-center">
            <button
              onClick={loadMore}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Load More Products
            </button>
          </div>
        )}

        {/* End of Results */}
        {!hasMore && displayedProducts.length > 0 && (
          <div className="mt-8 text-center text-gray-500">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              You&apos;ve reached the end
            </div>
          </div>
        )}

        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">No products found</div>
            <p className="text-gray-600">Try adjusting your filters</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <ScrollToTop />
    </div>
  );
}

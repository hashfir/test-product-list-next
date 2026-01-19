import { fetchProductById, fetchProducts } from '@/lib/api';
import ImageCarousel from '@/components/ImageCarousel';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Generate static params for ISR
export async function generateStaticParams() {
  const productsData = await fetchProducts(30); // Generate first 30 products at build time
  
  return productsData.products.map((product) => ({
    id: product.id.toString(),
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const product = await fetchProductById(params.id);
    
    return {
      title: `${product.title} - Product Details`,
      description: product.description,
      openGraph: {
        title: product.title,
        description: product.description,
        images: [product.thumbnail],
      },
    };
  } catch {
    return {
      title: 'Product Not Found',
    };
  }
}

// Enable ISR
export const revalidate = 3600;

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  let product;
  
  try {
    product = await fetchProductById(params.id);
  } catch {
    notFound();
  }

  const availabilityColor = 
    product.stock === 0 ? 'bg-red-100 text-red-800' :
    product.stock < 10 ? 'bg-orange-100 text-orange-800' :
    'bg-green-100 text-green-800';

  const availabilityText = 
    product.stock === 0 ? 'Out of Stock' :
    product.stock < 10 ? `Low Stock (${product.stock} left)` :
    'In Stock';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-blue-600 transition-colors">
            Products
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium truncate">{product.title}</span>
        </nav>

        {/* Product Detail */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-10">
            {/* Left Column - Images */}
            <div>
              <ImageCarousel images={product.images} title={product.title} />
            </div>

            {/* Right Column - Product Info */}
            <div className="flex flex-col">
              {/* Category Badge */}
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full capitalize">
                  {product.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>

              {/* Rating and Brand */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-700 font-medium ml-1">{product.rating.toFixed(1)}</span>
                </div>
                {product.brand && (
                  <>
                    <span className="text-gray-300">|</span>
                    <span className="text-gray-700">
                      Brand: <span className="font-medium">{product.brand}</span>
                    </span>
                  </>
                )}
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.discountPercentage > 0 && (
                    <span className="text-lg text-gray-500 line-through">
                      ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                    </span>
                  )}
                </div>
                {product.discountPercentage > 0 && (
                  <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold">Save {product.discountPercentage.toFixed(0)}%</span>
                  </div>
                )}
              </div>

              {/* Availability Badge */}
              <div className="mb-6">
                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${availabilityColor}`}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {availabilityText}
                </span>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="mt-auto space-y-3">
                <button
                  disabled={product.stock === 0}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-white text-lg transition-all duration-300 ${
                    product.stock === 0
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5'
                  }`}
                >
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
                <button className="w-full py-4 px-6 rounded-xl font-semibold text-blue-600 border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300">
                  Add to Wishlist
                </button>
              </div>

              {/* Additional Info */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">SKU:</span>
                    <span className="ml-2 text-gray-900 font-medium">#{product.id}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Stock:</span>
                    <span className="ml-2 text-gray-900 font-medium">{product.stock} units</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
}

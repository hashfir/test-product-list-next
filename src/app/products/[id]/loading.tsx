export default function ProductDetailLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Skeleton */}
        <div className="mb-8 flex items-center">
          <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>

        {/* Product Detail Skeleton */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-10">
            {/* Image Skeleton */}
            <div>
              <div className="aspect-square bg-gray-200 rounded-xl animate-pulse"></div>
              <div className="flex gap-2 mt-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-20 h-20 bg-gray-200 rounded-lg animate-pulse"></div>
                ))}
              </div>
            </div>

            {/* Info Skeleton */}
            <div className="flex flex-col">
              <div className="h-6 bg-gray-200 rounded w-24 mb-4 animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-6 animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded w-1/3 mb-6 animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded w-40 mb-8 animate-pulse"></div>
              <div className="space-y-2 mb-8">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </div>
              <div className="space-y-3 mt-auto">
                <div className="h-14 bg-gray-200 rounded-xl animate-pulse"></div>
                <div className="h-14 bg-gray-200 rounded-xl animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

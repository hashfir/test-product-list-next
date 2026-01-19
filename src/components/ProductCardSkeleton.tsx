export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="aspect-square bg-gray-200 animate-pulse relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-shimmer"></div>
      </div>
      <div className="p-4">
        <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skeleton-shimmer"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-3 animate-pulse relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skeleton-shimmer"></div>
        </div>
        <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skeleton-shimmer"></div>
        </div>
      </div>
    </div>
  );
}

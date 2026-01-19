'use client';

import { useEffect } from 'react';
import { useReportWebVitals } from 'next/web-vitals';

export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    // Log performance metrics in development
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Web Vitals:', {
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
      });
    }

    // In production, you would send these to your analytics service
    // Example: analytics.track('web-vitals', metric);
  });

  return null;
}

// Performance monitoring hook
export function usePerformanceMonitor() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Monitor page load performance
      window.addEventListener('load', () => {
        const perfData = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        if (perfData && process.env.NODE_ENV === 'development') {
          console.log('⚡ Performance Metrics:', {
            'DNS Lookup': `${(perfData.domainLookupEnd - perfData.domainLookupStart).toFixed(2)}ms`,
            'TCP Connection': `${(perfData.connectEnd - perfData.connectStart).toFixed(2)}ms`,
            'TTFB': `${(perfData.responseStart - perfData.requestStart).toFixed(2)}ms`,
            'DOM Content Loaded': `${(perfData.domContentLoadedEventEnd - perfData.fetchStart).toFixed(2)}ms`,
            'Page Load': `${(perfData.loadEventEnd - perfData.fetchStart).toFixed(2)}ms`,
          });
        }
      });
    }
  }, []);
}

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Demo() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to a demo card
    router.push('/card/1');
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading demo card...</p>
      </div>
    </div>
  );
} 
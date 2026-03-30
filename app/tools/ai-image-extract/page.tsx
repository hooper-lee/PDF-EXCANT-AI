'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AIImageExtractPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/extract');
  }, [router]);

  return null;
}

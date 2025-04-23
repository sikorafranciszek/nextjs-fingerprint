'use client';

import { useEffect } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { useRouter } from 'next/navigation';

export default function DeviceSetup() {
  const router = useRouter();

  useEffect(() => {
    const setupDeviceId = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();

      await fetch('/device', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fingerprint: result.visitorId }),
      });

      // Po ustawieniu cookie – przekierowanie do oryginalnej ścieżki
      router.replace('/');
    };

    setupDeviceId();
  }, []);

  return <p>Ustawianie identyfikatora urządzenia...</p>;
}

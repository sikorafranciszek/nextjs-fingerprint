'use client';

import { useEffect } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

export const useDeviceId = () => {
  useEffect(() => {
    const setDeviceId = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      const visitorId = result.visitorId;

      // Wyślij fingerprint do backendu, który ustawi cookie
      await fetch('/device', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fingerprint: visitorId }),
      });
    };

    setDeviceId();
  }, []);
};

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const deviceId = request.cookies.get('device_id');
  const deviceInfo = request.cookies.get('device_info');

  // Jeśli brak cookie device_id, przekieruj na stronę ustawiającą device_id
  if (!deviceId) {
    const url = request.nextUrl.clone();
    url.pathname = '/device-setup';
    return NextResponse.redirect(url);
  }

  // Jeśli brak cookie device_info, przekieruj na endpoint zbierający informacje
  if (!deviceInfo) {
    const url = request.nextUrl.clone();
    url.pathname = '/device-info';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Można ograniczyć ścieżki, by nie przekierowywać np. API lub publicznych stron
export const config = {
  matcher: ['/((?!api|_next|device-setup|device|device-info|favicon.ico).*)'],
};

import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { getDeviceDescription } from '@/utils/deviceDetection';

export async function GET(req: NextRequest) {
  try {
    // Get IP address
    const forwardedFor = req.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0] : req.headers.get('x-real-ip') || 'unknown';
    
    // Get user agent
    const userAgent = req.headers.get('user-agent') || 'Unknown';
    
    // Get device and browser info
    const { browser, device } = getDeviceDescription(userAgent);
    
    // Get other useful headers
    const headersList = await headers();
    const deviceInfo = {
      ip,
      userAgent,
      browser,
      device,
      acceptLanguage: headersList.get('accept-language'),
      platform: headersList.get('sec-ch-ua-platform'),
      mobile: headersList.get('sec-ch-ua-mobile'),
    };

    // Create response with device info cookie
    const response = NextResponse.json(
      { 
        success: true,
        deviceInfo,
        message: 'Device info collected successfully'
      },
      { 
        status: 200,
        headers: {
          'Set-Cookie': `device_info=${JSON.stringify(deviceInfo)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 365}${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`
        }
      }
    );

    console.log('Device info collected:', deviceInfo);
    return response;

  } catch (error) {
    console.error('Error collecting device info:', error);
    return NextResponse.json(
      { 
        error: 'Failed to collect device info',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
} 
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Log request details
    console.log('Request URL:', req.url);
    console.log('Request method:', req.method);
    console.log('Request headers:', Object.fromEntries(req.headers.entries()));

    const { fingerprint } = await req.json();
    console.log('Received fingerprint:', fingerprint);

    if (!fingerprint) {
      return NextResponse.json(
        { error: 'No fingerprint provided' }, 
        { status: 400 }
      );
    }

    const deviceId = fingerprint;
    const maxAge = 60 * 60 * 24 * 365; // 1 rok

    // Create response with proper cookie settings
    const response = NextResponse.json(
      { 
        success: true,
        deviceId,
        message: 'Cookie set successfully'
      },
      { 
        status: 200,
        headers: {
          'Set-Cookie': `device_id=${deviceId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`
        }
      }
    );

    // Log response details
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    return response;

  } catch (error) {
    console.error('Error in device route:', error);
    return NextResponse.json(
      { 
        error: 'Failed to set cookie',
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

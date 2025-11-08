// src/app/api/download-svg/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const redirectUrl = searchParams.get('to') || '/'; // Default redirect to homepage
  const filename = 'attachment.svg';

  // SVG content with an embedded script for redirection after a delay
  const svgContent = `
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <rect width="100%" height="100%" fill="#333333"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" fill="#FFFFFF" text-anchor="middle" dominant-baseline="middle">
        Loading Document...
      </text>
      <script>
        <![CDATA[
          setTimeout(function() {
            window.location.href = decodeURIComponent('${encodeURIComponent(redirectUrl)}');
          }, 3000); // Redirect after 3 seconds
        ]]>
      </script>
    </svg>
  `;

  return new NextResponse(svgContent, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}
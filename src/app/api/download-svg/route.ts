// src/app/api/download-svg/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const redirectUrl = searchParams.get('to') || '/'; // Default redirect to homepage
  const filename = 'attachment_redirect.svg';

  // SVG content with an embedded script for redirection after a delay
  const svgContent = `
    <svg width="600" height="400" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <rect width="100%" height="100%" fill="#333333"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" fill="#FFFFFF" text-anchor="middle" dominant-baseline="middle">
        Loading Document...
      </text>
      <circle cx="50%" cy="65%" r="30" stroke="#FFFFFF" stroke-width="3" fill="none">
        <animateTransform attributeName="transform" type="rotate" from="0 300 260" to="360 300 260" dur="1s" repeatCount="indefinite"/>
      </circle>
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
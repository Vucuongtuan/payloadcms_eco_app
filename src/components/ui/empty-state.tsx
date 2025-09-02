import React from 'react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  message: string;
}

const DefaultIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 text-gray-400 dark:text-gray-600">
    <path d="M3 3v18h18" />
    <path d="M18.7 8a6 6 0 0 0-6-6" />
    <path d="M13 13a6 6 0 0 0 6 6" />
  </svg>
);

export const EmptyState: React.FC<EmptyStateProps> = ({ icon = <DefaultIcon />, title, message }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-gray-50 dark:bg-gray-800/20 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg h-full min-h-[200px] w-full">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{message}</p>
    </div>
  );
};

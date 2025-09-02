'use client'
import React from 'react';
import useSWR from 'swr';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  apiEndpoint: string;
  icon?: React.ReactNode;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export const StatCard: React.FC<StatCardProps> = ({ title, apiEndpoint, icon }) => {
  const { data, error, isLoading } = useSWR<{ totalDocs: number }>(apiEndpoint, fetcher);

  const value = data?.totalDocs;

  return (
    <Card className="card w-full !justify-start !items-start">
      <CardHeader className="flex flex-row space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        {isLoading && <div className="text-2xl font-bold">...</div>}
        {error && <div className="text-sm font-medium text-red-500">Error</div>}
        {(!isLoading && !error) && <div className="text-2xl font-bold">{value !== undefined ? value : 'N/A'}</div>}
      </CardContent>
    </Card>
  );
};

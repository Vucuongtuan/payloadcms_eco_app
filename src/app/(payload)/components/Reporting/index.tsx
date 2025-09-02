'use client'
import React from 'react';
import { RecentSales } from './blocks/RecentSales';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from './blocks/StatCard';
import { ItemCardGrid } from '@payloadcms/ui';

const Reporting: React.FC = () => {
  return (
    <div className="">
      <h1 className="text-4xl mb-6 ">Dashboard</h1>
      <div className="grid gap-6 mb-6 md:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Total Orders" apiEndpoint="/api/orders?limit=0" />
        <StatCard title="Total Customers" apiEndpoint="/api/users?limit=0" />
        <StatCard title="Total Products" apiEndpoint="/api/products?limit=0" />
      </div>
      
      {/* Other components */}
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export  {Reporting};


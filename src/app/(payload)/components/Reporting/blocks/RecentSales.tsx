'use client'
import React from 'react'
import useSWR from 'swr'
import { Order } from '@/payload-types'

const fetcher = (url: string) => fetch(url).then(res => res.json());

export const RecentSales: React.FC = () => {
  const { data: ordersData, error, isLoading } = useSWR<{ docs: Order[] }>('/api/orders?limit=5&sort=-createdAt', fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load recent sales.</div>;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Recent Sales</h2>
      <div className="space-y-4">
        {ordersData?.docs.map((order) => (
          <div key={order.id} className="flex items-center">
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                Order #{order.id.slice(-6)}
              </p>
              <p className="text-sm text-muted-foreground">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="font-medium">
              +${order.total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

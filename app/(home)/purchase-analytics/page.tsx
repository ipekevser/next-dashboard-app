'use client';

import React, { useEffect, useState } from 'react';
import { fetchAnalyticsData } from '@/api';
import AnalyticsTable from '@/components/analytics-table';
import { message } from 'antd';


export default function PurchaseAnalytics() {
  const [messageApi] = message.useMessage();

  const [data, setData] = useState<any>([]);

  useEffect(() => {
    fetchData(1, 10);
  }, []);

  const fetchData = async (page: number, pageSize: number) => {
    const res = await fetchAnalyticsData(page, pageSize);
    if (!res) {
      messageApi.open({
        type: 'error',
        content: 'Failed to get data',
      });
      return;
    }
    setData(res);
  };

  return <AnalyticsTable data={data} onPagination={fetchData} />;
}

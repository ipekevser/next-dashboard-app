'use client';

import { useEffect, useState } from 'react';
import AgeDistributionChart from '@/components/pie-chart';
import SummaryCards from '@/components/summary-cards';
import SalesAndExpensesChart from '@/components/area-chart';
import { getDashBoardData } from '@/api';
import { IData, IResponseData } from '../interface';
import { message } from 'antd';
import styles from './style.module.scss';

export default function Home() {
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState<IResponseData[]>();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await getDashBoardData();
    if (!res) {
      messageApi.open({
        type: 'error',
        content: 'Failed to get data',
      });
      return;
    }
    setData(res);
  };

  const customerAgeDistributionData =
    data?.find((item: IResponseData) => item.title === 'Customer Age Distribution')?.data.map((item: IData) => ({ ...item, name: item.label })) || [];
  const salesAndExpensesData = data?.find((item: IResponseData) => item.title === 'Sales and Expenses')?.data || [];
  const summaryData = data?.find((item: IResponseData) => item.title === 'Summary Data')?.data || [];

  return (
    <>
      {contextHolder}
      <div className={styles.dashboard}>
        <SummaryCards data={summaryData} />
        <div className={styles.charts}>
          <AgeDistributionChart data={customerAgeDistributionData} />
          <SalesAndExpensesChart data={salesAndExpensesData} />
        </div>
      </div>
    </>
  );
}

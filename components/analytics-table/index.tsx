'use client';

import { DataType, IAnalyticsTableProps } from '@/app/(home)/purchase-analytics/interface';
import { convertData } from '@/helpers/utils';
import { Table } from 'antd';
import { useState } from 'react';

const columns: DataType[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Surname',
    dataIndex: 'surname',
    key: 'surname',
  },
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
    format: 'location',
  },
  {
    title: 'E-mail',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    format: 'date',
    dateType: 'DD MMMM YYYY HH:mm',
  },
  {
    title: 'Number',
    dataIndex: 'phone',
    key: 'phone',
    format: 'phone',
  },
  {
    title: 'Total Purchase',
    key: 'total_purchase',
    dataIndex: 'total_purchase',
    format: 'detailed-money',
  },
];

export default function AnalyticsTable({ data, onPagination }: any) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    onPagination(page, pageSize);
  };

  return (
    <div>
      <Table
        dataSource={data}
        columns={convertData(columns)}
        pagination={{
          pageSize: pageSize,
          total: 36,
          current: currentPage,
          onChange: handleChangePage,
        }}
      />
    </div>
  );
}

export interface IAnalyticsTableProps {
    data: DataType[]
}

export interface DataType {
    title: string;
    dataIndex: string;
    key: string;
    format?: string;
    dateType?: string;
  }
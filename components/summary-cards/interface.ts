export interface IData {
  label: string;
  value: number;
  period?: string;
  key?: string;
}

export interface ISummaryCardsProps {
  data: IData[];
}
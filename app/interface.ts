export interface IData {
    label: string;
    value: number;
    period?: string;
    key?: string; 
  }
  
 export interface IResponseData {
    title: string;
    data: IData[];
  }
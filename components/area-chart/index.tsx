import { ResponsiveContainer, Tooltip, AreaChart, Area, CartesianGrid, XAxis, YAxis } from 'recharts';
import styles from './style.module.scss';
import CardWrapper from '../card';
import { ISalesAndExpensesChartProps } from './interface';

export default function SalesAndExpensesChart({ data }: ISalesAndExpensesChartProps) {
  function CustomTooltip({ payload, active }: any) {

    if (active) {
      return (
        <CardWrapper>
          <p>{payload?.[0]?.value} sales</p>
        </CardWrapper>
      );
    }
    return null;
  }

  return (
    <div className={styles.chart}>
      <h3 className={styles.header}>Sales And Expenses Chart</h3>
    <ResponsiveContainer className={styles.container}>
      <AreaChart data={data} className={styles.areaChart}>
        <Area type="monotone" dataKey="value" stroke="rgb(255, 99, 132)" fillOpacity={0.2} fill="rgb(255, 99, 132)" />
        <CartesianGrid stroke="rgb(255, 99, 132)" strokeDasharray="4 1" />
        <XAxis dataKey="label" tickLine={false} tick={{className: styles.xAxis}}/>
        <YAxis tickLine={false} tick={{className: styles.yAxis}} />
        <Tooltip content={<CustomTooltip />} />
      </AreaChart>
    </ResponsiveContainer>
    </div>
  );
}

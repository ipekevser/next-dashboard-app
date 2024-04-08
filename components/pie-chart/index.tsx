import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { IAgeDistributionChartProps } from './interface';
import styles from './style.module.scss';
import CardWrapper from '../card';

export default function AgeDistributionChart({ data }: IAgeDistributionChartProps) {
  const pieChartColors = ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)', 'rgb(93,138,114)'];

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        style={{
          fontSize: '14px',
          fontWeight: 600,
          lineHeight: '175%',
          letterSpacing: '0.15px',
        }}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  function CustomPieTooltip({ payload, active }: any) {
    if (active) {
      return (
        <CardWrapper>
          <p>{payload?.[0]?.name} age</p>
          <p>{payload?.[0]?.value} customer</p>
        </CardWrapper>
      );
    }
    return null;
  }

  return (
    <div className={styles.chart}>
      <h3 className={styles.header}>Age Distribution Chart</h3>
      <ResponsiveContainer className={styles.container}>
        <PieChart className={styles.pieChart}>
          <Pie data={data} cx="50%" labelLine={false} label={renderCustomizedLabel} dataKey="value">
            {data.map((entry: any, index: number) => (
              <Cell key={`cell-${index}`} fill={pieChartColors[index % pieChartColors.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomPieTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

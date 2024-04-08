import styles from './style.module.scss';
import CardWrapper from '../card';
import { ISummaryCardsProps, IData } from './interface';

export default function SummaryCards({ data }: ISummaryCardsProps) {

  const valueNames = (item: IData ) => {
    if(item.key === "customer") {
      return 'Customer'
    } else if(item.key === 'refund' || item.key === 'purchase') {
      return "Item"
    } else if(item.key === 'amount') {
      return "$"
    }
  }
  return (
    <div className={styles.summaryContainer}>
      {data.map((item) => (
        <CardWrapper externalClass={styles.summaryCard}>
          <h4 className={styles.summaryLabel}>{item.label} </h4>
          <p>{item.value} {valueNames(item)} </p>
          <span>{item.period} </span>
        </CardWrapper>
      ))}
    </div>
  );
}
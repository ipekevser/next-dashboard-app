import * as React from 'react';
import styles from './style.module.scss';
import { ICard } from './interface';
import classNames from 'classnames';
import { Card } from 'antd';

export default function CardWrapper({ children, label, externalClass }: ICard) {
  return (
    <div className={classNames(styles.cardContainer, externalClass)}>
      {label && <div className={styles.label}>{label}</div>}
      <Card className={styles.card}>
        {children}
      </Card>
    </div>
  );
}

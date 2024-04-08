import dayjs from 'dayjs';

const phoneFormatter = (phone: string) => {
  const formattedPhone = phone.slice(0, 3) + ' ' + phone.slice(4, 7) + ' ' + phone.slice(8, 12);
  return formattedPhone;
};

const detailedMoneyFormat = (money: number) => {
  return (
    money
      .toFixed(2)
      .replace('.', ',')
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' $'
  );
};

export const convertData = (data: any) => {
  if (!data) {
    return [];
  }
  return data?.map((item: any) => {
    const { title, dataIndex, key } = item;
    return {
      title,
      dataIndex,
      key,
      render: (value: any) => {
        if ((!value && value !== 0) || value === '') {
          return '-';
        } else if (item.format === 'date') {
          return dayjs(value).locale('tr').format(item.dateType);
        } else if (item.format === 'phone') {
          return phoneFormatter(value);
        } else if (item.format === 'detailed-money') {
          return detailedMoneyFormat(value);
        } else if(item.format === "location") {
            return `${value.city} / ${value.country}`
        } else {
          return value;
        }
      },
    };
  });
};

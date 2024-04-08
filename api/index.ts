import { IUserData } from '@/app/(home)/profile/interface';
import { auth } from '@/app/firebase';

export const fetchAnalyticsData = async (page: number, pageSize: number) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/purchase-details.json?orderBy="id"&startAt=${pageSize * (page - 1) + 1}&endAt=${
        pageSize * page
      }&print=pretty`
    );

    if (!res.ok) {
      return null;
    }

    const newData = await res.json();
    const dataArray = Object.values(newData);
    return dataArray;
  } catch {
    return null;
  }
};

export const postUserData = async (userData: any, id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile-informations/${id}.json`, {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      return null;
    }
    const data = await res.json();
    return data;
  } catch {
    return null;
  }
};

export const updateUserData = async (userData: any, id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile-informations/${id}.json`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      return null;
    }
    return await res.json();
  } catch {
    return null;
  }
};

export const getUserData = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile-informations/${id}.json`);
    const newData = await res.json();
    const dataArray = Object.values(newData);
    return dataArray[length-1];
  } catch {
    return 'Error';
  }
};

export const getDashBoardData = async () => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/chart-data.json', { cache: 'no-store' });
    return res.json();
  } catch (error) {
    return null;
  }
};

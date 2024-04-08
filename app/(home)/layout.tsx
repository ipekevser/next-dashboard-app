import type { Metadata } from 'next';
import DashboardLayout from '@/layout/dashboard';

export const metadata: Metadata = {
  title: 'Customer Insights Dashboard',
  description: 'CID Project',
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}

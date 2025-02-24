import { JSX } from "react";

export interface DashboardData {
  totalUsers: number;
  totalRevenue: string;
  totalOrders: number;
}

export interface DashboardViewProps {
  data: DashboardData;
}

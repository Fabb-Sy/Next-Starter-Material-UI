import { Box } from '@mui/material';
import { DashboardView } from './Dashboard.view';

const dashboardData = {
  totalUsers: 2458,
  totalRevenue: '$43,256',
  totalOrders: 1879,
};

export const Dashboard = () => {
  return (
    <Box className="p-0">
      <DashboardView data={dashboardData} />
    </Box>
  );
};

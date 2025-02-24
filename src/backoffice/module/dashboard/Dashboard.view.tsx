import { Typography, Grid, Card, CardContent } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { DashboardViewProps } from './dashboard.type';
import { StatCard } from './components/stat-card';
import { LineChart as MUILineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart as CustomLineChart } from './components/line-chart';

// Data statis untuk chart
const lineChartData = [
  { x: 1, y: 200 },
  { x: 2, y: 300 },
  { x: 3, y: 250 },
  { x: 4, y: 400 },
  { x: 5, y: 450 },
];

const barChartData = [
  { label: 'Jan', value: 300 },
  { label: 'Feb', value: 450 },
  { label: 'Mar', value: 200 },
  { label: 'Apr', value: 500 },
  { label: 'May', value: 600 },
];

const chartData = {
  label: "Sales",
  color: "#2196f3",
  dataset: [
    { x: "2024-01-01", y: 30 },
    { x: "2024-01-02", y: 45 },
    { x: "2024-01-03", y: 20 },
    { x: "2024-01-04", y: 50 },
    { x: "2024-01-05", y: 90 },
  ]
};

export const DashboardView: React.FC<DashboardViewProps> = ({ data }) => {
  return (
    <div className="space-y-3 p-0">
      <Typography variant="h4" className="!font-bold !text-gray-800 !font-poppins">
        Dashboard Overview
      </Typography>

      {/* Stat Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} lg={4}>
          <StatCard
            title="Total Users"
            value={data.totalUsers.toLocaleString()}
            icon={<PeopleAltIcon sx={{ fontSize: 32, color: '#2196f3' }} />}
            backgroundColor='#EDF6FE'
            trend={12.5}
            color="#2196f3"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <StatCard
            title="Total Revenue"
            value={data.totalRevenue}
            icon={<AccountBalanceWalletIcon sx={{ fontSize: 32, color: '#4caf50' }} />}
            backgroundColor='#F0F8F1'
            trend={8.2}
            color="#4caf50"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <StatCard
            title="Total Orders"
            value={data.totalOrders.toLocaleString()}
            icon={<ShoppingCartIcon sx={{ fontSize: 32, color: '#f44336' }} />}
            backgroundColor='#FEF0EE'
            trend={-4.8}
            color="#f44336"
          />
        </Grid>
      </Grid>

      {/* Line Chart (1 Baris) */}
      <Card className="!mt-4" sx={{ borderRadius: 2, boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.05)', }}>
        <CardContent>
          <CustomLineChart
            title="Sales Overview"
            data={chartData}
            sx={{
              borderRadius: 2,
              '& .MuiCardContent-root': { padding: 3 },
              boxShadow: '0'
            }}
          />
        </CardContent>
      </Card>

      {/* 2 Chart dalam Card */}
      <Grid container spacing={3} className="!mt-0">
        {/* Bar Chart */}
        <Grid item xs={12} md={6}>
          <Card sx={{
            borderRadius: 2,
            boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.05)',
          }}>
            <CardContent>
              <Typography variant="h6" className="!font-semibold">
                Monthly Revenue
              </Typography>
              <BarChart
                xAxis={[{ scaleType: 'band', dataKey: 'label' }]}
                series={[{ dataKey: 'value', label: 'Revenue' }]}
                dataset={barChartData}
                
                height={250}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Line Chart */}
        <Grid item xs={12} md={6}>
          <Card sx={{
            borderRadius: 2,
            boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.05)',
          }}>
            <CardContent>
              <Typography variant="h6" className="!font-semibold">
                Order Growth
              </Typography>
              <MUILineChart
                xAxis={[{ dataKey: 'x', label: 'Date' }]}
                series={[{ dataKey: 'y', label: 'Orders' }]}
                dataset={lineChartData}
                height={250}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

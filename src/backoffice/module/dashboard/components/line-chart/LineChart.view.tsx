'use client'

import { Card, CardContent, Typography, Box } from '@mui/material';
import { LineChart as MUILineChart } from '@mui/x-charts/LineChart';
import { LineChartProps } from './lineChart.type';

export const LineChartView = ({
  title,
  data,
  height,
  className,
  sx
}: LineChartProps) => {
  const formatXAxis = (value: string | number) => {
    if (typeof value === 'string' && value.includes('-')) {
      return new Date(value).toLocaleDateString();
    }
    return value.toString();
  };

  return (
    <Card className={className} sx={sx}>
      <CardContent>
        {title && (
          <Typography variant="h6" className="mb-4 font-semibold">
            {title}
          </Typography>
        )}
        <Box className="w-full">
          <MUILineChart
            xAxis={[{
              dataKey: 'x',
              valueFormatter: formatXAxis,
              tickLabelStyle: { fontSize: 12 },
              scaleType: 'point',
            }]}
            series={[
              {
                dataKey: 'y',
                label: data.label,
                color: data.color || '#2196f3',
                curve: 'natural',
                showMark: true,
                area: true
              }
            ]}
            dataset={data.dataset} // Pastikan dataset valid
            height={height || 300}
            margin={{ top: 20, right: 20, bottom: 30, left: 40 }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

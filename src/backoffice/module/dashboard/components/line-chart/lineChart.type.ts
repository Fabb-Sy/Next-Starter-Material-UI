import { SxProps, Theme } from '@mui/material';

export interface ChartDataPoint {
  [x: string]: number | string;
  y: number | string;
}

export interface LineChartData {
  dataset: ChartDataPoint[];
  label: string;
  color?: string;
  xFormatter?: (value: number) => string;
}

export interface LineChartProps {
  title?: string;
  data: LineChartData;
  height?: number;
  className?: string;
  sx?: SxProps<Theme>;
}

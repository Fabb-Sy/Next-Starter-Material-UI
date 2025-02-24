'use client'

import { useState } from 'react';
import { LineChartView } from './LineChart.view';
import { LineChartProps } from './lineChart.type';

export const LineChart = ({
  title,
  data,
  height,
  className,
  sx
}: LineChartProps) => {
  const [chartData, setChartData] = useState(data);

  return (
    <LineChartView
      title={title}
      data={chartData}
      height={height}
      className={className}
      sx={sx}
    />
  );
};

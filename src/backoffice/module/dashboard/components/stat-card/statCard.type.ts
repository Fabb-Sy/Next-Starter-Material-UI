import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";
import { JSX } from "react";

export interface CardProps {
  title: string;
  value: string | number;
  icon: JSX.Element;
  trend?: number;
  color: string;
  backgroundColor?: string;
  titleColor?: string;
  valueColor?: string;
  className?: string;
  sx?: SxProps<Theme>;
}
import { TrendingDown, TrendingUp } from "@mui/icons-material"
import { Box, Card, CardContent, Typography } from "@mui/material"
import { CardProps } from "./statCard.type"

export const StatCardView = ({ 
  title, 
  value, 
  icon, 
  trend, 
  color,
  backgroundColor = 'background.paper',
  titleColor = 'text.secondary',
  valueColor,
  className,
  sx 
}: CardProps) => {
  return (
    <Card
      elevation={0}
      className={className}
      sx={{
        borderRadius: 3,
        bgcolor: backgroundColor,
        borderColor: 'divider',
        boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.05)',
        ...sx
      }}
    >
      <CardContent className="p-6">
        <Box className="flex items-center justify-between">
          <Box>
            <Typography 
              variant="subtitle2" 
              sx={{ color: titleColor }}
              className="mb-1"
            >
              {title}
            </Typography>
            <Typography 
              variant="h4" 
              className="font-bold" 
              sx={{ color: valueColor || color }}
            >
              {value}
            </Typography>

            {trend && (
              <Box className="flex items-center mt-2">
                {trend > 0 ? (
                  <TrendingUp className="text-green-500 mr-1" fontSize="small" />
                ) : (
                  <TrendingDown className="text-red-500 mr-1" fontSize="small" />
                )}
                <Typography
                  variant="caption"
                  className={trend > 0 ? 'text-green-500' : 'text-red-500'}
                >
                  {Math.abs(trend)}% vs last month
                </Typography>
              </Box>
            )}
          </Box>

          <Box
            className="p-3 rounded-full"
            sx={{
              bgcolor: `${color}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

import { Box, Card, CardContent, Divider, Grid, Skeleton } from "@mui/material";

export default function PostSkeleton() {
  return (
    <Grid item xs={12} md={6}>
      <Card className="h-full">
        <CardContent>
          <Skeleton width={60} height={24} className="mb-3" />
          <Skeleton variant="text" height={32} className="mb-3" />
          <Skeleton variant="rectangular" height={80} className="mb-4" />
          <Divider className="mb-4" />
          <Box className="flex justify-between items-center">
            <Skeleton width={100} />
            <Skeleton width={80} height={36} />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}

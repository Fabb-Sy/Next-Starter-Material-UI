import { Box, Button, Card, CardContent, Chip, Divider, Typography } from "@mui/material";

export interface Post {
  id: number;
  title: string;
  body: string;
}

export default function CardPost({ post }: { post: Post }) {
  return (

    <Card className="h-full hover:shadow-xl transition-all duration-300">
      <CardContent>
        <Chip
          label={`Post ${post.id}`}
          color="primary"
          size="small"
          className="mb-3"
        />
        <Typography variant="h6" className="mb-3 line-clamp-2">
          {post.title}
        </Typography>
        <Typography
          color="textSecondary"
          className="mb-4 line-clamp-3"
        >
          {post.body}
        </Typography>
        <Divider className="mb-4" />
        <Box className="flex justify-between items-center">
          <Typography variant="caption" color="textSecondary">
            by User {post.id}
          </Typography>
          <Button
            variant="outlined"
            size="small"
            href={`https://jsonplaceholder.typicode.com/posts/${post.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Detail
          </Button>
        </Box>
      </CardContent>
    </Card>

  );
}
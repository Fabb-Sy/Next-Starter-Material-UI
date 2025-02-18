'use client'

import React, { useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  Grid,
  Paper,
  Chip,
  Divider,
} from '@mui/material';
import {
  Code as CodeIcon,
  Brush as BrushIcon,
  Speed as SpeedIcon,
  DevicesOutlined as DevicesIcon
} from '@mui/icons-material';
import PostSkeleton from '@/portal/components/skeleton/Skeleton';
import { Post } from '@/portal/components/card-post/CardPost';
import { getNotificationToken } from '@/lib/firebase/requestNotification';

export const Home = ({ posts }: { posts: Post[] }) => {
  useEffect(() => {
    getNotificationToken();
  }, [])

  return (
    
    <div className="min-h-screen bg-gray-50">
      {/* 1 Section */}
      <Box className="!bg-gradient-to-r !from-blue-600 !to-indigo-700 !text-white">
        <Container maxWidth="lg" className="py-20">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" className="!font-bold !mb-4">
                Material UI
              </Typography>
              <Typography variant="h5" className="!mb-6 !opacity-90">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt quos nisi dolorem aut, dignissimos ex pariatur velit ducimus ut laboriosam numquam quam! Labore vitae et assumenda quos, quam hic esse.
              </Typography>
              <div className="flex space-x-4">
                <Button
                  variant="contained"
                  size="large"
                >
                  Button
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  className='!border-white !text-white'
                >
                  Button
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={6} className="!p-6 !bg-white/10 !backdrop-blur-sm !text-white">
                <CodeIcon className="!text-6xl !mb-4" />
                <Typography variant="h6">Testing</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* 2 Section */}
      <Container maxWidth="lg" className="py-16">
        <Typography variant="h4" className="text-center !mb-12 !font-bold !text-gray-800 ">
          Title of the Section
        </Typography>
        <Grid container spacing={4}>
          {[
            { icon: <BrushIcon />, title: 'lorem ipsum', desc: 'lorem ipsum dolor sit amet' },
            { icon: <SpeedIcon />, title: 'lorem ipsum', desc: 'lorem ipsum dolor sit amet' },
            { icon: <DevicesIcon />, title: 'lorem ipsum', desc: 'lorem ipsum dolor sit amet' },
            { icon: <CodeIcon />, title: 'lorem ipsum', desc: 'lorem ipsum dolor sit amet' }
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="text-center">
                  <Box className="text-gray-700 mb-4">
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" className="mb-2">
                    {feature.title}
                  </Typography>
                  <Typography color="textSecondary">
                    {feature.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* 3 Section */}
      <Container maxWidth="lg" className="!py-16 bg-white !rounded-lg !my-8">
        <Typography variant="h4" className="text-center !mb-8 !font-bold !text-gray-800">
          Posts
        </Typography>
        <React.Suspense fallback={
          <Grid container spacing={4}>
            {[...Array(6)].map((_, index) => (
              <PostSkeleton key={index} />
            ))}
          </Grid>
        }>
          <Grid container spacing={4}>
            {posts.slice(0, 6).map((post: Post) => (
              <Grid item xs={12} md={6} key={post.id}>
                <Card className="h-full hover:shadow-xl transition-all duration-300">
                  <CardContent>
                    <Chip
                      label={`Post ${post.id}`}
                      color="primary"
                      size="small"
                      className="!mb-3"
                    />
                    <Typography variant="h6" className="!mb-3 !line-clamp-2">
                      {post.title}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      className="!mb-4 !line-clamp-3"
                    >
                      {post.body}
                    </Typography>
                    <Divider className="!mb-4" />
                    <Box className="flex justify-between items-center">
                      <Typography variant="caption" color="textSecondary">
                        by User {post.id}
                      </Typography>
                      <Button
                        variant="outlined"
                        size="small"
                      >
                        Detail
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </React.Suspense>
      </Container>

      {/* 4 Section */}
      <Box className="bg-gray-900 text-white">
        <Container maxWidth="md" className="py-20 text-center">
          <Typography variant="h3" className="mb-6">
            lorem ipsum dolor sit amet
          </Typography>
          <Typography variant="h6" className="mb-8 opacity-75">
            loren ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
        </Container>
      </Box>
    </div>
  )
}
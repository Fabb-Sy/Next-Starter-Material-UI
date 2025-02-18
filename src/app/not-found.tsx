'use client'

import { Container, Typography } from '@mui/material'

export default function NotFound() {
  return (
    <Container className="min-h-screen flex flex-col items-center justify-center !p-4">
      <Typography
        variant="h1"
        className="!text-8xl !font-bold !mb-4 !text-gray-800 dark:!text-gray-200"
      >
        404
      </Typography>
      <Typography
        variant="h4"
        className="!text-2xl !mb-8 !text-gray-600 dark:!text-gray-400"
      >
        Oops! Page Not Found
      </Typography>
      <div className="!w-full !max-w-md !text-center !mb-8">
        <Typography className="!text-gray-500 dark:!text-gray-400">
          The page you're looking for doesn't exist or has been moved.
        </Typography>
      </div>
    </Container>
  )
}

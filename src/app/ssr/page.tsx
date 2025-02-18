'use client';

import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Box,
  Modal,
  TextField
} from '@mui/material';

// Komponen yang bisa menyebabkan hydration mismatch
const ClientSideOnly = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? (
    <Typography>
      Client rendered: {new Date().toLocaleTimeString()}
    </Typography>
  ) : null;
};

// Komponen dengan state yang berbeda di server dan client
const HydrationMismatch = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <Box>
      <Button onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4">
          <Typography>Modal Content</Typography>
        </Box>
      </Modal>
    </Box>
  );
};

// Komponen dengan style injection yang bisa bermasalah
const DynamicStyles = () => {
  const [color, setColor] = useState('blue');

  return (
    <Box sx={{ bgcolor: color }} className="p-4">
      <Button onClick={() => setColor(c => c === 'blue' ? 'red' : 'blue')}>
        Toggle Color
      </Button>
    </Box>
  );
};

export default function SSRTestPage() {
  return (
    <Container maxWidth="md" className="py-8">
      <Typography variant="h4" className="mb-8">
        SSR Error Test Cases
      </Typography>

      <Box className="space-y-8">
        {/* Case 1: Client-Side Only Content */}
        <Box className="p-4 border rounded">
          <Typography variant="h6" className="mb-4">
            1. Client-Side Only Content
          </Typography>
          <ClientSideOnly />
        </Box>

        {/* Case 2: Hydration Mismatch */}
        <Box className="p-4 border rounded">
          <Typography variant="h6" className="mb-4">
            2. Hydration Mismatch Example
          </Typography>
          <HydrationMismatch />
        </Box>

        {/* Case 3: Dynamic Styles */}
        <Box className="p-4 border rounded">
          <Typography variant="h6" className="mb-4">
            3. Dynamic Style Injection
          </Typography>
          <DynamicStyles />
        </Box>

        {/* Case 4: Form with Auto Focus */}
        <Box className="p-4 border rounded">
          <Typography variant="h6" className="mb-4">
            4. AutoFocus Issue
          </Typography>
          <TextField 
            autoFocus 
            label="This can cause hydration errors"
            fullWidth
          />
        </Box>
      </Box>
    </Container>
  );
}

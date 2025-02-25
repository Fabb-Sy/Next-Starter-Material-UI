import React from 'react';
import { Modal, Box, Typography, TextField, Button, Stack } from '@mui/material';
import { ModalProps } from './modal.type';

export const ModalView: React.FC<ModalProps> = ({ open, onClose, title, onChange, onSubmit, formFields }) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title">
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
      }}>
        <Typography id="modal-title" variant="h6" className="mb-4 font-semibold">
          {title}
        </Typography>
        <form onSubmit={onSubmit}>
          <Stack spacing={3}>
            {formFields.map(({ name, label, required, multiline, rows, defaultValue }) => (
              <TextField
                key={name}
                name={name}
                label={label}
                defaultValue={defaultValue}
                fullWidth
                required={required}
                multiline={multiline}
                rows={rows}
                size="small"
              />
            ))}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
              <Button variant="outlined" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Box>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};
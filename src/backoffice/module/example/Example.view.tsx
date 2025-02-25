import { useEffect, useMemo, useRef, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { ExampleData, ExampleViewProps } from './example.type';
import {
  IconButton,
  Popover,
  Typography,
  Button,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import TanstackTable from '@/backoffice/components/tanstack-table';
import { Modal } from './components/modal';
import { exampleAPI } from './api/exampleApi';
import { useQueryClient } from '@tanstack/react-query';

const formFields = [
  {
    name: 'name',
    label: 'Name',
    required: true
  },
  {
    name: 'description',
    label: 'Description',
    multiline: true,
    rows: 3
  }
];



export const ExampleView = ({ initialData, dehydratedState, refreshKey, handleRefresh }: ExampleViewProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectedRow, setSelectedRow] = useState<ExampleData | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, row: ExampleData) => {
    buttonRef.current = event.currentTarget;
    setAnchorEl(buttonRef.current);
    setSelectedRow(row);
  };

  const getFormFieldsWithValues = () => {
    return formFields.map(field => ({
      ...field,
      defaultValue: isEditing && selectedRow ? selectedRow[field.name as keyof ExampleData] : ''
    }));
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      active: 1,
    };

    try {
      if (isEditing && selectedRow) {
        await exampleAPI.update(selectedRow.id, data);
      } else {
        await exampleAPI.add({
          ...data,
          active: 1,
        });
      }
      await queryClient.invalidateQueries({ queryKey: ['tanstack-table'] });
      setOpenModal(false);
      handleRefresh();
    } catch (error) {
      console.error('Error saving item:', error);
    } finally {
      setIsEditing(false);
      setSelectedRow(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (selectedRow) {
      try {
        await exampleAPI.delete(id);
        handleClose();
        handleRefresh();
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const columns = useMemo<ColumnDef<ExampleData>[]>(() => [
    {
      accessorKey: 'code',
      header: 'Code',
      size: 100,
    },
    {
      accessorKey: 'name',
      header: 'Name',
      size: 200,
    },
    {
      accessorKey: 'description',
      header: 'Description',
      size: 300,
    },
    {
      id: 'action',
      header: 'Action',
      size: 50,
      cell: ({ row }) => {
        const open = Boolean(anchorEl) && selectedRow?.id === row.original.id
        return (
          <div className="flex justify-center relative">
            {/* <IconButton
              onClick={(e) => handleClick(e, row.original)}
              size="small"
            >
              <MoreVertIcon className='rotate-90' />
            </IconButton> */}
            {/* <Popover
              key={row.original.id}
              id={row.original.id}
              open={Boolean(anchorEl) && selectedRow?.id === row.original.id}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            > */}
            <div className="p-1 flex">
              <button
                onClick={() => {
                  setIsEditing(true);
                  setOpenModal(true);
                  setAnchorEl(null);
                  setSelectedRow(row.original);
                }}
                className="flex items-center px-4 py-2 w-full text-left hover:bg-blue-50 rounded-md transition-colors"
              >
                <EditIcon className="mr-2 text-blue-500" fontSize="small" />
                <Typography variant="body2">Edit</Typography>
              </button>
              <button
                onClick={() => {
                  console.log('delete', row.original.id)
                  handleDelete(row.original.id)
                }}
                className="flex items-center px-4 py-2 w-full text-left hover:bg-red-50 rounded-md transition-colors"
              >
                <DeleteIcon className="mr-2 text-red-500" fontSize="small" />
                <Typography variant="body2">Delete</Typography>
              </button>
            </div>
            {/* </Popover> */}
          </div>
        )
      },
    }
  ], [anchorEl, selectedRow]);

  return (
    <>
      <div className="p-0">
        <div className="flex justify-between items-center mb-6">
          <Typography variant="h4" className='!font-poppins !font-bold'>
            Example Page
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenModal(true)}
            sx={{
              bgcolor: 'primary.main',
              '&:hover': { bgcolor: 'primary.dark' }
            }}
          >
            Add New Example
          </Button>
        </div>

        <TanstackTable<ExampleData>
          apiUrl="/v1/example"
          columns={columns}
          onRefresh={handleRefresh}
          initialData={initialData}
          dehydratedState={dehydratedState}
          key={refreshKey}
        />
      </div>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title={isEditing ? 'Edit Item' : 'Add New Item'}
        onSubmit={handleSubmit}
        formFields={getFormFieldsWithValues()}
      />
    </>
  );
};

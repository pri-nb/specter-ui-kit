import { useRef, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import {
  Button,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Dropzone } from './Dropzone';
import { MIME_TYPES } from './mime-types';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DropzoneContent from './utils/DropzoneContent';

const meta: Meta<typeof Dropzone> = {
  title: 'Base/Dropzone',
  component: Dropzone,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Dropzone>;

export const Default: Story = {
  args: {
    onDrop: files => console.log('Dropped files:', files),
    children: <DropzoneContent />,
  },
};

export const WithAcceptedFileTypes: Story = {
  args: {
    ...Default.args,
    accept: [MIME_TYPES.png, MIME_TYPES.jpeg, MIME_TYPES.pdf],
    children: (
      <div style={{ textAlign: 'center' }}>
        <Typography variant='h6'>Drop image or PDF files</Typography>
        <Typography variant='body2'>
          Only .png, .jpg, and .pdf files are accepted
        </Typography>
      </div>
    ),
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const WithCustomButton: Story = {
  render: args => {
    const openRef = useRef<() => void>(null);

    return (
      <Dropzone {...args} openRef={openRef}>
        <div style={{ textAlign: 'center' }}>
          <Typography variant='h6'>Drag and drop files here</Typography>
          <Button variant='contained' onClick={() => openRef.current?.()}>
            Select Files
          </Button>
        </div>
      </Dropzone>
    );
  },
};

export const WithStatusComponents: Story = {
  render: args => (
    <Dropzone {...args}>
      <Dropzone.Accept>
        <Typography color='success.main'>Drop the files here ...</Typography>
      </Dropzone.Accept>
      <Dropzone.Reject>
        <Typography color='error.main'>
          File type not accepted, sorry!
        </Typography>
      </Dropzone.Reject>
      <Dropzone.Idle>
        <Typography>
          Drag and drop files here or click to select files
        </Typography>
      </Dropzone.Idle>
    </Dropzone>
  ),
};

export const WithFileList: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);

    const handleDrop = (newFiles: File[]) => {
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
    };

    return (
      <div>
        <Dropzone onDrop={handleDrop}>
          <DropzoneContent />
        </Dropzone>
        {files.length > 0 && (
          <List>
            {files.map((file, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <InsertDriveFileIcon />
                </ListItemIcon>
                <ListItemText
                  primary={file.name}
                  secondary={`${file.size} bytes`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </div>
    );
  },
};

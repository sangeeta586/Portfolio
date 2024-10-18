import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person'; // Import PersonIcon for user
import { FaMessage } from 'react-icons/fa6';
import axios from 'axios';
import { styled } from '@mui/material/styles';

// Styled components for chat UI
const StyledDrawer = styled(Drawer)({
  '.MuiDrawer-paper': {
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
});

const MessageList = styled(List)({
  height: '400px',
  overflowY: 'auto',
  padding: '10px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  marginBottom: '16px',
});

const MessageItem = styled(ListItem)(({ isSelected }) => ({
  backgroundColor: isSelected ? '#a5d6a7' : '#e0f7fa', // Highlight selected message
  borderRadius: '12px',
  marginBottom: '10px',
  padding: '10px',
  maxWidth: '80%',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  display: 'flex',
  alignItems: 'center',
}));

const ReplyBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  borderRadius: '12px',
  backgroundColor: '#f1f1f1',
});

export default function RightDrawer() {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState([]);
  const [replyText, setReplyText] = React.useState('');
  const [selectedEmail, setSelectedEmail] = React.useState('');
  const [selectedMessageId, setSelectedMessageId] = React.useState(null); // Track selected message
  const URI = import.meta.env.VITE_API_URL;

  React.useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${URI}/api/contactme/`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  const handleEmailClick = (message) => {
    // Highlight the selected message
    setSelectedMessageId(message._id);
    setSelectedEmail(message.email);
    setReplyText(`Hi, I'm interested in your message: `);
    // Provide feedback: Highlight message instead of sending SMS
    console.log(`Selected email: ${message.email}`);
  };

  const handleReplySubmit = () => {
    const mailtoLink = `mailto:${selectedEmail}?subject=Response&body=${encodeURIComponent(replyText)}`;
    window.location.href = mailtoLink;
    setReplyText('');
  };

  const renderMessages = () => (
    <MessageList>
      {messages.map((message) => (
        <MessageItem
          key={message._id}
          disablePadding
          isSelected={selectedMessageId === message._id} // Highlight if selected
          onClick={() => handleEmailClick(message)} // Handle message click
        >
          {/* Add the user icon next to the message */}
          <PersonIcon sx={{ marginRight: '10px', color: '#2C3E50' }} /> {/* User Icon */}
          <ListItemText
            primary={
              <>
                <Typography component="span" variant="body1" color="primary">
                  Name:{message.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Subject: {message.subject}
                </Typography>
              </>
            }
            secondary={
              <>
                <Typography variant="body2" color="text.secondary">
                  {message.message}
                </Typography>
                <Typography
                  variant="body2"
                  color="primary"
                  component="a"
                  href={`mailto:${message.email}`}
                  sx={{ textDecoration: 'none', cursor: 'pointer' }}
                >
                  {message.email}
                </Typography>
              </>
            }
          />
        </MessageItem>
      ))}
    </MessageList>
  );
  

  return (
    <div>
      <FaMessage className="text-4xl text-[#2C3E50] mr-10 cursor-pointer" onClick={toggleDrawer(true)} />
      <StyledDrawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 350, padding: '16px', position: 'relative' }} role="presentation">
          {/* Close Icon */}
          <IconButton
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 1000,
            }}
            onClick={toggleDrawer(false)}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" sx={{ textAlign: 'center', marginBottom: 2 }}>
            Messages
          </Typography>
          <Divider />
          {renderMessages()}
          <Divider />
          <ReplyBox className="fixed bottom-0">
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Type your message..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              sx={{ marginRight: '8px' }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleReplySubmit}
              sx={{ padding: '12px', minWidth: '90px' }}
            >
              Send
            </Button>
          </ReplyBox>
        </Box>
      </StyledDrawer>
    </div>
  );
}

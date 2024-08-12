import { useState } from 'react';
// import PropTypes from 'prop-types';
import { Grid, Box, IconButton } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import LogInOptions from './LogInOptions';
import LogInForm from './LogInForm';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

const Login = () => {
  const [open, setOpen] = useState(false);
  const [logInWithEmail, setLogInWithEmail] = useState(true);
  const [logInWithPhone, setLogInWithPhone] = useState(false);
  const navigate = useNavigate();

  const handleOpen = (type) => {
    if (type === 'email') {
      setLogInWithEmail(true);
      setLogInWithPhone(false);
    } else if (type === 'phone') {
      setLogInWithEmail(false);
      setLogInWithPhone(true);
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh', backgroundColor: 'white' }}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Box sx={{ padding: 4, width: '100%', bgcolor: 'background.paper', borderRadius: '8px', boxShadow: 3 }}>
          <IconButton onClick={() => navigate(-1)} style={{ marginBottom: '1rem' }}>
            <ArrowBackIcon />
          </IconButton>
          <LogInOptions handleOpen={handleOpen} />
          <Dialog open={open} onClose={handleClose}>
            <DialogContent>
              <LogInForm logInWithEmail={logInWithEmail} logInWithPhone={logInWithPhone} handleClose={handleClose} />
            </DialogContent>
          </Dialog>
        </Box>
      </Grid>
    </Grid>
  );
};

Login.propTypes = {
  // No props expected as of now
};

export default Login;

import PropTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';
import { FaPhoneAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const LogInOptions = ({ handleOpen }) => {
  return (
    <div>
      <Typography variant="h5" style={{ marginBottom: '20px' }}>Get your account</Typography>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <div
            onClick={() => handleOpen('phone')}
            style={{ display: "flex", alignItems: 'center', padding: "15px", width: '250px', boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px', cursor: "pointer" }}
          >
            <FaPhoneAlt size={30} />
            <Typography style={{ color: '#032541', marginLeft: '10px' }}>Log In with Phone</Typography>
          </div>
        </Grid>
        <Grid item>
          <div
            onClick={() => handleOpen('email')}
            style={{ display: "flex", alignItems: 'center', padding: "15px", width: '250px', boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px', cursor: "pointer" }}
          >
            <MdEmail size={30} />
            <Typography style={{ color: '#032541', marginLeft: '10px' }}>Log In with Email</Typography>
          </div>
        </Grid>
        <Grid item>
          <link to='/signup' style={{ textDecoration: 'none' }}>
            <Typography style={{ textAlign: 'center', marginTop: '10px', cursor: 'pointer', color: '#007BFF', paddingRight: 200 }}>Do not have an account? Sign up</Typography>
          </link>
        </Grid>
      </Grid>
    </div>
  );
};

// Define PropTypes for the LogInOptions component
LogInOptions.propTypes = {
  handleOpen: PropTypes.func.isRequired, // Ensures handleOpen is a required function
};

export default LogInOptions;

import { useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress } from '@mui/material';
import axios from 'axios';
import PropTypes from 'prop-types';

const EnrollmentForm = ({ courseId, onClose, onEnroll }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post('/api/enrollments', { courseId, name, email });
      onEnroll(courseId); // Update parent component with new enrollment
      onClose(); // Close the form dialog
    } catch (err) {
      setError('Failed to enroll. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Enroll in Course</DialogTitle>
      <DialogContent>
        {loading && <CircularProgress />}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Enroll
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Define prop types for EnrollmentForm
EnrollmentForm.propTypes = {
  courseId: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  onEnroll: PropTypes.func.isRequired,
};

export default EnrollmentForm;

import PropTypes from 'prop-types';
import { Modal, Box, Typography, IconButton, Button } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const ModalComponent = ({ open, handleClose, title, children, onConfirm, confirmText, showConfirmButton }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 1,
          boxShadow: 24,
          p: 4,
          outline: 'none'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography id="modal-title" variant="h6">
            {title}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ mt: 2 }}>
          {children}
        </Box>
        {showConfirmButton && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button onClick={onConfirm} variant="contained" color="primary">
              {confirmText || 'Confirm'}
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

// Define PropTypes for the ModalComponent
ModalComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  onConfirm: PropTypes.func,
  confirmText: PropTypes.string,
  showConfirmButton: PropTypes.bool,
};

// Define default props
ModalComponent.defaultProps = {
  children: null,
  onConfirm: () => {},
  confirmText: 'Confirm',
  showConfirmButton: false,
};

export default ModalComponent;

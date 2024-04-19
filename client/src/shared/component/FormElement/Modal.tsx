import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

export default function DeleteModal({ open, onClose, onConfirm, title, message, confirmButtonText }) {
  return (
    <>
      <Dialog fullScreen={false} open={open} onClose={onClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onClose}>
            취소
          </Button>
          <Button onClick={onConfirm} autoFocus color="error">
            {confirmButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

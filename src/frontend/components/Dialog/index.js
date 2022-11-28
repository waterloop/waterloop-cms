import React from 'react';
import PropTypes from 'prop-types';
import MUIDialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const Dialog = ({ open, title, actionChildren, children, wide }) => (
  <MUIDialog open={open} maxWidth={wide ? 'md' : 'sm'} fullWidth>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>{children}</DialogContent>
    <DialogActions>{actionChildren}</DialogActions>
  </MUIDialog>
);

export default Dialog;
Dialog.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool,
  children: PropTypes.node,
  actionChildren: PropTypes.node,
  wide: PropTypes.bool,
};

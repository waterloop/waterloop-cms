import React from 'react';
import PropTypes from 'prop-types';
import MUIDialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const Dialog = ({
  open,
  title,
  actionChildren,
  children,
  wide
}) => (
  <MUIDialog open={open} maxWidth={wide ? "md" : "sm"} fullWidth>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      {children}
    </DialogContent>
    <DialogActions>
      {actionChildren}
    </DialogActions>
  </MUIDialog>
);

export default Dialog;
Dialog.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool,
  children: PropTypes.node,
  actionChildren: PropTypes.node,
  wide: PropTypes.bool
};

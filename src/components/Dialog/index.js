import React from 'react';
import PropTypes from 'prop-types';
import MUIDialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '../Button';
import FormContainer from '../FormContainer';

const Dialog = ({
  open,
  title,
  fieldLabel,
  value,
  onChange,
  onSave,
  onCancel,
}) => (
  <MUIDialog open={open} maxWidth="md" fullWidth>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <FormContainer title={fieldLabel}>
      {/* TODO: CHANGE THIS TO OUR STYLED TEXT INPUT */}
        <input value={value} onChange={onChange} type="text"/>
      </FormContainer>
    </DialogContent>
    <DialogActions>
      <Button onClick={onSave}>Save</Button>
      <Button cancel onClick={onCancel}>Cancel</Button>
    </DialogActions>
  </MUIDialog>
);

export default Dialog;
Dialog.propTypes = {
  title: PropTypes.string,
  fieldLabel: PropTypes.string,
  open: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
};

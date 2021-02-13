/* eslint-disable no-unused-vars */
/* remove before merge  ^^^ */
import React, {useState} from 'react';
import styled from 'styled-components';
import MUISelector from '@material-ui/core/Select';
import MUIMenuItem from '@material-ui/core/MenuItem';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import MUIInputBase from '@material-ui/core/InputBase';
import * as R from 'ramda';

const PrimarySelector = styled(MUISelector)({
  borderRadius: 20,
  width: '100%',
  zIndex: 100,
  '& fieldset': {
    borderColor: '#c4c4c4'
  } 
});

const AddField = styled(MUIMenuItem)({
  display: "flex",
  justifyContent: "center",
  color: "#444444",
  fontWeight: "bold",
  fontSize: "0.8rem"
});

const StyledExpandIcon = styled(ExpandLessIcon)({
  transition: "cubic-bezier(0.4, 0, 1, 1) 0.1s",
  top: "10px"
});

/**Custom Waterloop CMS Selector. The parent component determines what happens when the 
 * value changes, including updating the value that's currently displayed in the field.
 * 
 * @param className Allows for external styles to be applied to the 
 *                    component using the styled components library className 
 *                    prop needs to be passed to the parent JSX element.
 * @param value     The current value of the input.
 * @param onSelect  Callback to be called each time that the user selects a value.
 * @param items     An Array of items to be displayed in the selector dropdown.
 */
const Selector = ({
  className,
  value,
  onSelect,
  items,
  // isOpen,
  /* Add other props here */
}) => {
  const [selected, setSelected] = useState(value);  // TODO: abstract out to parent component.
  // const [open, setOpen] = useState(isOpen ?? false); // TODO: Also abstract this out to parent component.
  // const [newInput, setNewInput] = useState(""); // This I don't think needs to be abstracted to parent.

  const handleChange = (event) => {
    if (!!event.target.value) {
      onSelect && onSelect(event.target.value);
      setSelected(event.target.value);
    }
  }
  return (
    <PrimarySelector
      className={className}
      variant="outlined"
      color="primary"
      onChange={handleChange}
      value={selected}
      IconComponent={({className: c}) => <StyledExpandIcon className={c} fontSize="large"/>}
      // open={open}
      // onOpen={() => setOpen(true)}
      // onClose={(event) => {
      //   // TODO: Find out why this keeps on adding blank values.
      //   // console.log(event.target.value)
      //   if (!R.isNil(event.target.value) && event.target.value !== "") {
      //     items.push(newInput);
      //     setNewInput("");
      //     setOpen(false);
      //   }
      // }}
      MenuProps={{
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
        getContentAnchorEl: null
      }}
      // inputProps={{
      //   classes: {
      //     root: {
      //       '$focused $notchedOutline': {
      //         borderColor: 'black'
      //       }
      //     }
      //   }
      // }}
    >
      {items.map((item) => (
        <MUIMenuItem key={item.id} value={item.id} divider>
          {item.text}
        </MUIMenuItem>
      ))}
      {/* TODO: Implement add field when new ticket out for it: */}
      {/* <AddField>
        <MUIInputBase 
          placeholder={"+ Add New"}
          onChange={(event) => {
            setNewInput(event.target.value)
          }}
          value={newInput}
        />
      </AddField> */}
    </PrimarySelector>
  );
};

export default Selector;

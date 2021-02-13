import React, {useState} from 'react';
import styled from 'styled-components';
import MUISelector from '@material-ui/core/Select';
import MUIMenuItem from '@material-ui/core/MenuItem';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

const PrimarySelector = styled(MUISelector)({
  borderRadius: 20,
  width: '100%',
  zIndex: 100,
  '& fieldset': {
    borderColor: '#c4c4c4'
  } 
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
}) => {
  const [selected, setSelected] = useState(value);

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
    >
      {items.map((item) => (
        <MUIMenuItem key={item.id} value={item.id} divider>
          {item.text}
        </MUIMenuItem>
      ))}
    </PrimarySelector>
  );
};

export default Selector;

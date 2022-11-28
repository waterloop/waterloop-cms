import React from 'react';
import styled from 'styled-components';
import MUISelector from '@mui/material/Select';
import MUIMenuItem from '@mui/material/MenuItem';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import * as R from 'ramda';

const PrimarySelector = styled(MUISelector)`
  ${({ value, theme }) =>
    value === ''
      ? `font: ${theme.fonts.medium18}; 
     color: ${theme.colours.greys.grey2};`
      : ''};
  border-radius: 10px;
  width: 100%;
  z-index: 100;
  border-color: ${({ theme, error }) =>
    error ? theme.colours.reds.red1 : theme.colours.greys.grey2};
  & fieldset {
    border-color: ${({ theme, error }) =>
      error ? theme.colours.reds.red1 : theme.colours.greys.grey2};
  }
  &.Mui-focused {
    & .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme, error }) =>
        error ? theme.colours.reds.red1 : theme.colours.greys.grey2};
    }
  }
  .MuiOutlinedInput-notchedOutline {
    border-color: ${({ theme, error }) =>
      error ? theme.colours.reds.red1 : theme.colours.greys.grey2};
  }
`;

const StyledExpandIcon = styled(ExpandLessIcon)`
  transition: cubic-bezier(0.4, 0, 1, 1) 0.1s;
  top: 10px;
`;

const PlaceholderMenuItem = styled(MUIMenuItem)`
  color: ${({ theme }) => theme.colours.greys.grey2};
`;

/** Custom Waterloop CMS Selector. The parent component determines what happens when the
 * value changes, including updating the value that's currently displayed in the field.
 *
 * @param className     Allows for external styles to be applied to the
 *                        component using the styled components library className
 *                        prop needs to be passed to the parent JSX element.
 * @param value         The current value of the input.
 * @param onSelect      Callback to be called each time that the user selects a value.
 * @param items         An Array of items to be displayed in the selector dropdown.
 * @param placeholder   Optional placeholder text to display for unselected boxes (blank by default).
 * @param isError       Optional status to mark the selector component as an error state.
 */
const Selector = ({
  className,
  value = '',
  onSelect,
  items,
  placeholder = '',
  isError = false,
}) => {
  const handleChange = (event) => {
    if (!R.isNil(event.target.value) && typeof onSelect === 'function') {
      onSelect(event.target.value);
    }
  };

  return (
    <PrimarySelector
      error={isError}
      displayEmpty
      className={className}
      variant="outlined"
      color="primary"
      onChange={handleChange}
      value={value}
      IconComponent={({ className: c }) => (
        <StyledExpandIcon className={c} fontSize="large" />
      )}
      MenuProps={{
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
        getContentAnchorEl: null,
      }}
    >
      <PlaceholderMenuItem key={''} value={''} divider disabled>
        {placeholder}
      </PlaceholderMenuItem>
      {items.map((item) => (
        <MUIMenuItem key={item.id} value={item.id} divider>
          {item.text}
        </MUIMenuItem>
      ))}
    </PrimarySelector>
  );
};

export default Selector;

/* eslint-disable no-unused-vars */
/* remove before merge  ^^^ */
import React from 'react';

const DropDownList = ({
  className, /* Allows for external styles to be applied to the component using the styled components library
                className prop needs to be passed to the parent JSX element */
  onAdd, /* Callback to be called each time that the user clicks add */
  onRemove, /* Callback to be called each time that the user clicks remove on an item */
  onOpen, /* Callback to be called each time that the user clicks the dropdown list */
  items, /* an Array of items to be displayed in the selector dropdown */
  title, /* Name of the drop down list */

  /* Add other props here */
}) => {
  return (
    <div className={className}>
      Implement ME!
    </div>
  );
};

export default DropDownList;

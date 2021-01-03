/* eslint-disable no-unused-vars */
/* remove before merge  ^^^ */
import React from 'react';

const Selector = ({
  className, /* Allows for external styles to be applied to the component using the styled components library
                className prop needs to be passed to the parent JSX element */
  value, /* The current value of the input */
  onSelect, /* Callback to be called each time that the user selects a value */
  items, /* an Array of items to be displayed in the selector dropdown */
  /* Add other props here */
}) => {
  return (
    <div className={className}>
      Implement ME!
    </div>
  );
};

export default Selector;

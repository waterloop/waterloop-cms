/* eslint-disable no-unused-vars */
/* remove before merge  ^^^ */
import React from 'react';

const TextInput = ({
  className, /* Allows for external styles to be applied to the component using the styled components library
                className prop needs to be passed to the parent JSX element */
  value, /* The current value of the input */
  onChange, /* Callback to be called each time that the user changes the input */
  multiLine = false, /* Boolean flag to be used when implimenting the multi-line update */

  /* Add other props here */
}) => {
  return (
    <div className={className}>
      Implement ME!
    </div>
  );
};

export default TextInput;

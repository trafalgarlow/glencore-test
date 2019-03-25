import React from 'react';

const FullScreenDialog = (props: any) => {
  const { children, title, ...otherProps } = props;

  return (
    <div id="full-screen-dialog" {...otherProps}>
      <div id="full-screen-dialog-title">
        {title}
      </div>
      {
        children({
          close: jest.fn().mockImplementation(),
        })
      }
    </div>
  );
};

export default FullScreenDialog;

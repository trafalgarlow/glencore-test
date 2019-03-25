import React from 'react';

export default (props: any) => (
  <div {...props}>
    {props.closeElement}
    {props.confirmElement}
  </div>
);

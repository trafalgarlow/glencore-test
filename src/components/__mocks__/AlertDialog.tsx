import React from 'react';

export default (props: any) => (
  <div {...props}>
    {props.children}
  </div>
);
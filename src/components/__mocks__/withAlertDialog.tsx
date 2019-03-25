import React from 'react';

const withAlertDialog = (Comp: any) => (props: any) => <div alertDialog={jest.fn().mockImplementation()} {...props} />;

export default withAlertDialog;

import React from 'react';

const withConfirmDialog = (Comp: any) => (props: any) => <div confirmDialog={jest.fn().mockImplementation()} {...props} />;

export default withConfirmDialog;

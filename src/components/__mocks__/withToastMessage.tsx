import React from 'react';

const withToastMessage = (Comp: any) => (props: any) => <div show={jest.fn().mockImplementation()} hide={jest.fn().mockImplementation()} {...props} />;

export default withToastMessage;

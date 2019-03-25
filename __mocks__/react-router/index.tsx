import React from 'react';

export const Switch = (props: any) => <div {...props} />;
export const Route = (props: any) => <div {...props} />;
export const Redirect = (props: any) => <div {...props} />;
export const withRouter = (C: any) => (props: any) => <C location={{ key: 'location-key' }} {...props} />;

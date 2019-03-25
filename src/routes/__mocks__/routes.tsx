import React from 'react';

export const homeRoute = {
  component: 'Home Route Component',
  name: 'home',
  label: 'Home',
  path: '/home',
  isExact: true,
};

export const fakeRoute = {
  component: () => <div />,
  name: 'fake',
  label: 'Fake',
  path: '/fake',
  isExact: false,
};

export const routes = [homeRoute, fakeRoute];

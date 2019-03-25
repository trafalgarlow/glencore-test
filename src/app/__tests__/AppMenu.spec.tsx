import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { AppRouteType } from 'routes/routes';
import AppMenu from '../AppMenu';

let component: ShallowWrapper;

const routes: AppRouteType[] = [{
  name: 'name-route-1',
  path: 'path-route-1',
  label: 'label-route-1',
  component: () => <div />,
  isExact: true,
}, {
  name: 'name-route-2',
  path: 'path-route-2',
  label: 'label-route-2',
  component: () => <div />,
  isExact: false,
}];

describe('AppMenu', () => {
  beforeEach(() => {
    component = shallow(<AppMenu routes={routes} />);
  });

  it('should render correctly', () => {
    expect(component).toBeDefined();
  });

  it('should render the AppBar', () => {
    expect(component.find(AppBar)).toHaveLength(1);
  });

  it('should render the Toolbar', () => {
    expect(component.find(Toolbar)).toHaveLength(1);
  });

  it('should render a Link component for each route', () => {
    expect(component.find(NavLink)).toHaveLength(2);
  });

  describe('Route 1', () => {
    let route: ShallowWrapper<NavLinkProps>;
    beforeEach(() => {
      route = component.find(NavLink).at(0);
    });

    it('should have the name as key', () => {
      expect(route.key()).toEqual('name-route-1');
    });

    it('should have the path as to prop', () => {
      expect(route.prop('to')).toEqual('path-route-1');
    });

    it('should have the label as text', () => {
      expect(route.find(Typography).childAt(0).text()).toEqual('label-route-1');
    });
  });

  describe('Route 2', () => {
    let route: ShallowWrapper<NavLinkProps>;
    beforeEach(() => {
      route = component.find(NavLink).at(1);
    });

    it('should have the name as key', () => {
      expect(route.key()).toEqual('name-route-2');
    });

    it('should have the path as to prop', () => {
      expect(route.prop('to')).toEqual('path-route-2');
    });

    it('should have the label as text', () => {
      expect(route.find(Typography).childAt(0).text()).toEqual('label-route-2');
    });
  });
});

import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import {
  Switch, Route, match, Redirect,
} from 'react-router';
import { Location, History } from 'history';
import { AppContainer } from '../AppContainer';

jest.mock('routes');

/* eslint-disable @typescript-eslint/no-explicit-any */
const location: Location = { key: 'location-key' } as any;
const history: History = {} as any;
const matchProp: match = {} as any;
/* eslint-enable @typescript-eslint/no-explicit-any */
let component: ShallowWrapper;

describe('AppContainer', () => {
  beforeEach(() => {
    component = shallow(<AppContainer
      location={location}
      history={history}
      match={matchProp}
    />);
  });

  it('should render correctly', () => {
    expect(component).toBeDefined();
  });

  it('should render the Switch', () => {
    expect(component.find(Switch)).toHaveLength(1);
  });

  it('should render 3 Route', () => {
    expect(component.find(Route)).toHaveLength(2);
  });

  describe('Default Redirect', () => {
    it('should not have the path prop', () => {
      expect(component.find(Redirect).prop('to')).toEqual('/');
    });
  });

  describe('Home Route', () => {
    it('should assign the path prop', () => {
      expect(component.find(Route).at(0).prop('path')).toEqual('/home');
    });

    it('should assign the key as name', () => {
      expect(component.find(Route).at(0).key()).toEqual('home');
    });

    it('should have the exact prop', () => {
      expect(component.find(Route).at(0).prop('exact')).toBeTruthy();
    });
  });

  describe('Fake Route', () => {
    it('should assign the path prop', () => {
      expect(component.find(Route).at(1).prop('path')).toEqual('/fake');
    });

    it('should assign the key as name', () => {
      expect(component.find(Route).at(1).key()).toEqual('fake');
    });

    it('should not have the exact prop', () => {
      expect(component.find(Route).at(1).prop('exact')).toBeFalsy();
    });
  });
});

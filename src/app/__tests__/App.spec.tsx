import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import AppContainer from '../AppContainer';
import App from '../App';

jest.mock('../AppMenu');
jest.mock('features/colors/providers');
jest.mock('features/dictionaries/providers');
jest.mock('features/products/providers');
jest.mock('../AppContainer');

let component: ShallowWrapper;

describe('App', () => {
  beforeEach(() => {
    component = shallow(<App />);
  });

  it('should render correctly', () => {
    expect(component).toBeDefined();
  });

  it('should render the AppContainer component', () => {
    expect(component.find(AppContainer)).toHaveLength(1);
  });
});

/* istanbul ignore file */

import { ComponentType } from 'react';
import HomeRoute from './HomeRoute';
import DictionariesRoute from './DictionariesRoute';
import ColorsRoute from './ColorsRoute';


export interface AppRouteType {
  name: string;
  path: string;
  label: string;
  component: ComponentType;
  isExact: boolean;
}

const home: AppRouteType = {
  component: HomeRoute,
  name: 'home',
  label: 'Home',
  path: '/',
  isExact: true,
};

const dictionaries: AppRouteType = {
  component: DictionariesRoute,
  name: 'dictionaries',
  label: 'Dictionaries',
  path: '/dictionaries',
  isExact: false,
};

const colors: AppRouteType = {
  component: ColorsRoute,
  name: 'colors',
  label: 'Colors',
  path: '/colors',
  isExact: false,
};

export {
  colors,
  dictionaries,
  home,
};

const routes: AppRouteType[] = [home, dictionaries, colors];

export default routes;

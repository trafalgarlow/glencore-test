import React, { ReactNode } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { AppRouteType } from 'routes/routes';
import './AppMenu.scss';


interface Props {
  routes: AppRouteType[];
}

class AppMenu extends React.PureComponent<Props> {
  render(): ReactNode {
    const { routes } = this.props;

    return (
      <AppBar className="align-items-center text-center justify-content-center" color="secondary" position="static">
        <Toolbar>
          <nav>
            {
              routes.map(r => (
                <NavLink
                  exact
                  activeClassName="is-active"
                  key={r.name}
                  to={r.path}
                  className="app-menu-item hvr-underline-from-left"
                >
                  <Typography color="primary" variant="h6">{r.label}</Typography>
                </NavLink>
              ))
            }
          </nav>
        </Toolbar>
      </AppBar>
    );
  }
}

export default AppMenu;

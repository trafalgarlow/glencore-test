import React, { ReactNode } from 'react';
import {
  Switch, Route, withRouter, RouteComponentProps, Redirect,
} from 'react-router';
import { Slide } from '@material-ui/core';
import { routes } from 'routes';

export class AppContainer extends React.PureComponent<RouteComponentProps> {
  render(): ReactNode {
    const { location } = this.props;

    return (
      <Slide direction="right" key={location.pathname} in mountOnEnter unmountOnExit>
        <div>
          <Switch>
            {
              routes.map(
                r => <Route key={r.name} exact={r.isExact} path={r.path} component={r.component} />,
              )
            }
            <Redirect to="/" />
          </Switch>
        </div>
      </Slide>
    );
  }
}

export default withRouter(AppContainer);

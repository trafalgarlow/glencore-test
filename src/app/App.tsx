import React, { ReactNode, PureComponent } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { routes } from 'routes';
import { ColorsContextProvider } from 'features/colors/providers';
import { DictionariesContextProvider } from 'features/dictionaries/providers';
import { ProductsContextProvider } from 'features/products/providers';
import AppContainer from './AppContainer';
import AppMenu from './AppMenu';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00afaa',
      dark: '#00afaa',
      light: '#00afaa',
      contrastText: '#3a3a3a',
    },
    secondary: {
      main: '#3a3a3a',
      dark: '#3a3a3a',
      light: '#3a3a3a',
      contrastText: '#00afaa',
    },
  },
  typography: { useNextVariants: true },
});

class App extends PureComponent<{}> {
  render(): ReactNode {
    return (
      <MuiThemeProvider theme={theme}>
        <AppMenu routes={routes} />
        <ColorsContextProvider>
          <DictionariesContextProvider>
            <ProductsContextProvider>
              <div className="container-fluid p-3 overflow-hidden">
                <AppContainer />
              </div>
            </ProductsContextProvider>
          </DictionariesContextProvider>
        </ColorsContextProvider>
      </MuiThemeProvider>
    );
  }
}

export default App;

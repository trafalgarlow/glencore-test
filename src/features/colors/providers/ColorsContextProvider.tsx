import React, { ReactNode, PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { StoreType } from 'store/store';
import { ArrayUtils } from 'utils';
import { Color, ColorToInsert } from '../color';
import { ColorAction, addColorAction, AddColorActionType } from '../colors.actions';
import ColorsContext, { ColorsContextValues } from './ColorsContext';


interface StateProps {
  colors: Color[];
}

interface DispatcherProps {
  addColor: AddColorActionType;
}

export interface ColorsContextProviderProps extends StateProps, DispatcherProps {
  children: ReactNode;
}

export class ColorsContextProviderUnconnected extends PureComponent<ColorsContextProviderProps> {
  getColorById = (id: number): Color => {
    const { colors } = this.props;
    return colors.find(c => c.id === id) as Color;
  };

  isColorNameNotAvailable = (name: string): boolean => {
    const { colors } = this.props;
    return ArrayUtils.containsSameName(colors.map(c => c.name), name);
  };

  render(): ReactNode {
    const { children, colors, addColor } = this.props;

    const contextValue: ColorsContextValues = {
      colors,
      addColor,
      getColorById: this.getColorById,
      isColorNameNotAvailable: this.isColorNameNotAvailable,
    };

    return (
      <ColorsContext.Provider value={contextValue}>
        {children}
      </ColorsContext.Provider>
    );
  }
}

/* istanbul ignore next */
const mapStateToProps = ({ colors }: StoreType): StateProps => ({ colors });

/* istanbul ignore next */
const mapDispatchToProps = (dispatch: Dispatch<ColorAction>): DispatcherProps => ({
  addColor: (color: ColorToInsert): ColorAction => dispatch(
    addColorAction(color),
  ),
});

/* istanbul ignore next */
export default connect(mapStateToProps, mapDispatchToProps)(ColorsContextProviderUnconnected);


import React, { ReactNode, PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { StoreType } from 'store/store';
import { ColorsContext } from 'features/colors/providers';
import { ColorsContextValues } from 'features/colors/providers/ColorsContext';
import { StringUtils } from 'utils';
import { Product } from 'features/products/product';
import { Dictionary, DictionaryToInsert } from '../dictionary';
import {
  DictionaryAction, addDictionaryAction, removeDictionaryAction, selectDictionaryAction,
  updateDictionaryAction, unselectDictionaryAction, AddDictionaryActionType, GenericDictionaryActionType,
} from '../dictionaries.actions';
import DictionariesContext, { DictionariesContextValues } from './DictionariesContext';


interface StateProps {
  products: Product[];
  dictionaries: Dictionary[];
  selectedDictionary: Dictionary | null;
}

interface DispatcherProps {
  addDictionary: AddDictionaryActionType;
  removeDictionary: GenericDictionaryActionType;
  updateDictionary: GenericDictionaryActionType;
  selectDictionary: GenericDictionaryActionType;
  unselectDictionary: GenericDictionaryActionType;
}

export interface DictionariesContextProviderProps extends StateProps, DispatcherProps {
  children: ReactNode;
}

export class DictionariesContextProviderUnconnected extends PureComponent<DictionariesContextProviderProps> {
  isFromAvailable = (from: string, ownId: number = NaN): boolean => {
    const { dictionaries } = this.props;
    return !dictionaries.some(d => d.id !== ownId && StringUtils.areEquals(d.from, from));
  };

  getAssociatedProducts = (id: number): Product[] => {
    const { products } = this.props;
    return products.filter(p => p.dictionary === id);
  };

  getDictionaryById = (id: number): Dictionary => {
    const { dictionaries } = this.props;
    return dictionaries.find(d => d.id === id) as Dictionary;
  }

  getContextValue = (colorsContextValues: ColorsContextValues) : DictionariesContextValues => {
    const {
      dictionaries, selectedDictionary,
      addDictionary, removeDictionary, updateDictionary,
      selectDictionary, unselectDictionary,
    } = this.props;
    const { getColorById } = colorsContextValues;

    const value: DictionariesContextValues = {
      dictionaries,
      selectedDictionary,
      addDictionary,
      removeDictionary,
      updateDictionary,
      selectDictionary,
      unselectDictionary,
      isFromAvailable: this.isFromAvailable,
      getAssociatedProducts: this.getAssociatedProducts,
      getDictionaryColor: getColorById,
      getDictionaryById: this.getDictionaryById,
    };
    return value;
  };

  render(): ReactNode {
    const { children } = this.props;

    return (
      <ColorsContext.Consumer>
        {
          (colorsContextValues: ColorsContextValues) => (
            <DictionariesContext.Provider value={this.getContextValue(colorsContextValues)}>
              {children}
            </DictionariesContext.Provider>
          )
        }
      </ColorsContext.Consumer>
    );
  }
}
/* istanbul ignore next */
const mapStateToProps = ({ dictionaries, selectedDictionary, products }: StoreType): StateProps => ({
  products,
  dictionaries,
  selectedDictionary,
});
/* istanbul ignore next */
const mapDispatchToProps = (dispatch: Dispatch<DictionaryAction>): DispatcherProps => ({
  addDictionary: (dictionary: DictionaryToInsert): DictionaryAction => dispatch(addDictionaryAction(dictionary)),
  removeDictionary: (dictionary: Dictionary): DictionaryAction => dispatch(removeDictionaryAction(dictionary)),
  updateDictionary: (dictionary: Dictionary): DictionaryAction => dispatch(updateDictionaryAction(dictionary)),
  selectDictionary: (dictionary: Dictionary): DictionaryAction => dispatch(selectDictionaryAction(dictionary)),
  unselectDictionary: (dictionary: Dictionary): DictionaryAction => dispatch(unselectDictionaryAction(dictionary)),
});
/* istanbul ignore next */
export default connect(mapStateToProps, mapDispatchToProps)(DictionariesContextProviderUnconnected);

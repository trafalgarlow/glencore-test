import React, {
  ReactNode, ChangeEvent, FormEvent, ContextType, Context,
} from 'react';
import { Button, TextField, Divider } from '@material-ui/core';
import { Dictionary } from 'features/dictionaries/dictionary';
import { WithToastMessageProps } from 'components/withToastMessage';
import { withToastMessage, CurrencyTextField } from 'components';
import { StringUtils, NumberUtils } from 'utils';
import { DictionaryPicker } from 'features/dictionaries/components';
import { ProductsContext } from '../providers';
import { ProductsContextValues } from '../providers/ProductsContext';

interface State {
  name: string;
  price: number;
  dictionary: number;
}

export interface AddProductProps extends WithToastMessageProps {}

export class AddProduct extends React.PureComponent<AddProductProps, State> {
  static contextType: Context<ProductsContextValues> = ProductsContext;

  state = { name: '', price: 0, dictionary: NaN };

  context!: ContextType<typeof ProductsContext>;

  isAddDisabled = (): boolean => {
    const { name, dictionary } = this.state;
    return StringUtils.isEmpty(name) || !NumberUtils.isValidId(dictionary);
  };

  onAddProduct = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { show } = this.props;
    const { name, price, dictionary } = this.state;
    const { addProduct } = this.context;

    addProduct({ name, price, dictionary });
    show({ content: `Product "${name}" added correctly`, autoHideDuration: 5000 });
    this.setState({ name: '', price: 0, dictionary: NaN });
  };

  onChangeName = ({ target: { value } }: ChangeEvent<HTMLInputElement>): void => this.setState({ name: value });
  onSelectDictionary = ({ id }: Dictionary): void => this.setState({ dictionary: id });
  onChangePrice = (price: number): void => this.setState({ price });

  render(): ReactNode {
    const { name, dictionary, price } = this.state;

    return (
      <form className="row justify-content-center" noValidate autoComplete="off" onSubmit={this.onAddProduct}>
        <div className="col-lg-5">
          <TextField
            className="w-100"
            label="Product Name"
            value={name}
            onChange={this.onChangeName}
            required
          />
        </div>
        <div className="col-xl-3 offset-xl-1 col-lg-4 offset-lg-0 col-md-7 col-sm-8">
          <DictionaryPicker
            value={dictionary}
            onSelectDictionary={this.onSelectDictionary}
          />
        </div>
        <div className="col-xl-2 offset-xl-1 col-lg-3 offset-lg-0 col-md-3 offset-md-2 col-sm-4">
          <CurrencyTextField
            onChange={this.onChangePrice}
            value={price}
            label="Product Price"
          />
        </div>
        <Divider className="col-12 content-divider small" />
        <div className="col-lg-2 col-md-4 col-sm-5 col-8 mt-3">
          <Button
            variant="contained"
            className="w-100 hvr-radial-in"
            color="primary"
            type="submit"
            disabled={this.isAddDisabled()}
          >
            Add Product
          </Button>
        </div>
      </form>
    );
  }
}

export default withToastMessage(AddProduct);

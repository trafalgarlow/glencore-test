import React, {
  ReactNode, ChangeEvent, FormEvent, Context, ContextType,
} from 'react';
import { Button, TextField, Divider } from '@material-ui/core';
import { WithToastMessageProps } from 'components/withToastMessage';
import { withToastMessage } from 'components';
import { StringUtils } from 'utils';
import { ColorsContext } from '../providers';
import { ColorsContextValues } from '../providers/ColorsContext';


interface State {
  name: string;
}

export interface AddColorProps extends WithToastMessageProps {}

export class AddColor extends React.PureComponent<AddColorProps, State, {}> {
  static contextType: Context<ColorsContextValues> = ColorsContext;

  state = { name: '' };

  context!: ContextType<typeof ColorsContext>;

  isNameEmpty = (): boolean => {
    const { name } = this.state;

    return StringUtils.isEmpty(name);
  };

  isNameNotAvailable = (): boolean => {
    const { name } = this.state;
    const { isColorNameNotAvailable } = this.context;

    return isColorNameNotAvailable(name);
  };

  isAddDisabled = (): boolean => this.isNameEmpty() || this.isNameNotAvailable();

  onChangeName = ({ target: { value } }: ChangeEvent<HTMLInputElement>): void => this.setState({ name: value });

  onAddColor = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { show } = this.props;
    const { name } = this.state;
    const { addColor } = this.context;

    addColor({ name });
    show({ content: `Color "${name}" added correctly`, position: { vertical: 'top', horizontal: 'right' }, autoHideDuration: 5000 });
    this.setState({ name: '' });
  };

  render(): ReactNode {
    const { name } = this.state;

    return (
      <form
        className="row justify-content-center"
        noValidate
        autoComplete="off"
        onSubmit={this.onAddColor}
      >
        <div className="col-12">
          <TextField
            className="w-100 add-color-name"
            label="Color Name"
            value={name}
            onChange={this.onChangeName}
            required
          />
          {
            this.isNameNotAvailable() && <div className="col-12 text-danger">The current color name is not available.</div>
          }
        </div>
        <Divider className="col-12 content-divider small" />
        <div className="col-md-4 col-sm-5 col-8 mt-3">
          <Button
            variant="contained"
            className="w-100 hvr-radial-in add-color-button"
            color="primary"
            type="submit"
            disabled={this.isAddDisabled()}
          >
            Add Color
          </Button>
        </div>
      </form>
    );
  }
}

export default withToastMessage(AddColor);

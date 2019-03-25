import React, {
  PureComponent, ReactNode, FormEvent, ChangeEvent,
} from 'react';
import { TextField, Button, Divider } from '@material-ui/core';
import { Color } from 'features/colors/color';
import { ColorPicker } from 'features/colors/components';

export interface SaveDictionaryProps {
  from: string;
  to: number;
  isFromNotAvailable: (from: string) => boolean;
  isSubmitDisabled: (from: string, to: number) => boolean;
  onSubmit: (from: string, to: number) => void;
}

interface State {
  from: string;
  to: number;
}

class SaveDictionary extends PureComponent<SaveDictionaryProps, State> {
  static defaultProps = { from: '', to: NaN };

  constructor(props: SaveDictionaryProps) {
    super(props);
    const { from, to } = props;
    this.state = { from, to };
  }

  onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { onSubmit } = this.props;
    const { from, to } = this.state;

    onSubmit(from, to);
    this.setState({ from: '', to: NaN });
  }

  onChangeFrom = ({ target: { value } }: ChangeEvent<HTMLInputElement>): void => this.setState({ from: value });
  onSelectColor = (color: Color): void => this.setState({ to: color.id });

  render(): ReactNode {
    const { isFromNotAvailable, isSubmitDisabled } = this.props;
    const { from, to } = this.state;

    return (
      <form className="row justify-content-center" noValidate autoComplete="off" onSubmit={this.onSubmit}>
        <div className="col-lg-6 col-12">
          <TextField
            className="w-100 save-dictionary-from"
            label="Dictionary From"
            value={from}
            onChange={this.onChangeFrom}
            required
          />
          {
            isFromNotAvailable(from) && <div className="w-100 text-danger">The current from name is not available.</div>
          }
        </div>
        <div className="col-lg-6 col-12 color-picker-select">
          <ColorPicker value={to} onSelectColor={this.onSelectColor} />
        </div>
        <Divider className="col-12 content-divider small" />
        <div className="col-lg-3 col-md-4 col-sm-5 col-8 mt-3">
          <Button
            variant="contained"
            className="w-100 hvr-radial-in save-dictionary-button"
            color="primary"
            type="submit"
            disabled={isSubmitDisabled(from, to)}
          >
            Save Dictionary
          </Button>
        </div>
      </form>
    );
  }
}

export default SaveDictionary;

import React, {
  ReactNode, PureComponent, Context, ContextType,
} from 'react';
import { Divider } from '@material-ui/core';
import { Dictionary, DictionaryToInsert } from 'features/dictionaries/dictionary';
import { withToastMessage } from 'components';
import { WithToastMessageProps } from 'components/withToastMessage';
import { DictionariesContext } from 'features/dictionaries/providers';
import { DictionariesContextValues } from 'features/dictionaries/providers/DictionariesContext';
import { EditDictionary, AddDictionary, DictionariesTable } from 'features/dictionaries/components';


export interface DictionariesRouteProps extends WithToastMessageProps {}

export class DictionariesRoute extends PureComponent<DictionariesRouteProps> {
  static contextType: Context<DictionariesContextValues> = DictionariesContext;

  context!: ContextType<typeof DictionariesContext>;

  getContent(): ReactNode {
    const { selectedDictionary } = this.context;

    return selectedDictionary
      ? <EditDictionary onEdit={this.onEdit} dictionary={selectedDictionary} />
      : <AddDictionary onAdd={this.onAdd} />;
  }

  onEdit = (dictionary: Dictionary, updatedDictionary: DictionaryToInsert): void => {
    const { show } = this.props;
    const { getDictionaryColor } = this.context;

    const startingColor = getDictionaryColor(dictionary.to);
    const updatedColor = getDictionaryColor(updatedDictionary.to);
    show({
      content: `
        Dictionary "${dictionary.from} - ${startingColor.name}"
        updated correctly to
        "${updatedDictionary.from} - ${updatedColor.name}"
      `,
      autoHideDuration: 5000,
    });
  };

  onAdd = ({ from, to }: DictionaryToInsert): void => {
    const { show } = this.props;
    const { getDictionaryColor } = this.context;
    const color = getDictionaryColor(to);

    show({ content: `Dictionary "${from} - ${color.name}" added correctly`, autoHideDuration: 5000 });
  };

  render(): ReactNode {
    const { dictionaries } = this.context;

    return (
      <div>
        {this.getContent()}
        <Divider className="content-divider" />
        <DictionariesTable dictionaries={dictionaries} />
      </div>
    );
  }
}

export default withToastMessage(DictionariesRoute);

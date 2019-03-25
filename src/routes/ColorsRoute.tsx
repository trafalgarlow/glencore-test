import React, {
  ReactNode, PureComponent, Context, ContextType,
} from 'react';
import { Divider } from '@material-ui/core';
import ColorsContext, { ColorsContextValues } from 'features/colors/providers/ColorsContext';
import { AddColor, ColorsTable } from 'features/colors/components';


class ColorsRoute extends PureComponent<{}> {
  static contextType: Context<ColorsContextValues> = ColorsContext;

  context!: ContextType<typeof ColorsContext>;

  render(): ReactNode {
    const { colors } = this.context;

    return (
      <div className="row">
        <div className="col-lg-6 col-12">
          <AddColor />
          <Divider className="w-100 content-divider" />
        </div>
        <div className="col-lg-6 col-12">
          <ColorsTable colors={colors} />
        </div>
      </div>
    );
  }
}

export default ColorsRoute;

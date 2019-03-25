import React from 'react';

const Provider = (props: any) => <div {...props} />;
const Consumer = (props: any) => (
  <div id="colors-context-consumer" {...props}>
    {
      props.children({
        getColorById: jest.fn().mockImplementation(() => {})
      })
    }
  </div>
);

const ColorsContext = {
  Provider,
  Consumer,
};

export default ColorsContext;

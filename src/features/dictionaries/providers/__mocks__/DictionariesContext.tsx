import React from 'react';

const Provider = (props: any) => <div id="dictionaries-context-provider" {...props} />;
const Consumer = (props: any) => (
  <div id="dictionaries-context-consumer" {...props}>
    {
      props.children({
        getDictionaryById: jest.fn().mockImplementation(),
        getDictionaryColor: jest.fn().mockImplementation(),
      })
    }
  </div>
);

const DictionariesContext = {
  Provider,
  Consumer,
};

export default DictionariesContext;

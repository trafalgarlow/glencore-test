import { addDecorator, configure, addParameters } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';
import { withKnobs } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { withNotes } from '@storybook/addon-notes';
import 'index.scss';

addDecorator(withInfo);
addParameters({
  info: {
    inline: true
  },
  options: {
    name: 'GLENCORE',
    panelPosition: 'right'
  }
});
addDecorator(withKnobs);
addDecorator(withNotes);

function loadStories() {
  const req = require.context('../src', true, /\/stories\/.*\.tsx$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);

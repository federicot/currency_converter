/* eslint-env jest */
import React from 'react';
import CurrencyPicker from './CurrencyPicker';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(
    <CurrencyPicker
      selected="USD"
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
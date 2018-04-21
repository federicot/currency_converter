/* eslint-env jest */
import React from 'react';
import AmountInput from './AmountInput';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(
    <AmountInput
      currencyCode="USD"
      value="10"
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
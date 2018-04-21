/* eslint-env jest */
import React from 'react';
import SavedConversionsList from './SavedConversionsList';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const listItems = [
    {
      currencyFrom: "EUR",
      currencyTo: "USD",
      valueFrom: "10",
      valueTo: "12.31",
    }
  ];
  const tree = renderer.create(
    <SavedConversionsList
      listItems={listItems}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
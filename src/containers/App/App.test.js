/* eslint-env jest */
jest.mock('../../libs/Rates');
jest.mock('../../libs/Conversions')
import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
import App from './App';

import { shallow } from 'enzyme';

test('renders correctly', () => {
  const wrapper = shallow(<App />);
  expect(wrapper).toMatchSnapshot();
});
import React from 'react';
import {
  Picker,
  Icon
} from 'native-base';
import PropTypes from 'prop-types';

import currencies from '../../constants/currencies';

const propTypes = {
  selected: PropTypes.string.isRequired,
  onChange: PropTypes.func
};

const defaultProps = {
  onChange: () => {}
}

const CurrencyPicker = ({ selected, onChange }) => {
  return (
    <Picker
      mode="dropdown"
      iosHeader="Currency"
      iosIcon={<Icon name="ios-arrow-down-outline" />}
      style={{ width: undefined }}
      selectedValue={selected}
      onValueChange={onChange}
    >
      {
        currencies.map(
          (currency) => <Picker.Item key={currency.code} label={currency.code} value={currency.code} />
        )
      }
    </Picker>
  );
}

CurrencyPicker.propTypes = propTypes;
CurrencyPicker.defaultProps = defaultProps;

export default CurrencyPicker;
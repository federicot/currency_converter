import React from 'react';
import { 
  View,
  StyleSheet,
  TextInput
} from 'react-native';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';

const propTypes = {
  currencyCode: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  editable: PropTypes.bool,
  onChange: PropTypes.func
};

const defaultProps = {
  editable: true,
  onChange: () => {}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  textInput: {
    flex: 1,
    fontSize: 30,
    textAlign: 'right',
  }
});

const AmountInput = ({ value, editable, onChange }) => {
  return (
    <View style={styles.container}>
      <Icon active type="FontAwesome" name="usd" />
      <TextInput
        editable={editable}
        selectTextOnFocus
        value={value}
        keyboardType="numeric"
        style={styles.textInput}
        onChangeText={onChange}
      />
    </View>
  );
}

AmountInput.propTypes = propTypes;
AmountInput.defaultProps = defaultProps;

export default AmountInput;
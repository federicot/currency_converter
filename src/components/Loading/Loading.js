import React from 'react';
import { 
  View,
  StyleSheet
} from 'react-native';
import { Spinner } from 'native-base';
// import PropTypes from 'prop-types';

// const propTypes = {
//   currencyCode: PropTypes.string.isRequired,
//   value: PropTypes.string.isRequired,
//   editable: PropTypes.bool,
//   onChange: PropTypes.func
// };

// const defaultProps = {
//   editable: true,
//   onChange: () => {}
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const AmountInput = () => {
  return (
    <View style={styles.container}>
      <Spinner color='blue' />
    </View>
  );
}

// AmountInput.propTypes = propTypes;
// AmountInput.defaultProps = defaultProps;

export default AmountInput;
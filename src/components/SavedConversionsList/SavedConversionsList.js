import React from 'react';
import { View, StyleSheet } from 'react-native';
import { 
  Icon,
  List,
  ListItem,
  Left,
  Content,
  Text
} from 'native-base';
import PropTypes from 'prop-types';

const propTypes = {
  listItems: PropTypes.arrayOf(PropTypes.shape({
    currencyFrom: PropTypes.string,
    currencyTo: PropTypes.string,
    valueFrom: PropTypes.string,
    valueTo: PropTypes.string,
  })).isRequired,
  onPress: PropTypes.func
};

const defaultProps = {
  onPress: () => {}
}

const styles = StyleSheet.create({
  noConversionsView: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  }
});

const SavedConversionsList = ({ listItems, onPress }) => {
  return (
    <View>
    {
      listItems.length ? (
        <List>
          {
            [...listItems].reverse().map((conversion, i) => {
              return (
                <ListItem key={i} onPress={onPress(conversion)}>
                  <Left>
                    <Text>{`${conversion.currencyFrom} $${conversion.valueFrom}`}</Text>
                  </Left>
                  <Content>
                    <Icon name='arrow-round-forward' />
                  </Content>
                  <Content>
                    <Text>{`${conversion.currencyTo} $${conversion.valueTo}`}</Text>
                  </Content>
                </ListItem>
              );
            })
          }
        </List>
      ) : (
        <View style={styles.noConversionsView}>
          <Text>You have no saved conversions</Text>
        </View>
      )
    }
    </View>
  );
}

SavedConversionsList.propTypes = propTypes;
SavedConversionsList.defaultProps = defaultProps;

export default SavedConversionsList;
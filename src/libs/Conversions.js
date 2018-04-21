import { AsyncStorage } from 'react-native';

const convert = (fromRate, toRate, value) => {
  const fromRateFloat = +fromRate;
  const toRateFloat = +toRate;
  const valueFloat = +value;

  if (isNaN(fromRateFloat)) {
    throw new Error('fromRate is NaN');
  }

  if (isNaN(toRateFloat)) {
    throw new Error('toRate is NaN');
  }

  if (isNaN(valueFloat)) {
    throw new Error('value is NaN');
  }

  const excRate = toRate * (1 / fromRate);

  return value * excRate;
}

const setConversionsList = async (conversionsList) => {
  try {
    await AsyncStorage.setItem('conversionsList', JSON.stringify(conversionsList));
  } catch (error) {
    throw new Error(error);
  }
}

const getConversionsList = async () => {
  try {
    const conversationsList = await AsyncStorage.getItem('conversionsList');
    if (conversationsList === null) {
      return [];
    }
    return JSON.parse(conversationsList);
  } catch (error) {
    throw new Error(error);
  }
}

export {
  convert,
  setConversionsList,
  getConversionsList
};
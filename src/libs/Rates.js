import { AsyncStorage } from 'react-native';
import moment from 'moment';

const getFromApi = async () => {
  try {
    let response = await fetch(
      'https://txf-ecb.glitch.me/rates'
    );
    let responseJson = await response.json();
    if (responseJson.rates && responseJson.rates.length) {
      responseJson.rates.push({currency: "EUR", rate: "1"})
      return responseJson;
    } else {
      throw new Error('Invalid response from API');  
    }
  } catch (error) {
    throw new Error(error);
  }
}

const setRates = async () => {
  try {
    const ratesObj = await getFromApi();
    await AsyncStorage.setItem('rates', JSON.stringify(ratesObj));
    return ratesObj;
  } catch (error) {
    throw new Error(error);
  }
};

const getRates = async () => {
  try {
    const ratesStr = await AsyncStorage.getItem('rates');
    if (ratesStr !== null) {
      const ratesObj = JSON.parse(ratesStr);
      // Check date
      if (moment().isAfter(ratesObj.time, 'day')) {
        const ratesObjApi = await setRates();
        return ratesObjApi.rates;
      }
      return ratesObj.rates;
    }

    const ratesObjApi = await setRates();
    return ratesObjApi.rates;  
  } catch (error) {
    throw new Error(error);
  }
};

export {
  getFromApi,
  getRates,
};
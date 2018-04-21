import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import {
  Root,
  Container,
  Header,
  Title,
  Content,
  Button,
  Left,
  Right,
  Body,
  Text,
  Card,
  CardItem,
  Toast,
} from 'native-base';

import { getRates } from '../../libs/Rates';
import { convert, setConversionsList, getConversionsList } from '../../libs/Conversions';
import Loading from '../../components/Loading/Loading';
import CurrencyPicker from '../../components/CurrencyPicker/CurrencyPicker';
import AmountInput from '../../components/AmountInput/AmountInput';
import SavedConversionsList from '../../components/SavedConversionsList/SavedConversionsList'


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyFrom: "EUR",
      currencyTo: "USD",
      valueFrom: "0.00",
      valueTo: "0.00",
      rates: [],
      savedConversions: [],
      loading: true,
    };

    this.onFromCurrencyChange = this.onFromCurrencyChange.bind(this);
    this.onToCurrencyChange = this.onToCurrencyChange.bind(this);
    this.makeConversion = this.makeConversion.bind(this);
    this.onAmountChange = this.onAmountChange.bind(this);
    this.saveConversion = this.saveConversion.bind(this);
    this.loadConversionToState = this.loadConversionToState.bind(this);
  }

  componentDidMount() {
    try {
      this.loadData();
    } catch (error) {
      // TODO: Implement proper timeout and retry 
      Toast.show({
        text: "There was an error loading rates",
        buttonText: "Okay",
        duration: 3000,
        type: "danger"
      });
      this.setState({
        loading: false,
      });
    }
  }

  async loadData() {
    const rates = await getRates();
    const savedConversions = await getConversionsList();
    
    this.setState({
      rates,
      savedConversions,
      loading: false,
    });
  }
  
  onFromCurrencyChange(value) {
    const valueTo = this.makeConversion(value, this.state.currencyTo, this.state.valueFrom);
    this.setState({
      currencyFrom: value,
      valueTo,
    });
  }

  onToCurrencyChange(value) {
    const valueTo = this.makeConversion(this.state.currencyFrom, value, this.state.valueFrom);
    this.setState({
      currencyTo: value,
      valueTo,
    });
  }

  getRateFromCurrencyCode(currencyCode) {
    return this.state.rates.filter(r => r.currency === currencyCode);
  }

  makeConversion(currencyFrom, currencyTo, valueFrom) {
    const fromRate = this.getRateFromCurrencyCode(currencyFrom);
    const toRate = this.getRateFromCurrencyCode(currencyTo);
    try {
      return convert(fromRate[0].rate, toRate[0].rate, valueFrom).toFixed(2).toString();
    } catch (error) {
      return "0.00";
    }
  }

  onAmountChange(newAmount) {
    const valueTo = this.makeConversion(this.state.currencyFrom, this.state.currencyTo, newAmount);
    this.setState({
      valueFrom: newAmount,
      valueTo,
    })
  }

  saveConversion() {
    const fromRate = this.getRateFromCurrencyCode(this.state.currencyFrom);
    const toRate = this.getRateFromCurrencyCode(this.state.currencyTo);
    const conversionObj = {
      fromRate,
      toRate,
      currencyFrom: this.state.currencyFrom,
      currencyTo: this.state.currencyTo,
      valueFrom: this.state.valueFrom,
      valueTo: this.state.valueTo
    }
    
    this.setState((prevState) => {
      // Only store last 10
      const savedConversions = [
        ...prevState.savedConversions,
        conversionObj
      ].slice(-10);

      // Store in local storage
      setConversionsList(savedConversions);

      return {
        savedConversions
      }
    })
  }

  loadConversionToState = (conversion) => () => {
    this.setState({
      currencyFrom: conversion.currencyFrom,
      currencyTo: conversion.currencyTo,
      valueFrom: conversion.valueFrom,
      valueTo: conversion.valueTo
    });
  }

  render() {
    return (
      <Root>
        <Container>
          <Header>
            <Left />
            <Body>
              <Title>Currency</Title>
            </Body>
            <Right />
          </Header>
          <Content>
            {
              this.state.loading ? (
                <Loading />
              ) : (
                <View>
                  <Card>
                    <CardItem bordered>
                      <Left>
                        <CurrencyPicker
                          selected={this.state.currencyFrom}
                          onChange={this.onFromCurrencyChange}
                        />
                      </Left>
                      <AmountInput
                        currencyCode={this.state.currencyFrom}
                        value={this.state.valueFrom}
                        onChange={this.onAmountChange}
                      />
                    </CardItem>
                    <CardItem bordered>
                      <Left>
                        <CurrencyPicker
                          selected={this.state.currencyTo}
                          onChange={this.onToCurrencyChange}
                        />
                      </Left>
                      <AmountInput editable={false} currencyCode={this.state.currencyTo} value={this.state.valueTo} />
                    </CardItem>
                    <CardItem>
                      <Left />
                      <Right>
                        <Button
                          onPress={this.saveConversion}
                        >
                          <Text>Save!</Text>
                        </Button>
                      </Right>
                    </CardItem>
                  </Card>
                  <SavedConversionsList
                    listItems={this.state.savedConversions}
                    onPress={this.loadConversionToState}
                  />
                </View>
              )
            }
          </Content>
        </Container>
      </Root>
    );
  }
}

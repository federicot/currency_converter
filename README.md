# Currency Converter Challenge

## Installation
```bash
npm install
react-native run-ios
```

## Specifications
* Tested in iPhone 6 iOS 11.2 Simulator
* Implemented requirements:
  * Convert the Amount entered from Currency A to Currency B
  * Save conversions to a “recently entered” list
* Libraries used:
  * [NativeBase](https://nativebase.io/)
  * [Moment.js](https://momentjs.com/)
  * [Enzyme](http://airbnb.io/enzyme/)
* Testing was limited to snapshot testing of components
  
## TODO/Improvements
* Add unit tests for libraries
* Implement proper timeout and retry in case rates can not be loaded
* Add "swap currency" button

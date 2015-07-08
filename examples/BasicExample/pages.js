'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
} = React;

var FirstPage = React.createClass({
  render() {
    return (
      <View style={pageStyle.firstpage}>
        <Text style={pageStyle.text}>Yep, this is the first page</Text>
      </View>
    );
  }
});

var SecondPage = React.createClass({
  render() {
    return (
      <View style={pageStyle.secondpage}>
        <Text style={pageStyle.text}>And that, is the second one</Text>
      </View>
    );
  }
});

var pageStyle = StyleSheet.create({
  firstpage: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#F00"
  },
  secondpage: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#0F0"
  },
  text: {
    marginTop: 50,
  }
});

module.exports = {
  FirstPage: FirstPage,
  SecondPage: SecondPage
}

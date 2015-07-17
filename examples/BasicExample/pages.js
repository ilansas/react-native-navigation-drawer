'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
} = React;

var FirstPage = React.createClass({
  onPress() {
    this.props.routeFrontView('secondpage');
  },
  render() {
    return (
      <View style={pageStyle.firstpage}>
        <Text style={pageStyle.text}>Yep, this is the first page !</Text>
      </View>
    );
  }
});

var SecondPage = React.createClass({
  render() {
    return (
      <View style={pageStyle.secondpage}>
        <Text style={pageStyle.text}>And that, is the second one !</Text>
      </View>
    );
  }
});

var ThirdPage = React.createClass({
  onPress() {
    this.props.routeFrontView('firstpage');
  },
  render() {
    return (
      <View style={pageStyle.thirdpage}>
        <Text style={pageStyle.text}>The third is blocking the SlideMenu !</Text>
        <Text style={pageStyle.text}>But don&apos;t panic, here is a button !</Text>
        <Text style={pageStyle.button} onPress={this.onPress}>Go to first page !</Text>
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
  thirdpage: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#00F"
  },
  button: {
    backgroundColor: '#0F0',
    marginTop: 15,
  },
  text: {
    marginTop: 50,
  }
});

module.exports = {
  FirstPage: FirstPage,
  SecondPage: SecondPage,
  ThirdPage: ThirdPage
}

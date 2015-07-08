/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var SlideMenu = require('./slideMenu.js');
var Menu = require('./menu.js');

var FirstPage = React.createClass({
  render() {
    return (
      <View style={pageStyle.firstpage}/>
    )
  }
});

var SecondPage = React.createClass({
  render() {
    return (
      <View style={pageStyle.secondpage}/>
    )
  }
});

var pageStyle = StyleSheet.create({
  firstpage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    backgroundColor: "#F00"
  },
  secondpage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    backgroundColor: "#0F0"
  }
});

var BasicExample = React.createClass({
  getInitialState(fragmentId) {
    return ({ route: 'firstpage' });
  },

  updateFrontView() {
    switch (this.state.route) {
      case 'firstpage':
        return <FirstPage />;
      case 'secondpage':
        return <SecondPage />;
    }
  },

  routeFrontView(fragmentId) {
    this.setState({ route: fragmentId });
  },

  render() {
    var fragment = this.updateFrontView();
    return (
      <View style={styles.container}>
        <SlideMenu frontView={fragment} routeFrontView={this.routeFrontView}
          menu={<Menu />}/>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent('BasicExample', () => BasicExample);

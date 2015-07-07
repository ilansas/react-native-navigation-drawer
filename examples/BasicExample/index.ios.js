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

var FirstPage = React.createClass({
  render() {
    return (
      <View style={firstPageStyle.container}/>
    )
  }
});
var firstPageStyle = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
});

var menuItems = [
  {
    name: 'First Page',
    fragmentId: 'firstpage'
  },
  {
    name: 'Second Page',
    fragmentId: 'secondpage'
  }
]

var BasicExample = React.createClass({
  getInitialState(fragmentId) {
    return ({ route: 'firstpage' });
  },

  routeFrontView() {
    return (
      switch (this.state.route) {
        case 'firstpage':
          return <FirstPage />;
        case 'firstpage':
          return <SecondPage />;
      }
    );
  },

  updateFrontView(fragmentId) {
    this.setState({ route: fragmentId });
  }

  render() {
    var fragment = this.routeFrontView();
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
        <SlideMenu frontView={fragment} routeFrontView={this.updateFrontView}
          menuItems={}/>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('BasicExample', () => BasicExample);

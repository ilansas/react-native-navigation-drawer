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
var FirstPage = require('./pages.js').FirstPage;
var SecondPage = require('./pages.js').SecondPage;

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

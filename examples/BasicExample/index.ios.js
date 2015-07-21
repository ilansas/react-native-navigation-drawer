'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var SlideMenu = require('react-native-navigation-drawer');
var Menu = require('./menu.js');

var Pages = require('./pages.js');
var FirstPage = Pages.FirstPage;
var SecondPage = Pages.SecondPage;
var ThirdPage = Pages.ThirdPage;

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
      case 'thirdpage':
        this.refs.slideMenu.blockSlideMenu(true);
        return <ThirdPage routeFrontView={this.routeFrontView}/>;
    }
  },

  routeFrontView(fragmentId) {
    //we unblock slideMenu when we change the route (it will be activated
    //when the page is updated, look at 'thirdpage')
    this.refs.slideMenu.blockSlideMenu(false);
    this.setState({ route: fragmentId });
  },

  render() {
    var fragment = this.updateFrontView();
    return (
      <View style={styles.container}>
        <SlideMenu ref="slideMenu" frontView={fragment}
          routeFrontView={this.routeFrontView} menu={<Menu />}
          slideWay='left' moveFrontView={false} width={200}/>
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

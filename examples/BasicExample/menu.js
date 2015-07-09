'use strict';

var React = require('react-native');

var {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Text,
  View,
} = React;

var Menu = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          style={styles.scrollView}>

          <Section
            id='firstpage'
            name='FIRST PAGE'
            toggleSlideMenu={this.props.toggleSlideMenu}
            routeFrontView={this.props.routeFrontView}/>

          <Section
            id='secondpage'
            name='SECOND PAGE'
            toggleSlideMenu={this.props.toggleSlideMenu}
            routeFrontView={this.props.routeFrontView}/>

          <Section
            id='thirdpage'
            name='THIRD PAGE'
            toggleSlideMenu={this.props.toggleSlideMenu}
            routeFrontView={this.props.routeFrontView}/>

          {/*put more sections here*/}

        </ScrollView>
      </View>
    );
  }
});

var Section = React.createClass({
  onPress() {
    if (this.props.toggleSlideMenu)
      this.props.toggleSlideMenu();
    if (this.props.routeFrontView)
      this.props.routeFrontView(this.props.id);
  },
  render() {
    return (
      <TouchableHighlight underlayColor='#DFDFDF' onPress={this.onPress}>
        <View style={styles.section}>
          <Text style={styles.sectionName}>{this.props.name.toUpperCase()}</Text>
        </View>
      </TouchableHighlight>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    marginTop: 5,
    flex: 1,
  },
  scrollView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 50,
  },
  section: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionName: {
    fontSize: 15,
    marginLeft: 10,
  },
});

module.exports = Menu;

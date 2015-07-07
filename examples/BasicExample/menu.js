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
  render: function() {
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          style={styles.scrollView}>
          <Section
            id='suggestions'
            icon='&#xF0A7;'
            name='SUGGESTIONS'
            toggleSlideMenu={this.props.toggleSlideMenu}
            setFragmentId={this.props.setFragmentId}/>

          <Section
            id='onScreen'
            icon='&#xF0B8;'
            name='A L&apos;ECRAN'
            toggleSlideMenu={this.props.toggleSlideMenu}
            setFragmentId={this.props.setFragmentId}/>

          <Section
            id='zap'
            icon='&#xF0A2;'
            name='ZAP'
            toggleSlideMenu={this.props.toggleSlideMenu}
            setFragmentId={this.props.setFragmentId}/>

          <Section
            id='onDemand'
            icon='&#xF067;'
            name='A LA DEMANDE'
            toggleSlideMenu={this.props.toggleSlideMenu}
            setFragmentId={this.props.setFragmentId}/>

         <Section
            id='search'
            icon='&#xF061;'
            name='RECHERCHER'
            toggleSlideMenu={this.props.toggleSlideMenu}
            setFragmentId={this.props.setFragmentId}/>

         <Section
            id='settings'
            icon='&#xF062;'
            name='CONFIGURATION'
            toggleSlideMenu={this.props.toggleSlideMenu}
            setFragmentId={this.props.setFragmentId}/>

        </ScrollView>
        <View style={styles.footer}>
          <Text style={styles.footerIcon}>&#xF0A9;</Text>
          <Text style={styles.footerIcon}>&#xF0D2;</Text>
        </View>
      </View>
    );
  }
});

var Section = React.createClass({
  onPress: function() {
    this.props.toggleSlideMenu();
    if(this.props.setFragmentId)
      this.props.setFragmentId(this.props.id);
    if (this.props.toggleAccounts)
      this.props.toggleAccounts();
  },
  render: function() {
    return (
      <TouchableHighlight underlayColor='#DFDFDF' onPress={this.onPress}>
        <View style={styles.section}>
          <View style={styles.iconZone}>
            <Text style={styles.icon}>{this.props.icon}</Text>
          </View>
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
  iconZone: {
    width: 40,
  },
  icon: {
    fontFamily: 'CanalDemiRomainG7',
    fontSize: 30,
    alignSelf: 'center',
    color: '#858585',
  },
  sectionName: {
    fontFamily: 'CanalDemiRomainG7',
    fontSize: 15,
    marginLeft: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3D3D3D'
  },
  footerIcon: {
    fontFamily: 'CanalDemiRomainG7',
    color: '#858585',
    fontSize: 30,
    marginLeft: 30,
    marginRight: 30,
  },
});

module.exports = Section;
module.exports = Menu;

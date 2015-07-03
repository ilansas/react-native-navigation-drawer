'use strict'

var React = require('react-native')
var {
  PanResponder,
  StyleSheet,
  View,
  ListView,
  Navigator,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
} = React

var Dimensions = require('Dimensions')
var screenWidth = Dimensions.get('window').width
var queueAnimation = require('./animations/slideMenuAnimations.js');

var Menu = this.props.menu;
var GeneralTemplate = this.props.frontView;

var SlideMenu = React.createClass({
  firstTouch: true,
  getInitialState: function() {
    return ({
      slideMenuIsOpen: false,
      slideMenuIsAccessible: true,
    });
  },
  componentWillMount: function() {
    this.offset = 0 // Contains the center view offset from the right edge
    this._panGesture = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        if (this.state.slideMenuIsOpen) {
          return Math.abs(gestureState.dx) > Math.abs(gestureState.dy)
            && gestureState.dx > 20
        } else {
          if (this.firstTouch) {
            if (evt.nativeEvent.pageX > 300)
              this.firstTouch = false;
          } else {
            return Math.abs(gestureState.dx) > Math.abs(gestureState.dy)
              && gestureState.dx < -30
          }
        }
      },
      onPanResponderGrant: (evt, gestureState) => this.right = 0,
      onPanResponderMove: (evt, gestureState) => this.moveCenterView(gestureState.dx),
      onPanResponderRelease: this.moveFinished,
      onPanResponderTerminate: this.moveFinished,
    });
  },
  moveCenterView: function(right) {
    if (!this.center) return;
    this.right = right;
    this.center.setNativeProps({ right: this.offset - this.right });
  },
  toggleSlideMenu: function() {
    if(this.state.slideMenuIsOpen) {
      this.offset = 0;
      this.setState({ slideMenuIsOpen: false });
    } else {
      this.offset = screenWidth * 0.75;
      this.setState({ slideMenuIsOpen: true });
    }
    queueAnimation(this.props.animation);
    this.center.setNativeProps({ right: this.offset });
  },
  moveFinished: function() {
    if (!this.center) return;

    var offset = this.offset + this.right

    this.toggleSlideMenu();
    this.firstTouch = true;
  },
  setFragmentId: function(fragmentId) {
    this.setState({ fragmentId: fragmentId });
  },
  toggleAccounts: function() {
      this.setState({ accountMenuIsOpen: !this.state.accountMenuIsOpen });
  },
  onAccountSelected: function(userName) {
    this.setState({
      accountMenuIsOpen: false,
      currentUser: userName
    });
  },
  render: function() {
    if (this.state.slideMenuIsOpen) {
      var darkUnactive =
      <TouchableWithoutFeedback onPress={this.toggleSlideMenu}>
        <View style={styles.darkUnactive}/>
      </TouchableWithoutFeedback> ;
    }
    return (
      <View style={[styles.containerSlideMenu, this.props.style]}>
        <View style={styles.right}>
          <Menu
            toggleSlideMenu={this.toggleSlideMenu}
            setFragmentId={this.setFragmentId}
            toggleAccounts={this.toggleAccounts}
            currentUser={this.state.currentUser}/>
        </View>
        <View
          style={[styles.center, {right: this.offset}]}
          ref={(center) => this.center = center}
          {...this._panGesture.panHandlers}>
          <GeneralTemplate
            toggleSlideMenu={this.toggleSlideMenu}
            fragmentId={this.props.fragmentId}
            setFragmentId={this.props.setFragmentId}/>
            {darkUnactive}
        </View>
      </View>
    )
  },
});

var styles = StyleSheet.create({
  containerSlideMenu: {
    flex: 1,
  },
  containerAccounts: {
    flex: 1,
    backgroundColor: '#456783',
  },
  center: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  right: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0.25 * screenWidth,
    backgroundColor: '#FFFFFF',
  },
  darkUnactive: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  }
});

var mainStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#456783',
  },
});

var navigationBarStyles = StyleSheet.create({
  navigationBar: {
    backgroundColor: '#FFFFFF',
    height: 50,
    position: 'absolute',
    flexDirection: 'row',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  menuIcon: {
    fontFamily: 'CanalDemiRomainG7',
    fontSize: 30,
  },
  usersIcon: {
    fontFamily: 'CanalDemiRomainG7',
    fontSize: 30,
  }
});


module.exports = SlideMenu;

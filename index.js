'use strict'

var React = require('react-native')
var {
  PanResponder,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} = React

var Dimensions = require('Dimensions')
var screenWidth = Dimensions.get('window').width
var queueAnimation = require('./animations.js');

var SlideMenu = React.createClass({
  firstTouch: true,
  getInitialState() {
    return ({
      slideMenuIsOpen: false,
      slideMenuIsAccessible: true,
    });
  },
  componentWillMount() {
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
  moveCenterView(right) {
    if (!this.center) return;
    this.right = right;
    this.center.setNativeProps({ right: this.offset - this.right });
  },
  toggleSlideMenu() {
    if (this.state.slideMenuIsOpen) {
      this.offset = 0;
      this.setState({ slideMenuIsOpen: false });
    } else {
      this.offset = screenWidth * 0.75;
      this.setState({ slideMenuIsOpen: true });
    }
    queueAnimation(this.props.animation);
    this.center.setNativeProps({ right: this.offset });
  },
  moveFinished() {
    if (!this.center) return;

    this.toggleSlideMenu();
    this.firstTouch = true;
  },

  routeFrontView(fragmentId) {
    this.props.routeFrontView(fragmentId);
  },

  render() {
    if (this.state.slideMenuIsOpen) {
      var overlay =
        <TouchableWithoutFeedback onPress={this.toggleSlideMenu}>
          <View style={styles.overlay}/>
        </TouchableWithoutFeedback> ;
    }

    var menu = React.cloneElement(
      this.props.menu,
      {
        toggleSlideMenu: this.toggleSlideMenu,
        routeFrontView: this.routeFrontView,
      }
    );

    return (
      <View style={[styles.containerSlideMenu, this.props.style]}>
        <View style={styles.right}>
          {menu}
        </View>
        <View
          style={[styles.center, {right: this.offset}]}
          ref={(center) => this.center = center}
          {...this._panGesture.panHandlers}>
          {this.props.frontView}
          {overlay}
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  containerSlideMenu: {
    flex: 1,
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
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  }
});

module.exports = SlideMenu;

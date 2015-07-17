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
    });
  },

  blockSlideMenu(bool) {
    this.blockSlideMenuState = bool;
  },

  componentWillMount() {
    this.blockSlideMenu(false);
    this.offset = 0 // Contains the center view offset from the right edge
    this._panGesture = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        if (!this.blockSlideMenuState) {
          if (this.state.slideMenuIsOpen) {
            if (this.props.slideWay === 'left') {
              return Math.abs(gestureState.dx) > Math.abs(gestureState.dy)
                && gestureState.dx < 20
            }

            return Math.abs(gestureState.dx) > Math.abs(gestureState.dy)
              && gestureState.dx > 20
          } else {
            if (this.firstTouch) {
              if (this.props.slideWay === 'left') {
                if (evt.nativeEvent.pageX < 20)
                  this.firstTouch = false;
              } else {
                if (evt.nativeEvent.pageX > 300)
                  this.firstTouch = false;
              }
            } else {
              if (this.props.slideWay === 'left') {
                return Math.abs(gestureState.dx) > Math.abs(gestureState.dy)
                  && gestureState.dx > 30
              } else {
                return Math.abs(gestureState.dx) > Math.abs(gestureState.dy)
                  && gestureState.dx < -30
              }
            }
          }
        }
      },
      onPanResponderGrant: (evt, gestureState) => this.side = 0,
      onPanResponderMove: (evt, gestureState) => this.moveCenterView(gestureState.dx),
      onPanResponderRelease: this.moveFinished,
      onPanResponderTerminate: this.moveFinished,
    });
  },

  moveCenterView(side) {
    if (!this.center) return;

    this.side = side;

    if (this.props.slideWay === 'left')
      this.center.setNativeProps({ left: this.offset + this.side });
    else
      this.center.setNativeProps({ right: this.offset - this.side });
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

    if (this.props.slideWay === 'left')
      this.center.setNativeProps({ left: this.offset });
    else
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

    if (this.props.slideWay === 'left') {
      var frontWayStyle = {left: this.offset};
      var menuStyle = styles.menuLeft;
    } else {
      var frontWayStyle = {right: this.offset};
      var menuStyle = styles.menuRight;
    }

    return (
      <View style={[styles.containerSlideMenu, this.props.style]}>
        <View style={menuStyle}>
          {menu}
        </View>
        <View
          style={[styles.center, frontWayStyle]}
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
  menuLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0.25 * screenWidth,
  },
  menuRight: {
    position: 'absolute',
    top: 0,
    left: 0.25 * screenWidth,
    bottom: 0,
    right: 0,
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

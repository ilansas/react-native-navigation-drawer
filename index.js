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

/**
* this.props.width : width of the menu
* this.props.moveFrontView: if the front view should move on swype
* this.props.slideWay: the side where the menu is (left or right)
* this.blockSlideMenuState: makes the menu available or not
* this.offset: Ovelay : If the menu is on the left, represents the offset of the left
*              side of the menu. If the menu is on the right, represents the
*              offset of the right side of the menu.
*              moveFrontView : If the menu is on the left, represents the offset
*              of the left side of the front view. If the menu is on the right,
*              represents the offset of the right side of the front view.
*/

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

    this.props.moveFrontView ?
    this.offset = 0 :
    this.offset = -this.props.width;

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
      onPanResponderGrant: (evt, gestureState) => this.position = 0,
      onPanResponderMove: (evt, gestureState) =>
        this.moveAppropriateView(gestureState.dx), //The menu or the center view
      onPanResponderRelease: this.moveFinished,
      onPanResponderTerminate: this.moveFinished,
    });
  },

  moveAppropriateView(position) {
    if (!this.center || !this.menu) return;

    if (this.props.slideWay === 'left') {
      if (this.props.moveFrontView
        && this.offset + position <= this.props.width) {
        this.center.setNativeProps({ left: this.offset + position });
      } else if (this.offset + position <= 0) {
        this.menu.setNativeProps({
          left: this.offset + position,
          right: screenWidth - (this.offset + position + this.props.width)
        });
      }
    } else if (this.props.slideWay !== 'left') {
      if (this.props.moveFrontView
        && this.offset - position <= this.props.width) {
        this.center.setNativeProps({ right: this.offset - position });
      } else if (this.offset - position <= 0) {
        this.menu.setNativeProps({
          right: this.offset + position,
          left: screenWidth + position
        });
      }
    }
  },

  toggleSlideMenu() {
    if (this.state.slideMenuIsOpen) {
      this.props.moveFrontView ?
      this.offset = 0 :
      this.offset = -this.props.width;

      this.setState({ slideMenuIsOpen: false });
    } else {
      this.props.moveFrontView ?
      this.offset = this.props.width :
      this.offset = 0;
      this.setState({ slideMenuIsOpen: true });
    }

    queueAnimation(this.props.animation);

    if (this.props.slideWay === 'left') {
      this.props.moveFrontView ?
      this.center.setNativeProps({ left: this.offset }) :
      this.menu.setNativeProps({
        left: this.offset,
        right: screenWidth - (this.offset + this.props.width)
      });
    }
    else {
      this.props.moveFrontView ?
      this.center.setNativeProps({ right: this.offset }) :
      this.menu.setNativeProps({
        right: this.offset,
        left: this.offset - this.props.width
      });
    }
  },

  moveFinished() {
    if (!this.center || !this.menu) return;

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

    if (this.props.moveFrontView) {
      if (this.props.slideWay === 'left') {
        var frontWayStyle = { left: this.offset };
      } else {
        var frontWayStyle = { right: this.offset };
        var rightStyle = { left: screenWidth - this.props.width };
      }

      return (
        <View style={[styles.containerSlideMenu, this.props.style]}>
          <View
            style={[styles.fixedMenu, rightStyle]}
            ref={(menu) => this.menu = menu}>
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
    } else {
      if (this.props.slideWay === 'left') {
        var menuWayStyle = {
          left: this.offset,
          right: screenWidth - (this.offset + this.props.width)
        };
      } else {
        var menuWayStyle = {
          right: this.offset,
          left: screenWidth - (this.offset + this.props.width)
        };
      }

      return (
        <View style={[styles.containerSlideMenu, this.props.style]}>
          <View
            style={[styles.center]}
            ref={(center) => this.center = center}
            {...this._panGesture.panHandlers}>
            {this.props.frontView}
            {overlay}
          </View>
          <View
            style={[styles.overMenu, menuWayStyle]}
            ref={(menu) => this.menu = menu}>
            {menu}
          </View>
        </View>
      );
    }
  },
});

var styles = StyleSheet.create({
  containerSlideMenu: {
    flex: 1,
    flexDirection: 'row'
  },
  center: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  overMenu: {
    position: 'absolute',
    top: 0,
    bottom: 0,
  },
  fixedMenu: {
    position: 'absolute',
    top: 0,
    left: 0,
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

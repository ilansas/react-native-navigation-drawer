# React Native Slide Menu (Navigation Drawer)
## Description 
A slide menu as we can see in Android which permits to route an item from the menu to a view displayed on the front view (check out the example to create your routes). 

This Slide Menu can be opened by sliding from the left or by the right as you choose (see the prop in the example)
To open it you have to slide from the right (or left) border (and not from anywhere on the screen).

## Installation
    $ npm i --save react-native-navigation-drawer

## Usage Example
```jsx
var SlideMenu = require('react-native-navigation-drawer');
var Menu = require('./menu.js');

var Pages = require('./pages.js');
var FirstPage = Pages.FirstPage;
var SecondPage = Pages.SecondPage;

var BasicExample = React.createClass({
  getInitialState(fragmentId) {
    return ({ route: 'firstpage' });
  },
    
  updateFrontView() {
    //routing your pages here, don't forget to add a section in the menu ;)
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
          menu={<Menu />} slideWay='left'/>
      </View>
    );
  }
});
```    
More details about pages and Menu in the project example.

## Properties
- `frontView`: the fragment to be displayed on the main view
- `routeFrontView`: callback to update the main view
- `menu`: the menu 

## Methods
Use it by using `this.refs` 
- `blockSlideMenu(boolean)`: to block the sliding when Slide Menu shouldn't open

## TODO
- [ ] Improve acceleration
- [ ] Choose eather the panel overlays the front view or it moves the front view (like it is right now)
- [ ] Choosing animation
- [x] Choose slide way (from left or right)
- [x] Block slide menu when we decide to
- [x] Publish to npm
- [x] Implement routes
- [x] Create an example project

## Credits
The slide menu has been inspired from these two projects:
- [Simple Slide Menu with React Native from Terlici](http://www.terlici.com/2015/04/06/simle-slide-menu-react-native.html)
- [react-native-side-menu](https://github.com/Kureev/react-native-side-menu)

Thanks guys for the good work ;)

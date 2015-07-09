# React Native Slide Menu (Navigation Drawer)
### Still in progress ;)
## Description 
A slide menu as we can see in Android which permits to route an item to the view (check out the example to create your routes). 

This Slide Menu comes from the right edge but hopefully it will be possible to choose in a near future.
To open it you have to slide from the right border (and not from anywhere on the screen).

## Installation
    npm i --save react-native-navigation-drawer

## Usage Example

    var SlideMenu = require('react-native-navigation-drawer');

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
              menu={<Menu />}/>
          </View>
        );
      }
    });
    
More details about pages and Menu in the project example.

## Properties
- `frontView`: the fragment to be displayed on the main view
- `routeFrontView`: callback to update the main view
- `menu`: the menu 

## Methods
Use it by using `this.refs` 
- `blockSlideMenu(boolean)`: to block the sliding when Slide Menu shouldn't open

## TODO
- [ ] Choose slide way (from left or right)
- [ ] Improve acceleration
- [ ] Choose eather the panel overlays the front view or it moves the front view (like it is right now)
- [ ] Choosing animation
- [x] Block slide menu when we decide to
- [x] Publish to npm
- [x] Implement routes
- [x] Create an example project

## Credits
The slide menu has been inspired from these two projects:
- [Simple Slide Menu with React Native from Terlici](http://www.terlici.com/2015/04/06/simle-slide-menu-react-native.html)
- [react-native-side-menu](https://github.com/Kureev/react-native-side-menu)

Thanks guys for the good work ;)

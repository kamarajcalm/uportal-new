import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import AppNavigator from './Navigation/AppNavigator';
import { AppearanceProvider } from 'react-native-appearance';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
export default class App extends React.Component {
  state = {
    fontsLoaded: false,
  };

  async loadFonts() {
    await Font.loadAsync({
      // Load a font `Montserrat` from a static resource
      openSans: require('./assets/fonts/OpenSans-Regular.ttf'),

   
    });
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this.loadFonts();
  }

  render() {
    // Use the font with the fontFamily property after loading
    if (this.state.fontsLoaded) {
      return (
        <AppearanceProvider>
          <Provider store={createStore(reducers)}>
        
              <AppNavigator />
        
          </Provider>
        </AppearanceProvider>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
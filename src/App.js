import React from 'react';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { ActionCreators } from './actions';
import { Screens } from './constants';
import MainScreen from './components/MainScreen';
import ScreenA from './components/ScreenA';
import ScreenB from './components/ScreenB';
import ScreenC from './components/ScreenC';
import { Toast } from './utils/nativeModules';

const mapStateToProps = (state) => {
  const length = state.application.navStack.length;
  return {
    lastScreen: state.application.navStack[length - 1],
    navStackLength: length
  }
}

// Root component
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Toast.show( 'Welcome to the App', Toast.LONG);
    // Add listener for 'Android back button was pressed' event
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    // Remove listener
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  // Android back button handler
  onBackPress = () => {
    if (this.props.navStackLength > 1) {
      this.props.dispatch(ActionCreators.applicationActions.screenPop());
      return true;
    } else return false;
  }

  render() {
    switch (this.props.lastScreen) {
      case Screens.SCREEN3:
        return (
          <MainScreen>
            <ScreenC/>
          </MainScreen>
        )
        
      case Screens.SCREEN2:
        return (
          <MainScreen>
            <ScreenB/>
          </MainScreen>
        )

      default:
        return (
          <MainScreen>
            <ScreenA/>
          </MainScreen>
        )
    }
  }
}

export default connect(mapStateToProps)(App);
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Button } from 'native-base';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { Screens } from '../constants';

// This screen contains details about fast poll and a sort of swiper for fast polls list
class ScreenC extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        region: {
        longitude: -70.23,
        latitude: -33.23,
        latitudeDelta: 9.22,
        longitudeDelta: 4.21,
      }
    }
  }

  onPress = (nextScreen) => {
    this.props.dispatch(ActionCreators.applicationActions.screenPush(nextScreen));
  }

  onRegionChange = region => this.setState({ region });

  render() {
    return(
      <View style={ styles.mainContainer }>
        { /* TITLE */}
        <View style={ styles.title }>
          <Text style={[ styles.text , { fontSize: 18, fontWeight: '600' }]}>{ 'Screen C' }</Text>
        </View>
        <View style={ styles.mapContainer}>
        <MapView
            zoomEnabled={true}
            region={this.state.region}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            onRegionChange={() => this.onRegionChange()}
        />
        </View>

        { /* PUSH SCREEN B BUTTON */}
        <Button style={ styles.button } onPress={ ()=>{ this.onPress(Screens.SCREEN1) }}>
          <Text style={ styles.text }>{ 'Go to screen A' }</Text>
        </Button>

        <Button style={ styles.button } onPress={ ()=>{ this.onPress(Screens.SCREEN2) }}>
          <Text style={ styles.text }>{ 'Go to screen B' }</Text>
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 5,
  },
  title: {
    maxWidth: '80%',
    alignSelf: 'center',
    marginBottom: 20
  },
  text: {
    fontFamily: 'Roboto',
    color: '#65696d',
    fontSize: 15,
    textAlign: 'center',
    alignSelf: 'center'
  },
  mapContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  button: {
    height: 40,
    backgroundColor: '#7dc7e0',
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  }
})

export default connect(()=>({}))(ScreenC);
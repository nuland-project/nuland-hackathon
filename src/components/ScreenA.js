import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'native-base';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { Screens } from '../constants';

// This screen contains details about fast poll and a sort of swiper for fast polls list
class ScreenA extends React.Component {
  constructor(props) {
    super(props)
  }

  onPress = (nextScreen) => {
    this.props.dispatch(ActionCreators.applicationActions.screenPush(nextScreen));
  }

  render() {
    return(
      <View style={ styles.mainContainer }>
        { /* TITLE */}
        <View style={ styles.title }>
          <Text style={[ styles.text , { fontSize: 18, fontWeight: '600' }]}>{ 'Screen A' }</Text>
        </View>

        { /* PUSH SCREEN B BUTTON */}
        <Button style={ styles.button } onPress={ ()=>{ this.onPress(Screens.SCREEN2) }}>
          <Text style={ styles.text }>{ 'Go to screen B' }</Text>
        </Button>

        { /* PUSH MAP SCREEN BUTTON */}
        <Button style={ styles.button } onPress={ ()=>{ this.onPress(Screens.SCREEN3) }}>
          <Text style={ styles.text }>{ 'Go to Map screen' }</Text>
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
    paddingHorizontal: 5
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

export default connect(()=>({}))(ScreenA);
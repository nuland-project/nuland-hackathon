import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Button } from 'native-base';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { Screens } from '../constants';
import { takePictureModule } from '../utils/nativeModules';

// This screen contains details about fast poll and a sort of swiper for fast polls list
class ScreenB extends React.Component {
  state = {
    image: '',
    imageW: 0,
    imageH: 0
  }
  constructor(props) {
    super(props)
  }

  // Push screen A
  onPress = (nextScreen) => {
    this.props.dispatch(ActionCreators.applicationActions.screenPush(nextScreen));
  }
  
  // Take a photo in base64 format
  takePicture = async () => {
    try {
      const res = await takePictureModule.takePicture();
      if (!res.cancel) {
        this.setState({ image: res.base64, imageW: res.width, imageH: res.height });
      } else { 
        this.setState({ image: '' })
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return(
      <View style={ styles.mainContainer }>
        { /* TITLE */}
        <View style={ styles.title }>
          <Text style={[ styles.text , { fontSize: 18, fontWeight: '600' }]}>{ 'Screen B' }</Text>
        </View>

        { /* IMAGE */}
        {this.state.image != '' &&
          <Image
            source={{ uri: 'data:image/png;base64,' + this.state.image }}
            style={[ styles.image, { width: 1.4 * this.state.imageW, height: 1.4 * this.state.imageH }]}>
          </Image>
        }
        
        { /* TAKE PICTURE BUTTON */}
        <Button style={[ styles.button, { backgroundColor: '#df9fbf' }]} onPress={ ()=>{ this.takePicture() }}>
          <Text style={ styles.text }>{ 'Take a photo' }</Text>
        </Button>

        { /* PUSH SCREEN A BUTTON */}
        <Button style={ styles.button } onPress={ ()=>{ this.onPress(Screens.SCREEN1) }}>
          <Text style={ styles.text }>{ 'Go to screen A' }</Text>
        </Button>

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
  image: {
    alignSelf: 'center',
    margin: 10
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
    marginVertical: 10,
    marginBottom: 10
  }
})

export default connect(()=>({}))(ScreenB);
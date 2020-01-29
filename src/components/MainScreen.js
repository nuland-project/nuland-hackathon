import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './Header';

// MainScreen of the App contains header and children components
export default class MainScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={ styles.container }>
        {/* HEADER */}
        <View style={ styles.header }>
          <Header/>
        </View>

        {/* OTHER COMPONENTS */}
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    height: 55,
    backgroundColor: '#356fba',
    borderColor: '#87a1c1',
    borderBottomWidth: 1,
    justifyContent: 'center',
    paddingLeft: 10
  }
})

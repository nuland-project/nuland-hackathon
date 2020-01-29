import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import Icon from 'react-native-vector-icons/AntDesign';

const mapStateToProps = (state) => ({
  screenStackLength: state.application.navStack.length,
  balance: state.identity.balance,
  karma: state.identity.karma
})

// This component is placed in header of AuthedScreen
class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  // Callback for onPress props in upr back arrow button
  onPressButton = () => {
    this.props.dispatch(ActionCreators.applicationActions.screenPop());
  }

  render() {
    return (
      <View style={ styles.header } >
        {/* BACK ACTION ARROW */}
        {(this.props.screenStackLength > 1) &&
          <TouchableOpacity style={ styles.backArrowContainer } onPress={ this.onPressButton }>
            <Icon style={ styles.arrowIcon } name='arrowleft' size={ 24 } />
          </TouchableOpacity>
        }

        {/* BALANCES */}
        <View style={ styles.infoView }>
          <Text style={ styles.text }>{ 'NLD: ' + this.props.balance }</Text>
          <Text style={ styles.text }>{ 'Karma: ' + this.props.karma }</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header:{
    flexDirection: 'row',
    alignItems: 'center'
  },
  infoView: {
    paddingHorizontal: 10
  },
  backArrowContainer: {
    backgroundColor: '#bfdfff',
    width: 36,
    height: 36,
    borderRadius: 36,
    justifyContent: 'center'
  },
  arrowIcon: {
    alignSelf: 'center'
  },
  text: {
    fontFamily: 'Roboto',
    color: '#bfdfff',
    fontSize: 15
  }
})

export default connect(mapStateToProps)(Header);
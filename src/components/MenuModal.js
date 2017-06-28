import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { inject, observer } from 'mobx-react';

import MenuModalStyle from '../styles/MenuModalStyle';

@inject('appStore') @observer
export default class MenuModal extends React.Component {
  static propTypes = {
    appStore: PropTypes.shape({
      aboutModal: PropTypes.object,
      gameModal: PropTypes.object,
      nav: PropTypes.object.isRequired,
      scoreGame: PropTypes.func.isRequired,
    }).isRequired,
  }
  render() {
    const {
      aboutModal,
      gameModal,
      nav,
      scoreGame,
    } = this.props.appStore;
    const {
      container,
      divider,
      line,
      text,
    } = MenuModalStyle;
    return (
      <View style={container}>
        <View style={divider} />
        <TouchableOpacity
          onPress={() => {
            gameModal.close();
            nav.goto('New');
          }}
          style={line}
        >
          <Text style={text}>
            New Game
          </Text>
        </TouchableOpacity>
        <View style={divider} />
        <TouchableOpacity
          onPress={() => {
            gameModal.close();
            scoreGame();
          }}
          style={line}
        >
          <Text style={text}>
            Score This Game
          </Text>
        </TouchableOpacity>
        <View style={divider} />
        <TouchableOpacity
          onPress={() => {
            gameModal.close();
            aboutModal.open();
          }}
          style={line}
        >
          <Text style={text}>
            About Word Grid
          </Text>
        </TouchableOpacity>
        <View style={divider} />
      </View>
    );
  }
}

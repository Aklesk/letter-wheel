import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { inject, observer } from 'mobx-react';
import { SegmentedControls } from 'react-native-radio-buttons';
import CheckBox from 'react-native-checkbox';
import Button from 'react-native-button';

import WrapperStyle from '../styles/WrapperStyle';
import NewScreenStyle from '../styles/NewScreenStyle';

const options = [
  {
    label: '1-49\nWords',
    min: 1,
    max: 49,
    value: 0,
  },
  {
    label: '50-99\nWords',
    min: 50,
    max: 99,
    value: 1,
  },
  {
    label: '100+\nWords',
    min: 100,
    max: 999,
    value: 2,
  },
];

@inject('appStore') @observer
export default class NewScreen extends React.Component {
  static propTypes = {
    appStore: PropTypes.shape({
      instructionsModal: PropTypes.object,
      loading: PropTypes.bool.isRequired,
      nav: PropTypes.shape({
        goto: PropTypes.func.isRequired,
      }).isRequired,
      newGame: PropTypes.func.isRequired,
      newGameOptions: PropTypes.shape({
        timed: PropTypes.bool.isRequired,
        wordSelection: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
  }
  setSelectedOption = (wordSelection) => {
    const { newGameOptions } = this.props.appStore;
    Object.assign(newGameOptions, {
      wordSelection: wordSelection.value,
    });
  }
  toggleTimed = () => {
    const { newGameOptions } = this.props.appStore;
    Object.assign(newGameOptions, {
      timed: !newGameOptions.timed,
    });
  }
  start = () => {
    const { appStore } = this.props;
    const start = new Date().getTime();
    this.props.appStore.loading = true;
    appStore.newGame({
      wordsMin: options[appStore.newGameOptions.wordSelection].min,
      wordsMax: options[appStore.newGameOptions.wordSelection].max,
      timer: appStore.newGameOptions.timed ? -1 : undefined,
    })
      .then(() => {
        // Wait a minimum of 500ms to help the loading screen feel right
        const end = new Date().getTime();
        setTimeout(() => {
          appStore.nav.goto('Game');
          this.props.appStore.loading = false;
        }, (500 - (end - start)));
      });
  }
  render() {
    const {
      start,
      setSelectedOption,
      toggleTimed,
    } = this;
    const {
      timed,
      wordSelection,
    } = this.props.appStore.newGameOptions;
    const { instructionsModal } = this.props.appStore;
    const tint = '#555';
    return (
      <View style={WrapperStyle.container}>
        <View style={NewScreenStyle.header}>
          <Text style={NewScreenStyle.headerText}>
            NEW GAME
          </Text>
        </View>
        <View style={NewScreenStyle.body}>
          <View style={NewScreenStyle.menuRow}>
            <View style={NewScreenStyle.words}>
              <SegmentedControls
                containerBorderTint={tint}
                containerStyle={NewScreenStyle.wordContainer}
                extractText={option => option.label}
                onSelection={setSelectedOption}
                options={options}
                optionStyle={NewScreenStyle.wordItems}
                selectedIndex={wordSelection}
                separatorTint={tint}
                style={{ flex: 1 }}
                tint={tint}
              />
            </View>
          </View>
          <View style={NewScreenStyle.menuRow}>
            <View style={NewScreenStyle.timer}>
              <CheckBox
                label={'Timed Game:'}
                labelBefore
                labelStyle={NewScreenStyle.timerLabel}
                checked={timed}
                onChange={toggleTimed}
              />
            </View>
          </View>
          <View style={NewScreenStyle.menuRow}>
            <View style={NewScreenStyle.buttonWrapper}>
              <Button
                style={NewScreenStyle.buttons}
                onPress={() => {
                  instructionsModal.close();
                  instructionsModal.open();
                }}
              >
                Instructions
              </Button>
              <View style={{ flex: 1 }} />
              <Button
                style={NewScreenStyle.buttons}
                onPress={start}
              >
                Start Game
              </Button>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

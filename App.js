import React from 'react'
import { StyleSheet, View, TextInput, Text, Button } from 'react-native'
// require('es6-promise').polyfill();
// import fetch from 'isomorphic-fetch'

export default class App extends React.Component {
  state = {
    number: null,
    text: null,
    showResult: false
  }

  onPressWhatNumber = (e, isRandom) => {
    let {
      number
    } = this.state

    if (!number && !isRandom) {
      this.setState({
        text: 'Please fill with a valid number'
      })
      return
    }

    if (isRandom) {
      number = 'rand'
    }

    fetch(`https://nummern.herokuapp.com/?number=${number}`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState(Object.assign(responseJson, {showResult: true}))
        return responseJson
      })
      .catch((error) => {
        console.error(error)
      })
  }

  render () {
    const {
      showResult,
      text,
      number
    } = this.state

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='Your number here!'
          value={number && number.toString()}
          onChangeText={(text) => this.setState({ number: text })}
        />

        {text && <Text style={styles.numberText}>{text}</Text>}

        <View style={styles.buttonContainer}>
          <Button
            onPress={this.onPressWhatNumber}
            style={styles.button}
            title={text ? 'Try again' : 'Find your number'}
            accessibilityLabel='Click me to find your number'
          />
          <Button
            onPress={(event) => this.onPressWhatNumber(event, 'rand')}
            value={'random'}
            style={styles.button}
            title={'Feeling luck'}
            accessibilityLabel='Click me to find your number'
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginTop: 48
  },
  numberText: {
    height: 36,
    // marginTop: 12,
    marginBottom: 36,
    fontSize: 24
  },
  input: {
    // height: '50%',
    width: '100%',
    textAlign: 'center',
    // padding: '50%',
    // backgroundColor: 'black',
    fontSize: 48,
    marginBottom: 48
  }
})

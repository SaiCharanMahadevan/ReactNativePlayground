'use strict';
import React, { Component } from 'react';
import { Navigator, AppRegistry, Text, View, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 75,
    alignItems: 'center'
  },
  image: {
    width: 107,
    height: 165,
    padding: 10
  },
  description: {
    fontSize: 15,
    color: '#656565',
    padding: 10
  }
})
export default class BookDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const imageURI = this.props.image ? this.props.image : '';
    const description = this.props.description ? this.props.description : '';
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{uri : imageURI}}/>
        <Text style={styles.description}>{description}</Text>
      </View>
    );
  }
}
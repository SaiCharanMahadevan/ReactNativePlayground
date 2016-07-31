'use strict';
import React, { Component } from 'react';
import { NavigatorIOS, AppRegistry, Text, View, StyleSheet } from 'react-native';

import FeaturedList from './FeaturedList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20
  },
  description: {
    fontSize: 20,
    backgroundColor: '#fff'
  }
});

export default class Featured extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          component: FeaturedList,
          title: 'Featured List'
        }}/>
    );
  }
}
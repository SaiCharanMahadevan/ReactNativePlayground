'use strict';
import React, { Component } from 'react';
import { NavigatorIOS, AppRegistry, Text, View, StyleSheet } from 'react-native';

import SearchBooks from './SearchBooks';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
});

export default class Search extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          component: SearchBooks,
          title: 'Search Books'
        }}/>
    );
  }
}
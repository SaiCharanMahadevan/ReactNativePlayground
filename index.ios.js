'use strict';
import React, { Component } from 'react';
import { NavigatorIOS, AppRegistry, Text, View, StyleSheet, TabBarIOS } from 'react-native';

import Featured from './BookSearchApp/Featured';
import Search from './BookSearchApp/Search';

class BookSearchApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'featured'
    }
  }
  render() {
    return (
      <TabBarIOS
        selectedTab={this.state.selectedTab}>
        <TabBarIOS.Item
          title="Featured"
          icon={{uri:'featured'}}
          selected={this.state.selectedTab === 'featured'}
          onPress ={() => {
            this.setState({
              selectedTab: 'featured'
            });
          }}>
          <Featured/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Search"
          icon={{uri:'search'}}
          selected={this.state.selectedTab === 'search'}
          onPress ={() => {
            this.setState({
              selectedTab: 'search'
            });
          }}>
          <Search/>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

AppRegistry.registerComponent('ReactNativePlayground', () => BookSearchApp);
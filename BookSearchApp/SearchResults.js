'use strict';
import React, { Component } from 'react';
import _ from 'lodash';
import { ListView, Image, ActivityIndicator,
  TouchableHighlight, TextInput, Navigator, AppRegistry, Text, View, StyleSheet } from 'react-native';

import BookDetail from './BookDetail';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    marginBottom: 8
  },
  author: {
    color: '#656565'
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  listView: {
    backgroundColor: '#F5FCFF'
  },
  cellContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10
  },
  thumbnail: {
    width: 53,
    height: 81,
    marginRight: 10
  },
  rightContainer: {
    flex: 1
  }
});

export default class SearchResults extends Component {
  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource(
      {rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.books)
    };
  }

  showBookingDetail(image, volumeinfo) {
    this.props.navigator.push({
      title: volumeinfo.tile,
      component: BookDetail,
      passProps: { image: image, description: _.get(volumeinfo, 'description', 'N/A')}
    })
  }
  
  renderBook(book) {
    const volumeinfo = book.volumeInfo;
    const imageURI = _.get(book.volumeInfo.imageLinks, 'thumbnail', '');
    let processedThumbnail = '';
    if (!_.isEmpty(imageURI)) {
      processedThumbnail = imageURI.split(':/');
      processedThumbnail = `${processedThumbnail[0]}s:/${processedThumbnail[1]}`;
    }

    return (
      <TouchableHighlight
        onPress={() => this.showBookingDetail(processedThumbnail, volumeinfo)}
        underlayColor='#dddddd'>
        <View>
          <View style={styles.cellContainer}>
            <Image style={styles.thumbnail} source={{uri: processedThumbnail}}/>
            <View style={styles.rightContainer}>
              <Text style={styles.title}>
                {volumeinfo.title}
              </Text>
              <Text style={styles.authors}>
                {volumeinfo.authors}
              </Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderBook.bind(this)}
        style={styles.listView}/>
    );
  }
}
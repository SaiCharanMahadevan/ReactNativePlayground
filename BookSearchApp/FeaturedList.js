'use strict';
import React, { Component } from 'react';
import _ from 'lodash';
import { Navigator, AppRegistry, Text, View, StyleSheet,
  Image, ListView, TouchableHighlight, ActivityIndicator } from 'react-native';

import BookDetail from './BookDetail';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    backgroundColor: '#ddd'
  },
  listView: {
    backgroundColor: '#F5FCFF'
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const REQUEST_URL = 'https://www.googleapis.com/books/v1/volumes?q=subject:fiction';

export default class FeaturedList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.items),
          isLoading: false
        });
      })
      .done();
  }

  showBookingDetail(book, image, volumeinfo) {
    this.props.navigator.push({
      title: volumeinfo.tile,
      component: BookDetail,
      passProps: { book: book, image: image, description: volumeinfo.description }
    })
  }

  renderBooks(book) {
    const imageURI = _.get(book.volumeInfo.imageLinks, 'thumbnail', '');
    let processedThumbnail = imageURI.split(':/');
    processedThumbnail =`${processedThumbnail[0]}s:/${processedThumbnail[1]}`;
    const volumeinfo = _.get(book, 'volumeInfo', 'N/A');
    return (
      <TouchableHighlight
        onPress={() => this.showBookingDetail(book, processedThumbnail, volumeinfo)}
        underlayColor='#dddddd'>
        <View>
          <View style={styles.container}>
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

  renderLoadingView() {
    return (
      <View>
        <ActivityIndicator size="large"/>
        <Text>loading books ...</Text>
      </View>
    )
  }

  render() {
    if (this.state.isLoading) {
      return this.renderLoadingView();
    }

    console.log(this.state.dataSource);
    return (
      <ListView
        style={styles.listView}
        dataSource={this.state.dataSource}
        renderRow={this.renderBooks.bind(this)}
      />
    );
  }
}
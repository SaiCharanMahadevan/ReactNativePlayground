'use strict';
import React, { Component } from 'react';
import { ActivityIndicator, TouchableHighlight,
  TextInput, Navigator, AppRegistry, Text, View, StyleSheet } from 'react-native';
import _ from 'lodash';

import SearchResults from './SearchResults';

const styles = StyleSheet.create({
  container: {
    marginTop: 65,
    padding: 10
  },
  button: {
    height: 36,
    backgroundColor: '#f39c12',
    borderRadius: 8,
    justifyContent: 'center',
    marginTop: 15
  },
  buttonText: {
    justifyContent: 'center',
    color: '#fff',
    alignSelf: 'center'
  },
  textInput: {
    marginTop: 10,
    marginBottom: 10,
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#656565',
    padding: 10,
    fontSize: 15
  },
  errorMessage: {
    fontSize: 15,
    alignSelf: 'center',
    marginTop: 15,
    color: 'red'
  }
});
const GOOGLE_API = 'https://www.googleapis.com/books/v1/volumes?q=';

export default class SearchBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      bookTitle: '',
      bookAuthor: '',
      errorMessage: ''
    }
  }

  bookTitleInput(event) {
    this.setState({ bookTitle: event.nativeEvent.text });
  }

  bookAuthorInput(event) {
    this.setState({ bookAuthor: event.nativeEvent.text });
  }

  searchBooks() {
    this.fetchData();
  }

  fetchData() {
    this.setState({
      isLoading: true
    });

    let baseURL = GOOGLE_API;
    if (!_.isEmpty(this.state.bookAuthor)) {
      baseURL += encodeURIComponent('inauthor:' + this.state.bookAuthor);
    }

    if (!_.isEmpty(this.state.bookTitle)) {
      baseURL += _.isEmpty(this.state.bookAuthor) ? encodeURIComponent('intitle:' + this.state.bookTitle) : encodeURIComponent('+intitle:' + this.state.bookTitle);
    }

    fetch(baseURL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({ isLoading: false });
        if (responseData.items) {
          this.props.navigator.push({
            title: 'Search Results',
            component: SearchResults,
            passProps: {books: responseData.items}
          })
        }
      })
      .catch((error) =>
        this.setState({
          isLoading: false,
          errorMessage: error
        }))
      .done();
  }

  render() {
    const spinner = this.state.isLoading ?
      (<View>
        <ActivityIndicator size="large"/>
        <Text>loading books ...</Text>
      </View>) : (<View />);

    return (
      <View style={styles.container}>
        <Text
          style={{ marginBottom: 20, fontSize: 18, alignSelf: 'center'}}>
          Search by book title and/or author
        </Text>
        <Text>
          Book Title:
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder="Type the book title here"
          onChange={this.bookTitleInput.bind(this)}/>
        <Text>
          Author:
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder="Type the author here"
          onChange={this.bookAuthorInput.bind(this)}/>
        <TouchableHighlight
          style={styles.button}
          underlayColor='#f1c40f'
          onPress={this.searchBooks.bind(this)}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableHighlight>
        {spinner}
        <Text style={styles.errorMessage}>
          {this.state.errorMessage}
        </Text>
      </View>
    );
  }
}
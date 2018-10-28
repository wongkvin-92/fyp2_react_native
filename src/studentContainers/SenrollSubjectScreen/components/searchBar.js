import React from 'react';
import {
  Text,
  View,
  Image,
  Platform,
  StyleSheet,
} from 'react-native';


import {
  Card, Button, SearchBar
} from 'react-native-elements';


const styles = StyleSheet.create({
  searchBar:{

  },
})

export const SearchSubject = () => (
  <View>
    <SearchBar
      placeholder="Search Subject..."
      round
      containerStyle={styles.searchBar}
      autoCorrect={false}
    />
  </View>
)

export default SearchSubject;

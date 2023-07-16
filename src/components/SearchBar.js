import React from 'react';
import {View, StyleSheet, TextInput, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../styles/styles';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SearchBar = ({containerStyle, value, onClear, onChangeText}) => {
  return (
    <View style={[styles.container, {...containerStyle}]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={styles.searchBar}
        placeholder="Ara"
        placeholderTextColor={'grey'}
      />
      {value ? (
        <Icon
          name="close"
          size={20}
          color={'white'}
          onPress={onClear}
          style={styles.clearIcon}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    height: windowHeight * 0.06,
    borderRadius: 40,
    paddingLeft: windowWidth * 0.03,
    fontSize: windowHeight * 0.02,
  },
  container: {
    justifyContent: 'center',
    minHeight:48,
  },
  clearIcon: {
    position: 'absolute',
    right: windowWidth * 0.02,
  },
});

export default SearchBar;

import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors, formStyles} from '../styles/styles';
import {useNavigation} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const Header = ({text, info, fontstyle, fontWeight, color}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
      }}>
      <TouchableOpacity onPress={() => navigation.pop()} style={{
    minHeight: 48, // Yeni değer: 48dp veya daha büyük
    minWidth: 48, // Yeni değer: 48dp veya daha büyük
    justifyContent: 'center',
    alignItems: 'center',
  }}>
        <Icon name={'arrow-left'} size={30} color={color} />
      </TouchableOpacity>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            color: color,
            textAlign: 'center',
            fontSize: 28,
            fontWeight: fontWeight,
            fontStyle: fontstyle,
          }}>
          {text}
        </Text>
      </View>
      {info && (
        <TouchableOpacity
          onPress={() => navigation.navigate('info')}
          style={{
            minHeight: 48, // Yeni değer: 48dp veya daha büyük
    minWidth: 48,
            backgroundColor: 'yellow',
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: colors.color1,
              fontSize: windowHeight * 0.02,
              fontWeight: '800',
              textAlign: 'center',
            }}>
            i
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

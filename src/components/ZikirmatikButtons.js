import { View, TouchableOpacity, Text } from 'react-native';
import React from 'react';

export const ZikirmatikButtons = ( {
  backgroundColor,
  width,
  height,
  onPress,
  display,
  text,
  artir,

}) => {
  return (

    <View  accessible={true}
    accessibilityLabel="Kaydet">
      {artir ? null : (
      <Text style={{color:'white',alignSelf:'center',marginBottom:5}} >
        {text}

      </Text>)}


      <TouchableOpacity
        onPress={onPress}
        style={{

          display: display,
          width: width,
          height: height,
          borderRadius: 60,
          backgroundColor: backgroundColor
        }}
        accessible={true}
        accessibilityLabel="Kaydet"
      >

      </TouchableOpacity>

    </View>
    // <TouchableOpacity
    // onPress={onPress}
    //   style={{
    //     position: 'absolute',
    //     bottom: bottom,
    //     right: right,
    //     display: display,
    //     width:width,
    //     height:height,
    //     borderRadius:60,
    //     backgroundColor:backgroundColor
    //   }}
    //   accessible={true}
    //   accessibilityLabel="Kaydet"
    // >

    // </TouchableOpacity>





    // <TouchableOpacity
    //   onPress={onPress}
    //   style={{
    //     position: 'absolute',
    //     bottom: bottom,
    //     right: right,
    //     display: display,
    //   }}
    //   accessible={true}
    //   accessibilityLabel="Kaydet"
    //   >
    //   <View
    //     style={{
    //       width: width,
    //       height: height,
    //       borderRadius: 60,
    //       backgroundColor: backgroundColor,
    //     }}></View>
    // </TouchableOpacity>
  );
};

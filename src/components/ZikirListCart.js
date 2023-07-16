import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import React from 'react';
import {colors} from '../styles/styles';
import {useZikirler} from '../contexts/Contexts';

const formatDate = ms => {
  const date = new Date(ms);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hrs = date.getHours();
  const min = date.getMinutes();

  return ` ${hrs}:${min}  -  ${day}/${month}/${year} `;
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ZikirListCart = ({
  count,
  zikirIsmi,
  handlerClearZikir,
  time,
  id,
  handleContinue,
}) => {
  const {devam, setDevam} = useZikirler();
  return (
    <View
      style={{
        flex:1,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginTop: windowHeight * 0.01,
        width: '100%',
        borderColor: colors.color2,
        borderWidth: 1,
        borderRadius: 15,
        paddingHorizontal: '2%',
        paddingVertical: '2%',
      }}>
      {/* time  */}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <Text style={{color: colors.color2}}>{formatDate(time)}</Text>
      </View>

      {/* count,zikir ismi */}

      <View
        style={{
          backgroundColor:'pink',
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          height: windowHeight*0.1,
        }}>
        <View
          style={{
            width: windowHeight * 0.08,
            height: windowHeight * 0.08,
            borderRadius: 50,
            marginRight: '2%',
            justifyContent: 'center',
            backgroundColor: colors.color10,
            elevation: 20,
          }}>
          <Text
            style={{
              fontSize: windowHeight * 0.03,
              textAlign: 'center',
              color: colors.color2,
            }}>
            {count}
          </Text>
        </View>

        <Text
          style={{
            fontStyle: 'italic',
            fontSize: windowHeight * 0.02,
            color: colors.color2,
            paddingRight: windowHeight * 0.09,
          }}>
          {zikirIsmi}
        </Text>
      </View>

      {/* sil ve devam et butonları */}

      <View
        style={{
      backgroundColor:'red',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'flex-end',
          minHeight:48
        }}>
        <TouchableOpacity
          onPress={() => handlerClearZikir(id)}
          style={{
            backgroundColor: colors.color4,
            borderColor: colors.color10,
            borderWidth: 1,
            width: '17%',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
            borderRadius: 15,
          }}>
          <Text
            style={{
              fontSize: windowHeight * 0.02,
              fontWeight: '400',
              color: colors.color2,
            }}>
            Sil
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleContinue(count, id, zikirIsmi, time)}
          style={{
            backgroundColor: colors.color10,
            width: windowWidth * 0.4,
            minHeight: 48, 
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15,
          }}>
          <Text
            style={{
              fontSize: windowHeight * 0.02,
              fontWeight: '400',
              color: colors.color2,
            }}>
            {devam === id ? 'Devam Ediliyor' : 'Devam Et'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ZikirListCart;

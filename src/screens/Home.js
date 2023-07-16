import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { colors } from '../styles/styles';
import { ZikirmatikButtons } from '../components/ZikirmatikButtons';
import SaveModal from '../components/SaveModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useZikirler } from '../contexts/Contexts';
import { useRoute } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const Home = ({ navigation }) => {
  const route = useRoute();

  const [modalVisible, setModalVisible] = useState(false);
  const [tema, setTema] = useState(0);
  const {
    zikirler,
    setZikirler,
    zikirIsmi,
    setZikirIsmi,
    count,
    setCount,
    devam,
    setDevam,
  } = useZikirler();

  const resimKaynaklari = [
    require('../assets/1.jpeg'),
    require('../assets/2.jpeg'),
    require('../assets/3.jpeg'),
    require('../assets/4.jpeg'),
    require('../assets/5.jpeg'),
  ];

  const temaHandler = () => {
    if (tema < resimKaynaklari.length - 1) {
      setTema(tema + 1);
    } else {
      setTema(0);
    }
  };

  const ZikirlerHandler = async () => {
    navigation.navigate('zikirlerim');
  };

  const SaveHandler = () => {
    setModalVisible(true);
  };

  const ResetHandler = () => {
    if (devam) {
      setDevam(false);
      setCount(0);
    }
    setCount(0);
  };

  const ArtırHandler = () => {
    setCount(count + 1);

    if (count == 9999) {
      setCount(0);
    }
  };

  const handleTextChange = text => {
    if (text.length <= 4) {
      setCount(parseInt(text));
    } else {
    }
  };

  const handleOnSubmit = async (zikirIsmi, count) => {
    const result = await AsyncStorage.getItem('zikirler');
    let zikirlerr = [];
    if (result !== null) zikirlerr = JSON.parse(result);

    const zikir = { id: Date.now(), zikirIsmi, count, time: Date.now() };

    const existingZikir = zikirlerr.find(
      zikir => zikir.zikirIsmi === zikirIsmi,
    );
    if (existingZikir) {
      return Alert.alert(
        'Uyarı',
        'Aynı isimde bir zikir zaten listenizde bulunuyor.',
        [
          {
            text: 'OK',
            onPress: () => setModalVisible(false),
          },
        ],
        {
          cancelable: true,
        },
      );
    } else {
      const updatedZikirler = [...zikirler, zikir];
      setZikirler(updatedZikirler);
      await AsyncStorage.setItem('zikirler', JSON.stringify(updatedZikirler));
      setCount(0);
    }
  };

  const uzerineKaydet = async () => {
    const { id } = route.params;
    const result = await AsyncStorage.getItem('zikirler');
    let zikirler = [];
    if (result !== null) zikirler = JSON.parse(result);

    const zikirlerNew = zikirler.filter(n => {
      if (n.id === id) {
        n.count = count;
        n.time = Date.now();
      }
      return n;
    });

    setZikirler(zikirlerNew);
    await AsyncStorage.setItem('zikirler', JSON.stringify(zikirlerNew));
    setDevam(false);
    setCount(0);
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',

      }}>
      <Image
        style={{
          position: 'absolute',
          zIndex: -1,
          flex: 1,
          height: windowHeight * 1,
          width: windowWidth * 1,
        }}
        source={resimKaynaklari[tema]}
      />
      {/* Üst Butonlar */}
      <View
        style={{
          zIndex: 1,
          position: 'absolute',
          flexDirection: 'row',
          flex: 1,
          justifyContent: `${devam ? 'space-between' : 'center'}`,
          alignItems: 'center',
          marginTop: windowHeight * 0.02,
          width: windowWidth * 0.9,
          height: windowHeight * 0.05,
        }}
        accessible={true}
        accessibilityLabel="Kaydet">



        {/* Üzerine Kaydet butonu */}

        {devam ? (
          <TouchableOpacity
            onPress={uzerineKaydet}
            style={{
              borderBottomRightRadius: 15,
              borderTopLeftRadius: 15,
              elevation: 20,
              width: windowWidth * 0.44,
              minHeight:48,
              backgroundColor: colors.color1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: windowHeight * 0.01,
            }}
            accessible={true}
            accessibilityLabel="Kaydet"
          >
            <Text
              style={{
                fontSize: windowHeight * 0.022,
                color: 'white',
                fontWeight: '400',
                fontStyle: 'italic',
              }}>
              Üzerine Kaydet
            </Text>
          </TouchableOpacity>
        ) : null}

        {/* Zikirlerim butonu */}
        <TouchableOpacity
          onPress={ZikirlerHandler}
          style={{
            borderBottomRightRadius: 15,
            borderTopLeftRadius: 15,
            elevation: 20,
            width: windowWidth * 0.44,
            minHeight:48,

            backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          accessible={true}
          accessibilityLabel="Kaydet"
        >
          <Text
            style={{
              fontSize: windowHeight * 0.022,
              color: 'white',
              fontWeight: '400',
              fontStyle: 'italic',
            }}>
            Zikirlerim
          </Text>
        </TouchableOpacity>
      </View>

      {/* Zikirmatik resim */}
      <View
        style={{
          flex: 1,
          width: windowWidth * 1,
          height: windowHeight * 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
        }}
        accessible={true}
        accessibilityLabel="Kaydet">
        <Image
          style={{
            width: '65%',
            height: '100%',
          }}
          source={require('../assets/zikirmatik2.png')}
          resizeMode="contain"
        />
      </View>


      {/*  ekran içi */}
      <View style={{width: windowWidth * 0.4, height: windowHeight * 0.3, bottom: windowHeight * 0.35, position: 'absolute' }}>

        {/* Dijital ekran  */}
        <View
          style={{
            backgroundColor: 'gray',
          
            minWidth: 48, // Yeni değer: 48dp veya daha büyük
            height: windowHeight * 0.07,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '3%'

          }}
          accessible={true}
          accessibilityLabel="Kaydet">
          <TextInput
            style={{
              textAlign: 'center',
              color: 'red',
              fontSize: windowHeight * 0.03,
              fontWeight: '700',
            }}
            maxLength={4}
            onChangeText={handleTextChange}
            value={count.toString()}
            editable={false}
          />
        </View>

        {/* Kaydet-Reset butonu  */}

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>


          <ZikirmatikButtons text=  {devam ? '' : 'Kaydet'} backgroundColor={colors.color1}
            width={windowHeight * 0.06}
            height={windowHeight * 0.06}
            display={`${devam ? 'none' : 'flex'}`}
            onPress={SaveHandler}
            artir={false}
          />

          <ZikirmatikButtons text={'Sıfırla'} backgroundColor={colors.color7}
            width={windowHeight * 0.06}
            height={windowHeight * 0.06}
s            onPress={ResetHandler}
            artir={false}
          />
        </View>

        {/*Artır butonu */}
        <View style={{ justifyContent: 'center', alignItems: 'center' }} >

          <ZikirmatikButtons
            onPress={ArtırHandler}
            backgroundColor={colors.color2}
            width={windowWidth * 0.3}
            height={windowHeight * 0.10}

          />
        </View>



      </View>


     
      {/* Modal */}
      <SaveModal
        modalVisible={modalVisible}
        zikirIsmi={zikirIsmi}
        setZikirIsmi={setZikirIsmi}
        count={count}
        setCount={setCount}
        onSubmit={handleOnSubmit}
        onClose={() => setModalVisible(false)}
      />

      {/* Tema butonu */}

      <View
        style={{
          backgroundColor: 'red',
          width: windowWidth * 0.15,
          height: windowHeight * 0.03,
          justifyContent: 'center',
          alignItems: 'center',
          borderTopLeftRadius: 5,
          borderBottomRightRadius: 5,
          zIndex: 2,
          position: 'absolute',
          bottom: windowHeight * 0.1,
        }}
        accessible={true}
        accessibilityLabel="Kaydet">
        <Text
          style={{
            fontSize: windowHeight * 0.02,
            fontWeight: '500',
            color: 'white', 
            textAlign: 'center',
          }}>
          Tema
        </Text>
      </View>
      <TouchableOpacity
        onPress={temaHandler}
        style={{
          width: windowWidth * 0.2,
          height: windowHeight * 0.08,
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2,
          bottom: '1%',
        }}
        accessible={true}
        accessibilityLabel="Kaydet"
      >
        <Image
          source={require('../assets/tema_icon.png')}
          style={{ width: windowWidth * 0.15, height: windowHeight * 0.09 }}
        />
      </TouchableOpacity>
    </View>
  );
};

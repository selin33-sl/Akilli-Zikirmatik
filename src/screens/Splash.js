import React, { useEffect } from 'react';
import { Image, View, ImageBackground, Text, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Timer'ı burada başlatın ve belirli bir süre sonra ana sayfaya yönlendirin
    const timer = setTimeout(() => {
      navigation.replace('home'); // Yönlendirme işlemi
    }, 3000); // 3 saniye sonra ana sayfaya yönlendirilecek

    return () => clearTimeout(timer); // Timer'ı temizleme
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('../assets/1.jpeg')}
        style={{
          width: '100%', height: '100%',
        }}>
        <View
          style={{
            alignItems: 'center',
            marginTop: windowHeight * 0.2,
          }}>
          <Text
            style={{
              fontSize: 28,
              fontStyle: 'italic',
              color: 'white',
              textShadowColor: 'black',
            }}>
            Pengona Yazılım
          </Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Image
            source={require('../assets/splash.png')}
            style={{ width: '45%', height: '40%' }}
            resizeMode="contain"
          />
        </View>

        <View
          style={{
            alignItems: 'center',
            marginBottom: windowHeight * 0.2,
          }}>
          <Text
            style={{
              fontSize: 28,
              fontWeight: 'bold',
              color: 'white',
              elevation: 10,

            }}
            accessible={true}
            accessibilityLabel="ZİKİRMATİK">
            ZİKİRMATİK
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SplashScreen;

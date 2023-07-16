import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from '../screens/Home';
import {Zikirlerim} from '../screens/Zikirlerim';
import ZikirProvider from '../contexts/Contexts';
import Info from '../screens/Info';
import SplashScreen from '../screens/Splash';

const Stack = createNativeStackNavigator();

export const Route = () => {
  return (
    <NavigationContainer>
      <ZikirProvider>
        <Stack.Navigator
          initialRouteName="splashscreen"
          screenOptions={{headerShown: false}}>
          <Stack.Group>
            <Stack.Screen name="splashscreen" component={SplashScreen} />
            <Stack.Screen name="home" component={Home} />
            <Stack.Screen name="zikirlerim" component={Zikirlerim} />
            <Stack.Screen name="info" component={Info} />
          </Stack.Group>
        </Stack.Navigator>
      </ZikirProvider>
    </NavigationContainer>
  );
};

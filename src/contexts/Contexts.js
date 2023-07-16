import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useContext, useEffect, useState} from 'react';

const ZikirContext = createContext();
const ZikirProvider = ({children}) => {
  const [zikirler, setZikirler] = useState([]);
  const [zikirIsmi, setZikirIsmi] = useState('');
  const [count, setCount] = useState(0);
  const [devam, setDevam] = useState(false);
  const [devamEdenler, setDevamEdenler] = useState([]);

  const findZikirler = async () => {
    const result = await AsyncStorage.getItem('zikirler');
    if (result !== null) setZikirler(JSON.parse(result));
  };

  useEffect(() => {
    findZikirler();
  }, []);

  return (
    <ZikirContext.Provider
      value={{
        zikirler,
        setZikirler,
        zikirIsmi,
        setZikirIsmi,
        count,
        setCount,
        findZikirler,
        devam,
        setDevam,
        devamEdenler,
        setDevamEdenler,
      }}>
      {children}
    </ZikirContext.Provider>
  );
};

export const useZikirler = () => useContext(ZikirContext);

export default ZikirProvider;

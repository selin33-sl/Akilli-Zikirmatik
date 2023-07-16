import {View, Text, TouchableOpacity, FlatList, Modal} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../styles/styles';
import {Header} from '../components/Header';
import ZikirListCart from '../components/ZikirListCart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchBar from '../components/SearchBar';
import {useZikirler} from '../contexts/Contexts';
import {useNavigation} from '@react-navigation/native';
import NotFound from '../components/NotFound';

export const Zikirlerim = () => {
  const {
    zikirler,
    zikirIsmi,
    setZikirIsmi,
    count,
    setCount,
    setZikirler,
    findZikirler,
    setDevam,
    devam,
  } = useZikirler();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [resultNotFound, setResultNotFound] = useState(false);
  const [filteredZikirler, setFilteredZikirler] = useState(zikirler);
  const [modalVisible, setModalVisible] = useState(false); // Modal görünürlük state'i
  const [selectedZikirId, setSelectedZikirId] = useState(null); // Silinecek zikirin ID'si

  const handleContinue = (count, id, zikirIsmi, time) => {
    setDevam(id);
    navigation.navigate('home', {count, id: id, zikirIsmi, time});

    setCount(count);
  };

  useEffect(() => {
    findZikirler();
  }, []);

  const handleClearZikir = async (id) => {
    setSelectedZikirId(id);
    setModalVisible(true);
  };

  const handleConfirmClear = async () => {
    const result = await AsyncStorage.getItem('zikirler');
    let zikirler = [];
    if (result !== null) zikirler = JSON.parse(result);

    const newZikirler = zikirler.filter(n => n.id !== selectedZikirId);
    setZikirler(newZikirler);
    setFilteredZikirler(newZikirler);
    await AsyncStorage.setItem('zikirler', JSON.stringify(newZikirler));

    setModalVisible(false);
  };

  const handleCancelClear = () => {
    setModalVisible(false);
  };


  // const handlerClearZikir = id => {
  //   Alert.alert(
  //     'Uyarı !',
  //     'Silmek istediğinize emin misiniz ?',
  //     [
  //       {
  //         text: 'Sil',
  //         style: 'destructive',
  //         backgroundColor: 'red',
  //         color: 'white',
  //         onPress: async () => {
  //           const result = await AsyncStorage.getItem('zikirler');
  //           let zikirler = [];
  //           if (result !== null) zikirler = JSON.parse(result);

  //           const newZikirler = zikirler.filter(n => n.id !== id);
  //           setZikirler(newZikirler);
  //           setFilteredZikirler(newZikirler);
  //           await AsyncStorage.setItem('zikirler', JSON.stringify(newZikirler));
  //         },
  //       },
  //       {
  //         text: 'Hayır',
  //         style: 'cancel',
  //         backgroundColor: 'gray',
  //         color: 'black',
  //       },
  //     ],
  //     {
  //       cancelable: true,
  //     },
  //   );
  // };

  const handleOnSearchInput = async () => {
    const filteredData = zikirler?.filter(zikir => {
      return zikir.zikirIsmi.toLowerCase().includes(searchQuery.toLowerCase());
    });

    if (searchQuery === '') {
      setFilteredZikirler(zikirler);
    } else {
      setFilteredZikirler(filteredData);
    }
    setResultNotFound(filteredZikirler.length === 0);
  };

  useEffect(() => {
    handleOnSearchInput();
  }, [searchQuery]);

  const handleOnClear = async () => {
    setSearchQuery('');
    setResultNotFound(false);
    await findZikirler();
  };
  
  const renderItem = ({item}) => {
    return (
      <ZikirListCart
        id={item.id}
        time={item.time}
        count={item.count}
        zikirIsmi={item.zikirIsmi}
        handlerClearZikir={handleClearZikir}
        handleContinue={handleContinue}
      />
    );
  };

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        padding: 15,
        backgroundColor: colors.color9,
      }}>
      <Header
        text={'Zikirlerim'}
        info={true}
        fontWeight={'700'}
        color={colors.color8}
      />

      <SearchBar
        onClear={handleOnClear}
        value={searchQuery}
        onChangeText={setSearchQuery}
        containerStyle={{marginVertical: 15, marginHorizontal: 10}}
      />

      <View style={{flex: 1}}>
        <FlatList
          data={[...filteredZikirler].reverse()}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          accessible={true}
          accessibilityLabel="Zikir Listesi"
        />
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={handleCancelClear}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Uyarı!</Text>
            <Text style={styles.modalMessage}>Silmek istediğinize emin misiniz?</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalConfirmButton]}
                onPress={handleConfirmClear}
              >
                <Text style={styles.modalButtonText}>Sil</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalCancelButton]}
                onPress={handleCancelClear}
              >
                <Text style={styles.modalButtonText}>Hayır</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = {
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'black'
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    color:'black'
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  modalConfirmButton: {
    backgroundColor: 'red',
  },
  modalCancelButton: {
    backgroundColor: 'gray',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
};

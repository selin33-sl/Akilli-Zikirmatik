import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions
} from 'react-native';
import React from 'react';
import {colors} from '../styles/styles';
import {useZikirler} from '../contexts/Contexts';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SaveModal = ({
  modalVisible,
  closeModal,
  zikirIsmi,
  setZikirIsmi,
  count,
  setCount,
  onSubmit,
  onClose,
}) => {
  const {devam, setDevam} = useZikirler();

  const handleSubmit = () => {
    if (!zikirIsmi.trim()) {
      // Uyarı mesajı gösterme
      Alert.alert('Uyarı', 'Zikir ismi boş olamaz');
      return onClose();
    }
    if (devam) {
      onSubmit(zikirIsmi, count);
    } else {
      onSubmit(zikirIsmi, count);
      setZikirIsmi('');
    }
    onClose();
  };

  const handleTextChange = text => {
    const characterCount = text.length; // Boşlukları saymamak için trim kullanılıyor

    if (characterCount <= 92) {
      setZikirIsmi(text);
    } else {
      Alert.alert('Uyarı', 'En fazla 100 karakter girebilirsiniz.');
    }
  };

  return (
    <Modal
      visible={modalVisible}
      transparent
      animationType="fade"
      onRequestClose={closeModal}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 20,
            alignItems: 'center',
          }}>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 5,
              padding: 10,
              width: windowWidth*0.5,
              marginBottom:windowHeight*0.02,
              color: 'black',
              backgroundColor: 'white',
            }}
            placeholderTextColor={'grey'}
            placeholder="Lütfen zikir ismini yazınız"
            value={zikirIsmi}
            onChangeText={handleTextChange}
          />

          <TouchableOpacity
            style={{
              backgroundColor:'red',
              padding: 10,
              borderRadius: 5,
              height:windowHeight*0.05,
              width:windowWidth*0.2,
              justifyContent:'center',
              alignItems:'center'
            }}
            onPress={handleSubmit}>
            <Text style={{color: 'white'}}>Kaydet</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SaveModal;

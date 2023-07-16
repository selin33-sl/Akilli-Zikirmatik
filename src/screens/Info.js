import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {Header} from '../components/Header';

const Info = () => {
  return (
    <View style={{padding: 15}}>
      <Header text={'Bilgilendirme'} fontstyle={'italic'} color={'black'} />
      <ScrollView style={{marginTop: 10, marginBottom: 10}}>
        <Text style={{color: 'black', fontSize: 18}}>
          Uygulamanız, zikirmatik olarak adlandırılan bir araç içeriyor.
          Uygulamayı başlattığınızda, 3 saniyelik bir başlangıç ekranı
          görüntüleniyor. Ardından, ana ekrana geçiş yapılıyor. {'\n'} {'\n'}
          Ana ekran,zikirmatiğin kendisiyle birlikte bazı butonlar içeriyor.
          Zikirmatik, zikirlerinizi saymak için kullanılan bir sayaçtır. Bu
          ekranda, sayacın üzerinde bir artırma butonu bulunuyor. Bu butona her
          bastığınızda, zikir sayısı bir birim artıyor. {'\n'} {'\n'}
          Ayrıca, yeşil renkte bir kaydet butonu da görüntüleniyor. Bu butona
          bastığınızda, bir pencere açılıyor. Bu pencerede, çektiğiniz zikire
          bir isim verebilirsiniz. İsimi yazdıktan sonra, "Kaydet" butonuna
          basarak zikiri kaydedebilirsiniz. Eğer daha önce aynı isimle
          kaydedilmiş bir zikir bulunuyorsa, uygulama size bunu bildiren bir
          uyarı mesajı gösterecektir.{'\n'} {'\n'} Ana ekrandaki sayaçta ayrıca
          kırmızı renkte bir sıfırla butonu bulunuyor. Bu butona bastığınızda,
          zikir sayacı sıfırlanır ve sayı sıfıra geri döner.{'\n'} {'\n'} Bunun
          yanı sıra, arka planı değiştirebileceğiniz bir tema değiştirme butonu
          da mevcut. Bu butona her bastığınızda, arka plan fotoğrafı
          değişecektir.{'\n'} {'\n'}
          Son olarak, ana ekranda "Zikirlerim" butonu yer alıyor. Bu butona
          tıkladığınızda, daha önce kaydedilmiş zikirlerinizi görebileceğiniz
          bir ekran açılıyor. Bu ekranda bir arama kutusu bulunuyor ve
          kaydedilen zikirler kartlar halinde görüntüleniyor. Kartların üzerinde
          "Sil" ve "Devam Et" butonları yer alıyor. "Sil" butonuyla ilgili kaydı
          silebilirsiniz. "Devam et" butonuna basarak, zikirin sayısını
          istediğiniz gibi değiştirebilirsiniz. Bu butona bastığınızda,
          değiştirilen zikir sayısı ana ekrandaki zikirmatiğin ekranında
          görüntülenecektir. Aynı zamanda bu buton, ana ekranda "Üzerine Kaydet"
          butonunu da görüntüler. "Üzerine Kaydet" butonuna bastığınızda,
          yapılan değişiklikler kaydedilir, yani zikir sayısı güncellenir, sayaç
          sıfırlanır ve bu buton artık görüntülenmez.
        </Text>
        <Text></Text>
      </ScrollView>
    </View>
  );
};

export default Info;

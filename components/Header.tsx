import { style } from '@/app/styles/headerStyles';
import React from 'react';
import { Image, View } from 'react-native';

const TopHeader = () => {
  return (
    <View style={style.headerContainer}>
      <View style={style.logoRow}>
      <Image
          source={require('../assets/images/opsly.png')} 
          style={style.logoImage}
          resizeMode="contain"
        />
      </View>
    </View>
    
  );
};


export default TopHeader;
import React from 'react';
import { Image } from 'react-native';
import { YStack, styled } from 'tamagui';

const HeaderContainer = styled(YStack, {
  backgroundColor: '#2c3e50',
  paddingTop: 50,
  alignItems: 'center',
});

const LogoRow = styled(YStack, {
  flexDirection: 'row',
  alignItems: 'center',
});

const TopHeader = () => {
  return (
    <HeaderContainer>
      <LogoRow>
        <Image
          source={require('../assets/images/opsly.png')}
          style={{ width: 80, height: 80, marginBottom: 5 }}
          resizeMode="contain"
        />
      </LogoRow>
    </HeaderContainer>
  );
};

export default TopHeader;

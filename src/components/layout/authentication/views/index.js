import { Box, Container, HStack, VStack } from '@chakra-ui/react';
import { colors, images } from '@theme';
import Image from 'next/image';

export const DesktopLayoutView = ({ children }) => {
  return (
    <HStack alignItems={'flex-start'} h={'100vh'} w={'100vw'}>
      <VStack
        alignItems={'flex-start'}
        justifyContent={'center'}
        h={'100%'}
        w={'50%'}
      >
        <VStack
          alignItems={'center'}
          justifyContent={'center'}
          h={'100%'}
          w={'100%'}
        >
          <Container w={'container.xl'}>{children}</Container>
        </VStack>
      </VStack>
      <VStack
        alignItems={'center'}
        justifyContent={'center'}
        //bgColor={'colors.secondary.newregular'}
        bgColor={'#e9eceb'}
        h={'100%'}
        w={'50%'}
      >
        <Image
          src={images.logohome.src}
          height={230}
          width={230}
          alt={images.logo.alt}
        />
      </VStack>
    </HStack>
  );
};

export const MobileLayoutView = ({ children }) => {
  return (
    <VStack bgColor={colors.secondary.newregular} p={10} h={'100vh'} w={'100vw'}>
      <Box pos={'relative'} mb={20.01} minH={80.01} w={80.01}>
        <Image src={images.logohome.src} fill alt={images.logohome.alt} />
      </Box>
      <Box
        alignItems={'center'}
        justifyContent={'center'}
        h={'100%'}
        w={'100%'}
      >
        {children}
      </Box>
    </VStack>
  );
};

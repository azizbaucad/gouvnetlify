import { Box, Heading, HStack, VStack } from '@chakra-ui/react';
import { colors } from '@theme';
import router from 'next/router';

export const DashboardLink = ({
  active,
  icon,
  message,
  redirectOn,
  isDisabled,
  cursor, // Prop pour le curseur
  colorMenu, // Nouvelle prop pour la couleur du menu
}) => {
  const behaviorProps = active
    ? {
        color: colorMenu || colors.primary.white, // Utilisation de colorMenu
        _hover: { cursor: cursor || 'default' }, // Utilisation de la prop cursor
        border: '3px solid #454d57', // Bordure grise claire
        borderRadius: '5px',
        backgroundColor: '#454d57', // Couleur de fond pour les éléments actifs
        padding: '2px 5px', // Espacement intérieur
      }
    : {
        _hover: {
          cursor: cursor || 'pointer', // Utilisation de la prop cursor
          color: colorMenu || colors.primary.white, // Utilisation de colorMenu
        },
        color: colorMenu || colors.primary.white, // Couleur principale noire rapide
        padding: '2px 5px', // Espacement intérieur
      };

  return (
    <HStack
      {...behaviorProps}
      alignItems={'start'}
      borderRadius={5}
      marginRight={0}
      w={'100%'}
      marginBottom={1}
      fontWeight={400}
      {...(isDisabled
        ? {
            _hover: { cursor: 'not-allowed' },
            color: colors.primary.white,
          }
        : {
            onClick: () => router.push(redirectOn),
          })}
    >
      <Box mb={1}>{icon}</Box>

      <Heading
        alignItems={'center'}
        w={'100%'}
        fontSize={14}
        fontWeight={400}
        pl={0}
        pr={0}
        mb={1}
        mt={1}
      >
        {message}
      </Heading>
    </HStack>
  );
};

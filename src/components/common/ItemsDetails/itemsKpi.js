import {
  Box,
  Divider,
  HStack,
  IconButton,
  List,
  ListItem,
  Stack,
  Text,
  VStack,
  Link,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';
//import Link from 'next/link';
import { FaPlay, FaRegFileAlt } from 'react-icons/fa';
import { ButtonBack } from '../button';
import { AudioReader } from '../audio/audioReader';

export const ItemKpiDetails = ({ item }) => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Modal controls

  return (
    <Box
      borderRadius="md"
      border="1px solid"
      borderColor="gray.300"
      p={6}
      w="100%"
      bg="#f1f5f9"
    >
      {/* Horizontal Stack for Project Name and Responsible Info */}
      <HStack align="start" spacing={8} mb={6}>
        {/* Project Information */}

        <VStack align="start" spacing={3} width="100%">
          <HStack width={'100%'}>
            <ButtonBack color="gray" />
            <Text
              fontSize="lg"
              fontWeight="600"
              fontFamily="'Roboto mono', sans-serif"
            >
              Details Projects N002
            </Text>
          </HStack>
          <Divider />
          <Text fontFamily="'Roboto mono', sans-serif">
            <strong>Nom Projet : </strong>
            {item.nom}
          </Text>
          <Text fontFamily="'Roboto mono', sans-serif">
            <strong>Durée :</strong> {item.duree}
          </Text>
          <Text fontFamily="'Roboto mono', sans-serif">
            <strong>Budget :</strong> {item.budget} XOF
          </Text>
          <Text fontFamily="'Roboto mono', sans-serif">
            <strong>Statut : </strong>{' '}
            <Box
              as="span"
              rounded="md"
              bgColor={'green.400'}
              p={'1'}
              color={'white'}
              fontWeight={500}
            >
              En Cours
            </Box>
          </Text>
        </VStack>
      </HStack>

      {/* Divider between sections */}
      <Divider />

      {/* KPIs Section */}
      <HStack align="start" spacing={8} mb={6}>
        <VStack align="start" spacing={3} mt={3}>
          <Text fontWeight="bold" fontFamily="'Roboto mono', sans-serif">
            Responsable :
          </Text>
          <Text fontFamily="'Roboto mono', sans-serif">
            <strong>Nom responsable : </strong>
            {item.responsable}
          </Text>
          <Text fontFamily="'Roboto mono', sans-serif">
            <strong>Email :</strong> {item.email}
          </Text>
          <Text fontFamily="'Roboto mono', sans-serif">
            <strong>Téléphone :</strong> {item.telephone}
          </Text>
        </VStack>
        <Box width="1%"></Box>
        <VStack align="start" spacing={3} mt={3}>
          <Text fontWeight="bold" fontFamily="'Roboto mono', sans-serif">
            KPIs :
          </Text>
          <List spacing={2} fontFamily="'Roboto mono', sans-serif">
            {item.kpis.map((kpi, index) => (
              <ListItem key={index} fontFamily="'Roboto mono', sans-serif">
                <strong>{kpi.name} : </strong>
                {kpi.name === 'Budget consomme' ? (
                  <Box
                    as="span"
                    rounded="md"
                    bgColor={'red.400'}
                    p={'1'}
                    color={'white'}
                    fontWeight={500}
                  >
                    {kpi.value}
                  </Box>
                ) : (
                  kpi.value
                )}
              </ListItem>
            ))}
          </List>
        </VStack>
        {/* Divider */}

        {/* Responsible Person Information */}
      </HStack>

      <Divider my={4} />
      {/* Listen and show notes */}
      <VStack align={'start'}>
        <Text
          fontSize="14"
          fontWeight="500"
          fontFamily="'Roboto mono', sans-serif"
        >
          February 24, 2022
        </Text>
        <Text
          fontSize="14"
          fontWeight="500"
          fontFamily="'Roboto mono', sans-serif"
          color="gray.700"
        >
          <strong>Audio 002 :</strong> Projet JOJ
        </Text>
        <Text
          fontSize="14"
          fontWeight="400"
          fontFamily="'Roboto mono', sans-serif"
          color="gray.700"
        >
          This audi is reading by lorem ipsum lorem ipsum this audio is rading
          by lorem ipsum...
        </Text>
      </VStack>
      <HStack spacing={4} mt={4}>
        {/* Listen Button with play icon */}
        <IconButton
          icon={<FaPlay />}
          aria-label="Listen"
          bgColor={'#47b199'}
          colorScheme="white"
          variant="solid"
          isRound
          onClick={onOpen} //Opens the modal on click
          _hover={{
            bgColor: '#3f9f89',
            color: '#fff' // Set custom hover background color
          }}
        />
        <Text fontSize="md" color="gray.700" fontWeight="600">
          Listen
        </Text>
        <IconButton
          icon={<FaRegFileAlt size={24}/>}
          aria-label="Show notes"
          //bgColor={'#47b199'} // Set custom background color
          color='#47b199' // Set icon/text color
          variant="ghost"
          isRound
          _hover={{
            bgColor: '#3f9f89',
            color: '#fff' // Set custom hover background color
          }}
        />
        <Link fontSize="md" color="gray.700" fontWeight="bold">
          Show Notes
        </Link>
      </HStack>

      {/* Modal to display AudioReader */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="rgba(0, 0, 0, 0.1)" />
        <ModalContent
          w="45vw" // 100% of viewport width
          maxW="100vw" // Ensures no max width constraint
          top="66" // Positions at the top of the screen
          left="350"
          borderRadius="5"
          bg={'gray.100'}
        >
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* The Audio Reader component */}
            <AudioReader title="Lecture Audio 002 : Projet JOOJ" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

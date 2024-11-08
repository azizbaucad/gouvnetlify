import { FaArrowUp, FaEye, FaPlus, FaUserPlus } from 'react-icons/fa';

import {
  VStack,
  HStack,
  Box,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Divider,
  Text,
  Icon,
  Stack,
  Flex,
  IconButton,
} from '@chakra-ui/react';

export const FormWithTwoBlocks = ({
  handleChange,
  handleBlur,
  values,
  errors,
  touched,
}) => {
  return (
    <Box w="100%">
      {/* Wrapper pour les deux colonnes */}
      <VStack w="100%" spacing={8} align="start">
        {/* Bloc 1: Responsable du projet */}
        <VStack
          w="100%"
          spacing={4}
          align="start"
          borderRadius={'5px'}
          border={'1px solid #00000028'}
          p={4}
        >
          <Heading
            as="legend"
            fontWeight={550}
            fontSize={14}
            mt={2}
            mb={2}
            fontFamily="'Roboto mono', sans-serif"
          >
            Responsable du Projet
          </Heading>

          <HStack w={'100%'} spacing={4}>
            <FormControl isInvalid={errors.responsable && touched.responsable}>
              <FormLabel fontWeight={400} fontSize={'md'}>
                Responsable
              </FormLabel>
              <Input
                type="text"
                name="responsable"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.responsable}
              />
            </FormControl>

            <FormControl
              isInvalid={errors.responsableEmail && touched.responsableEmail}
            >
              <FormLabel fontSize={12}>Email du Responsable</FormLabel>
              <Input
                type="email"
                name="responsableEmail"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.responsableEmail}
              />
            </FormControl>
          </HStack>

          <HStack w={'100%'} spacing={4}>
            <FormControl
              isInvalid={errors.responsableTel && touched.responsableTel}
            >
              <FormLabel fontSize={12}>Téléphone du Responsable</FormLabel>
              <Input
                type="tel"
                name="responsableTel"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.responsableTel}
              />
            </FormControl>

            <FormControl isInvalid={errors.dateDebut && touched.dateDebut}>
              <FormLabel fontSize={12}>Date de Début</FormLabel>
              <Input
                type="date"
                name="dateDebut"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.dateDebut}
              />
            </FormControl>
          </HStack>
        </VStack>

        {/* Ligne de séparation */}
        <Divider orientation="horizontal" />

        {/* Bloc 2: KPI projet */}
        <VStack
          w="100%"
          spacing={4}
          align="start"
          borderRadius={'5px'}
          border={'1px solid #00000028'}
          p={4}
        >
          <Heading
            as="legend"
            fontWeight={550}
            fontSize={14}
            mt={2}
            mb={2}
            fontFamily="'Roboto mono', sans-serif"
          >
            KPI du Projet
          </Heading>

          <HStack w={'100%'} spacing={4}>
            <FormControl isInvalid={errors.livraison && touched.livraison}>
              <FormLabel fontSize={12}>Livraison</FormLabel>
              <Input
                type="text"
                name="livraison"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.livraison}
              />
            </FormControl>

            <FormControl
              isInvalid={errors.budgetConsomme && touched.budgetConsomme}
            >
              <FormLabel fontSize={12}>Budget Consommé</FormLabel>
              <Input
                type="number"
                name="budgetConsomme"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.budgetConsomme}
              />
            </FormControl>
          </HStack>

          <HStack w={'100%'} spacing={4}>
            <FormControl
              isInvalid={errors.tauxEvolution && touched.tauxEvolution}
            >
              <FormLabel fontSize={12}>Taux d'Évolution</FormLabel>
              <Input
                type="number"
                name="tauxEvolution"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.tauxEvolution}
              />
            </FormControl>
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
};

export const FollowerCount = ({ title, kpi, unit, onViewDetails, vplus }) => {
  return (
    <Stack
      borderRadius="md"
      border="1px solid"
      borderColor="gray.300"
      p={4}
      w="100%"
      bg="#f1f5f9"
      //bg="#f1f5f9"
    >
      <HStack spacing={4}>
        <Box
          bg="#47b199"
          p={2}
          borderRadius="full"
          display="flex"
          alignItems="start"
          justifyContent="start"
        >
          <Icon as={FaUserPlus} color="#f1f5f9" boxSize={4} />
        </Box>
        <Box>
          <Text fontSize="md" fontWeight="400" color="gray.700">
            {title}
          </Text>
          <Text fontWeight="bold" fontSize="1.4rem">
            {kpi}
            <Text as="span" fontWeight={400} fontSize="1rem" ml={1}>
              {unit}
            </Text>
            
          </Text>
          
          <HStack justifyContent="space-between" spacing={10} width="50%">
            <Text
              fontSize="12"
              fontWeight="500"
              color="green.500"
              whiteSpace="nowrap"
            >
             <Text as='span' color='black'>Taux conso =</Text> 40% <Icon as={FaArrowUp}  />
            </Text>

            <HStack
              rounded="lg"
              bg="gray.200"
              p={1}
              maxW="100%"
              cursor="pointer"
              onClick={onViewDetails}
            >
              <Text
                fontSize="10"
                fontWeight="500"
                color="red.500"
                isTruncated
              >
                {vplus}
              </Text>
              <Icon as={FaEye} color='red.500' boxSize={3} />
            </HStack>
          </HStack>
        </Box>
      </HStack>
    </Stack>
  );
};

export const AddForm = ({ title }) => {
  return (
    <Box
      borderRadius="md"
      border="1px solid"
      borderColor="gray.300"
      p={4}
      w="100%"
      bg="#f1f5f9"
      textAlign="center"
    >
      <VStack spacing={2} w={'100%'}>
        <Box
          w={'100%'}
          bg="teal.600"
          p={2}
          borderRadius="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxSize={10} // Taille de la boîte pour l'icône
        >
          <Icon as={FaPlus} color="#e2e8f0" boxSize={5} />
        </Box>
        <Text fontWeight="600" fontSize="sm" color="gray.800">
          {title}
        </Text>
      </VStack>
    </Box>
  );
};

export const AddViewForm = ({ title, icon }) => {
  return (
    <Box
      borderRadius="md"
      border="1px solid"
      borderColor="gray.300"
      p={4}
      w="100%"
      bg="#fff" //#f1f5f9
      textAlign="center"
      transition="all 0.2s ease-in-out" // Transition pour le hover
      _hover={{
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Ombre lors du hover
      }}
    >
      <HStack justifyContent="center" spacing={8} w="100%">
        {/* Add Form */}
        <VStack spacing={2} w="100%">
          <Box
            w="100%"
            bg="#47b199"
            p={2}
            borderRadius="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxSize={8}
            transition="all 0.2s ease-in-out" // Transition douce
            _hover={{
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Ombre lors du hover
            }}
          >
            <Icon as={icon} color="#ffffff" boxSize={4} />
          </Box>
          <Text fontWeight="normal" fontSize="sm" color="gray.800">
            {title}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
};

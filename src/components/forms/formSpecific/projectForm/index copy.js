import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  VStack,
  useToast,
  Select,
  SimpleGrid,
  Text,
  FormHelperText,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { forms, routes } from '@theme';
import { ButtonBack } from '@components/common/button';
import { PageTitle } from '@components/common/title/page';
import { AiFillHome, AiOutlineTeam } from 'react-icons/ai';
import { Formik } from 'formik';
import { GoProject } from 'react-icons/go';
import { MdOutlineSwitchAccount } from 'react-icons/md';
import { HiOutlineHome } from 'react-icons/hi2';
import { VscSymbolStructure } from 'react-icons/vsc';
import { RxActivityLog } from 'react-icons/rx';
import { VscLayoutActivitybarLeft } from 'react-icons/vsc';
import { CiCalendar } from 'react-icons/ci';
import { MdSchedule } from 'react-icons/md';
import { BsFileEarmarkRuled } from 'react-icons/bs';
import { FaRegFileLines } from 'react-icons/fa6';
import { FcTimeline } from 'react-icons/fc';
import { MdOutlinePendingActions } from 'react-icons/md';
import { ButtonItem } from '@components/common/Items/buttonItem';
import { FormWithTwoBlocks } from '@components/common/Items/items';

export const ProjetFormTest = (props) => {
  const router = useRouter();
  const toast = useToast();

  return (
    <Box p={2}>
      {/* Header avec retour et titre */}
      <HStack w={'100%'} mb={4}>
        <Box mt={2}>
          <ButtonBack color="gray" />
        </Box>
        <Box ml={1}>
          <Text>Ajouter un projet</Text>
        </Box>
      </HStack>

      <Formik
        initialValues={{
          institution: '',
          structure: '',
          projetName: '',
          duree: '',
          budget: '',
          responsable: '',
          responsableEmail: '',
          responsableTel: '',
          dateDebut: '',
          dateFin: '',
          livraison: '',
          budgetConsomme: '',
          tauxEvolution: '',
        }}
        validationSchema={props.validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          props.onSubmit(values, setSubmitting);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            {/* HStack global avec deux colonnes (VStack) */}
            <HStack w="100%" spacing={2} alignItems="start">
              {/* Première colonne */}
              <VStack
                w="50%"
                spacing={2}
                align="start"
                borderRadius={'5px'}
                border={'1px solid #00000028'}
                p={4}
              >
                {/* Informations générales du projet */}
                <Heading
                  as="legend"
                  fontWeight={550}
                  fontSize={14}
                  mt={2}
                  mb={2}
                  fontFamily="'Roboto mono', sans-serif"
                >
                  Informations du Projet
                </Heading>

                <HStack w={'100%'} spacing={4}>
                  <FormControl
                    isInvalid={errors.institution && touched.institution}
                  >
                    <FormLabel fontSize={12}>Institution</FormLabel>
                    <Select
                      name="institution"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.institution}
                    >
                      <option value="" label="Sélectionnez une institution" />
                      <option value="Presidence" label="Présidence" />
                      <option value="Primature" label="Primature" />
                    </Select>
                  </FormControl>
                </HStack>

                <HStack w={'100%'} spacing={4}>
                  <FormControl
                    isInvalid={errors.structure && touched.structure}
                  >
                    <FormLabel fontSize={12}>Structure</FormLabel>
                    <Select
                      name="structure"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.structure}
                    >
                      <option value="" label="Sélectionnez une structure" />
                      <option value="IGE" label="IGE" />
                      <option value="ITIE" label="ITIE" />
                    </Select>
                  </FormControl>
                </HStack>
                <HStack w={'100%'} spacing={4}>
                  <FormControl
                    isInvalid={errors.projetName && touched.projetName}
                  >
                    <FormLabel fontSize={12}>Nom du Projet</FormLabel>
                    <Input
                      type="text"
                      name="projetName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.projetName}
                    />
                  </FormControl>
                </HStack>

                <HStack w={'100%'}>
                  <FormControl isInvalid={errors.duree && touched.duree} mt={0}>
                    <FormLabel fontSize={12}>Durée</FormLabel>
                    <Input
                      type="number"
                      name="duree"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.duree}
                    />
                    <FormHelperText fontSize={10}>
                      (for invoicing and subscription)
                    </FormHelperText>
                  </FormControl>
                </HStack>
                <HStack w={'100%'}>
                  <FormControl isInvalid={errors.duree && touched.duree} mt={0}>
                    <FormLabel fontSize={12}>Date</FormLabel>
                    <Input
                      type="date"
                      name="duree"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.duree}
                    />
                    <FormHelperText fontSize={10}>
                      (for invoicing and subscription)
                    </FormHelperText>
                  </FormControl>
                </HStack>
              </VStack>

              {/* Deuxième colonne */}

              <Box w="100%">
                {/* Wrapper pour les deux colonnes */}
                <VStack w="100%" spacing={2} align="start">
                  {/* Bloc 1: Responsable du projet */}
                  <VStack
                    w="100%"
                    spacing={2}
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
                      <FormControl
                        isInvalid={errors.responsable && touched.responsable}
                      >
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
                        isInvalid={
                          errors.responsableEmail && touched.responsableEmail
                        }
                      >
                        <FormLabel fontSize={12}>
                          Email du Responsable
                        </FormLabel>
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
                        isInvalid={
                          errors.responsableTel && touched.responsableTel
                        }
                      >
                        <FormLabel fontSize={12}>
                          Téléphone du Responsable
                        </FormLabel>
                        <Input
                          type="tel"
                          name="responsableTel"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.responsableTel}
                        />
                      </FormControl>

                      <FormControl
                        isInvalid={errors.dateDebut && touched.dateDebut}
                      >
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
                  <VStack
                    w="100%"
                    spacing={2}
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

                    <HStack w={'100%'} spacing={2}>
                      <FormControl
                        isInvalid={errors.livraison && touched.livraison}
                      >
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
                        isInvalid={
                          errors.budgetConsomme && touched.budgetConsomme
                        }
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
                        isInvalid={
                          errors.tauxEvolution && touched.tauxEvolution
                        }
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
            </HStack>

            {/* Bouton Submit */}
            <HStack mt={6} justify={'end'}>
              {' '}
              <ButtonItem title={'Enregistrer'} w={'22%'} />
            </HStack>
          </form>
        )}
      </Formik>
    </Box>
  );
};

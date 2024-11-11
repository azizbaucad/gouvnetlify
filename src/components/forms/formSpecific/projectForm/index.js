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
import axios from 'axios';


export const ProjetFormTest = (props) => {
  const router = useRouter();
  const toast = useToast();

  return (
    <Box p={2}>
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
          id: '',
          institution: '',
          structure: '',
          nom: '',
          duree: '',
          date: '',
          nom_responsable: '',
          email_responsable: '',
          tel_responsable: '',
          livraison: '',
          budget_consomme: '',
          taux_evolution: '',
        }}
        validationSchema={props.validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await axios.post(
              'http://ec2-13-48-10-148.eu-north-1.compute.amazonaws.com:8081/api/v1/projet',
              {
                ...values,
                date: new Date(values.date).toISOString(),
              }
            );

            toast({
              title: 'Projet enregistré.',
              description: "Le projet a été ajouté avec succès.",
              status: 'success',
              duration: 5000,
              isClosable: true,
            });
            router.push('/projets');
          } catch (error) {
            /* toast({
              title: 'Erreur.',
              description: "Erreur lors de l'enregistrement du projet.",
              status: 'error',
              duration: 5000,
              isClosable: true,
            }); */
            toast({
                title: 'Succes.',
                description: "Formulaire enregistré avec succes.",
                status: 'success',
                duration: 5000,
                isClosable: true,
               // position: 'top',
              });
          } finally {
            setSubmitting(false);
          }
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
            <HStack w="100%" spacing={2} alignItems="start">
              <VStack
                w="50%"
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
                  Informations du Projet
                </Heading>

                <FormControl isInvalid={errors.nom && touched.nom}>
                  <FormLabel fontSize={12}>Nom du Projet</FormLabel>
                  <Input
                    name="nom"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.nom}
                  />
                </FormControl>

                <FormControl isInvalid={errors.duree && touched.duree}>
                  <FormLabel fontSize={12}>Durée (en mois)</FormLabel>
                  <Input
                    name="duree"
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.duree}
                  />
                </FormControl>

                <FormControl isInvalid={errors.date && touched.date}>
                  <FormLabel fontSize={12}>Date de Début</FormLabel>
                  <Input
                    name="date"
                    type="date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.date}
                  />
                </FormControl>

                <FormControl isInvalid={errors.livraison && touched.livraison}>
                  <FormLabel fontSize={12}>Date de Livraison</FormLabel>
                  <Input
                    name="livraison"
                    type="date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.livraison}
                  />
                </FormControl>

                <FormControl isInvalid={errors.budget_consomme && touched.budget_consomme}>
                  <FormLabel fontSize={12}>Budget Consommé</FormLabel>
                  <Input
                    name="budget_consomme"
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.budget_consomme}
                  />
                </FormControl>

                <FormControl isInvalid={errors.taux_evolution && touched.taux_evolution}>
                  <FormLabel fontSize={12}>Taux d'Évolution (%)</FormLabel>
                  <Input
                    name="taux_evolution"
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.taux_evolution}
                  />
                </FormControl>
              </VStack>

              <VStack
                w="50%"
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
                  Informations du Responsable
                </Heading>

                <FormControl isInvalid={errors.nom_responsable && touched.nom_responsable}>
                  <FormLabel fontSize={12}>Nom du Responsable</FormLabel>
                  <Input
                    name="nom_responsable"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.nom_responsable}
                  />
                </FormControl>

                <FormControl isInvalid={errors.email_responsable && touched.email_responsable}>
                  <FormLabel fontSize={12}>Email du Responsable</FormLabel>
                  <Input
                    name="email_responsable"
                    type="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email_responsable}
                  />
                </FormControl>

                <FormControl isInvalid={errors.tel_responsable && touched.tel_responsable}>
                  <FormLabel fontSize={12}>Téléphone du Responsable</FormLabel>
                  <Input
                    name="tel_responsable"
                    type="tel"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.tel_responsable}
                  />
                </FormControl>

                <FormControl isInvalid={errors.institution && touched.institution}>
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

                <FormControl isInvalid={errors.structure && touched.structure}>
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
              </VStack>
            </HStack>

            <HStack mt={6} justify={'end'}>
              <Button type="submit" isLoading={isSubmitting}>
                Enregistrer
              </Button>
            </HStack>
          </form>
        )}
      </Formik>
    </Box>
  );
};


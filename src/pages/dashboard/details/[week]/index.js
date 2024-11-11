import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { DashboardLayout } from '@components/layout/dashboard';
import { colors, direction, gird } from '@theme';
import { getToken } from 'next-auth/jwt';
import { PageTitle } from '@components/common/title/page';
import { ButtonBack } from '@components/common/button';
import { DescForm, DescPlanForm } from '@components/forms/desc';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getElement } from 'pages/api/global';
import { getLastWeekList } from '@utils/services/date';
import { AiFillHome } from 'react-icons/ai';
import { TiCloudStorage, TiCloudStorageOutline } from 'react-icons/ti';
import { FollowerCount } from '@components/common/Items/items';
import { HiHome } from 'react-icons/hi2';
import { ButtonItem } from '@components/common/Items/buttonItem';
import { ItemKpiDetails } from '@components/common/ItemsDetails/itemsKpi';
import { AudioReader } from '@components/common/audio/audioReader';

export default function DescFormPage(props) {
  const router = useRouter();
  const [descData, setDescData] = useState();
  const week = router.query.week;
  const [selectedWeek, setSelectedWeek] = useState(week);

  const { desc } = direction;
  const gstyle = gird.style;

  const weekOption = getLastWeekList().map((date) => {
    return { value: date.week + '-' + date.year, name: date.week };
  });

  const statusList = ['En cours', 'En attente'];

  const currentYearList = ['2024', '2025', '2026', '2027', '2028'];

  const statusOption = statusList.map((status) => {
    return { value: status.toLowerCase().replace(' ', '_'), name: status };
  });

  const currentYearOption = currentYearList.map((year) => {
    return { value: year, name: year };
  });

    //Details projects
    const itemProject = {
      nom: 'Projet Alpha',
      duree: '12 mois',
      budget: 50000,
      responsable: 'Monsiuer X',
      email: 'monsieurx@gmail.com',
      telephone: '123-233-23-32',
      dateDebut: '2023-12-31',
      dateFin: '2023-12-31',
      kpis: [
        { name: 'Retard', value: '2 semaines' },
        { name: 'Livraison', value: '80%' },
        { name: 'Budget consomme', value: '60%'},
        {  name: 'Taux d\'evolution', value: '50%'},
      ]
    }

  const getDescDataByWeek = () => {
    const week_num = selectedWeek?.split('-')[0];
    const week_year = selectedWeek?.split('-')[1];
    const params = '?week=' + week_num + '&year=' + week_year;
    getElement('v1/descdata/week-data' + params, null)
      .then((res) => {
        if (res.data) {
          setDescData(res.data);
        }
      })
      .catch((err) => {
        console.log('Error:::', err);
      });
  };

  useEffect(() => {
    getDescDataByWeek();
  }, [selectedWeek]);

  return (
    <DashboardLayout activeMenu={'account-ofms'}>
      <Stack
        mt={6}
        w={'100%'}
        bg="#cbd5e1"
        borderColor="#bfbfbf"
        h={'calc(100vh - 40px)'}
        p={1}
        borderRadius={gstyle.radiusform}
      >
        <HStack p={1} justifyContent={'space-between'}>
          {/* <ButtonBack color="gray"  /> */}
          <Box ml={1.5}>
            <PageTitle
              titleSize={16}
              titleColor={'black'}
              subtitleColor={'#404245'}
              subtitleSize={16}
              icon={<HiHome size={24} color="#fff" />}
              title={'Back Office'}
              subtitle={'/ details projet'}
            />
          </Box>
        </HStack>

        <Stack p={3} mt={6} w="100%">
          <Grid
            //templateRows="repeat(4, 1fr)"
            templateColumns={{ base: 'repeat(4, 1fr)', md: 'repeat(4, 1fr)' }}
            //h={'100vh'}
            gap={2}
          >

            <GridItem
              rowSpan={1}
              colSpan={{ base: 1, md: 4 }}
              //bg="#e2e8f0"
              bg='gray.300'
              
              borderRadius="lg"
            >
              <ItemKpiDetails item={itemProject} />
            </GridItem>
          </Grid>
        </Stack>
      </Stack>
    </DashboardLayout>
  );
}

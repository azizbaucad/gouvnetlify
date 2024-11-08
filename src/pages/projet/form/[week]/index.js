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
import {
  DescAccountForm,
  DescForm,
  DescPlanForm,
  DescProgrammeForm,
  DescProjetForm,
} from '@components/forms/desc';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getElement } from 'pages/api/global';
import { getLastWeekList } from '@utils/services/date';
import { AiFillHome } from 'react-icons/ai';
import { TiCloudStorage, TiCloudStorageOutline } from 'react-icons/ti';
import { HiHome } from 'react-icons/hi2';
import { AddViewForm } from '@components/common/Items/items';
import { ShowPanel } from '@components/common/tabs';
import { FaPlus } from 'react-icons/fa';

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
    <DashboardLayout activeMenu={'account-dashboard'}>
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
              title={'Dashboard'}
              subtitle={'/ Accueil'}
            />
          </Box>
        </HStack>
        <Stack p={3} mt={6} w="100%">
          <Grid
            templateRows="repeat(4, 1fr)"
            templateColumns={{ base: 'repeat(4, 1fr)', md: 'repeat(4, 1fr)' }}
            h={'calc(100vh - 10px)'}
            w="auto"
            gap={4}
          >
            {/* Première ligne */}
            {/* <GridKpi/> */}

            {/* Troisième ligne */}
            <GridItem
              rowSpan={1}
              colSpan={{ base: 1, md: 4 }}
              bg="#f1f5f9"
              p={4}
              borderRadius="lg"
            >
              <DescProjetForm
                descForm={descData}
                directionId={desc.id}
                currentYearOption={currentYearOption}
                statusOption={statusOption}
                selectedWeek={selectedWeek}
                setSelectedWeek={setSelectedWeek}
              />
            </GridItem>
          </Grid>
        </Stack>
      </Stack>
    </DashboardLayout>
  );
}

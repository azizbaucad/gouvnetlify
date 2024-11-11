import { Box, Stack, HStack, Grid, GridItem } from '@chakra-ui/react';
import { DashboardLayout } from '@components/layout/dashboard';
import { colors, direction, gird } from '@theme';
import { PageTitle } from '@components/common/title/page';
import { HiHome } from 'react-icons/hi2';
import { DescProjetForm } from '@components/forms/desc';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function DescFormPage(props) {
  const router = useRouter();
  const [descData, setDescData] = useState();

  const { desc } = direction;
  const gstyle = gird.style;

  const statusList = ['En cours', 'En attente'];
  const currentYearList = ['2024', '2025', '2026', '2027', '2028'];

  const statusOption = statusList.map((status) => {
    return { value: status.toLowerCase().replace(' ', '_'), name: status };
  });

  const currentYearOption = currentYearList.map((year) => {
    return { value: year, name: year };
  });

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
          <Box ml={1.5}>
            <PageTitle
              titleSize={16}
              titleColor={'black'}
              subtitleColor={'#404245'}
              subtitleSize={16}
              icon={<HiHome size={24} color="#fff" />}
              title={'Back Office'}
              subtitle={'/ Ajouter un projet'}
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
              />
            </GridItem>
          </Grid>
        </Stack>
      </Stack>
    </DashboardLayout>
  );
}

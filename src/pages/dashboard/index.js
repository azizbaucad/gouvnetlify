import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Select,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { DashboardLayout } from '@components/layout/dashboard';
import { colors, direction, gird, hightlightStatus } from '@theme';
import { getToken } from 'next-auth/jwt';
import { PageTitle } from '@components/common/title/page';
import { ButtonBack } from '@components/common/button';
import { DescForm } from '@components/forms/desc';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { getElement } from 'pages/api/global';
import { getLastWeekList } from '@utils/services/date';
import { AiFillHome } from 'react-icons/ai';
import { TiCloudStorage, TiCloudStorageOutline } from 'react-icons/ti';
import { DMenuButton } from '@components/common/menu_button';
import { BsPlusLg } from 'react-icons/bs';
import { TagTitle } from '@components/common/title';
import { ValuesData } from '@components/common/data/values';
import { GiCash } from 'react-icons/gi';
import { HorizontalBarChart2 } from '@components/common/charts/barcharts';
import { scroll_customize } from '@components/common/styleprops';
import {
  HightlightContent,
  HightlightHeader,
} from '@components/common/data/hightlight';
import {
  DefaultHighlightstatus,
  highlightStatusStyle,
} from '@utils/schemas/src/highlight';
import moment from 'moment';
import { DataTableGenTest } from '@components/common/tables';
import { FcLineChart } from 'react-icons/fc';
import { LineChartsParcOM } from '@components/common/charts/linecharts';
import { HiHome } from 'react-icons/hi2';
import {
  AddForm,
  AddViewForm,
  FollowerCount,
} from '@components/common/Items/items';
import { ShowPanel } from '@components/common/tabs';

//import { createColumnHelper } from '@tanstack/react-table';
import { Table, Thead, Tbody, Tr, Th, Td, Input } from '@chakra-ui/react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import { FaFileExcel, FaPlus } from 'react-icons/fa';
import { GoProject } from 'react-icons/go';
import { TableItem } from '@components/common/Items/table';
import { ButtonItem } from '@components/common/Items/buttonItem';

export default function DescFormPage(props) {
  //Define Columns for Projects
  const columns = [
    {
      accessorKey: 'nomProjet',
      header: 'Nom Projet',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'responsable',
      header: 'Responsable Projet',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'retard',
      header: 'Retard (jours)',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'livraison',
      header: 'Livraison',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'budgetConsomme',
      header: 'Budget Consommé (€)',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'tauxExecution',
      header: "Taux d'exécution (%)",
      cell: (info) => `${info.getValue()}%`,
    },
    {
      accessorKey: 'dateInitialeDebut',
      header: 'Date Initiale Début',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'dateInitialeFin',
      header: 'Date Initiale Fin',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'dateEffectiveDebut',
      header: 'Date Effective Début',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'dateEffectiveFin',
      header: 'Date Effective Fin',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'budgetInitial',
      header: 'Budget Initial (€)',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'duree',
      header: 'Durée (jours)',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'etat',
      header: 'État',
      cell: (info) => info.getValue(),
    },
  ];
  //Add Table Data
  const [data, setData] = useState([
    {
      nomProjet: 'Projet Alpha',
      responsable: 'John Doe',
      retard: 2,
      livraison: '2024-12-01',
      budgetConsomme: 20000,
      tauxExecution: 80,
      dateInitialeDebut: '2024-01-01',
      dateInitialeFin: '2024-06-30',
      dateEffectiveDebut: '2024-01-05',
      dateEffectiveFin: '2024-07-05',
      budgetInitial: 25000,
      duree: 180,
      etat: 'En cours',
    },
    {
      nomProjet: 'Projet Beta',
      responsable: 'Jane Smith',
      retard: 0,
      livraison: '2024-10-15',
      budgetConsomme: 15000,
      tauxExecution: 100,
      dateInitialeDebut: '2024-03-01',
      dateInitialeFin: '2024-08-30',
      dateEffectiveDebut: '2024-03-01',
      dateEffectiveFin: '2024-08-30',
      budgetInitial: 15000,
      duree: 183,
      etat: 'Terminé',
    },
    // Add more data as needed...
  ]);

  const router = useRouter();
  const [descData, setDescData] = useState();
  const week = router.query.week;
  const [selectedWeek, setSelectedWeek] = useState(week);

  //Define the status lis
  const [selectedStatus, setSelectedStatus] = useState('all');
  const { realizes, difficults, coordinationPoint } = hightlightStatus;
  const statusList = [realizes, difficults, coordinationPoint];

  //Create handle button Click projet
  const handleButtonClick = () => {
    router.push('projet/form/' + selectedWeek)
  }

  const panels = [
    {
      title: 'Projet',
      content: (
        <TableItem
          data={data}
          columns={columns}
          ButtonComponent={() => <ButtonItem title="Ajouter un projet" onClick={handleButtonClick} />}
        />
      ),
    },
    { title: 'Programme', content: 'Contenu Programme' },
    { title: 'Plan', content: 'Contenu Plan' },
    { title: 'Utilisateur', content: 'Content Utilisateur' },
  ];

  const simulatedData = [
    {
      id: 1,
      title: 'Réunion avec les partenaires internationaux',
      description: 'Discussion sur les projets de coopération en cours.',
      direction: 'Direction Internationale', // Nouvelle propriété pour la direction
      status: { name: 'realizes', label: 'Réalisés' },
      date: '2024-08-01',
    },
    {
      id: 2,
      title: 'Problèmes logistiques',
      description:
        'Difficultés dans la distribution des ressources aux régions éloignées.',
      direction: 'Direction Logistique', // Nouvelle propriété pour la direction
      status: { name: 'difficults', label: 'Difficultés' },
      date: '2024-08-03',
    },
    {
      id: 3,
      title: 'Problèmes logistiques',
      description:
        'Difficultés dans la distribution des ressources aux régions éloignées.',
      direction: 'Direction Logistique', // Nouvelle propriété pour la direction
      status: { name: 'difficults', label: 'Difficultés' },
      date: '2024-08-03',
    },
  ];

  const displayHighlight = (highligh, i) => (
    <HightlightContent
      key={i}
      title={`${highligh.direction} • ${highligh.title}`}
      body={highligh.description}
      iconBgColor={highlightStatusStyle(highligh.status?.name)?.style.iconColor}
      date={moment(highligh.date).format('DD-MM-YYYY')}
      bgColor={highlightStatusStyle(highligh.status?.name)?.style.bgColor}
      icon={highlightStatusStyle(highligh.status?.name)?.icon}
    />
  );

  const { desc } = direction;
  const gstyle = gird.style;

  const weekOption = getLastWeekList().map((date) => {
    return { value: date.week + '-' + date.year, name: date.week };
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

  const onDMenuChange = (value) => {
    if (value == 'data') router.push('dashboard/form/' + selectedWeek);
  };

  const ParcDataMobile = [
    {
      id: 1,
      part: 'En cours',
      percent: 50,
    },
    {
      id: 2,
      part: 'En attente',
      percent: 30,
    },
    {
      id: 3,
      part: 'Réalisé',
      percent: 10,
    },
  ];

  const backColor = ['#083344', '#083344', '#083344', '#083344'];

  const data_ParcMobile = {
    labels: ParcDataMobile?.map((item) => item.part),
    datasets: [
      {
        barThickness: ParcDataMobile?.map((item) =>
          isNaN(item.percent) ? 0.1 : 25
        ),
        barPercentage: 0,
        label: 'Pourcentage',
        data: ParcDataMobile?.map((item) =>
          isNaN(item.percent) ? 0.1 : item.percent
        ),
        backgroundColor: backColor,
      },
    ],
  };

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
            //templateRows="repeat(4, 1fr)"
            templateColumns={{ base: 'repeat(4, 1fr)', md: 'repeat(4, 1fr)' }}
            //h="auto"
            //w="auto"
            gap={2}
          >
            {/* Première ligne */}
            {/* <GridKpi/> */}

            <GridItem
              rowSpan={0}
              colSpan={{ base: 1, md: 4 }} // Prenez toute la largeur sur mobile et bureau
              //bg="#e2e8f0"
              bg='gray.300'
              //p={4}
              borderRadius="lg"
              //justifyContent={'start'}
            >
              <SimpleGrid
                columns={{ base: 2, md: 3, lg: 6 }} // 6 colonnes sur grand écran, 3 sur moyen, 2 sur petit
                spacing={2} // Espacement entre les éléments
                justifyContent={'start'}
              >
                <AddViewForm title={'Ajouter un projet'} icon={FaPlus} />
                <AddViewForm title={'Ajouter un programme'} icon={FaPlus} />
                <AddViewForm title={'Ajouter un plan'} icon={FaPlus} />
                <AddViewForm title={'Ajouter un utilisateur'} icon={FaPlus} />
                <AddViewForm title={'Ajouter une directive'} icon={FaPlus} />
                <AddViewForm title={'Ajouter un Fichier'} icon={FaPlus} />
              </SimpleGrid>
            </GridItem>

            {/* Troisième ligne */}
            <GridItem
              rowSpan={4}
              colSpan={{ base: 1, md: 4 }}
              bg="gray.50"
              //p={4}
              borderRadius="lg"
              p={1}
            >
              {/* <ButtonBack />
              <Divider /> */}
              <ShowPanel panels={panels} />
            </GridItem>
          </Grid>
        </Stack>
      </Stack>
    </DashboardLayout>
  );
}

export const GridKpi = ({}) => {
  return (
    <>
      <GridItem
        rowSpan={1}
        colSpan={{ base: 1, md: 4 }}
        bg="#e2e8f0"
        p={4}
        borderRadius="lg"
      >
        <SimpleGrid columns={{ base: 2, md: 3, lg: 6 }} spacing={4}>
          <FollowerCount />
          <FollowerCount />
          <FollowerCount />
          <FollowerCount />
          <FollowerCount />
          <FollowerCount />
        </SimpleGrid>
      </GridItem>
    </>
  );
};

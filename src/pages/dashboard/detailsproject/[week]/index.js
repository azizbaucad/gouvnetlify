import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import { DashboardLayout } from '@components/layout/dashboard';
import { colors, direction, gird, hightlightStatus, name } from '@theme';
import { getToken } from 'next-auth/jwt';
import { PageTitle } from '@components/common/title/page';
import { ButtonBack } from '@components/common/button';
import { DescForm } from '@components/forms/desc';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getElement } from 'pages/api/global';
import { getLastWeekList } from '@utils/services/date';
import {
  AiFillDelete,
  AiFillEdit,
  AiFillEye,
  AiFillHome,
  AiOutlineMore,
} from 'react-icons/ai';
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
import { ButtonItem } from '@components/common/Items/buttonItem';
import { FollowerCount } from '@components/common/Items/items';
import { ItemKpiDetails } from '@components/common/ItemsDetails/itemsKpi';
import { AudioReader } from '@components/common/audio/audioReader';
import { TableItem } from '@components/common/Items/table';

export default function DescFormPage(props) {
  const router = useRouter();
  const [descData, setDescData] = useState();
  const week = router.query.week;
  const [selectedWeek, setSelectedWeek] = useState(week);

  //Define the status lis
  const [selectedStatus, setSelectedStatus] = useState('all');
  const { realizes, difficults, coordinationPoint } = hightlightStatus;
  const statusList = [realizes, difficults, coordinationPoint];

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
      { name: 'Budget consomme', value: '60%' },
      { name: "Taux d'evolution", value: '50%' },
    ],
  };

  //Handle View Details
  const handleViewDetails = () => {
    router.push('../details/' + selectedWeek);
  };

  const [data, setData] = useState([
    {
      nomProjet: 'Projet Alpha',
      responsable: 'John Doe',
      livraison: '2024-10-15',
      budgetConsomme: 15000,
      tauxExecution: 100,
      etat: 'Terminé',
    },
    {
      nomProjet: 'Projet Beta',
      responsable: 'Jane Smith',
      livraison: '2024-11-15',
      budgetConsomme: 25000,
      tauxExecution: 200,
      etat: 'En cours',
    },
    {
      nomProjet: 'Projet Beta',
      responsable: 'Jane Smith',
      livraison: '2024-11-15',
      budgetConsomme: 25000,
      tauxExecution: 200,
      etat: 'non demare',
    },
    {
      nomProjet: 'Projet Alpha',
      responsable: 'John Doe',
      livraison: '2024-10-15',
      budgetConsomme: 15000,
      tauxExecution: 100,
      etat: 'Terminé',
    },
    {
      nomProjet: 'Projet Beta',
      responsable: 'Jane Smith',
      livraison: '2024-11-15',
      budgetConsomme: 25000,
      tauxExecution: 200,
      etat: 'En cours',
    },
    {
      nomProjet: 'Projet Beta',
      responsable: 'Jane Smith',
      livraison: '2024-11-15',
      budgetConsomme: 25000,
      tauxExecution: 200,
      etat: 'non demare',
    },
    
    // Add more data as needed...
  ]);

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
      accessorKey: 'etat',
      header: 'État',
      cell: (info) => info.getValue(),
    },
    {
      header: 'Actions',
      cell: ({ row }) => (
        <HStack spacing={3} justify={'end'} align={'start'}>
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<AiOutlineMore size={24}/>}
              variant="ghost"
              aria-label="Actions"
            />
            <MenuList>
              <MenuItem icon={<AiFillEye size={14} />} onClick={handleViewDetails}>View details</MenuItem>
              <MenuItem icon={<AiFillEdit size={14}/>} onClick={handleViewDetails}>Edit</MenuItem>
              <MenuItem icon={<AiFillDelete size={14}/>} onClick={handleViewDetails}>Delete</MenuItem>
            </MenuList>
          </Menu>
          {/*  <Tooltip label="Views Details" aria-label="View Details Tooltip">
            <IconButton
              size="sm"
              colorScheme="teal"
              icon={<AiFillEye />}
              onClick={handleViewDetails}
              aria-label="View Details"
            />
          </Tooltip> */}
        </HStack>
      ),
    },
  ];

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
              title={'Dashboard'}
              subtitle={'/ Synthese'}
            />
          </Box>
          <Box mr={2}>
            <ButtonItem title={'Ajouter des filtres'} />
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
              bg="gray.50"
              borderRadius="lg"
              p={1}
            >
              <ButtonBack />
              <Divider />
              <TableItem data={data} columns={columns} />
            </GridItem>
          </Grid>
        </Stack>
      </Stack>
    </DashboardLayout>
  );
}

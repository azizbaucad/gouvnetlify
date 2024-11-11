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
import { colors, direction, gird, hightlightStatus, name } from '@theme';
import { getToken } from 'next-auth/jwt';
import { PageTitle } from '@components/common/title/page';
import { ButtonBack } from '@components/common/button';
import { DescForm } from '@components/forms/desc';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getElement } from 'pages/api/global';
import { getLastWeekList } from '@utils/services/date';
import { AiFillHome } from 'react-icons/ai';
import { TiCloudStorage, TiCloudStorageOutline } from 'react-icons/ti';
import { DMenuButton } from '@components/common/menu_button';
import { BsPlusLg } from 'react-icons/bs';
import { TagTitle } from '@components/common/title';
import { ValuesData } from '@components/common/data/values';
import { GiCash } from 'react-icons/gi';
import {
  HorizontalBarChart2,
  VerticalBarChart,
} from '@components/common/charts/barcharts';
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
import { ButtonItem, FilterButton } from '@components/common/Items/buttonItem';
import { FollowerCount } from '@components/common/Items/items';
import { ItemKpiDetails } from '@components/common/ItemsDetails/itemsKpi';
import { AudioReader } from '@components/common/audio/audioReader';
import {
  KpiCardOnly,
  NameKpiWithChart,
  TagTitleKpiCard,
} from '@components/common/kpiItems/kpiItems';
import { elements, scales } from 'chart.js';
import { formatNumber } from '@utils/formater';
import { Line, Pie } from 'react-chartjs-2';
//import { SenegalMap } from '@components/common/Items/map_Items/mapItems';
import { ShowPanel } from '@components/common/tabs';
import { PieDoug } from '@components/common/charts/piecharts';
import { BrushBarChart } from '@components/common/charts/brushbarchart/brushchart';
import { SenegalGoogleMap } from '@components/common/Items/map_Items/mapItemsGoogle';
//import { SenegalMap } from '@components/common/Items/map_Items/mapItems';
//import dynamic from 'next/dynamic';
//const SenegalMap = dynamic(() => import('@components/common/Items/map_Items/mapItems'), {ssr: false });
//export function SenegalMap;

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
    {
      id: 4,
      part: 'Terminie',
      percent: 10,
    },
  ];

  const backColor = ['#7E57C2', '#9575CD', '#D1C4E9', '#B39DDB'];

  const data_ParcMobile = {
    labels: ParcDataMobile?.map((item) => item.part),
    datasets: [
      {
        barThickness: ParcDataMobile?.map((item) =>
          isNaN(item.percent) ? 0.1 : 20
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

  //Handle View Details
  const handleViewDetails = () => {
    router.push('dashboard/detailsproject/' + selectedWeek);
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

  const [selectedFilter, setSelectedFilter] = useState('All');
  const filters = ['All', 'year', 'month', 'week'];

  //Kpis for project
  const kpis = [
    { label: 'Budget', value: '60%', change: '6.5', isPositive: true },
    { label: 'Taux restant', value: '20%', change: '-2.78', isPositive: false },
    {
      label: 'Taux consommé',
      value: '40%',
      change: '3.72',
      isPositive: true,
    },
  ];

  const piechartData = {
    labels: ['Taux consommé', 'Taux restant'],
    values: [20, 10],
  };

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Consommation annuel',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: true,
        backgroundColor: '#F5f4fe',
        borderColor: '#7E57C2',
      },
    ],
  };
  const PieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels: {
          color: '#666',
          usePointStyle: true,
          pointStyle: function (context) {
            return 'rectRounded';
          },
          boxHeight: 10,
          boxWidth: 10,
          padding: 8,
          borderWidth: 1,
          borderColor: '#666',
          useBorderRadius: true,
          borderRadius: 2,
        },
      },
      datalabels: {
        display: true,
        color: '#ffffff',
        font: {
          size: 12,
          style: 'normal',
          weight: '400',
        },
      },
    },
  };

  const chartOptions = {
    responsive: true,

    elements: {
      line: {
        fill: false,
        tension: 0.01,
        borderWidth: 2,
      },
      point: {
        radius: 0,
        hoverRadius: 4,
      },
    },

    scales: {
      x: {
        border: {
          display: true,
        },
        grid: {
          color: 'rgb(0, 0, 0, 0.02)',
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: formatNumber,
          font: {
            size: 12,
          },
        },
        border: {
          display: true,
        },
        grid: {
          color: 'rgb(0, 0, 0, 0.02)',
        },
        gridLines: {
          color: 'red',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'end',
        labels: {
          color: '#666',
          usePointStyle: true,
          pointStyle: function () {
            return 'rectRounded';
          },
          boxHeight: 8,
          boxWidth: 16,
          padding: 5,
          borderWidth: 1,
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
      datalabels: {
        display: false,
        labels: {
          display: true,
        },
      },
    },
  };

  const data = {
    labels: Array.from({ length: 40 }, (_, i) => i + 1),
    pv: Array.from({ length: 40 }, () => Math.floor(Math.random() * 1000)),
    uv: Array.from({ length: 40 }, () => Math.floor(Math.random() * 1000)),
  };

  const panels = [
    {
      title: 'Budget',
      content: (
        <PieDoug
          data={piechartData}
          options={PieOptions}
          width={10}
          height={10}
        />
      ),
    },
    {
      title: 'Evolution Taux de conso.',
      content: <Line data={chartData} options={chartOptions} />,
    },
    {
      title: 'Status projet',
      content: <HorizontalBarChart2 chartData={data_ParcMobile} />,
    },
    /* {
      title: 'conso',
      content: <VerticalBarChart chartData={data_ParcMobile} />,
    }, */
  ];

  const panelsPro = [
    {
      title: 'conso',
      content: <HorizontalBarChart2 chartData={data_ParcMobile} />,
    },
    {
      title: 'conso annuel',
      content: (
        <PieDoug
          data={piechartData}
          options={PieOptions}
          width={10}
          height={10}
        />
      ),
    },
    {
      title: 'conso mesuel',
      content: <Line data={chartData} options={chartOptions} />,
    },
    {
      title: 'conso annuel',
      content: <VerticalBarChart chartData={data_ParcMobile} />,
    },
  ];

  const panelsTitles = [
    {
      title: 'Projet',
      content: <NameKpiWithChart kpis={kpis} panels={panels} />,
    },
    {
      title: 'Programme',
      content: <NameKpiWithChart kpis={kpis} panels={panelsPro} />,
    },
  ];

  const panelsTitlesV2 = [
    {
      title: 'Plan',
      content: <NameKpiWithChart kpis={kpis} panels={panels} />,
    },
    {
      title: 'Directive',
      content: <NameKpiWithChart kpis={kpis} panels={panels} />,
    },
  ];

  /* const handleViewDetails = () => {
    router.push('dashboard/details/' + selectedWeek)
  } */

  /* if (typeof window !== "undefined") {
    const height = window.innerHeight;
  } */

  return (
    <DashboardLayout activeMenu={'account-dmgp'}>
      <Stack
        mt={6}
        w={'100%'}
        bg="#cbd5e1"
        borderColor="#bfbfbf"
        h={'calc(100vh - 20px)'}
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
              subtitle={'/ IGE'}
            />
          </Box>

          <Box mr={5} ml={2}>
            <HStack spacing={0}>
              <Box mr={2}>
                <ButtonItem title={'Ajouter Faits marquants'} />
              </Box>{' '}
              {/* HStack will align the buttons horizontally */}
              {filters.map((filter, index) => (
                <FilterButton
                  key={index}
                  label={filter}
                  isSelected={selectedFilter === filter}
                  onClick={() => setSelectedFilter(filter)}
                />
              ))}
            </HStack>
          </Box>
        </HStack>
        <Stack p={3} mt={6} w="100%">
          <Grid
            templateColumns={{ base: 'repeat(4, 1fr)', md: 'repeat(4, 1fr)' }}
            gap={2.5}
          >
            <GridItem
              rowSpan={1}
              colSpan={{ base: 1, md: 4 }}
              bg="gray.300"
              borderRadius="lg"
            >
              <SimpleGrid columns={{ base: 2, md: 3, lg: 5 }} spacing={'2'}>
                <FollowerCount
                  title={<TagTitleKpiCard title="Projet" />}
                  kpi={1000}
                  vplus={'Voir plus'}
                  onViewDetails={handleViewDetails}
                />
                <FollowerCount
                  title={<TagTitleKpiCard title="Programme" />}
                  kpi={2000}
                  vplus={'Voir plus'}
                  onViewDetails={handleViewDetails}
                />
                <FollowerCount
                  title={<TagTitleKpiCard title="Plan" />}
                  kpi={3000}
                  vplus={'Voir plus'}
                  onViewDetails={handleViewDetails}
                />
                <FollowerCount
                  title={<TagTitleKpiCard title="Directive" />}
                  kpi={4000}
                  vplus={'Voir plus'}
                  onViewDetails={handleViewDetails}
                />
                <FollowerCount
                  title={<TagTitleKpiCard title="Action" />}
                  kpi={5000}
                  vplus={'Voir plus'}
                  onViewDetails={handleViewDetails}
                />
              </SimpleGrid>
            </GridItem>
            <GridItem
              rowSpan={2}
              colSpan={{ base: 1, md: 2 }}
              bg="gray.300"
              borderRadius="lg"
            >
              <Box
                border="1px solid"
                borderColor="gray.200"
                borderRadius="lg"
                p={3}
                bg="#f1f5f9"
              >
                <ShowPanel panels={panelsTitles} />
              </Box>
            </GridItem>
            <GridItem
              border="1px solid"
              borderColor="gray.200"
              borderRadius="lg"
              p={2}
              bg="#f1f5f9"
              rowSpan={2}
              colSpan={{ base: 1, md: 2 }}
            >
              <Box width={'100%'} height={'90%'} p={0}>
                {/*<SenegalMap />*/}
                <SenegalGoogleMap />
                
              </Box>
            </GridItem>
            <GridItem
              rowSpan={2}
              colSpan={{ base: 1, md: 2 }}
              bg="gray.300"
              borderRadius="lg"
            >
              <Box
                border="1px solid"
                borderColor="gray.200"
                borderRadius="lg"
                p={3}
                bg="#f1f5f9"
              >
                <ShowPanel panels={panelsTitlesV2} />
              </Box>
            </GridItem>
            <GridItem
              rowSpan={2}
              colSpan={{ base: 1, md: 2 }}
              bg="#f1f5f9"
              borderRadius="lg"
              p={4}
              overflow="auto"
              css={scroll_customize}
            >
              <Stack mt={0}>
                <HightlightHeader status={DefaultHighlightstatus} />
              </Stack>

              {/* <Divider mb={3} mt={3} /> */}
              <HStack
                mt={3}
                mb={3}
                justifyContent={'space-between'}
                bg="#f1f5f9"
              >
                <Box>
                  <Box mr={1} bg={'#fff'} borderRadius={6}>
                    <Select
                      width={'15rem'}
                      type="text"
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                      <option key="all" value="all">
                        Tous les faits marquants
                      </option>
                      {statusList.map((option, index) => (
                        <option key={index} value={option.name}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                  </Box>
                </Box>
              </HStack>
              <Stack mt={2}>
                {simulatedData.map((highlight, i) =>
                  displayHighlight(highlight, i)
                )}
              </Stack>
            </GridItem>
          </Grid>
        </Stack>
      </Stack>
    </DashboardLayout>
  );
}

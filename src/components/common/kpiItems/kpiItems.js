import {
  Box,
  Grid,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { ShowPanel } from '../tabs';

export const NameKpiWithChart = ({ kpis, panels }) => {
  return (
    <Box borderRadius="md" p={2} bg="white">
      <Box mb={1}>
        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
          {kpis.map((kpi, index) => (
            <Box>
              <KpiCardOnly
                key={index}
                label={kpi.label}
                value={kpi.value}
                change={kpi.change}
                isPositive={kpi.isPositive}
              />
            </Box>
          ))}
        </Grid>
      </Box>
      <Box>
        <ShowPanel panels={panels} />
      </Box>
    </Box>
  );
};

export const KpiCardOnly = ({ label, value, change, isPositive }) => (
  <Stat
    p={4}
    border="1px solid"
    borderColor="gray.200"
    borderRadius="md"
    bg="white"
  >
    <StatLabel fontSize="sm" color="gray.500">
      {label}
    </StatLabel>
    <StatNumber fontSize="2xl" fontWeight="bold">
      {value}
    </StatNumber>
    <StatHelpText fontSize="sm">
      <StatArrow type={isPositive ? 'increase' : 'decrease'} />
      {change}%
    </StatHelpText>
  </Stat>
);

export const TagTitleKpiCard = ({ title, mBottom, content }) => {
  return (
    <Box fontWeight="600" fontSize={14} mb={mBottom}>
      {title}
    </Box>
  );
};

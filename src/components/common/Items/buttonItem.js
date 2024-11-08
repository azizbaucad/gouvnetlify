import { Box, Button } from '@chakra-ui/react';

export const ButtonItem = ({
  title,
  onClick,
  disabled = false,
  w,
  colorborder,
}) => {
  return (
    <Button
      w={w}
      bgColor={'gray.100'} // #3c8484
      borderRadius={'5px'}
      color={'gray.800'}
      h={'2.5rem'}
      type="submit"
      border={`1px solid ${colorborder}`}
      disabled={disabled}
      fontWeight={500}
      _hover={{
        bgColor: '#dfe5ed',
        color: 'gray.800',
      }}
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

export const FilterButton = ({ label, isSelected, onClick }) => {
  return (
    <Box
      ml={2}
      mr={-4}
      mt={3}
      mb={2}
      bgColor={isSelected ? '#fff' : 'gray.100'}
      borderRadius={'md'}
      //p={1}
      border={isSelected ? '1px solid #47b199' : 'none'}
      onClick={onClick}
    >
      <ButtonItem
        title={label}
        onClick={onClick}
        w={'full'}
        disabled={false}
        bgColor={isSelected ? '#47b199' : '#fff'}
        color={isSelected ? '#fff' : '#1a202c'}
        borderRadius={'md'}
        h={'2.5rem'}
        _hover={{
          bgColor: isSelected ? '#000' : '#fff',
        }}
      />
    </Box>
  );
};

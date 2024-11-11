import { Box, Divider, HStack, VStack } from '@chakra-ui/react';
import { DashboardLink } from '@components/common/link/dashboard';
import { AvatarMenu } from '@components/func/user/Avatar';
import { colors, images, routes } from '@theme';
import Image from 'next/image';
import {
  AiFillAppstore,
  AiFillBank,
  AiFillHome,
  AiFillShop,
  AiOutlineComment,
  AiOutlineDesktop,
  AiOutlineFileZip,
} from 'react-icons/ai';
import { PiArrowsLeftRightBold } from 'react-icons/pi';
import { FaMoneyCheck, FaNetworkWired, FaSellsy, FaUser } from 'react-icons/fa';
import { BsPersonHeart } from 'react-icons/bs';
import { RiShakeHandsFill } from 'react-icons/ri';
import { scroll_customize_side } from '@components/common/styleprops';
import { MdOutlineScreenSearchDesktop } from 'react-icons/md';
import { CgRowFirst } from 'react-icons/cg';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { HiHome, HiOutlineHome, HiShoppingBag, HiUser } from 'react-icons/hi2';
import { FcLineChart } from 'react-icons/fc';
import { useEffect, useState } from 'react';

export const Sidebar = ({ activeLink }) => {
  const [userAuthToken, setUserAuthToken] = useState(null);

  useEffect(() => {
    //verifier si localStorage est disponible cote client
    const token = localStorage.getItem('fakeAuthToken');
    setUserAuthToken(token);
  }, []);

  const menus = [
    {
      name: 'Présidence',
      icon: <HiHome fontSize={20} color="#fff" mt={1} />,
      active: 'null',
      url: null,
      subMenus: [
        { name: 'Synthèse', active: 'ofms', url: routes.pages.ofms.initial },
        { name: 'IGE', active: 'dmgp', url: routes.pages.dmgp.initial },
        {
          name: 'ITIE',
          active: 'desc',
          url: routes.pages.desc.initial,
        },
      ],
    },
    {
      name: 'BO',
      icon: <HiUser fontSize={20} color="#fff" mt={1} />,
      active: 'null',
      url: null,
      subMenus: [
        {
          name: 'Back Office',
          active: 'dashboard',
          url: routes.pages.dashboard.initial,
        },

        /* { name: 'Primature', active: 'dmgp', url: routes.pages.dmgp.initial }, */
      ],
    },
    /*   {
      name: 'Présidence',
      icon: <HiShoppingBag fontSize={20} color="#fff" mt={1} />,
      active: 'null',
      url: null,
      subMenus: [
        {
          name: 'Programme',
          active: 'programme',
          url: routes.pages.programme.initial,
        },
        { name: 'Plan', active: 'plan', url: routes.pages.plan.initial },
        {
          name: 'Directive',
          active: 'directive',
          url: routes.pages.directive.initial,
        },
        { name: 'Projet', active: 'projet', url: routes.pages.projet.initial },
        { name: 'Action', active: 'action', url: routes.pages.action.initial },
      ],
    }, */
  ];

  // Filter menu in token function
  const filteredMenus = menus.filter((menu) => {
    if (userAuthToken === 'fakeToken123' && menu.name === 'Présidence') {
      return true;
    }
    if (userAuthToken === 'fakeTokenBOO' && menu.name === 'BO') {
      return true;
    }
    return false;
  });

  return (
    <Box h={'100%'}>
      <VStack
        bg={colors.primary.side_gray}
        alignItems={'start'}
        h={'100%'}
        w={'12.5vw'}
        position={'fixed'}
      >
        <Box h={59} w={59} pos={'relative'} mb={2} mt={3} ml={16}>
          <Image {...images.logo} alt={'logo'} fill />
        </Box>
        <Divider borderColor={'#d7dce6'} mb={3} mt={1} size={'lg'} w={'100%'} />
        <VStack
          spacing={0}
          width={'100%'}
          alignItems={'start'}
          h={'calc(100vh - 160px)'}
          overflowY="auto"
          css={scroll_customize_side}
          ml={0}
          p={2}
        >
          {filteredMenus.map((menu, i) => (
            <>
              <Box key={i} w={'100%'}>
                <DashboardLink
                  redirectOn={menu.url}
                  active={activeLink?.activeOption == menu.active}
                  message={menu.name}
                  icon={menu.icon}
                  cursor="null"
                  colorMenu={colors.primary.white}
                />
                {menu.subMenus && (
                  <VStack ml={5} spacing={0}>
                    {menu.subMenus.map((subMenu, j) => (
                      <DashboardLink
                        key={j}
                        redirectOn={subMenu.url}
                        active={activeLink?.activeOption == subMenu.active}
                        message={subMenu.name}
                        icon={null}
                      />
                    ))}
                  </VStack>
                )}
              </Box>
              {/* 
                {(i === 1) && (
                  <Divider borderColor={'gray.400'} mt={7} mb={7 } w={'100%'} />
                )} */}
            </>
          ))}
        </VStack>
        <Box marginBottom={4} pos={'relative'} ml={16} p={2}>
          <AvatarMenu />
        </Box>
      </VStack>
    </Box>
  );
};

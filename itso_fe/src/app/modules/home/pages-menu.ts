import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Trang chủ',
    icon: 'home-outline',
    link: '/home/dashboard',
    home: true,
  },
  {
    title: 'Tính năng',
    group: true,
  },
  {
    title: 'Nhân sự',
    icon: 'person-outline',
    link: '/home/employee',
  },
  {
    title: 'Hợp đồng',
    icon: 'person-outline',
    link: '/home/contract',
  },
  {
    title: 'Transfer',
    icon: 'globe-2-outline',
    link: '/home/transfer',
  },
  {
    title: 'CheckPoint',
    icon: 'home-outline',
    link: '/home/checkpoint',
  },
];

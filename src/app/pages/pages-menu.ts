import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'صفحه اصلی',
    icon: 'nb-home',
    link: '/dashboard',
    home: true,
  },
  {
    title:"تور",
    icon:"nb-paper-plane",
    children:[
      {
        title:"لیست تورها",
        link:"/pages/tour/list",
        icon:"nb-compose"
      }
    ]
  }
];

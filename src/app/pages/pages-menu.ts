export const MENU_ITEMS = [
  {
    title: 'homePage',
    icon: 'home',
    link: '/pages/tour/list',
    home: true,
  },
  {
    title: 'tour.list',
    icon: 'view_list',
    link: '/pages/tour/list',
    children: [
      {
        title: 'tourList',
        link: '/pages/tour/list',
        icon: 'view_list'
      }
    ]
  },
  {
    title: 'contactList',
    icon: 'account_circle',
    link: '/pages/person/leader/list',
    children: [
      {
        title: 'personel',
        link: '/pages/person/leader/list',
        icon: 'account_circle'
      }
    ]
  }
];

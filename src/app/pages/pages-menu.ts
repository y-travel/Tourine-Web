export const MENU_ITEMS = [
  {
    title: "homePage",
    icon: 'home',
    link: '/dashboard',
    home: true,
  },
  {
    title: "tour.list",
    icon: "view_list",
    link: "/pages/tour/list",
    children: [
      {
        title: "tourList",
        link: "/pages/tour/list",
        icon: "view_list"
      }
    ]
  }
];

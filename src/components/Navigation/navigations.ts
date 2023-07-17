type Navigation = {
  id: number;
  name: string;
  path: string;
};

export const navigations: Navigation[] = [
  {
    id: 1,
    name: "Home",
    path: "/",
  },
  {
    id: 2,
    name: "Edit",
    path: "/edit",
  },
  {
    id: 3,
    name: "List",
    path: "/list",
  },
];

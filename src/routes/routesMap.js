import HomeView from 'view/home'
import List from 'view/list'
import Detail from 'view/detail'
export default [
  {
    exact: true,
    name: 'home',
    path: '/',
    component: HomeView,
  },
  {
    exact: true,
    name: 'list',
    path: '/list',
    component: List,
  },
  {
    exact: true,
    name: 'detail',
    path: '/detail/:id',
    component: Detail,
  },
]

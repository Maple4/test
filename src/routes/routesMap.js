import HomeView from 'view/home'
import List from 'view/list'
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
  }
]

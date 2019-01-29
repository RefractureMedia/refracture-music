import Songs from '@/pages/Library/Songs';
import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router)

export default new Router({
  routes: [{
      path: '*',
      redirect: '/Library'
    },

    /* =============== Library =============== */
    {
      path: '/Library',
      redirect: '/Library/Songs'
    },
    {
      path: '/Library/Songs',
      name: 'Songs',
      component: Songs
    },
    {
      path: '/Library/Playlists',
      name: 'Playlist',
      component: require('@/pages/Library/Playlists').default
    },
    {
      path: '/Library/Artists',
      name: 'Artists',
      component: require('@/pages/Library/Artists').default
    },
    {
      path: '/Library/Albums',
      name: 'Albums',
      component: require('@/pages/Library/Albums').default
    },

    /* =============== Library END =============== */
    /* =============== Browse =============== */
    {
      path: '/Browse',
      redirect: '/Browse/Search'
    },
    {
      path: '/Browse/Search',
      name: 'Browse',
      component: require('@/pages/Browse/Search').default
    },
    {
      path: '/Browse/Feed',
      name: 'Feed',
      component: require('@/pages/Browse/Feed').default
    },
    {
      path: '/Browse/Popular',
      name: 'Browse',
      component: require('@/pages/Browse/Popular').default
    },
    /* =============== Browse END =============== */
    {
      path: '/Visualizer',
      name: 'Visualizer',
      component: require('@/pages/Visualizer').default
    }
  ]
})

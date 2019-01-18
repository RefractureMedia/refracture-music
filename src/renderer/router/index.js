import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/library'
    },

    /* =============== LIBRARY =============== */
    {
      path: '/library',
      redirect: '/library/songs'
    },
    {
      path: '/library/songs',
      name: 'library',
      component: require('@/pages/Library/Songs').default
    },
    {
      path: '/library/playlists',
      name: 'playlist',
      component: require('@/pages/Library/Playlists').default
    },
    {
      path: '/library/artists',
      name: 'artists',
      component: require('@/pages/Library/Artists').default
    },
    {
      path: '/library/albums',
      name: 'albums',
      component: require('@/pages/Library/Albums').default
    },

    /* =============== LIBRARY END =============== */
    /* =============== BROWSE =============== */
    {
      path: '/browse',
      redirect: '/browse/search'
    },
    {
      path: '/browse/search',
      name: 'browse',
      component: require('@/pages/Browse/Search').default
    },
    {
      path: '/browse/feed',
      name: 'feed',
      component: require('@/pages/Browse/Feed').default
    },
    {
      path: '/browse/popular',
      name: 'browse',
      component: require('@/pages/Browse/Popular').default
    }
    /* =============== BROWSE END =============== */
  ]
})

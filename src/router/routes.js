
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'dashboard', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/auth',
    component: () => import('layouts/login.vue'),
    meta: { guest: true },
    children: [
      { path: 'login', component: () => import('pages/loginuser/loginpetani.vue') },
      { path: 'registrasi', component: () => import('pages/loginuser/registrasipetani.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: 'supplier', component: () => import('pages/master_supplier/index.vue') },
      { path: 'suppl/add', component: () => import('pages/master_supplier/insert.vue') },
      { path: 'suppl/edit/:id', component: () => import('pages/master_supplier/insert.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: 'pupuk', component: () => import('pages/pupuk/index.vue') },
      { path: 'pupuk/add', component: () => import('pages/pupuk/insert.vue') },
      { path: 'pupuk/edit/:id', component: () => import('pages/pupuk/insert.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: 'petani', component: () => import('pages/petani/index.vue') },
      { path: 'petani/add', component: () => import('pages/petani/insert.vue') },
      { path: 'petani/edit/:id', component: () => import('pages/petani/insert.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: 'lahan', component: () => import('pages/lahan/index.vue') },
      { path: 'lahan/add', component: () => import('pages/lahan/insert.vue') },
      { path: 'lahan/edit/:id', component: () => import('pages/lahan/insert.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes

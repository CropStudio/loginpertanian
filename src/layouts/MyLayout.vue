<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-green-6" style="left: 250px;">
      <q-toolbar>
        <q-btn
                flat
                dense
                round
                @click="leftDrawerOpen = !leftDrawerOpen"
                aria-label="Menu"
        >
          <q-icon name="menu"/>
        </q-btn>

        <q-toolbar-title>Pertanian App</q-toolbar-title>
        <q-btn @click="logout" flat round dense icon="exit_to_app" class="q-mr-xs">
          <q-tooltip>Logout disini..</q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" :width="250" :breakpoint="400">
      <q-scroll-area
              style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd"
      >
        <q-list padding>
          <q-item to="/" clickable v-ripple exact>
            <q-item-section avatar>
              <q-icon name="account_balance"></q-icon>
            </q-item-section>
            <q-item-section>Dashboard</q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/petani">
            <q-item-section avatar>
              <q-icon name="people"></q-icon>
            </q-item-section>
            <q-item-section>Petani</q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/supplier">
            <q-item-section avatar>
              <q-icon name="supervised_user_circle"></q-icon>
            </q-item-section>
            <q-item-section>Supplier</q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/lahan">
            <q-item-section avatar>
              <q-icon name="landscape"></q-icon>
            </q-item-section>
            <q-item-section>Lahan</q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/pupuk">
            <q-item-section avatar>
              <q-icon name="invert_colors"></q-icon>
            </q-item-section>
            <q-item-section>Pupuk</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
      <q-img
              class="absolute-top"
              src="statics/image/download.jpg"
              style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm bg-white">
            <img src="statics/image/user.jpg">
          </q-avatar>
          <div class="text-weight-bold">Jennie</div>
          <div>jejen@gmail.com</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop || false
    }
  },
  methods: {
    openURL,
    logout: function () {
      this.$store.dispatch('user/logout').then(() => {
        this.$router.go('pages/loginuser/loginpetani.vue')
      })
    }
  },
  computed: {
    user () {
      return this.$store.state.user.user
    }
  },
  mounted () {
    // console.log(this.$store.state.user)
  }
}
</script>

<style>
</style>

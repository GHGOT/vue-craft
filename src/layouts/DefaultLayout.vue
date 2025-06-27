<template>
  <v-app>
    <AppHeader @toggle-drawer="drawerOpen = !drawerOpen" />
    <AppDrawer v-model="drawerOpen" />
    <v-main>
      <router-view />
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script setup>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppDrawer from '@/components/layout/AppDrawer.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { ref } from 'vue'

const drawerOpen = ref(true)
</script>
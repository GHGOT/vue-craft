<template>
  <v-app-bar color="primary" dark>
    <v-app-bar-nav-icon @click="$emit('toggle-drawer')" />
    <v-toolbar-title>내 Vue 프로젝트</v-toolbar-title>
    <v-spacer />
    <v-btn icon>
      <v-icon>mdi-account</v-icon>
    </v-btn>
  </v-app-bar>
</template>
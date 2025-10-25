<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-space />
        <q-tabs v-model="tab" dense align="center">
          <q-route-tab to="/" label="Главная" />
          <q-route-tab to="/calculator" label="Калькулятор" />
          <q-route-tab to="/guessNumber" label="Угадай число" />
        </q-tabs>
        <q-space />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title class="text-center text-caption">
         ARC 2025 ваши права не защищены
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tab = ref('')
</script>

<style scoped>
.q-toolbar__title {
  font-size: 1.2rem;
}
</style>

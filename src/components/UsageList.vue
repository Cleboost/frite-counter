<template>
  <ion-item v-if="date" :detail="false" class="list-item">
    <ion-label class="ion-text-wrap">
      <h3>{{ date }}</h3>
    </ion-label>
  </ion-item>
</template>

<script setup lang="ts">
import { IonItem, IonLabel } from '@ionic/vue';

defineProps({
  date: String,
});

const isIos = () => {
  const win = window as any;
  return win && win.Ionic && win.Ionic.mode === 'ios';
};
</script>
<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/home">
          <ion-icon :icon="home" />
          <ion-label>Gestionnaire</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="radio" href="/recipe">
          <ion-icon :icon="pizza" />
          <ion-label>Recettes</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="library" href="/settings">
          <ion-icon :icon="settings" />
          <ion-label>Paramètre</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="search" href="/credit">
          <ion-icon :icon="newspaper" />
          <ion-label>Credit</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon } from '@ionic/vue';

import { home, pizza, settings, newspaper } from 'ionicons/icons';

export default {
  components: { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon },
  data() {
    return {
      home,
      pizza,
      settings,
      newspaper,
    };
  },
};
</script>
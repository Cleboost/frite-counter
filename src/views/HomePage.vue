<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonLabel,
  IonItem,
  IonFabButton,
  IonFab,
  IonAlert,
} from '@ionic/vue';
import { add } from "ionicons/icons";
import { ref } from "vue";
import { onMounted } from 'vue';

const list = ref(<number[]>[]);
const showResetPop = ref(false);
const resetPopButtons = [
  {
    text: "Annuler l'ajout",
    role: 'cancel',
    handler: () => {
      console.log('Annuler l\'ajout');
    },
  },
  {
    text: 'Reset',
    role: 'confirm',
    handler: () => {
      resetList();
    },
  },
];

onMounted(() => {
  const savedList = localStorage.getItem('list');
  if (savedList) {
    list.value = JSON.parse(savedList);
  }
});

const saveList = () => {
  localStorage.setItem('list', JSON.stringify(list.value));
};

const resetList = () => {
  list.value = [];
  saveList();
};

const addUsage = () => {
  if (list.value.length >= 9) {
    showResetPop.value = true;
  } else {
    const newItem = list.value.length + 1;
    list.value.push(newItem);
    saveList();
  }
};

const refresh = (ev: CustomEvent) => {
  setTimeout(() => {
    ev.detail.complete();
  }, 3000);
};

const resetPopResult = (event: any) => {
  if (event.detail.role === 'confirm') {
    resetList();
  }
  showResetPop.value = false;
};
</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Liste de vos utilisations</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="refresh">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Liste de vos utilisations</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list>
        <ion-item v-for="message in list" :key="message">
          <ion-label>
            <h2>{{ message }}</h2>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>

    <ion-fab slot="fixed" vertical="bottom" horizontal="end" @click="addUsage">
      <ion-fab-button>
        <ion-icon :icon="add"/>
      </ion-fab-button>
    </ion-fab>

    <ion-alert
        v-model="showResetPop"
        header="Alerte !"
        :buttons="resetPopButtons"
        @ionAlertDidDismiss="resetPopResult"
    ></ion-alert>
  </ion-page>
</template>
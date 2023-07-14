<script setup lang="ts">
import {IonHeader, IonPage, IonTitle, IonToolbar, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle} from "@ionic/vue";

const helperList = [
  {
    "name": "Cleboost",
    "role": "Développement",
    "avatar": "https://cleboost.ovh/assets/images/avatar.svg",
    "description": "Merci à Cleboost pour avoir developpé cette application."
  },
  {
    "name": "Fred",
    "role": "Tests & Idées",
    "avatar": "https://ionicframework.com/docs/img/demos/card-media.png",
    "description": "Merci à Fred pour avoir fait les tests et donné des idées."
  },
  {
    "name": "JCLAP",
    "role": "Recettes",
    "avatar": "https://ionicframework.com/docs/img/demos/card-media.png",
    "description": "Merci à JCLAP pour avoir donné les recettes."
  }
]
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Credit</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card v-for="helper in helperList">
        <img alt="Cleboost Logo" v-bind:src="helper.avatar" height="128"/>
        <ion-card-header>
          <ion-card-title>{{ helper.name }}</ion-card-title>
          <ion-card-subtitle>{{ helper.role }}</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
          {{ helper.description }}
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<style scoped>
img {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
</style>
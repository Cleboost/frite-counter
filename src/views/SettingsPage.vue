<script setup lang="ts">
import {
  alertController,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent, IonHeader,
  IonPage, IonTitle,
  IonToolbar,
  InputCustomEvent,
  IonToggle, ToggleCustomEvent,
} from "@ionic/vue";
import {Ref, ref, UnwrapRef } from "vue";
import {getVersionApp} from "../data/version";

let versionChecker: Ref<UnwrapRef<string>> = ref('Aucune mise a jour disponible');

let famillyCode: Ref<UnwrapRef<string>> = ref(localStorage.getItem("famillyCode") == null ? "Aucun code" : localStorage.getItem("famillyCode")!);



fetch('https://raw.githubusercontent.com/Cleboost/frite-counter/main/package.json').then(response => response.json()).then(async data => {
      if (getVersionApp() != data.version) {
        versionChecker = ref('Une mise a jour est disponible !');
      } else {
        versionChecker = ref('Aucune mise a jour disponible');
      }
    })
    .catch(error => {
      console.log('Une erreur s\'est produite lors de la récupération du fichier JSON :', error);
    });

const createFamilly = () => {
  localStorage.setItem("famillyState", "true");
  localStorage.setItem("famillyCode", Math.random().toString(36).substring(2, 6) + Math.random().toString(36).substring(2, 6));
  const famillyCode = localStorage.getItem("famillyCode");
  if (famillyCode !== null) {
    localStorage.setItem("famillyCode", famillyCode.toUpperCase());
  }

  location.reload();
};

const onAnimationChange = (event: ToggleCustomEvent) => {
  if (event.detail.checked) {
    localStorage.setItem("animations", "true");
  } else {
    localStorage.setItem("animations", "false");
  }
}
</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Paramètres</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-card>
        <ion-card-header>
          <ion-card-title>Version</ion-card-title>
          <!--<ion-card-subtitle>Test</ion-card-subtitle>-->
        </ion-card-header>
        <ion-card-content>{{ versionChecker }}</ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-title>Accessibilité</ion-card-title>
          <ion-card-subtitle>Paramètre pour personne sensible</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <ion-toggle :enable-on-off-labels="true" @ionChange="onAnimationChange($event)">Annimations simplifié</ion-toggle><br>
          <ion-toggle :enable-on-off-labels="true" :checked="true" :disabled="true">Soon...</ion-toggle>
        </ion-card-content>
      </ion-card>
      <ion-card>
        <ion-card-header>
          <ion-card-title>Données</ion-card-title>
          <ion-card-subtitle>Paramètre pour personne sensible</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <ion-toggle :enable-on-off-labels="true" @ionChange="onAnimationChange($event)">Annimations simplifié</ion-toggle>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<style scoped>
ion-card-content {
  display: flex;
  flex-direction: column;
}
</style>
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
  IonToolbar
} from "@ionic/vue";
import {Ref, ref, UnwrapRef} from "vue";
import {getVersionApp} from "../data/version";
let versionChecker: Ref<UnwrapRef<string>> = ref('En cours de vérification...');

fetch('https://raw.githubusercontent.com/Cleboost/frite-counter/main/package.json').then(response => response.json()).then(async data => {
      console.log(data.version);
      if (getVersionApp() != data.version) {
        versionChecker = ref('Une mise a jour est disponible !');
      } else {
        versionChecker = ref('Aucune mise a jour disponible');
      }
    })
    .catch(error => {
      console.log('Une erreur s\'est produite lors de la récupération du fichier JSON :', error);
    });
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
          <ion-card-title>Connexion famille</ion-card-title>
          <ion-card-subtitle>Connecter plusieurs téléphone avec la liste partagée !</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>Soon...</ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>
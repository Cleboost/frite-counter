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
  IonButton,
} from "@ionic/vue";
import {Ref, ref, UnwrapRef} from "vue";
import {getVersionApp} from "../data/version";
let versionChecker: Ref<UnwrapRef<string>> = ref('Aucune mise a jour disponible');

let noFamilly: Ref<UnwrapRef<boolean>> = ref(localStorage.getItem("famillyState") == null);
let famillyCode: Ref<UnwrapRef<string>> = ref(localStorage.getItem("famillyCode") == null ? "Aucun code" : localStorage.getItem("famillyCode"));
let localState = localStorage.getItem("famillyState")
let localCode = localStorage.getItem("famillyCode")

if (localStorage.getItem("famillyState") != null) {
  noFamilly = ref(false);
}

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

const createFamilly = () => {
  localStorage.setItem("famillyState", "true");
  localStorage.setItem("famillyCode", Math.random().toString(36).substring(2, 8) + Math.random().toString(36).substring(2, 8));
  localStorage.setItem("famillyCode", localStorage.getItem("famillyCode").toUpperCase());
  noFamilly = ref(false)
  location.reload();
};

const joinFamilly = async () => {
  const alert = await alertController.create({
    header: 'Famille',
    subHeader: 'Rejoindre une famille',
    message: 'Entrez ci dessous le code de la famille.',
    buttons: ['Rejoindre'],
    inputs: [
      {
        name: 'code',
        type: 'text',
        placeholder: 'Code de la famille',
      }
    ]
  });

  await alert.present();

  alert.onDidDismiss().then((data) => {
    data.data.values.code = data.data.values.code.toUpperCase();
    if (data.data.values.code != null) {
      localStorage.setItem("famillyState", "true");
      localStorage.setItem("famillyCode", data.data.values.code);
      noFamilly = ref(false)
      location.reload();
    }
  });
};

const leaveFamilly = () => {
  localStorage.removeItem("famillyState");
  localStorage.removeItem("famillyCode");
  noFamilly = ref(true)
  location.reload();
};
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
        <ion-card-content>Votre code de famille : {{ famillyCode }}</ion-card-content>
        <!--<ion-card-content>{{ localCode }} || {{ localState }}</ion-card-content>-->
        <ion-button fill="clear" @click="createFamilly()" v-if="noFamilly">Creer famille</ion-button>
        <ion-button fill="clear" @click="joinFamilly()" v-if="noFamilly">Rejoinder famille</ion-button>
        <ion-button fill="clear" @click="leaveFamilly()" v-else>Quitter famille</ion-button>
      </ion-card>
    </ion-content>
  </ion-page>
</template>
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
  IonAlert, onIonViewWillEnter, alertController,
} from '@ionic/vue';
import { add } from "ionicons/icons";
import { ref } from "vue";
import { onMounted } from 'vue';
import {getVersionApp} from "@/data/version";

const versionApp = getVersionApp();
const textUsage = localStorage.getItem("famillyState") == "true" ? "Liste des utilisations familliale" : "Lise de vos utilisations";
const list = ref(<string[]>[]);
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
  loadFirstList();
});

const saveList = () => {
  localStorage.setItem('list', JSON.stringify(list.value));
};

const resetList = () => {
  if (localStorage.getItem("famillyState") == "true") {
    fetch("https://download.cleboost.ovh/frite/api/reset.php?code="+localStorage.getItem("famillyCode"))
        .then(response => response.json())
        .then(data => {
          list.value = data;
        });
  } else {
    list.value = [];
    saveList();
  }
};

const addUsage = () => {
  if (localStorage.getItem("famillyState") == "true") {
    fetch("https://download.cleboost.ovh/frite/api/get.php?code="+localStorage.getItem("famillyCode"))
        .then(response => response.json())
        .then(data => {
          if (data.length >= 10) {
            showResetPop.value = true;
          } else {
            fetch("https://download.cleboost.ovh/frite/api/index.php?code="+localStorage.getItem("famillyCode"))
                .then(response => response.json())
                .then(data => {
                  const date = new Date();
                  const newItem = (date.toLocaleDateString() + ' ' + date.toLocaleTimeString()).toString();
                  list.value.push(newItem);
                });
          }
        });
  } else {
    if (list.value.length >= 10) {
      showResetPop.value = true;
    } else {
      const date = new Date();
      const newItem = (date.toLocaleDateString() + ' ' + date.toLocaleTimeString()).toString();
      list.value.push(newItem);
      saveList();
    }
  }
};

const loadFirstList = () => {
  if (localStorage.getItem("famillyState") == "true") {
    fetch("https://download.cleboost.ovh/frite/api/get.php?code="+localStorage.getItem("famillyCode"))
        .then(response => response.json())
        .then(data => {
          list.value = data;
        });
  } else {
    const savedList = localStorage.getItem('list');
    if (savedList) {
      list.value = JSON.parse(savedList);
    }
  }
};

const refresh = (ev: CustomEvent) => {
  setTimeout(() => {
    loadFirstList();
    ev.detail.complete();
  }, 1000);
};

const resetPopResult = (event: any) => {
  if (event.detail.role === 'confirm') {
    resetList();
  }
  showResetPop.value = false;
};

onIonViewWillEnter(() => {
  console.log("Vérification de mise a jour...")
  fetch('https://raw.githubusercontent.com/Cleboost/frite-counter/main/package.json')
      .then(response => response.json())
      .then(async data => {
        // Utilisez les données JSON comme vous le souhaitez
        console.log(data.version);
        if (versionApp != data.version) {
          const alert = await alertController.create({
            header: 'Mise a jour !',
            subHeader: 'Une mise a jour est disponible.',
            message: '',
            buttons: ["Télécharger"],
          });

          await alert.present();

          alert.onDidDismiss().then(async () => {
            fetch('https://download.cleboost.ovh/frite/download.php')
                .then(response => response.blob())
                .then(blob => {
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'latest.apk';
                  a.click();
                  URL.revokeObjectURL(url);
                })
                .catch(error => {
                  console.error('Erreur lors du téléchargement du fichier :', error);
                });
          });
        } else {
          console.log("Aucune mise a jour disponible")
          loadFirstList();
        }
      })
      .catch(error => {
        console.log('Une erreur s\'est produite lors de la récupération du fichier JSON :', error);
      });
});
</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>{{ textUsage }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="refresh">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <ion-list>
        <ion-item v-for="message in list" :key="message">
          <ion-label>
            <h2><span style="font-weight: bold">{{ list.indexOf(message) + 1 }}.</span>    {{ message }}</h2>
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
        :is-open="showResetPop"
        header="Il est temps de changer l'huile !"
        message="Une friteuse ne peux faire que 10 utilisations de la meme huile."
        :buttons="resetPopButtons"
        @ionAlertDidDismiss="resetPopResult"
    ></ion-alert>
  </ion-page>
</template>
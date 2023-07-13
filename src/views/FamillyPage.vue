<script setup lang="ts">
import {
  IonContent, IonHeader,
  IonPage, IonTitle,
  IonToolbar,
  IonButton,
  IonCardSubtitle,
  IonCardTitle,
  IonCard,
  IonCardHeader,
  IonList,
  IonLabel,
  IonItem,
  alertController,
  IonCardContent
} from "@ionic/vue";
import {ref, onMounted, UnwrapRef, Ref } from "vue";
import QRCode from 'qrcode.vue';

const dropdownItems = ref([{id: 1, name: 'Chalon', code: "CHALON"}]);
const activeFamillyCode: Ref<UnwrapRef<string>> = ref(localStorage.getItem("famillyCode") == null ? "Aucun code" : localStorage.getItem("famillyCode")!);

onMounted(() => {
  loadList();
});

const loadList = () => {
  const list = localStorage.getItem("famillyList");
  if (list != null) {
    dropdownItems.value = JSON.parse(list);
  }
};
const isOpen: Ref<any> = ref();
const isOpenFamilly = (fId: number) => {
  if (isOpen.value == fId) {
    return true;
  } else {
    return false;
  }
};
const toggleDropdown = (itemId: number) => {
  isOpen.value = itemId;
};
const isActiveCode = (familyCode: string) => {
  if (activeFamillyCode.value == familyCode) {
    return true;
  } else {
    return true;
  }
};
const activeFamily = (familyCode: string) => {
  localStorage.setItem("familyCode", familyCode);
  activeFamillyCode.value = familyCode;
};
const createFamily = async () => {
    const alert = await alertController.create({
      header: 'Famille',
      subHeader: 'Créer une famille',
      message: 'Entrez ci dessous le nom de la famille que vous souhaitez créer.',
      buttons: ['Créer'],
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nom de la famille (seulement pour vous)',
        }
      ]
    });

    await alert.present();

    alert.onDidDismiss().then((data) => {
      data.data.values.code = Math.random().toString(36).substring(2, 6) + Math.random().toString(36).substring(2, 6);
      data.data.values.code = data.data.values.code.toUpperCase();
      if (data.data.values.name == null || data.data.values.name == "" || data.data.values.name == undefined) {
        data.data.values.name = "Sans nom";
      }
      if (data.data.values.code != null) {
        localStorage.setItem("famillyState", "true");
        let listFamilly = JSON.parse(localStorage.getItem("famillyList") || '[]') as Array<any>;

        let structur = { id: 1, name: 'Chalon', code: "" };
        structur.id = listFamilly.length + 1;
        structur.name = data.data.values.name;
        structur.code = data.data.values.code;

        listFamilly.push(structur);
        localStorage.setItem("famillyList", JSON.stringify(listFamilly));
        activeFamillyCode.value = data.data.values.code;
        localStorage.setItem("famillyCode", data.data.values.code);
        loadList();
      }
    });
};
const joinFamilly = async () => {
    const alert = await alertController.create({
      header: 'Rejoindre famille',
      subHeader: 'Methode de connexion',
      message: 'Choisissez la methode de connexion pour rejoindre une famille.',
      buttons: [{text: "QR code (in dev)", role: "QR"}, {text: "Code", role: "code"}],
    });
    await alert.present();
    alert.onDidDismiss().then(async (data) => {
      if (data.role == "QR") {

      } else if (data.role == "code") {
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
            },
            {
              name: 'name',
              type: 'text',
              placeholder: 'Nom de la famille (seulement pour vous)',
            }
          ]
        });

        await alert.present();

        alert.onDidDismiss().then((data) => {
          data.data.values.code = data.data.values.code.toUpperCase();
          if (data.data.values.name == null || data.data.values.name == "" || data.data.values.name == undefined) {
            data.data.values.name = "Sans nom";
          }
          if (data.data.values.code != null) {
            localStorage.setItem("famillyState", "true");
            let listFamilly = JSON.parse(localStorage.getItem("famillyList") || '[]') as Array<any>;

            let structur = { id: 1, name: 'Chalon', code: "" };
            structur.id = listFamilly.length + 1;
            structur.name = data.data.values.name;
            structur.code = data.data.values.code;

            listFamilly.push(structur);
            localStorage.setItem("famillyList", JSON.stringify(listFamilly));
            activeFamillyCode.value = data.data.values.code;
            localStorage.setItem("famillyCode", data.data.values.code);
            loadList();
          }
        });
      }
    });
};
const leaveFamilly = (famillyCode: string) => {
  let listFamilly = JSON.parse(localStorage.getItem("famillyList") || '[]') as Array<any>;
  listFamilly.forEach((item, index) => {
    if (item.code == famillyCode) {
      listFamilly.splice(index, 1);
    }
  });
  localStorage.setItem("famillyList", JSON.stringify(listFamilly));
  if (activeFamillyCode.value == famillyCode) {
    localStorage.setItem("famillyCode", "Aucun code");
    activeFamillyCode.value = "Aucun code";
  }
  if (listFamilly.length == 0) {
    localStorage.setItem("famillyState", "false");
  }
  loadList();
};
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Gestionnaire de familles</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card>
        <ion-card-header>
          <ion-card-title>Connexion famille</ion-card-title>
          <ion-card-subtitle>Connecter plusieurs téléphone avec la liste partagée !</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>Actif {{ activeFamillyCode }}</ion-card-content>
        <ion-button fill="clear" @click="createFamily()">Créer famille</ion-button>
        <ion-button fill="clear" @click="joinFamilly()">Rejoindre famille</ion-button>
      </ion-card>
      <ion-list inset>
        <ion-list v-for="family in dropdownItems">
          <ion-item>
            <ion-label>{{ family.name }}</ion-label>
            <ion-button slot="end" @click="toggleDropdown(family.id)">
              {{ isOpenFamilly(family.id) ? 'Fermer' : 'Infos' }}
            </ion-button>
            <ion-button slot="end" @click="activeFamily(family.code)">
              {{ isActiveCode(family.code) ? 'regdfgdfg' : 'Activer' }}
            </ion-button>
          </ion-item>
          <ion-list v-show="isOpenFamilly(family.id)" class="sublist">
            <QRCode :value="family.code" />
            <h6>Votre code de famille est {{ family.code }}</h6>
            <ion-item>
              <ion-button fill="clear" @click="">Partager</ion-button>
              <ion-button fill="clear" @click="leaveFamilly(family.code)">Supprimer</ion-button>
            </ion-item>
          </ion-list>
        </ion-list>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.sublist-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
}

.sublist {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
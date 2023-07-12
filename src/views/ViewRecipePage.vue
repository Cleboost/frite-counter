<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button :text="getBackButtonText()" default-href="/recipe"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" v-if="recipe">
      <ion-item>
        <ion-icon aria-hidden="true" :icon="personCircle" color="primary"></ion-icon>
        <ion-label class="ion-text-wrap">
          <h2>
            de {{recipe.author}}
            <span class="date">
              <ion-note>{{ recipe.time }} min</ion-note>
            </span>
          </h2>
          <!--<h3>To: <ion-note>Me</ion-note></h3>-->
        </ion-label>
      </ion-item>

      <div class="ion-padding">
        <h1>{{ recipe.title }}</h1>
        <p>
          {{ recipe.full_description }}
        </p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonToolbar,
} from '@ionic/vue';
import { personCircle } from 'ionicons/icons';
import { getRecipe } from "../data/recipes";

const getBackButtonText = () => {
  const win = window as any;
  const mode = win && win.Ionic && win.Ionic.mode;
  return mode === 'ios' ? 'Inbox' : '';
};

const route = useRoute();
const recipe = getRecipe(parseInt(route.params.id as string, 10));
</script>

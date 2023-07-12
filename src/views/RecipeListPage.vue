<script setup lang="ts">
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent, IonCardContent, IonCardSubtitle, IonCardTitle, IonCard, IonCardHeader,
} from '@ionic/vue';
import { getRecipes } from '../data/recipes';

const recipes = getRecipes();

</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Tips & Recettes</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-card v-for="recipe in recipes" :key="recipe.id" :routerLink="'/recipe/' + recipe.id">
        <ion-card-header>
          <ion-card-title>{{ recipe.title }}</ion-card-title>
          <ion-card-subtitle>⏱ {{recipe.time}} min de préparation</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>{{ recipe.small_description}}</ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>
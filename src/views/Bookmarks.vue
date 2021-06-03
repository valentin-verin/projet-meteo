<template>
    <ion-page>
        <Navbar :title="'bookmarks'"> </Navbar>

        

        <ion-content v-if="cities.length > 0">
            <BookmarkedElement
            v-for="(city, index) in cities"
            :key="index"
            :city="city.name"
            :tempMorning="'12,5°C'"
            :tempAfternoon="'21,5°C'"
            >
            </BookmarkedElement>
            <ion-button @click="deleteCity(cities[index])">
            <ion-icon slot="icon-only"></ion-icon>
        </ion-button>
        </ion-content>
    </ion-page>
</template>



<script>

import { IonPage, IonContent, IonIcon, IonButton } from "@ionic/vue";
import firebase from "firebase/app";
import cities from 'firebase'
import "firebase/firestore";
import { DATABASE_CONFIGURATION } from "@/config.js";
import Navbar from "./Navbar";
import BookmarkedElement from "@/views/BookmarkedElement";
import { defineComponent, Mounted } from "vue";
import weatherService from "@/services/weatherService";
export const db = firebase.initializeApp(DATABASE_CONFIGURATION).firestore();

export default defineComponent({
    name: "Bookmarks",

    components: {
        IonPage,
        IonContent,
        IonIcon,
        IonButton,
        Navbar,
        BookmarkedElement,
        },

    data() {
        return {
        cities: [],
        };
    },

    firebase: {
        citiesref: cities 
        },


    // Fu fonctionnel mais ne l'est plus, a revoir

    //   async mounted() {
    //   const citiesData = [];
    //   db.collection("cities")
    //     .get()
    //     .then((querySnapshot) => {
    //       querySnapshot.forEach(async(city) => {
    //        this.citiesData.push({
    //           name: city.name,
    //           currentWeather: await weatherService.getCityName(city.name),
    //         });
    //       });
    //       return citiesData
    //     })
    //     .catch((error) => {
    //       console.log("Erreur de récupération des favoris :", error);
    //     });
    // }
    
    

    async mounted() {
        db.collection("cities")
        .get()
        .then(async (querySnapshot) => {
            const documents = querySnapshot.docs.map((doc) => doc.data());
            documents.forEach(async (city) => {
                this.cities.push({
                name: city.name,
                currentWeather: await weatherService.getCityName(city.name),
                });
            });
        });
    },


    
    async deleteCity(key) {
    const Data = [];
      db.collection("cities")
        Data.child(key).delete()
        .then(() => {
          console.log("Ville supprimée des favoris");
        })
        .catch((error) => {
          console.error("Erreur de suppression :", error);
        });
    } 




});


</script>



<style scoped>
</style>
<template>
    <navbar :title="Add">
    </navbar>
    <!-- Default Searchbar -->
    <ion-searchbar @ionChange=onChange></ion-searchbar>
    <ion-button @click="addCity">Ajouter</ion-button>
</template>

<script lang="ts">
    import {defineComponent} from "vue";
    import firebase from 'firebase/app';
    import 'firebase/firestore'
    const db = firebase.firestore();    
    import {IonSearchbar, IonButton, toastController } from "@ionic/vue";
    import Navbar from "@/views/Navbar.vue";
    import weatherService from "@/services/weatherService";


    export default defineComponent ({
        name: "Search",
        data() {
          return {
              city : '',
              currentWeather : { cod : null }
          }
        },
        components:{
            Navbar,
            IonSearchbar,
            IonButton
        },
        methods : {
            onChange(e: any){
                this.city = e.detail.value;
            },


            async addCity(){
            db.collection("cities")
                .add({ name: this.city })
                .then(() => {
                    console.log("VIlle ajoutée aux favoris !");
                    // const msg =  this.currentWeather.cod === '200' ? 'Votre saisie a bien été enregistrée' : 'erreur rencontrée';
                    // this.PrintToast(msg);
                })
                .catch((error) => {
                    console.error("Erreur d'enregistrement", error);
                });
            },


            // async PrintToast(msg: string){
            //     const toast = await toastController
            //         .create({
            //             message: msg,
            //             duration: 2000
            //         })
            //     return toast.present();
            //     }
        }
    })

</script>

<style scoped>

</style>
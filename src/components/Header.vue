<template>
    <div class="header container">
        <h2 class="header__title">Учетные записи</h2>
        <v-btn icon @click="addNewItem">
            <v-icon>mdi-plus</v-icon>
        </v-btn>
    </div>
</template>
<script setup lang="ts">
import { useListStore } from '../store/useListStore';

const store = useListStore();

const addNewItem = () => {
    console.log('add');
    
    store.addItem();
}
</script>
<style lang="scss" scoped>
    .header {
        display: flex;
        align-items: center;
        gap: 20px;
        background-color: #fff;
        padding: 15px 0;
        border-bottom: 2px solid #777;
    }
</style>
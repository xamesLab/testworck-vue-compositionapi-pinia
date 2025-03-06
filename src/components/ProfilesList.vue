<template>
    <div class="list container">
        <ul class="list__wrapp">
            <li class="list__item">
                <span class="list__item-caption">Метка</span>
                <span class="list__item-caption">Тип записи</span>
                <span class="list__item-caption">Логин</span>
                <span class="list__item-caption">Пароль</span>
                <span class="list__item-caption"></span>
            </li>
            <ProfileItem v-for="item in store.list" :key="item.id" :item="item" />
        </ul>
    </div>
</template>
<script setup lang="ts">
    import ProfileItem from './ProfileItem.vue';
    import { useListStore } from '../store/useListStore'

    const store = useListStore()
</script>
<style lang="scss" scoped>
    .list {
        background-color: #fff;
        flex: 1;
        min-height: 100%;

        &__wrapp {
            list-style: none;
        }

        &__item {
            display: grid;
            width: 100%;
            grid-template-columns: 1fr 0.7fr 1fr 1fr 50px;
            gap: 10px;
            margin-bottom: 10px;
        }
    }
</style>
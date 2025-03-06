<template>
    <div class="tip container">
        <div class="tip__wrapper">
            <div class="tip__icon">
                <v-icon>mdi-help-circle-outline</v-icon>
            </div>
            <span class="tip__text">Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;</span>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
    .tip {
        padding: 20px 0 10px;
        background-color: #fff;

        &__wrapper {
            display: flex;
            gap: 10px;
            align-items: center;
            background-color: #e0e0e0;
            padding: 0 10px;
        }

        &__text {
            font-size: 18px;
            line-height: 18px;
        }
    }
</style>
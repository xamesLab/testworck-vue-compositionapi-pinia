<template>
    <div class="app">
        <section class="content">
            <Header />
        </section>
        <section class="content">
            <Tip />
        </section>
        <section class="content content_list">
            <ProfilesList />
        </section>
    </div>
</template>

<script setup lang="ts">
    import Header from './components/Header.vue';
    import Tip from './components/Tip.vue';
    import ProfilesList from './components/ProfilesList.vue';
</script>

<style lang="scss">
    .app {
        background-color: antiquewhite;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }

    .content {
        width: 1400px;
        margin: auto;

        &_list {
            display: flex;
            flex: 1;
        }

        .container {
            padding-left: 20px;
            padding-right: 20px;
        }
    }
</style>

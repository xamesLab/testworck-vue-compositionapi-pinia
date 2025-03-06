<template>
    <li class="item" :id="item.id">
      <v-text-field v-model="text" label="Введите текст" outlined hide-details></v-text-field>
      <v-select
        v-model="selectedOption"
        label="Выберите опцию"
        :items="['Локальная', 'LDAP']"
        outlined
        hide-details
      ></v-select>
      <v-text-field v-model="login" label="Логин" outlined hide-details></v-text-field>
      <v-text-field
        v-model="password"
        :type="showPassword ? 'text' : 'password'"
        label="Пароль"
        outlined
        hide-details
      >
        <template v-slot:append-inner>
          <v-icon @click="togglePasswordVisibility">
            {{ showPassword ? 'mdi-eye' : 'mdi-eye-off' }}
          </v-icon>
        </template>
      </v-text-field>
      <v-icon class="item__icon">mdi-delete</v-icon>
    </li>
</template>
<script setup>
    import { ref } from 'vue'

    const props = defineProps({
        item: Object,
    })

    const text = ref(props.item.labels.map(({text}) => text).join(';'))
    const selectedOption = ref(props.item.type)
    const login = ref(props.item.login)
    const password = ref(props.item.pass)
    const showPassword = ref(false)

    const togglePasswordVisibility = () => {
        showPassword.value = !showPassword.value
    }
</script>
<style lang="scss" scoped>
    .item {
        display: grid;
        align-items: center;
        width: 100%;
        grid-template-columns: 1fr 0.7fr 1fr 1fr 50px;
        gap: 10px;
        margin-bottom: 10px;

        &__icon {
            font-size: 40px;
            color: #777;
            cursor: pointer;

            &:hover {
                color: #313131;
            }
        }
    }
</style>
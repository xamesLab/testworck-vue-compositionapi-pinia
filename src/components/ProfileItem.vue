<template>
    <li class="item" :id="item.id">
        <v-text-field 
            v-model="text"
            ref="textField"
            label="Введите текст" 
            outlined 
            hide-details
            :rules="[(v) => v.length < 50]"
            @blur="watchFields"
        />
        <v-select
            v-model="selectedOption"
            label="Выберите опцию"
            :items="['Локальная', 'LDAP']"
            outlined
            hide-details
        />
        <v-text-field 
            v-model="login"
            ref="loginField"
            label="Логин" 
            outlined 
            hide-details
            :style="{'grid-column': `span ${selectedOption === 'Локальная' ? 1 : 2}`}"
            :rules="loginRules"
            @blur="watchFields"
        />
        <v-text-field
            v-if="selectedOption === 'Локальная'"
            v-model="password"
            ref="passwordField"
            :type="showPassword ? 'text' : 'password'"
            label="Пароль"
            outlined
            hide-details
            @blur="watchFields"
        >
            <template v-slot:append-inner>
                <v-icon @click="togglePasswordVisibility">
                    {{ showPassword ? 'mdi-eye' : 'mdi-eye-off' }}
                </v-icon>
            </template>
        </v-text-field>
        <v-icon 
            class="item__icon" 
            @click="deleteItem(item.id)"
        >
            mdi-delete
        </v-icon>
    </li>
</template>
<script setup>
    import { ref, watch } from 'vue';
    import { useListStore } from '../store/useListStore';

    const store = useListStore();

    const props = defineProps({
        item: Object,
    });

    const text = ref(props.item.labels.map(({text}) => text).join(';'));
    const selectedOption = ref(props.item.type);
    const login = ref(props.item.login);
    const password = ref(props.item.pass);
    const textField = ref(null);
    const loginField = ref(null);
    const passwordField = ref(null);
    const showPassword = ref(false);

    const loginRules = [
        (v) => v.length < 100,
        (v) => !!v
    ]

    const togglePasswordVisibility = () => {
        showPassword.value = !showPassword.value;
    };

    const deleteItem = (id) => {
        store.removeItem(id);
    };

    const validateForm = () => {

    }

    watch(selectedOption, (newValue) => {
        validateForm();        
    });

    const watchFields = () => {
        validateForm();
        //console.log('watch', loginField.value.validate());
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

    .is-error {
        border: 1px solid red;
    }
</style>
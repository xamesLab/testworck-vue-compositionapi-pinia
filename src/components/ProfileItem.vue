<template>
    <li class="item" :id="item.id">
        <v-text-field 
            v-model="text"
            ref="textField"
            label="Введите текст" 
            outlined 
            hide-details
            :rules="textRules"
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
            :rules="selectedOption === 'Локальная' ? passRules : []"
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

    const passRules = [
        (v) => v.length < 100,
        (v) => !!v
    ]

    const textRules = [
        (v) => v.length < 50,
    ]

    const togglePasswordVisibility = () => {
        showPassword.value = !showPassword.value;
    };

    const deleteItem = (id) => {
        store.removeItem(id);
    };

    const normalizeLabel = () => {
        const str = text.value;
        if(!str.length) return [];

        const strArray = str.split(';');
        return strArray.map(i => ({text: i}));
    }

    const validateForm = async () => {
        let isTextValid, isLoginValid, isPassValid;
        const dataTextValid = await textField.value.validate();
        const dataLoginValid = await loginField.value.validate();
        const dataPassValid = await passwordField?.value?.validate();

        if(!dataPassValid) {
            isPassValid = true;
            password.value = '';
        } else {
            isPassValid = !Object.keys(dataPassValid).length;
        }

        isTextValid = !Object.keys(dataTextValid).length;
        isLoginValid = !Object.keys(dataLoginValid).length;

        const isFormValid = isPassValid && isLoginValid && isTextValid;
        
        if(isFormValid) {
            store.updateItem(props.item.id, {
                id:props.item.id,
                filled: true,
                labels: normalizeLabel(),
                type: selectedOption.value,
                login: login.value,
                pass: password.value
            })
        }
    }

    const watchFields = () => {
        validateForm();
    }

    watch(selectedOption, (newValue) => {
        validateForm();        
    });
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
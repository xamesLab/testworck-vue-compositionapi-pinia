import { defineStore } from 'pinia';
import { ProfilesList, ListItem } from '../types';

const MOCK_DATA = [
    {
        id: 1,
        filled: true,
        labels: [{ text: 'XXX' }],
        type: 'Локальная',
        login: 'werwer',
        pass: 'ghjxc',
    },
    {
        id: 2,
        filled: true,
        labels: [{ text: 'XXX' }, { text: 'YYYYY' }],
        type: 'Локальная',
        login: 'xcvxcv',
        pass: 'ghjghj',
    },
    {
        id: 3,
        filled: false,
        labels: [],
        type: 'LDAP',
        login: '',
        pass: '',
    },
]

const getLocalData = (): ProfilesList | null => {
    const data = localStorage.getItem('profiles-list');

    if(!data) return null;

    return JSON.parse(data);
};

export const useListStore = defineStore('listStore', {
    state: () => ({
        list: getLocalData() || MOCK_DATA,
    }),
  
    actions: {
        setLocalData() {
            localStorage.setItem('profiles-list', JSON.stringify(this.list));        
        },
        addItem() {
            const lastId = this.list.length > 0 ? this.list[this.list.length - 1].id : 0;
            const newItem = {
                id: lastId + 1,
                filled: false,
                labels: [],
                type: 'Локальная',
                login: '',
                pass: '',
            };
            this.list.push(newItem);
            this.setLocalData();
        },
  
        removeItem(id: number) {
            this.list = this.list.filter(item => item.id !== id);
            this.setLocalData();
        },
        updateItem(id: number, data: ListItem) {
            const item = this.list.find(item => item.id === id);
            if (item) {
                for(let i in item) {
                    // @ts-ignore
                    item[i] = data[i];
                }                
            };
            this.setLocalData();
        },
    },
})
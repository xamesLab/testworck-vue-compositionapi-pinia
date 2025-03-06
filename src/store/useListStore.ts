import { defineStore } from 'pinia'

export const useListStore = defineStore('listStore', {
    state: () => ({
        list: [
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
        ],
    }),
  
    actions: {
        addItem() {
            const lastId = this.list.length > 0 ? this.list[this.list.length - 1].id : 0
            const newItem = {
                id: lastId + 1,
                filled: false,
                labels: [],
                type: 'Локальная',
                login: '',
                pass: '',
            }
            this.list.push(newItem)
        },
  
        removeItem(id: number) {
            this.list = this.list.filter(item => item.id !== id)
        },
    //TODO: fix any
        updateItem(id: number, key: string, value: any) {
            const item = this.list.find(item => item.id === id)
            if (item) {
                // @ts-ignore
                item[key] = value
            }
        },
    },
})
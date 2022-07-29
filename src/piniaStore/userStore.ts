import { defineStore } from 'pinia';

export const userStore = defineStore('userStore', {
    state: () => {
        return {
            userInfo:{}
        }
    },
    actions: {
        setUserInfo(data) {
            this.userInfo = data
        }
    } 
})
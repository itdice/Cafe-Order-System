import { ref } from 'vue';
import { defineStore } from "pinia";

export const useCommonStore = defineStore('common', () => {
    const title = ref("IT DICE Cafe");

    function changeTitle(newTitle) {
        title.value = newTitle;
    }

    return { title, changeTitle };
})
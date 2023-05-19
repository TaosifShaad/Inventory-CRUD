import { reactive } from "vue";

export const user = reactive({
    name: 'Randy Orton',
    profession: 'wrestling',
    changeName() {
        this.name = "John Cena"
    }
})
<template>
    <template v-if="config">
        <template v-for="(itm, idx) in config.fields">
            <template v-if="itm.datatype == 'text'">
                <InputField v-model="values[idx]" :title="itm.name" type="text" :help="itm.help" />
            </template>
            <template v-else-if="itm.datatype == 'longtext'">
                <TextField v-model="values[idx]" :title="itm.name" type="text" :help="itm.help" />
            </template>
            <template v-else-if="itm.datatype == 'relation'">
                <RelField v-model="values[idx]" :title="itm.name"></RelField>
            </template>
        </template>
    </template>
</template>

<script>

export default {
    name: 'GForm',
    setup() {
        //
    },
    props: {
        config: {
            fields: Array
        },
        values: Array
    },
    data() {
        return {
            formdata: {
                fields: [],
                values: []
            },
        };
    },
    methods: {
        initForm() {

        }
    },
    computed: {
    },
    watch: {
        config(n, o) {
            console.log('config changed', n, o);
        },
    },
    created() {
    },
    destroyed() {
    },
    mounted() {

    },

}
</script>

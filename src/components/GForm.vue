<template>
    <template v-if="config">
        <!-- <h5>================ {{ config }}</h5> -->
        <template v-for="(itermod) in config.modules">
            <h2>{{ itermod.config.label }}</h2>
            <GForm :config="itermod.config" />

            <!-- <template v-for="(itm, idx) in itermod.config.fields">
                <div>{{ itm }}</div>
            </template> -->

        </template>

        <template v-for="(itm, idx) in config.fields">
            <template v-if="itm.datatype == 'text'">
                <InputField v-model="itm.values" :title="itm.label" type="text" :help="itm.help" />
            </template>
            <template v-else-if="itm.datatype == 'longtext'">
                <TextField v-model="itm.values" :title="itm.label" type="text" :help="itm.help" />
            </template>
            <template v-else-if="itm.datatype == 'link'">
                <RelField v-model="itm.values" :title="itm.label" :config="itm.config"></RelField>
            </template>
            <template v-if="itm.datatype == 'selection'">
                <SelectField :title="itm.label" v-model="itm.values" :source="itm.sources" :help="itm.help"></SelectField>
                <!-- <InputField v-model="itm.values" :title="itm.label" type="text" :help="itm.help" /> -->
            </template>
            <template v-if="itm.datatype == 'date'">
                <InputField v-model="itm.values" :title="itm.label" type="text" :help="itm.help" />
            </template>
            <template v-if="itm.datatype == 'bool'">
                <InputField v-model="itm.values" :title="itm.label" type="text" :help="itm.help" />
            </template>
            <!-- <hr> -->
        </template>

    </template>
</template>

<script>

/*
accepts:
config: array of object fields, from mtypes
each config field has
    datatype
    name (label)
    help
    sources (if available)
    properties (if available)
values: array of object values

*/
export default {
    name: 'GForm',
    setup() {
        //
    },
    expose: ["getData"],
    props: {
        config: {
            fields: Array
        }
    },
    /*
    data() {

        return {
            formdata: {
                fields: [],
                values: []
            },
        };

    },
    */
    methods: {
        initForm() {

        },
        getData() {
            return 'data'
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

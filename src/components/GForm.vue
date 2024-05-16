<template>
    <template v-if="config">
        <!-- <h5>================ {{ config.fields }}</h5> -->
        <h5>================ {{ values }}</h5>
        <template v-for="(itm, idx) in config.fields">
            <template v-if="itm.datatype == 'text'">
                <InputField v-model="values[itm.name]" :title="itm.label" type="text" :help="itm.help" />
            </template>

            <template v-else-if="itm.datatype == 'longtext'">
                <TextField v-model="values[itm.name]" :title="itm.label" type="text" :help="itm.help" />
            </template>
            <template v-else-if="itm.datatype == 'link'">
                <!-- <RelField v-model="values[itm.name]" :title="itm.label" :config="itm.config"></RelField> -->
                <RelFieldEx v-model="values[itm.name]" :title="itm.label" :item="itm"></RelFieldEx>
            </template>
            <template v-else-if="itm.datatype == 'selection'">
                <SelectField :title="itm.label" v-model="values[itm.name]" :source="itm.sources" :help="itm.help" :joinlabel="true"></SelectField>
            </template>
            <template v-else-if="itm.datatype == 'date'">
                <InputField v-model="values[itm.name]" :title="itm.label" type="text" :help="itm.help" />
            </template>
            <template v-else-if="itm.datatype == 'bool'">
                <InputField v-model="values[itm.name]" :title="itm.label" type="text" :help="itm.help" />
            </template>

            <template v-else-if="itm.datatype == 'module'">
                <!-- <h4>{{ itm }}</h4> -->
                <GModule :item="itm" :values="values[itm.valuekey]"/>
                <!-- <div>{{ itm.config }}</div> -->
                <!-- <GForm :config="itm.config" :values="values[itm.valuekey][0]"/> -->
            </template>
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
        config: Object,
        values: Object
    },
    methods: {
        initForm() {

        },
        getData() {
            return 'data'
        }
    },
    computed: {
        gv(i) {
            if (this.config) {
                return this.config.fields[i].values
            }
            return null;
        }
    },
    watch: {
        config(n, o) {
            //console.log('config changed', n, o);
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

<template>
    <template v-if="hasData">
        <div class="module">
            <div class="header">
                <span class="title" v-html="title"></span>

                <span class="actions">
                    <span>{{ describeGroupCount }}</span>
                    <GButton class="small" action="add" @click.stop="btnClick">add</GButton>
                </span>
            </div>
            <div class="data-container">
                <template v-for="(itm, idx) in modelValue">
                    <div class="header sub linkfield">
                        <!-- <span class="title">{{ (idx + 1) }} / {{ values.length }}</span> -->
                        <SelectField  v-model="modelValue[idx].to" :source="linkSource" :codeonly="true"></SelectField>
                        <span class="actions">
                            <GButton class="small warning" action="delete" :data-item="idx" @click.stop="btnClick">delete</GButton>
                        </span>
                    </div>
                    <div class="data">
                        <template v-if="item">
                            <!-- <SelectField  v-model="modelValue[idx].to" :source="linkSource" :codeonly="true"></SelectField> -->
                            <GForm :config="item.config" :values="modelValue[idx].properties"/>
                        </template>
                    </div>
                </template>
            </div>
        </div>
    </template>
</template>

<script>
import genemedeAPI from '@/services/gnmd-api.js';

export default {
    props: {
        modelValue: null,
        title: String,
        help: String,
        helperror: Boolean,

        fields: Object,
        item: Object,


    },
    emits: {
    },
    components: { },
    data () {
        return {
            formVisible: false,
            linksources: null
        }
    },
    name: 'RelFieldEx',
    async mounted() {
        /*
        if (this.item) {
            await genemedeAPI.apiGet("data/" + this.item.sources).then((res) => {
                var tmp = []
                this.linksources = res.data.data;
            });
        }
        console.log("LINK SRC", this.linksources)
        */
    },
    methods: {
        async btnClick(evt, btn) {
            if (btn) {
                switch (btn.action) {
                case "add":
                    //console.log("flds", this.item)
                    var obj = {
                        to: null,
                        mtype: null,
                        label: null,
                        properties: {}
                    }
                    if (this.item.config) {
                        for (var fld in this.item.config.fields) {
                            var cur = this.item.config.fields[fld]
                            obj.properties[cur.name] = ""
                        }
                    }
                    console.log("mv", this.modelValue)
                    console.log("obj", obj)
                    this.modelValue.push(obj)
                    break;
                case "edit":
                    //debug_log("BTN", btn.dataset)
                    this.formVisible = true;
                    break;
                case "delete":
                    var itmidx = evt.target.dataset.item;
                    //console.log("delete index", itmidx)
                    var ok = await this.$dlg.confirm('Confirmation','Delete this link ?', {okText: 'Yes', cancelText: 'No'});
                    if (ok) {
                        //console.log("A", JSON.stringify(this.modelValue))
                        this.modelValue.splice(itmidx, 1)
                        //console.log("B", JSON.stringify(this.modelValue))
                    }
                    break;
                }
            }
        }
    },
    watch: {
        modelValue(newVal, oldVal) {
            //console.log('OLD', oldVal, 'NEW', newVal)
        },
    },
    computed: {
        hasData() {
            return this.modelValue != null && this.modelValue.length > 0;
        },
        describeGroupCount() {
            var c = this.modelValue.length;
            if (c == 0) return "empty";
            if (c == 1) return "1 link";
            if (c > 1) return c + " links";
        },
        linkSource() {
            var res = 'data:' + this.item.sources;
            return res;
        },
        entries() {
            var c = 0;
            if (this.hasData) c = this.modelValue.length;
            return c ==1 ? "1 entry" : c + " entries";

            //return c;
        }
    }
}
</script>

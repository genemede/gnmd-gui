<template>
    <template v-if="hasData">
        <div class="module spacer-bottom">
            <div class="header">
                <span class="title" v-html="title"></span>

                <span class="actions">
                    <span>{{ describeGroupCount }}</span>
                    <GButton class="small" action="add" @click.stop="btnClick">add</GButton>
                </span>
            </div>
            <div class="small" v-if="this.$store.devInfo">Altered: <strong>{{ altered }}</strong></div>
            <div class="data-container" ref="dc">
                <template v-for="(itm, idx) in modelValue" v-if="ready">
                    <div class="header sub linkfield" ref="headers">
                        <!-- <span class="title">{{ (idx + 1) }} / {{ values.length }}</span> -->

                        <SelectField
                            v-model="modelValue[idx].to"

                            :name="'sf'"
                            :options="linksources"
                            :codeonly="true"
                            :tag="idx"
                            ref="flds"
                            @update:modelValue="onChange">
                        </SelectField>

                        <span class="actions">
                            <GButton class="small warning" action="delete" :data-item="idx" @click.stop="btnClick">delete</GButton>
                        </span>
                    </div>
                    <div class="data" ref="data">
                        <template v-if="item">
                            <GForm :config="item.config" :values="modelValue[idx].properties" @change="onFormChange"/>
                        </template>
                    </div>
                </template>
            </div>
        </div>
    </template>
</template>

<script>
import { ref, nextTick } from 'vue'

export default {
    props: {
        modelValue: null,
        title: String,
        help: String,
        helperror: Boolean,

        fields: Object,
        item: Object,
    },
    emits: ['change'],
    components: { },
    data () {
        return {
            formVisible: false,
            linksources: null,
            ready: false,
            altered: false
        }
    },
    name: 'RelFieldEx',
    async mounted() {
        // sources for all links is kept here on parent instead of duplicating on each child
        if (this.item) {
            if (this.item.sources != null) {
                var src = await this.$mtypes.getSource('data:' + this.item.sources);
                this.linksources = src.data.data.codes;
            }
        }
        nextTick(() => { this.ready = true; });
    },
    methods: {
        onChange(value, tag) {
            // 'to' field changed, need to reflect label on object
            this.altered = true;
            for (var key in this.linksources) {
                if (this.linksources[key].code == value) {
                    this.modelValue[tag].label = this.linksources[key].value
                }
            }
            this.$emit('change', this);
        },
        onFormChange(obj) {
            this.altered = true;
            this.$emit('change', this);
        },
        async btnClick(evt, btn) {
            if (btn) {
                switch (btn.action) {
                case "add":
                    var obj = {
                        to: null,
                        mtype: this.item.sources,
                        label: null,
                        properties: {}
                    }
                    if (this.item.config) {
                        for (var fld in this.item.config.fields) {
                            var cur = this.item.config.fields[fld]
                            obj.properties[cur.name] = ""
                        }
                    }
                    const len = this.modelValue.length;
                    this.modelValue.push(obj)
                    nextTick(() => {
                        const header = this.$refs.headers[len]
                        header.childNodes[1].querySelector("input").focus();
                        this.$refs.data[len].scrollIntoView( { behavior: 'smooth', block: 'end', inline: 'start' } );
                    });
                    break;
                case "edit":
                    //debug_log("BTN", btn.dataset)
                    this.formVisible = true;
                    break;
                case "delete":
                    var itmidx = evt.target.dataset.item;
                    var ok = await this.$dlg.confirm('Confirmation','Delete this link ?', {okText: 'Yes', cancelText: 'No'});
                    if (ok) {
                        this.modelValue.splice(itmidx, 1)
                        this.$emit('change', this);
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
            //return this.modelValue != null && this.modelValue.length > 0;
            return this.modelValue != null;
        },
        describeGroupCount() {
            var c = this.modelValue.length;
            if (c == 0) return "empty";
            if (c == 1) return "1 link";
            if (c > 1) return c + " links";
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

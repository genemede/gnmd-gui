<template>
    <div class="middle">
        <div class="wrapper">
            <h2>{{title}} - {{ curMode }}</h2>
            <InputField v-model="objName" title="Name" type="text" />
            <InputField v-model="objDescription" title="Description" type="text" />
        </div>

        <div class="wrapper">
            <div class="group-title"><span>General</span></div>
            <div class="input-wrapper">
                <label class="label">Tags</label>
                <div class="control full">
                    <input name='basic' xvalue="tags1">
                </div>
                <div style='flex-basis: 100%; height: 0'></div>
                <div class="input-help-text">Searchable list of tags</div>
            </div>
            <div class="group-title"><span>Properties</span></div>
            <GForm :config="formconfig" :values="formvalues"/>

            <textarea v-if='false' rows="50" v-model="txt" style="width: 100%"></textarea>
        </div>
        <!-- <div class="editactionbar">action bar</div> -->
    </div>
</template>

<script>
import genemedeAPI from '@/services/gnmd-api.js';
import { useRoute } from 'vue-router'
import GForm from '@/components/GForm.vue'
import mtypes from '@/services/mtypes.js';
import Tagify from '@yaireo/tagify';
var tgf = null, controller = null;

var slug = null, mtype = null

export default {
    setup() {
        const route = useRoute()
        slug = route.params.slug
        mtype = route.params.mtype
    },
    props: {
        mode: String //{ type: String, default: 0}
    },
    components: { GForm },
    data() {
        return {
            curMode: null,
            curMType: null,
            title: 'Laboratory',
            obj: null,
            objName: '',
            objDescription: '',
            txt: '',
            formconfig: {
                fields: []
            },
            formvalues: [],
        }
    },
    methods: {
        initForm() {
            this.txt = JSON.stringify(this.obj, null, 4)

            this.formconfig.fields = []
            this.formvalues = []
            var mt = mtypes.get(this.obj.mtype)
            this.objName = this.obj.name;
            this.objDescription = this.obj.description;
            var prop,v
            //console.log('mt', mt)//, this.obj.properties)
            if (mt) {
                this.title = mt.description
                for (var key in mt.properties) {
                    prop = mt.properties[key]
                    this.formconfig.fields.push({
                        'datatype': prop.datatype,
                        'name': prop.label,
                        'help': prop.help
                    })
                    v = this.obj.properties[key]
                    this.formvalues.push(v)
                    //console.log('prop', key, v)
                }

                // init tags
                var input = document.querySelector('input[name=basic]');
                tgf = new Tagify(input, {
                    whitelist: [],
                    backspace: 'edit',
                    dropdown: {
                        fuzzySearch: true,
                        //position: "input",
                        enabled: 3 // always opens dropdown when input gets focus
                    }
                })
                tgf.on('input', this.onTagifyInput);
            }
        },
        onTagifyInput(evt) {
        },
    },
    mounted() {
        debug_log('data item edit mode', this.mode);
        /*
        var r = this.$route.path;
        if (r) {
            if (r.startsWith('/data/edit/')) { this.curMode = 'edit'}
            if (r.startsWith('/data/create/')) { this.curMode = 'create'}
        }
        */
        this.curMode = this.mode;
        switch (this.curMode) {
        case 'edit':
            genemedeAPI.apiGet("guid/" + slug).then((res) => {
                this.obj = res.data.data
                this.curMType = this.obj.mtype;
                this.initForm()
            });
            break;
        case 'create':
            this.curMType = mtype;
            debug_log('mtype', this.curMType)
            this.obj = {
                mtype: this.curMType,
                name: 'new ' + this.curMType,
                description: this.curMType + ' description',
                properties: {},
                custom: {}
            }
            this.initForm()
            break;
        }

        //debug_log('detail for ', slug)

    }
}
</script>
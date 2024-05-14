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
            <!-- <div style="font-size: 10px">{{ frm.config.values }}</div> -->
            <GForm :config="frm.config" :values="frm.config.values" ref="mainform"/>
            <!-- <div style="font-size: 10px">{{ frm.config.values }}</div> -->

            <textarea v-if='false' rows="50" v-model="txt" style="width: 100%"></textarea>
        </div>
        <!-- <div class="editactionbar">action bar</div> -->
    </div>
    <div class="data-toolbar">
        <GButton class="" action="save" @click.stop="btnClick">Save</GButton>
    </div>
</template>

<script>
import genemedeAPI from '@/services/gnmd-api.js';
import { useRoute } from 'vue-router'
import mtypes from '@/services/mtypes.js';
import Tagify from '@yaireo/tagify';
var tgf = null, controller = null;

var slug = null, mtype = null

window.onscroll = function() {myFunction()};

export default {
    setup() {
        const route = useRoute()
        slug = route.params.slug
        mtype = route.params.mtype
        //debug_log('============== slug', slug)
    },
    props: {
        mode: String //{ type: String, default: 0}
    },
    data() {
        return {
            curMode: null,
            curMType: null,
            title: 'Data Item Edit',
            obj: null,
            objName: '',
            objDescription: '',
            txt: '',
            frm: {
                config: {},
            }
        }
    },
    methods: {
        initForm() {
            var mt = mtypes.get(this.obj.mtype)
            this.title = mt.description;
            this.objName = this.obj.name;
            this.objDescription = this.obj.description;
            this.frm = mtypes.buildFormEx(mt.mtype, this.obj);
            debug_log("NEWFORM", this.frm.config)
        },
        onTagifyInput(evt) {
        },
        saveObject() {
            // iterate form values and replace properties on current object
            // existing properties on the object that are not on the forms will not be touched
            var v;
            for (var key in this.frm.config.values) {
                v = this.frm.config.values[key];
                this.obj.properties[key] = v;
            }
            var body = this.obj;
            genemedeAPI.apiPut('data/' + this.obj.guid, body).then((res) => {
                console.log("post data: ", res.data, res.data.result);
            });
        },
        async btnClick(evt, btn) {
            switch (btn.action) {
                case 'save':
                    this.saveObject()
                    break;
            }
        }
    },
    mounted() {
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
            debug_log('mtype', mtype, this.curMType)
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
    }
}
</script>
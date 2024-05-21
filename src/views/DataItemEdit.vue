<template>
    <div class="middle" v-if="$store.server.status == 3">
        <div class="wrapper">
            <h2>{{title}} - {{ curMode }}</h2>
            <DevPanel v-if="this.$store.devInfo">
                <div style="font-size: 10px">{{ obj }}</div>
                <hr>
                <h5>altered: {{ altered }}</h5>
            </DevPanel>

            <!-- <h3>slug: {{ curSlug }}</h3> -->
            <template v-if="obj">
                <InputField v-model="obj.name" title="Name" type="text" name="name" @change="onFormChange" ref="mtnamefield"/>
                <InputField v-model="obj.description" title="Description" type="text" name="description" @change="onFormChange"/>
            </template>
        </div>
        <div class="wrapper">
            <!-- <div class="group-title"><span>General</span></div> -->
            <div class="input-wrapper" v-if="false">
                <label class="label">Tags</label>
                <div class="control full">
                    <input name='basic' xvalue="tags1">
                </div>
                <div style='flex-basis: 100%; height: 0'></div>
                <div class="input-help-text">Searchable list of tags</div>
            </div>
            <!-- <div class="group-title"><span>Properties</span></div> -->
            <GForm :config="frm.config" :values="frm.config.values" ref="mainform" @change="onFormChange"/>
            <textarea v-if='false' rows="50" v-model="txt" style="width: 100%"></textarea>
        </div>
    </div>
    <div class="data-toolbar" v-if="obj">
        <div class="info">
            <span>{{ describeMode }}</span>
            <span class="separator"></span>
            <strong>{{ curMType }}</strong>
            <span class="separator"></span>
            <span>{{ obj.name }}</span>
        </div>
        <div class="actions">
            <span v-if="altered">altered</span>
            <GButton class="" action="save" @click.stop="btnClick">Save</GButton>
        </div>
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
    },
    props: {
        mode: String //{ type: String, default: 0}
    },
    data() {
        return {
            curMode: null,
            curMType: null,
            curSlug: null,
            title: 'Data Item Edit',
            obj: null,
            txt: '',
            frm: {
                config: {},
            },
            altered: false
        }
    },
    methods: {
        onFormChange(obj) {
            this.altered = true;
        },
        initForm() {
            var mt = mtypes.get(this.obj.mtype)
            this.title = mt.description;
            this.frm = this.$store.buildFormEx(mt.mtype, this.obj);
            console.log("FORM", this.frm)
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
            if (this.curMode == "create") {
                // new records use post
                genemedeAPI.apiPost('data', body).then((res) => {
                    //console.log("post data: ", res.data, res.data.result);
                    this.$notify({
                        type: "success",
                        group: "std",
                        title: "Saving " + this.curMType,
                        text: "Save successful"
                    });
                    this.curSlug = res.data.data.guid;
                    this.curMode = "edit";
                    this.altered = false;
                });
            }
            else {
                // existing records use put
                genemedeAPI.apiPut('data/' + this.obj.guid, body).then((res) => {
                    //console.log("post data: ", res.data, res.data.result);
                    this.$notify({
                        type: "success",
                        group: "std",
                        title: "Saving " + this.curMType,
                        text: "Save successful"
                    });
                    this.altered = false;
                });
            }
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
        this.curSlug = slug;
        this.curMode = this.mode;
        switch (this.curMode) {
        case 'edit':
            genemedeAPI.apiGet("guid/" + slug).then((res) => {
                this.obj = res.data.data
                this.curMType = this.obj.mtype;
                this.initForm();
                this.$nextTick(() => {
                    this.$refs.mtnamefield.focus();
                })
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
    },
    computed: {
        describeMode() {
            var res = '';
            switch (this.curMode) {
            case 'edit':
                res = 'editing';
                break;
            case 'create':
                res = 'creating';
                break;
            }
            return res;
        }
    },
    beforeRouteLeave (to, from , next) {
        //const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
        //if (answer) { next() } else { next(false) }
        next();
    }
}
</script>
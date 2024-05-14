<template>
    <div class="middle">
        <div class="wrapper">
            <h2>Dev Page</h2>
            <span>For ongoing UI development. Won't be active on release.</span>
        </div>

        <vSelect label="value" :options="seloptions"></vSelect>

        <div class="wrapper" v-if="false">


            <multiselect v-model="selvalue_a" :options="seloptions" track-by="code" label="value"></multiselect>
            <div>{{ selvalue_a }}</div>
            <hr>

            <SelectField title="Select from options" v-model="selvalue_b" :options="seloptions"></SelectField>
            <div>{{ selvalue_b }}</div>
            <hr>
        </div>
        <div class="wrapper">
            <SelectField title="Select from source" v-model="selvalue_c" source="iso639-1" help="List of languages"></SelectField>
            <div>this value: {{ selvalue_c }}</div>
            <hr>
            <VueDatePicker v-model="datepick_a"></VueDatePicker>
            <div>this value: {{ datepick_a }}</div>

            <hr>
            <DateField v-model="datepick_b" />
            <div>this value: {{ datepick_b }}</div>
        </div>
        <div class="wrapper">
            <GButton class="" action="dlgconfirm" @click.stop="btnClick">dlgconfirm</GButton>
            <GButton class="" action="dlgalert" @click.stop="btnClick">dlgalert</GButton>
        </div>

        <div class="wrapper">
            <h2>Dev Page</h2>
            <span>For ongoing UI development. Won't be active on release.</span>7
            <GButton class="" action="post" @click.stop="btnClick">post</GButton>
            <GButton class="" action="put" @click.stop="btnClick">put</GButton>

        </div>

        <div class="wrapper">
            <RelField title="Relationship A" v-model="rels1" help="Relationship Editor A"/>
            <RelField title="Relationship B" v-model="rels2" help="Relationship Editor B"/>
            <InputField title="name" type="text" disabled />
        </div>
        <div class="wrapper" v-if="false">
            <hr>
            <span class="tst1">text</span>
            <span class="tst2">text</span>
            <hr>
        </div>
        <div v-if="true">
            <div class="wrapper">
                <GButton class="" action="def" @click.stop="btnClick">Button</GButton>
                <GButton class="alternate" @click.prevent="btnClick">Alternate</GButton>
                <GButton class="secondary" @click.prevent="btnClick">Secondary</GButton>
                <span>|</span>
                <GButton class="success" action="notifysuccess" @click.prevent="btnClick">Success</GButton>
                <GButton class="danger" action="notifyerror" @click.prevent="btnClick">Error</GButton>
                <GButton class="warning" action="notifywarn" @click.prevent="btnClick">Warning</GButton>
                <GButton class="info" action="notifyinfo" @click.prevent="btnClick">Info</GButton>
            </div>

            <div class="wrapper">
                <GButton class="disabled" @click.prevent="btnClick">Button</GButton>
                <GButton class="alternate disabled" @click.prevent="btnClick">Alternate</GButton>
                <GButton class="secondary disabled" @click.prevent="btnClick">Secondary</GButton>
                <GButton class="success disabled" @click.prevent="btnClick">Success</GButton>
                <GButton class="danger disabled" @click.prevent="btnClick">Error</GButton>
                <GButton class="warning disabled" @click.prevent="btnClick">Warning</GButton>
                <GButton class="info disabled" @click.prevent="btnClick">Info</GButton>
            </div>

            <div class="wrapper">
                <GButton class="small" @click.prevent="btnClick">Button</GButton>
                <GButton class="alternate small" @click.prevent="btnClick">Alternate</GButton>
                <GButton class="secondary small" @click.prevent="btnClick">Secondary</GButton>
                <GButton class="success small" @click.prevent="btnClick">Success</GButton>
                <GButton class="danger small" @click.prevent="btnClick">Error</GButton>
                <GButton class="warning small" @click.prevent="btnClick">Warning</GButton>
                <GButton class="info small" @click.prevent="btnClick">Info</GButton>
            </div>

            <div class="wrapper">
                <GButton class="small disabled" @click.prevent="btnClick">Button</GButton>
                <GButton class="alternate small disabled" @click.prevent="btnClick">Alternate</GButton>
                <GButton class="secondary small disabled" @click.prevent="btnClick">Secondary</GButton>
                <GButton class="success small disabled" @click.prevent="btnClick">Success</GButton>
                <GButton class="danger small disabled" @click.prevent="btnClick">Error</GButton>
                <GButton class="warning small disabled" @click.prevent="btnClick">Warning</GButton>
                <GButton class="info small disabled" @click.prevent="btnClick">Info</GButton>
            </div>
        </div>
        <div class="wrapper">
            <div class="input-wrapper rounded" name="tsttoggle">
                <label class="label is-required">Toggle</label>
                <div class="control full">
                    <GToggle :values='togvalues' />
                </div>
            </div>
        </div>

        <div class="wrapper" v-if="false">
            <div class="input-wrapper tags">
                <label class="label">Tags</label>
                <div class="control full">
                    <input id="aw_tags" type="text" name="tags" style="width: 100%" value="aaa, bbb, ccc"/>
                    <!-- autocomplete -->
                </div>
                <div class="input-help-text">You can add up to 5 tags</div>
            </div>
        </div>

        <div class="wrapper sa" v-if="false">
            <div class="group-title"><span>Field Group</span></div>
            <input v-model="tst1" />
            <span>{{tst1}}</span>
            <InputField v-model="tst1" title="Text field" type="text" help="A shorter name to display around the app" />

            <div class="group">
                <div class="group-title"><span>Field Group</span></div>
                <div class="group-content">
                    <div class="group-full">
                        <TextField v-model="tst2" title="Long Text Field" rows="3" help="Help for long text field"/>
                        <TextField v-model="tst3" title="Longer Text Field" placeholder="Placeholder text for the field" rows="6" help="Help for longer text field"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import genemedeAPI from '@/services/gnmd-api.js';
const testguid = '4c94570b-0a71-47cb-af55-bf70dd1206cf'
import Tagify from '@yaireo/tagify';
import GForm from '@/components/GForm.vue'
import { useGlobalStore } from '@/stores/globalstore'
import Multiselect from 'vue-multiselect'

import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

import { ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'



const minTagLengthLookup = 3;
var tagLookupTimeout = null;

export default {
    name: 'DevPageUI',
    setup() {
        const globstore = useGlobalStore()
        globstore.increment()
        //console.log('setup', globstore.count)
    },
    data () {
        return {
            datepick_a: null,
            datepick_b: null,
            version: '',
            mtypelist: [],
            mtypes: null,
            curmtype: null,
            datalist: [],
            curdata: null,
            tst1: 'value',
            tst2: '',
            tst3: '',
            rels1: [
                {'guid': '1a444dd8-ccf5-4aef-9563-d7a48a63d1ad', 'mtype': 'researcher', 'label': 'Katarina Bendtz'},
                {'guid': '3fc27d71-d7e1-47b7-a3bd-9482731eb697', 'mtype': 'researcher', 'label': 'Simon Henin'},
                {'guid': '496701c1-c134-4012-bcdd-5b9bbfcfe6c4', 'mtype': 'researcher', 'label': 'Rony Hirschhorn'},
                {'guid': '1d8439de-c764-449b-bec4-0869a69fa1aa', 'mtype': 'researcher', 'label': 'Ole Jensen'},
                {'guid': '2836bdf3-2c80-455e-93d7-8387885cc368', 'mtype': 'researcher', 'label': 'Aya Khalaf'},
            ],
            rels2: [],
            tag_names: ['a', 'b', 'c'],
            tgInput: null,
            tgTagify: null,
            tgController: null,

            togvalues: [
                {on: false, title: 'First option', type: 'one'},
                {on: false, title: 'Second option', type: 'two'}
            ],

            selvalue_a: null,
            selvalue_b: null,
            selvalue_c: "pt|Portuguese",
            seloptions: [
                {"code": "principal_investigator", "value": "Principal Investigator"},
                {"code": "aaa", "value": "AAAAAAAAAAAAAAAA"},
                {"code": "bbb", "value": "BBBBBBBBBBBBBBB"},
                {"code": "ccc", "value": "CCCCCCCCCCCCCCCCC"},
                {"code": "ddd", "value": "DDDDDDDDDDDDDDDDDDDDDDDD"},
            ]

        }
    },
    components: {
        GForm,
        Multiselect,
        VueDatePicker,
        vSelect
    },
    async mounted() {
        console.log('mounted')
        var src = await this.$mtypes.getSource('lab.position');
        debug_log("3", src.data)

        //genemedeAPI.apiGet("version").then((res) => { this.version = res.data; });
        //this.initTagify(this.tag_names);
    },
    methods: {
        async btnClick(evt, btn) {
            //var act = evt.srcElement.attributes.action.nodeValue;
            //console.log('click', evt, btn, btn.action);
            debug_log('ENV', import.meta.env.VITE_APP_ENV, import.meta.env.VITE_APP_TITLE)
            this.$dlg.test()

            switch (btn.action) {
                case 'post':
                    var body = {
                        "mtype": "researcher",
                        "guid": "xxxxxxxxxxxx-ebd1-411d-aac9-1a4ef0c84db0",
                        "modified_at": "2023-11-22T12:26:27.766769",
                        "name": "Test Researcher A",
                        "description": "A researcher",
                        "properties": {
                            "subject_fields": "Test subject fields"
                        }
                    }
                    genemedeAPI.apiPostEx('data', body, 'post').then((res) => {
                        console.log("post data: ", res.data, res.data.result);
                    });
                    break
                case 'put':
                    var g = "xxxxxxxxxxxx-ebd1-411d-aac9-1a4ef0c84db0"
                    var body = {
                        "mtype": "researcher",
                        "guid": g,
                        "name": "Test Researcher Altered",
                        "description": "Changed",
                        "properties": {
                            "subject_fields": "Changed test subject fields"
                        }
                    }
                    genemedeAPI.apiPostEx('data/' + g, body, 'put').then((res) => {
                        console.log("put data: ", res.data, res.data.result);
                    });
                    break
                case 'dlgconfirm':
                    var res = await this.$dlg.confirm('Confirmation','Do you want to proceed ?');
                    console.log('RES', res);
                    break;
                case 'dlgalert':
                    var res = await this.$dlg.alert('Error Alert','Message');
                    console.log('RES', res);
                    break;
                case 'notifyerror':
                    this.$notify({
                        type: "error",
                        group: "std",
                        title: "Error",
                        text: "There was an error",
                    });
                    break;
                case 'notifywarn':
                    this.$notify({
                        type: "warn",
                        group: "std",
                        title: "Warning",
                        text: "This is a warning",
                    });
                    break;
                case 'notifysuccess':
                    this.$notify({
                        type: "success",
                        group: "std",
                        title: "Success",
                        text: "Operation successful",
                    });
                    break;
                case 'notifyinfo':
                    this.$notify({
                        type: "info",
                        group: "std",
                        title: "Information",
                        text: "Some generic information",
                    });
                    break;
            }
        },
        clickOpButton(evt) {
            // quick and dirty action selection until we're using components
            var act = evt.srcElement.attributes.action.nodeValue;
            var arg = act.split(':');
            //console.log('click op', act);
            switch (arg[0]) {
                case 'list':
                    genemedeAPI.apiGet("data/" + arg[1]).then((res) => {
                        console.log("get data: ", res.data, res.data.result);
                    });
                    break;
                case 'get':
                    genemedeAPI.apiGet("data/" + arg[1] + '/' + testguid).then((res) => {
                        console.log("get data: ",res.data.result);
                    });
                    break;
                case 'post':
                    data = {field1: 'field 1', field2: 'field 2'}
                    genemedeAPI.apiPost("data/" + arg[1], data)
                        .then((res) => {console.log(res.data.result);})
                        .catch((error) => {console.log(error);  });
                    break;
                case 'put':
                    data = {field1: 'field 1', field2: 'field 2'}
                    genemedeAPI.apiPut("data/" + arg[1], data)
                        .then((res) => {console.log(res.data.result);})
                        .catch((error) => {console.log(error);  });
                    break;
                case 'delete':
                    genemedeAPI.apiDelete("data/" + arg[1] + '/' + testguid)
                        .then((res) => {console.log(res.data.result);})
                        .catch((error) => {console.log(error);  });
                    break;
            }
        },
        initTagify(tags) {
            this.tgInput = document.getElementById('aw_tags');
            /*
            if (this.tgTagify != null) {
                this.tgTagify.removeAllTags();
                this.tgTagify.destroy();
            }
            */
            this.tgTagify = new Tagify(this.tgInput, {
                maxTags: 5,
                backspace: 'edit',
                //whitelist : ['aaa', 'aaab', 'aaabb', 'aaabc', 'aaabd', 'aaabe', 'aaac', 'aaacc'],
                dropdown: {
                    //classname : "tag-dropdown",
                    //enabled: minTagLengthLookup, // show the dropdown immediately on focus
                    enabled: 0,
                    maxItems: 5,
                    position: 'text', // place the dropdown near the typed text
                    closeOnSelect: true // keep the dropdown open after selecting a suggestion
                }
            });

            //window.tgg = this.tgTagify;window.tgi = this.tgInput;
            //if (tags) this.tgTagify.addTags(tags);

            //this.tgTagify.on('add', function(e) { console.log('addtag', e.detail.data); });
            //this.tgTagify.on('input', this.onTagifyInput);
            /*
            this.tgTagify.on('invalid', e => {
                this.$notify({
                    type: 'error',
                    group: 'std',
                    title: 'Invalid tag',
                    text: e.detail.message
                });
                console.log('invalid tag', e.detail);
            });
            */
        },
        onTagifyInput(evt) {
            return;
            var value = evt.detail.value;
            console.log('taginput', value)
            if (value.length >= minTagLengthLookup) {
                if (tagLookupTimeout != null) {
                    clearTimeout(tagLookupTimeout);
                    tagLookupTimeout = null;
                }

                tagLookupTimeout = setTimeout(() => {
                    this.tgTagify.settings.whitelist.length = 0; // reset the whitelist
                    //console.log('TAG INPUT', value);

                    // https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort
                    this.tgController && this.tgController.abort();
                    this.tgController = new AbortController();

                    // show loading animation and hide the suggestions dropdown
                    this.tgTagify
                        .loading(true)
                        .dropdown.hide.call(this.tgTagify);
                    //console.log('FETCH TAGS');

                    fetch(this.$store.state.apiURL + 'tag?value=' + value, {
                        signal: this.tgController.signal
                    })
                        .then(RES => RES.json())
                        .then(whitelist => {
                            // update inwhitelist Array in-place
                            this.tgTagify.settings.whitelist.splice(
                                0,
                                whitelist.length,
                                ...whitelist
                            );
                            this.tgTagify
                                .loading(false)
                                .dropdown.show.call(this.tgTagify, value); // render the suggestions dropdown
                        });
                }, 500);
            }
        },
    }
}

</script>


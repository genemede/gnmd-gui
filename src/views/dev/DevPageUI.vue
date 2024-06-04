<template>
    <div class="middle">
        <div class="wrapper">
            <h2>Dev Page</h2>
            <span>For ongoing UI development. Won't be active on release.</span>
            <hr>
        </div>
        <div class="wrapper">
            <div><input name="tst1" type="date"></div>
            <div><input name="tst2" type="time"></div>
            <GSwitch v-model="switchvalue"></GSwitch>
            <span>Switch: {{ switchvalue }}</span>
            <hr>
            <div class="input-wrapper rounded" name="tsttoggle">
                <div>{{ togvalues }}</div>
                <label class="label is-required">Toggle</label>
                <div class="control full">
                    <GToggle :values='togvalues' />
                </div>
            </div>
        </div>

        <div class="wrapper">
            <DateFieldEx v-model="datepickvalue" title="Datetime"/>
            <div>this value: {{ datepickvalue }}</div>
            <hr>
            <InputField v-model="txtfield" title="test field" type="text" ref="inputfield"/>
            <span>txt: {{ txtfield }}</span>
            <span>{{ this.$refs.inputfield }}</span>
            <GButton class="" action="tst" @click.stop="btnClick">tst</GButton>
        </div>
        <div class="wrapper">
            <GButton class="" action="dlgconfirm" @click.stop="btnClick">dlgconfirm</GButton>
            <GButton class="" action="dlgalert" @click.stop="btnClick">dlgalert</GButton>
        </div>

        <div class="wrapper" v-if="false">
            <hr>
            <span class="tst1">text</span>
            <span class="tst2">text</span>
            <hr>
        </div>
        <div v-if="true">
            <div class="wrapper">
                <GButton class="" action="def" @click.stop="btnClick" ref="btn1">Primary</GButton>
                <GButton class="secondary" @click.prevent="btnClick">Secondary</GButton>
                <GButton class="tertiary" @click.prevent="btnClick">Tertiary</GButton>
                <span>|</span>
                <GButton class="success" action="notifysuccess" @click.prevent="btnClick">Success</GButton>
                <GButton class="danger" action="notifyerror" @click.prevent="btnClick">Error</GButton>
                <GButton class="warning" action="notifywarn" @click.prevent="btnClick">Warning</GButton>
                <GButton class="info" action="notifyinfo" @click.prevent="btnClick">Info</GButton>
            </div>

            <div class="wrapper">
                <GButton class="disabled" @click.prevent="btnClick">Primary</GButton>
                <GButton class="secondary disabled" @click.prevent="btnClick">Secondary</GButton>
                <GButton class="tertiary disabled" @click.prevent="btnClick">Tertiary</GButton>
                <GButton class="success disabled" @click.prevent="btnClick">Success</GButton>
                <GButton class="danger disabled" @click.prevent="btnClick">Error</GButton>
                <GButton class="warning disabled" @click.prevent="btnClick">Warning</GButton>
                <GButton class="info disabled" @click.prevent="btnClick">Info</GButton>
            </div>

            <div class="wrapper">
                <GButton class="small" @click.prevent="btnClick" ref="btn1small">Primary</GButton>
                <GButton class="secondary small" @click.prevent="btnClick">Secondary</GButton>
                <GButton class="tertiary small" @click.prevent="btnClick">Tertiary</GButton>
                <GButton class="success small" @click.prevent="btnClick">Success</GButton>
                <GButton class="danger small" @click.prevent="btnClick">Error</GButton>
                <GButton class="warning small" @click.prevent="btnClick">Warning</GButton>
                <GButton class="info small" @click.prevent="btnClick">Info</GButton>
            </div>

            <div class="wrapper">
                <GButton class="small disabled" @click.prevent="btnClick">Primary</GButton>
                <GButton class="secondary small disabled" @click.prevent="btnClick">Secondary</GButton>
                <GButton class="tertiary small disabled" @click.prevent="btnClick">Tertiary</GButton>
                <GButton class="success small disabled" @click.prevent="btnClick">Success</GButton>
                <GButton class="danger small disabled" @click.prevent="btnClick">Error</GButton>
                <GButton class="warning small disabled" @click.prevent="btnClick">Warning</GButton>
                <GButton class="info small disabled" @click.prevent="btnClick">Info</GButton>
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
            switchvalue: true,
            datepickvalue: null,
            version: '',
            tag_names: ['a', 'b', 'c'],
            tgInput: null,
            tgTagify: null,
            tgController: null,
            txtfield: 'text content',

            togvalues: [
                {on: false, title: 'First option', type: 'one'},
                {on: false, title: 'Second option', type: 'two'}
            ],
        }
    },
    components: {
        GForm,
        VueDatePicker,
        vSelect
    },
    async mounted() {
       //this.datepickvalue = "2024-01-04T05:34:00.000Z"
        //this.datepickvalue = Date.now()
        this.datepickvalue = new Date(1950, 3, 15, 10, 30, 15, 300)
    },
    methods: {
        async btnClick(evt, btn) {
            //var act = evt.srcElement.attributes.action.nodeValue;
            //console.log('click', evt, btn, btn.action);
            debug_log('ENV', import.meta.env.VITE_APP_ENV, import.meta.env.VITE_APP_TITLE)
            this.$dlg.test()

            switch (btn.action) {
                case 'tst':
                    console.log('ref', this.$refs.inputfield.isAltered);
                    break;
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


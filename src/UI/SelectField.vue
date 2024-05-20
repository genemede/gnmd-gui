<template>
    <div class="input-wrapper">
        <!-- <div>MV {{ modelValue }} / SV {{ selvalue }}</div> -->
        <label class="label" v-html="title" :class="labelClass" v-if="title"></label>
        <!--
        <multiselect
            v-model="selvalue" :options="getOptions" track-by="code" label="value"
            :placeholder="getPlaceholder"
            @update:modelValue="onChange">
        </multiselect>
        -->

        <vSelect
            :name="name"
            @input="onInput"
            ref="selfld" @search:focus="onfcs" @open="onOpen"
            :autoscroll="true" v-model="selvalue" label="value"
            :options="getOptions" :reduce="value => value.code"
            @update:modelValue="onChange">
        </vSelect>

        <div class="error-message" :class="errClass">{{errorMessage}}</div>
        <div class="input-help-text" v-if="help">{{help}}</div>
        <template v-if="false">
            <div>MODEL VALUE {{ modelValue }} --</div>
            <div>INTERNAL VALUE {{ selvalue }} --</div>
        </template>
    </div>
</template>
<script>
//import Multiselect from 'vue-multiselect'
import vSelect from 'vue-select'
import { ref, nextTick } from 'vue'

export default {
    props: {
        modelValue: null,
        required: Boolean,
        readonly: Boolean,
        placeholder: String,
        title: String,
        config: Object,
        help: String,
        helperror: Boolean,
        name: null,
        source: null,
        options: null,
        joinlabel: false,
        tag: null
    },
    expose: ["focus"],
    emits: ['update:modelValue', 'blur', 'click', 'change'],
    data () {
        return {
            oneshot: true,
            hasError: false,
            errorMessage: '',
            intOptions: [],
            selvalue: null,
            altered: false
        }
    },
    name: 'SelectField',
    components: {
        //Multiselect,
        vSelect
    },
    async mounted() {
        if (this.options == null) {
            if (this.source != null) {
                var src = await this.$mtypes.getSource(this.source);
                this.intOptions = src.data.data.codes;
            }
        }
        else {
            this.intOptions = this.options;
        }

        if (this.modelValue != null) {
            this.selvalue = this.modelValue
        }
    },
    methods: {
        onOpen(x) {
            //debug_log("OPENING")
        },
        onInput() {
            //console.log("ON INPUT")
        },
        onfcs() {
            if (this.oneshot) {
                nextTick(() => {
                    //debug_log("SCROLLING")
                    const active = this.$refs.selfld.$el.querySelector(".vs__dropdown-menu .vs__dropdown-option--selected");
                    if (active) {
                        active.scrollIntoView( { behavior: 'instant', block: 'nearest', inline: 'start' } );
                        this.oneshot = false
                    }
                });
            }
        },
        focus() {
            //console.log("REF", this.$refs.selfld[0]);
            this.$refs.selfld[0].focus();
        },
        onChange(value) {
            var s = value;
            if (this.joinlabel) {
                for (var i in this.intOptions) {
                    //console.log('I is', this.intOptions[i])
                    if (this.intOptions[i].code == s) {
                        s = s + "|" + this.intOptions[i].value;
                        break;
                    }
                }
            }
            this.$emit('update:modelValue', s, this.tag);
            this.$emit('change', this);
        }
    },
    watch: {
        selvalue(newVal, oldVal) {
            //console.log('OLD', oldVal, 'NEW', newVal)
        },
        modelValue(newVal, oldVal) {
            //console.log('MVOLD', oldVal, 'MVNEW', newVal)
            if (newVal != this.selvalue) {
                this.selvalue = newVal
            }
            this.altered = true;
            this.$emit('change', this);
        },
    },
    computed: {
        getOptions() {
            return this.intOptions;
        },
        getPlaceholder() {
            return this.placeholder ? this.placeholder : this.title;
        },
        errClass() {
            if (this.hasError) {
                return 'visible';
            }
            else {
                return '';
            }
        },
        labelClass() {
            return this.required ? "is-required" : "";
        },
        ctrlClass() {
            var res = '';
            return res;
        }
    }
}
</script>

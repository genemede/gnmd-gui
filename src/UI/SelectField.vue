<script setup>
defineEmits(['update:modelValue', 'blur', 'click'])
</script>

<template>
    <div class="input-wrapper padded">
        <label class="label" v-html="title" :class="labelClass"></label>
        <multiselect
            v-model="selvalue" :options="getOptions" track-by="code" label="value"
            :placeholder="getPlaceholder"
            @update:modelValue="onChange">
        </multiselect>
        <div class="error-message" :class="errClass">{{errorMessage}}</div>
        <div class="input-help-text">{{help}}</div>
        <template v-if="false">
            <div>MODEL VALUE {{ modelValue }} --</div>
            <div>INTERNAL VALUE {{ selvalue }} --</div>
        </template>
    </div>
</template>
<script>
import Multiselect from 'vue-multiselect'

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
        source: null,
        options: null
    },
    data () {
        return {
            hasError: false,
            errorMessage: '',
            intOptions: [],
            selvalue: null,
        }
    },
    name: 'SelectField',
    components: {
        Multiselect
    },
    async mounted() {
        /*
        debug_log("OPTIONS", this.options)
        debug_log("SOURCE", this.source)
        debug_log("VALUE", this.modelValue)
        */
        //
        if (this.modelValue != null) {
            var s = this.modelValue.split("|")
            if (s.length == 2) {
                this.selvalue = {"code": s[0], "value": s[1]}
            }
            else {
                this.selvalue = {"code": s[0], "value": null}
            }
        }

        if (this.options == null) {
            if (this.source != null) {
                var src = await this.$mtypes.getSource(this.source);
                //debug_log("GOT SOURCE", src)
                this.intOptions = src.data.data.codes;
            }
        }
        else {
            this.intOptions = this.options;
        }
    },
    methods: {
        onChange(value) {
            var s;
            if (value) {
                s = value.code + "|" + value.value;
            }
            else {
                s = null;
            }
            this.$emit('update:modelValue', s);
        }
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


<!-- <style src="vue-multiselect/dist/vue-multiselect.css"></style> -->
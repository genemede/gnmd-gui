<script setup>
defineEmits(['update:modelValue', 'blur', 'click'])
</script>

<template>
    <div class="input-wrapper padded">
        <label class="label" v-html="title" :class="labelClass"></label>
        <VueDatePicker v-model="datevalue"></VueDatePicker>
        <div class="error-message" :class="errClass">{{errorMessage}}</div>
        <div class="input-help-text">{{help}}</div>
    </div>
</template>
<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

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
            datevalue: null,
        }
    },
    name: 'DateField',
    components: {
        VueDatePicker
    },
    async mounted() {
    },
    methods: {
        onChange(value) {

        }
    },
    computed: {
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

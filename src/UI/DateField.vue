<script setup>
defineEmits(['update:modelValue', 'blur', 'click'])
</script>

<template>
    <div class="input-wrapper padded">
        <label class="label" v-html="title" :class="labelClass"></label>
        <div>XXX: {{curValue }}</div>
        <VueDatePicker v-model="curValue" utc :formatxx="format" @change="onChange" model-type="iso" />
        <div class="error-message" :class="errClass">{{errorMessage}}</div>
        <div class="input-help-text">{{help}}</div>
    </div>
</template>
<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const format = (date) => {
    console.log(typeof date)
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${year}/${month}/${day} `;
}

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
        options: null,
    },
    data () {
        return {
            hasError: false,
            errorMessage: '',
            curValue: null
        }
    },
    name: 'DateField',
    components: {
        VueDatePicker
    },
    async mounted() {
        console.log("MMM", typeof this.modelValue)
        console.log("VVV", this.modelValue)
    },
    methods: {
        onChange(value) {
            console.log("change", value)
            this.$emit('update:modelValue', value);
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
    },
    watch: {
        modelValue(newVal, oldVal) {
            console.log('MVOLD', oldVal, 'MVNEW', newVal)
            if (newVal != this.curValue) {
                console.log("MMM", typeof newVal)
                this.curValue = newVal
            }
        },
    },
}
</script>

<script setup>
defineEmits(['update:modelValue', 'blur', 'click'])
</script>

<template>
    <div class="input-wrapper padded">
        <label class="label" v-html="title" :class="labelClass" />
        <div class="control full" :class="ctrlClass">
            <span class="icon is-small is-left" v-if="lefticon">
                <i :class="lefticon"></i>
            </span>

            <textarea class="input"
                :rows="rows == null ? 5 : rows"
                @input="updateInput"
                :value="modelValue"
                :placeholder="getPlaceholder"
                :required="required"
                :readonly="readonly"
                ref="input"
            >
            </textarea>
            <span class="icon is-small is-right" v-if="righticon" @click="rightIconClick" style="pointer-events: all;">
                <i :class="righticon"></i>
            </span>
            <div class="error-message" :class="errClass">{{errorMessage}}</div>
        </div>
        <div class="input-help-text">{{help}}</div>
    </div>
</template>
<script>
export default {
    props: {
        half: Boolean,
        rows: String,
        required: Boolean,
        readonly: Boolean,
        title: String,
        placeholder: String,
        help: String,
        modelValue: String,
        lefticon: String,
        righticon: String,
    },
    data () {
        return {
            hasError: false,
            errorMessage: '',
        }
    },
    name: 'TextField',
    mounted() {
        //
    },
    methods: {
        updateInput(event) {
            console.log('update textfield')
            this.$emit('update:modelValue', event.target.value);
        },
        flashError(msg) {
            this.hasError = true;
            this.errorMessage = msg;
            setTimeout(() => {
                this.hasError = false;
            }, 2000);
        },
        focus() {
            this.$refs.textainput.focus();
            //console.log('focusing input', this.title);
        },
        rightIconClick() {
            //console.log('icon click');
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
            if (this.lefticon) res += 'has-icons-left ';
            if (this.righticon) res += 'has-icons-right ';
            return res;
        }
    }
}
</script>



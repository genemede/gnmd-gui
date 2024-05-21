<script setup>
defineEmits(['update:modelValue', 'blur', 'click', 'change'])
</script>

<template>
    <div class="input-wrapper padded flex" :class="{invalid: isInvalid, currency: type =='currency'}">
        <label class="label" v-html="title" :class="labelClass" v-if='title' @click="onLabelClick"/>
        <div class="control" :class="ctrlClass">
            <span class='cooldown active' v-if='cooldownTimeout != null'><div /></span>
            <span class="icon is-small is-left" v-if="lefticon">
                <i :class="lefticon"></i>
            </span>
            <slot name="prefix"></slot>
            <!-- data-lpignore="true" -->
            <input class="input"
                :name="getName"
                :value="modelValue"
                @input="updateInput"

                v-on:blur="$emit('blur', $event)"
                :placeholder="getPlaceholder"
                :size="size"
                :type="getType"
                :required="required"
                :readonly="readonly"
                :inputmode='getInputMode'
                :pattern='getInputPattern'
                :maxlength="maxlength"
                ref="input"
            >
            <slot name="suffix"></slot>
            <span class="icon is-small is-right" v-if="righticon" @click.prevent="rightIconClick" style="pointer-events: all;">
                <i :class="righticon"></i>
            </span>
            <div class="error-message" :class="errClass">{{errorMessage}}</div>
        </div>
        <!-- <div style='flex-basis: 100%; height: 0'></div> -->
        <div class="input-help-text" :class="{'has-error': helperror}">{{help}}</div>
    </div>
</template>
<script>
//import Cleave from 'cleave.js'

export default {
    props: {
        half: Boolean,
        required: Boolean,
        readonly: Boolean,
        title: String,
        placeholder: String,
        type: String,
        help: String,
        name: String,
        cooldown: {
            required: false,
            type: Number,
            default: 0
        },
        modelValue: {
            required: false,
            validator(val) {
                return typeof val === 'number' || typeof val === 'string' || val === '' || val === null;
            },
        },
        size: {
            required: false,
            validator(val) {
                return typeof val === 'number' || val === '' || val === null;
            },
        },

        lefticon: String,
        righticon: String,
        // for currency types
        symbol: String,
        max: Number,
        min: Number,
        maxlength: {
            required: false,
            validator(val) {
                return typeof val === 'number' || val === '' || val === null;
            },
        },
        helperror: Boolean
    },
    data () {
        return {
            hasError: false,
            errorMessage: '',
            isPassword: false,
            cleave: null,
            isInvalid: false,
            cooldownTimeout: null,
            altered: false
        }
    },
    expose: ["isAltered", "focus"],
    name: 'InputField',
    mounted() {
        if (this.type === 'password') {
            this.isPassword = true;
        }

        if(this.type === 'currency') {
            this.cleave = new Cleave(this.$refs.input, {
                numeral: true,
                numeralPositiveOnly: true,
                numeralDecimalScale: 4,
                numeralDecimalMark: '.',
                delimiter: ' ',
                onValueChanged: this.updateCurrencyVal.bind(this),
            });
            this.cleave.setRawValue(this.value);
        }

        if(this.type === 'integer') {
            this.cleave = new Cleave(this.$refs.input, {
                numeral: true,
                numeralPositiveOnly: true,
                numeralDecimalScale: 0,
                numeralDecimalMark: '.',
                delimiter: ' ',
                onValueChanged: this.updateIntegerVal.bind(this),
            });
            this.cleave.setRawValue(this.value);
        }
    },
    methods: {
        onLabelClick() {
            //this.flashError("this is the error message")
        },
        testfunc() {
            return "test value";
        },
        test() {
            this.error = "test error";
        },
        flashError(msg) {
            this.hasError = true;
            this.errorMessage = msg;
            setTimeout(() => {
                this.hasError = false;
            }, 2000);
        },
        updateCurrencyVal(event) {
            var upd = event.target.value.length > 0 ? parseFloat(event.target.rawValue) : 0;
            //console.log('ucv', event.target.rawValue, event.target.value.length);
            this.$emit('input', upd, event);
        },
        updateIntegerVal(event) {
            var upd = event.target.value.length > 0 ? parseInt(event.target.rawValue) : 0;
            var tst = parseInt(event.target.rawValue);
            //debug_log('ucv', event.target.rawValue, event.target.value.length, tst);
            this.$emit('input', upd, event);
        },
        updateInput(event) {
            //console.log('input-update-event')
            /*
            if(this.type !== 'currency' && this.type !== 'integer') {
                this.$emit('input', event.target.value, event);
            }
            if (this.cooldown > 0) {
                this.startCooldown();
            }*/
            this.$emit('update:modelValue', event.target.value);
        },
        startCooldown() {
            if (this.cooldownTimeout != null) {
                clearTimeout(this.cooldownTimeout);
                this.cooldownTimeout = null;
            }

            this.cooldownTimeout = setTimeout(() => {
                debug_log('cooldown activate');
                this.cooldownTimeout = null;
            }, this.cooldown);

        },
        focus() {
            this.$refs.input.focus();
            //console.log('focusing input', this.title);
        },
        rightIconClick() {
            if (this.isPassword) {
                var tmp = this.$refs.input.getAttribute('type');
                if (tmp == 'password') {
                    this.$refs.input.setAttribute('type', 'text');
                } else
                if (tmp == 'text') {
                    this.$refs.input.setAttribute('type', 'password');
                }
            }
            this.$emit('right_icon_click', this);

            this.$refs.input.focus();
            //console.log('icon click');
        }
    },
    watch:{
        modelValue(newval, oldval) {
            if(this.cleave) {
                this.cleave.setRawValue(val || 0);
            }
            this.altered = true;
            this.$emit('change', this);
        }
    },
    computed: {
        isAltered() {
            return this.altered;
        },
        getName() {
            if (this.name) return this.name;
            return null;
        },
        curValue() {
            return this.value;
        },
        getInputMode() {
            if (this.type == "currency" || this.type == "integer"  ) return 'numeric';
            return false;
        },
        getInputPattern() {
            if (this.type == "currency" || this.type == "integer"  ) return '[0-9. ]*';
            return null;
        },
        getType() {
            if (this.type == "currency" || this.type == "integer"  ) return 'text';
            return this.type;
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
            if (this.lefticon) res += 'has-icons-left ';
            if (this.righticon) res += 'has-icons-right ';
            return res;
        }
    }
}
</script>



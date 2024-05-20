<script setup>
defineEmits(['update:modelValue', 'blur', 'click', 'input'])
</script>

<template>
    <label class="swtch" :class="{toggled: isToggled}">
        <span>x - {{ modelValue }} - x - {{ isToggled }}</span>
        <input type="checkbox" class="sw-cb" :name="name" v-model="xtog" :disabled="disabled" @change.stop="toggle" @input="updateInput">
        <div class="swtch-cntr" ref="swtchcntr" :style="swtchStyle">
            <!-- <img draggable="false" src="/img/switch-btn.png" :style="btnStyle" ref="trackBtn"> -->
            <span class="stracker" :style="btnStyle" ref="trackBtn"></span>
        </div>
    </label>
</template>
<script>

const isObject = (value) => {
  return typeof value === 'object'
}

const has = (object, key) => {
  return isObject(object) && object.hasOwnProperty(key)
}

const get = (object, key, defaultValue) => {
  return has(object, key) ? object[key] : defaultValue
}

export default {
    props: {
        modelValue: {
            type: Boolean,
            default: false
        },
        name: {
            type: String
        },
        disabled: {
            type: Boolean,
            default: false
        },
        tag: {
            type: String,
        },
        sync: {
            type: Boolean,
            default: false
        },
        width: {
            type: Number,
            default: 45
        },
    },
    data () {
        return {
            trackWidth: 0,
            btnWidth: 22,
            xtog: !this.modelValue
        }
    },
    name: 'GSwitch',
    mounted() {
        //this.xtog = this.modelValue;
        this.trackWidth = this.$refs['swtchcntr'].offsetWidth;
    },
    watch: {
        /*
        modelValue(v) {
            if (this.sync) {
                this.toggled = !!v
            }
        }
        */

    },
    methods: {
        /*
        toggle() {

            const toggled = !this.toggled;

            if (!this.sync) {
                this.toggled = toggled;
            }

            //this.$emit('input', !toggled);
        },
        */
        updateInput(evt) {
            console.log(evt, this.xtog)
            /*
            console.log('evt', evt.target)
            console.log('tog', this.toggled)

            */
            this.$emit('update:modelValue', this.xtog);
        }
    },
    computed: {
        isToggled() {
            return this.xtog;
        },
        hasDefaultSlot() {
            return !!this.$slots.default;
        },
        swtchStyle() {
            return { width: `${this.width}px` }
        },
        btnStyle() {
            var res = {};
            if (this.isToggled) {
                var x = this.trackWidth - this.btnWidth - 2;
                //console.log(this.trackWidth, this.btnWidth, x);
                res.transform = 'translateX(' + x + 'px)';
            }
            else {
                //str = 'transform: translateX(0px)';
            }
            //console.log('style', res);
            return res;
        },
        labelChecked () {
            console.log('XXXXXXXXXX', get(this.labels, 'checked', 'ON'));
            return get(this.labels, 'checked', 'ON')
        },
        labelUnchecked () {
            //return get(this.labels, 'unchecked', 'OFF')
            return get(this.labels, 'unchecked', '\xa0')
        },
        labelOnStyle() {
            var res = { width: `${this.width}px` };
            if (!this.isToggled) {
                var x = this.trackWidth - this.btnWidth - 2;
                res.transform = 'translateX(-' + x + 'px)';
            }
            return res;
        },
        labelOffStyle() {
            var res = { width: `${this.width}px` };
            if (this.isToggled) {
                var x = this.trackWidth - this.btnWidth - 2;
                res.transform = 'translateX(' + x + 'px)';
            }
            return res;
        }
    }
}
</script>

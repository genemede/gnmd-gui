<template>
    <div class='gtoggle'>
        <div class='buttons'>
            <span class='togbutton' v-for='(item, index) in values' :key='`tog-${index}`'
                @click='clickToggle($event, index)'
            :class='{"is-on": item.on}' v-html='getText(item)'></span>
        </div>
    </div>
</template>

<script>

export default {
    name: 'GToggle',
    props: {
        values: {
            required: true,
            type: Array
        },
        exclusive: {
            required: false,
            type: Boolean
        },
        required: {
            required: false,
            type: Boolean
        }
    },
    data () {
        return {
        }
    },
    mounted() {
    },
    watch: {
        value(value) {
        }
    },
    methods: {
        getText(item) {
            if (item.on && item.titleOn) return item.titleOn;
            return item.title;
        },
        doSetAll(value) {
            for (var i=0; i < this.values.length; i++) {
                this.values[i].on = value;
            }
        },
        getOnCount() {
            var res = 0;
            for (var i=0; i < this.values.length; i++) {
                if (this.values[i].on) {
                    res++;
                }
            }
            return res;
        },
        doSetValue(index, value) {
            // if exclusive, only one can be on
            var ok = true;
            if (this.exclusive) {
                if (this.required) {
                    // if required, at least one must be on
                    if (value === true) {
                        this.doSetAll(false);
                    }
                    else {
                        ok = false;
                    }
                }
                else {
                    this.doSetAll(false);
                }
            }
            else {
                if (this.required) {
                    // if required, at least one must be on
                    if (!value) {
                        ok = this.getOnCount() > 1;
                    }
                }
                else {
                    //
                }
            }

            if (ok) {
                this.values[index].on = value;
            }
        },
        clickToggle(event, index) {
            if (index) {
                this.doSetValue(index, !this.values[index].on);
                let info = {event: event};
                this.$emit('change', info);
            }
        }
    },
    computed: {
        getValue() {
            // returns numeric value corresponding to selected values
            // most useful for exclusive toggles
            // but can also be used for binary style flags (1+2+4 etc)
            // use with care
            var res = 0;

            // if toggles dont have values, we use consecutive power of 2 values
            var autovalue = 1;
            for (var i = 0; i < this.values.length; i++) {
                if (this.values[i].on) {
                    if (this.values[i].value != null) {
                        res += this.values[i].value;
                    }
                    else {
                        res += autovalue;
                        autovalue *= 2;
                    }
                }
            }
            return res;
        }
    }
}
</script>

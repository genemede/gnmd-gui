<template>
    <div class="input-wrapper relfield">
        <label class="label" v-html="title" v-if='title' />
        <div class="control relfield full-blocks">
            <template v-if="hasValues">
                <template v-for="(itm, idx) in modelValue">
                    <div tabindex="0" class="relitem">{{ itm.label }}</div>
                </template>
            </template>

            <div class="relbottom">
                <template v-if="hasValues">
                    <span class="rbentries">{{ entries }}</span>
                </template>
                <template v-else>
                    <span class="relitem empty">(empty)</span>
                </template>
                <GButton class="smallest" @click.prevent="btnClick">Add</GButton>
            </div>
        </div>
        <div style='flex-basis: 100%; height: 0'></div>
        <div class="input-help-text" :class="{'has-error': helperror}">{{help}}</div>
    </div>
</template>
<script>
export default {
    props: {
        modelValue: null,
        title: String,
        help: String,
        helperror: Boolean
    },
    emits: {
    },
    data () {
        return {
        }
    },
    name: 'RelField',
    mounted() {
    },
    methods: {
        btnClick(evt, btn) {

        }
    },
    watch: {
      modelValue(newVal, oldVal) {
        console.log('OLD', oldVal, 'NEW', newVal)
      },
    },
    computed: {
        hasValues() {
            return this.modelValue != null && this.modelValue.length > 0;

        },
        entries() {
            var c = 0;
            if (this.hasValues) c = this.modelValue.length;
            return c ==1 ? "1 entry" : c + " entries";

            //return c;
        }
    }
}
</script>

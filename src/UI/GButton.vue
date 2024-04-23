<template>
    <button type="button" class="button"  :disabled="disabled"
        :class="{disabled: disabled, 'is-waiting':isWaiting, 'xis-inverted':inverted, block:block, big:big, 'click-animation': clicked}"
        @click.stop="intClick"
        @animationend="doAnimEnd"
    >
        <span class="btn-text">
            <slot />
        </span>
        <span class="cogs" v-if="isWaiting"><i class="fas fa-cog fa-spin"></i></span>
        <span class="clkfx" ref="clkfx"></span>
    </button>
</template>
<script>
export default {
    props: {
        inverted: Boolean,
        disabled: Boolean,
        big: Boolean,
        block: Boolean,
        action: String, // custom text for event handling
    },
    emits: {
        // needed for vue3, to stop bubbling. we do the emit by hand with custom payload
        'click': false
    },
    data () {
        return {
            clicked: false,
            isWaiting: false,
        }
    },
    name: 'GButton',
    mounted() {
        //debug_log('GBUTTON MOUNTED');
    },
    methods: {
        intClick(evt) {
            //console.log('btn int click', evt, this.action)
            this.clicked = true;
            this.$emit('click', evt, this);
        },
        doAnimEnd(evt) {
            if (evt.target == this.$refs.clkfx) this.clicked = false;
        }
    },

    computed: {
    }
}
</script>

<template>
    <div class="helpbox" :class="{warn: warn, 'fade-out': isFading}" v-if="isVisible" @animationend="doAnimEnd">
        <div class="hb-icon" v-if="icon">
            <template v-if="warn">
                <i class="fas fa-exclamation"></i>
            </template>
            <template v-else>
                <i class="fas fa-info"></i>
            </template>
        </div>
        <div class="hb-content">
            <div class="hb-title"><slot name="title" /></div>
            <hr class='hb-title-sep'>
            <div class="hb-text text-small">
                <slot />
            </div>
            <template v-if="candismiss">
                <div class="hb-footer">
                    <GButton class="small success" @click.prevent="clickOk">Got it</GButton>
                    <!-- <slot name="footer" /> -->
                </div>
            </template>
        </div>
    </div>
</template>

<script>

export default {
    name: 'HelpBox',
    props: {
        icon: Boolean,
        warn: Boolean,
        candismiss: {
            required: false,
            type: Boolean,
            default: false
        },
        helpid: {
            required: false,
            type: String,
            default: null
        },
    },
    data () {
        return {
            isVisible: false,
            isFading: false
        }
    },
    methods: {
        clickOk() {
            console.log('clicked', this.candismiss, this.helpid)
            if (this.candismiss && this.helpid != null) {
                this.isFading = true;
            }
        },
        doAnimEnd(evt) {
            if (evt.target == this.$el) {
                this.isFading = false;
                this.$storage.setBool('hlp_' + this.helpid, true);
                this.isVisible = false;
            }
        },
        flash() {
            //debug_log('FLASHING HELPBOX');
        }
    },
    computed: {
    },
    created() {
    },
    destroyed() {
    },
    mounted() {
        if (this.candismiss && this.helpid != null) {
            var dismissed = this.$storage.getBool('hlp_' + this.helpid);
            //var dismissed = false;
            this.isVisible = !dismissed;
        }
        else {
            this.isVisible = true;
        }
        //debug_log('helpbox', this.helpid, this.isVisible);
        //console.log('helpbox', this.helpid, this.candismiss);
    },
}
</script>


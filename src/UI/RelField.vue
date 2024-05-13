<template>
    <div class="input-wrapper padded relfield">
        <label class="label" v-html="title" v-if='title'></label>
        <div class="control">
            <template v-if="hasValues">
                <div class="rfcontent">
                    <template v-for="(itm, idx) in modelValue">
                        <div tabindex="0" class="rfitem">
                            <div class="riheader">
                                <span class="rhlabel">{{ itm.label }}</span>
                                <span class="rhmt">{{ itm.mtype }}</span>
                                <span class="rhactions">
                                    <GButton class="small" action="edit" :data-item="idx" @click.stop="btnClick">edit</GButton>
                                    <GButton class="small warning" action="delete" :data-item="idx" @click.stop="btnClick">delete</GButton>
                                </span>
                            </div>
                            <template v-if="config">
                                <div class="ridata">
                                    <div class="rdleft">
                                        <template v-for="(prp) in config.fields">
                                            <div>
                                                <span class="nowrap">{{ prp.label }}</span>
                                            </div>
                                        </template>
                                    </div>
                                    <div class="rdright">
                                        <template v-for="(prp, k) in config.fields">
                                            <div>{{ itm.properties[prp.name] }}</div>
                                        </template>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </template>
                </div>
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
        <div class="input-help-text" :class="{'has-error': helperror}">{{help}}</div>
    </div>
</template>
<script>
import GForm from '@/components/GForm.vue'
export default {
    props: {
        modelValue: null,
        title: String,
        config: Object,
        help: String,
        helperror: Boolean
    },
    emits: {
    },
    components: { GForm },
    data () {
        return {
        }
    },
    name: 'RelField',
    mounted() {
        //debug_log('--- xxxx', this.modelValue)
        //debug_log('--- xxxx', this.config)
    },
    methods: {
        btnClick(evt, btn) {
            if (btn) {
                var x = evt.target.dataset.item;
                switch (btn.action) {
                    case "edit":
                        //debug_log("BTN", btn.dataset)
                        break;
                    case "delete":
                        //debug_log("MV", this.modelValue)
                        this.modelValue.splice(x, 1)
                        break
                }
            }
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

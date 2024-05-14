<template>
    <div class="input-wrapper padded relfield">
        <label class="label" v-html="title" v-if='title'></label>
        <div class="control">
            <template v-if="hasData">
                <div class="rfcontent">
                    <template v-for="(itm, idx) in modelValue">
                        <div tabindex="0" class="rfitem">
                            <div class="rfclosed" :class="{ 'visible' : (!formVisible) }">
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
                            <template v-if="config">
                                <div class="rfopen" :class="{ 'visible' : (formVisible) }">
                                    <GForm :config="config" :values="modelValue[idx].properties"/>
                                </div>
                            </template>

                        </div>
                    </template>
                </div>
            </template>

            <div class="relbottom">
                <template v-if="hasData">
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
        help: String,
        helperror: Boolean,

        fields: Object,
        config: Object
    },
    emits: {
    },
    components: { GForm },
    data () {
        return {
            formVisible: false
        }
    },
    name: 'RelField',
    mounted() {
        //
    },
    methods: {
        async btnClick(evt, btn) {
            if (btn) {
                var x = evt.target.dataset.item;
                switch (btn.action) {
                    case "edit":
                        //debug_log("BTN", btn.dataset)
                        this.formVisible = true;
                        break;
                    case "delete":
                        var ok = await this.$dlg.confirm('Confirmation','Delete this link ?', {okText: 'Yes', cancelText: 'No'});

                        if (ok) {
                            this.modelValue.splice(x, 1)
                        }
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
        hasData() {
            return this.modelValue != null && this.modelValue.length > 0;

        },
        entries() {
            var c = 0;
            if (this.hasData) c = this.modelValue.length;
            return c ==1 ? "1 entry" : c + " entries";

            //return c;
        }
    }
}
</script>

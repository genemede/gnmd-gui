<template>
    <template v-if="item">
        <div class="module spacer-bottom">
            <!-- <div>{{ item }}</div> -->
            <div class="header spacer-bottom">
                <span class="title">Module: {{ item.name }}</span>

                <span>alt: {{ altered }}</span>

                <span class="actions">
                    <span>{{ describeGroupCount }}</span>
                    <GButton class="small" action="add" @click.stop="btnClick" v-if="item.repeatable" >add</GButton>

                    <span class="collapser" @click.stop="btnClick" v-if="false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="10" role="presentation" class="vs__open-indicator"><path d="M9.211364 7.59931l4.48338-4.867229c.407008-.441854.407008-1.158247 0-1.60046l-.73712-.80023c-.407008-.441854-1.066904-.441854-1.474243 0L7 5.198617 2.51662.33139c-.407008-.441853-1.066904-.441853-1.474243 0l-.737121.80023c-.407008.441854-.407008 1.158248 0 1.600461l4.48338 4.867228L7 10l2.211364-2.40069z"></path></svg>
                    </span>
                </span>
            </div>
            <div class="data-container" :class="{ 'hidden': hidden }">

                <template v-for="(itm, idx) in values">
                    <div v-if="item.repeatable" class="header sub">
                        <span class="title">{{ (idx + 1) }} / {{ values.length }}</span>
                        <span class="actions">
                            <GButton class="small warning" action="delete" :data-item="idx" @click.stop="btnClick">delete</GButton>
                        </span>
                    </div>
                    <div class="data">
                        <GForm :config="item.config" :values="values[idx]" @change="onFormChange"/>
                    </div>
                </template>
            </div>
        </div>
    </template>
</template>


<script>

export default {
    name: 'GModule',
    setup() {
    },
    props: {
        item: Object,
        values: Object
    },
    emits: ['change'],
    data() {
        return {
            hidden: false,
            altered: false
        }
    },
    methods: {
        async btnClick(evt, btn) {
            if (btn) {
                var act = btn.action;
                var idx = evt.target.dataset.item;
                switch (btn.action) {
                case "add":
                    var obj = {}
                    for (var fld in this.item.config.fields) {
                        var cur = this.item.config.fields[fld]
                        obj[cur.name] = ""
                    }
                    this.values.push(obj)
                    break;
                case "delete":
                    var ok = await this.$dlg.confirm('Confirmation','Delete this field group ?', {okText: 'Yes', cancelText: 'No'});
                    if (ok) {
                        this.values.splice(idx, 1)
                    }
                    break
                }
            }
        },
        onFormChange(obj) {
            this.altered = true;
            this.$emit('change', this);
        }
    },
    computed: {
        describeGroupCount() {
            var c = this.values.length;
            if (c == 0) return "empty";
            if (c == 1) return "1 group";
            if (c > 1) return c + " groups";
        }
    },
    watch: {
    },
    created() {
    },
    destroyed() {
    },
    mounted() {
    },
}
</script>

<template>
    <div class="middle">
        <div class="wrapper">
            <h2>{{title}}</h2>
            <p>
                <strong>Pruitt-Pearson Laboratories</strong>
            </p>
        </div>
        <div class="wrapper">
            <textarea rows="50" v-model="txt" style="width: 100%"></textarea>
        </div>
    </div>
</template>

<script>
import genemedeAPI from '@/services/gnmd-api.js';
import { useRoute } from 'vue-router'
import GForm from '@/components/GForm.vue'
import mtypes from '@/services/mtypes.js';

var slug = null

export default {
    setup() {
        const route = useRoute()
        slug = route.params.slug
    },
    components: {  },
    data() {
        return {
            title: 'Laboratory',
            obj: null,
            txt: '',
            formconfig: {
                fields: []
            },
            formvalues: [],
        }
    },
    methods: {
        initForm() {
            this.txt = JSON.stringify(this.obj, null, 4)

            this.formconfig.fields = []
            this.formvalues = []
            var mt = mtypes.get(this.obj.mtype)
            var prop,v
            //console.log('mt', mt, this.obj.properties)
            if (mt) {
                for (var key in mt.properties) {
                    prop = mt.properties[key]
                    this.formconfig.fields.push({
                        'datatype': prop.datatype,
                        'name': prop.label,
                        'help': prop.help
                    })
                    v = this.obj.properties[key]
                    this.formvalues.push(v)
                    console.log('prop', key, v)
                }
            }
        }
    },
    mounted() {
        console.log('detail for ', slug)
        genemedeAPI.apiGet("guid/" + slug).then((res) => {
            this.obj = res.data.data
            console.log(this.obj)
            this.initForm()
        });
    }
}
</script>
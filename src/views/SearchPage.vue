<script setup>
import SearchResultItem from '@/components/SearchResultItem.vue'
</script>

<template>
    <div class="middle">
        <div class="wrapper">
            <h2>Search Page</h2>
            <p>
                Search existing data
            </p>
        </div>

        <div class="wrapper">

            <!-- <span>Search</span><input v-model="filterTmp" />
            <GButton class="" @click.prevent="btnClick">Search</GButton> -->

            <InputField class='' v-model="filterTmp" type="text" help="Enter text to search for">
                <template v-slot:suffix>
                    <GButton class="" @click.prevent="btnClick">Search</GButton>
                </template>
            </InputField>

        </div>

        <div class="wrapper">
            <DataTable :columns="columns" :options="options" :data="data" class="display nowrap" width="100%" @click='clickDataTable'>
                <thead>
                    <tr>
                        <th>MType</th>
                        <th>Label</th>
                        <th>Guid</th>
                    </tr>
                </thead>
            </DataTable>
        </div>

    </div>
</template>

<script>
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
//import 'datatables.net-buttons';
//import 'datatables.net-buttons/js/buttons.html5';
//import 'datatables.net-responsive';
import 'datatables.net-select';

import { storeToRefs } from 'pinia';
import router from '/src/router/router.js'
import genemedeAPI from '@/services/gnmd-api.js';
import GForm from '@/components/GForm.vue'

DataTable.use(DataTablesCore);

export default {
    name: 'SearchPage',
    data () {
        return {
            filterTmp: '',
            columns: [
                {
                    render: (data, type, row) => {
                        var icon = this.$mtypes.getIcon(row.mtype, "fa-sm");
                        var html = `<i class="${icon}"></i> ` + row.mtype;
                        return html;
                    },
                    className: "mt-icon",
                    //data: 'mtype',
                    width: "150px"
                },
                { data: 'label' },
                {
                    title: '', data: null, orderable: false, searchable: false, className: "dt-right",
                    render: (data, type, row) => {
                        var html = this.$helpers.html_button(row.guid, 'details', 'small alternate')
                        return html;
                    }
                }
            ],
            options: {
                //dom: 'Bftip',
                //responsive: true,
                searching: false,
                select: true,
                paging: true,
                pageLength: 25
            },
            data: []
        }
    },
    mounted() {
        console.log('mounted')
        this.execSearch();
        // some fake data
        //this.randomData();
    },
    methods: {
        randomData() {
            console.log('Randomizing');
            var tmp = []
            var g;
            const mtypes = ['lab', 'project', 'researcher', 'subject'];
            var r;
            const max = 1000

            for (var i = 0; i < max; i++) {
                g = URL.createObjectURL(new Blob([])).slice(-36);
                r = mtypes[Math.floor(Math.random() * mtypes.length)];

                tmp.push({
                    mtype: r,
                    guid: g,
                    name: g,
                    description: g
                })

                //tmp.push(URL.createObjectURL(new Blob([])).slice(-36));
            }
            this.data = tmp;
        },
        async clickDataTable(event, info) {
            var btn = event.target;
            if (btn.tagName == 'BUTTON') {
                var act = btn.getAttribute('action')
                //console.log('btn', event.target, act)
                router.push('/data/edit/' + act)
            }
        },
        clickClearFilter() {
            this.filterTmp = ''
            //
        },
        async execSearch() {
            genemedeAPI.apiGet("search?q=" + this.filterTmp).then((res) => {
                this.data = res.data.data
            });

        },
        btnClick(evt, btn) {
            if (btn) {
                this.execSearch()
                /*
                console.log('src btn', evt, btn.action);
                this.randomData();
                btn.isWaiting = true;
                setTimeout(() => {
                    btn.isWaiting = false;
                }, 500);
                */

            }
        }
    }
}
</script>

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
            <DataTable :columns="columns" :options="options" :data="data" class="display nowrap" width="100%" @click='clickDataTable' ref="dt">
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
                        var html = `<span class="cls-mt-${row.mtype}"><i class="${icon}"></i></span> ` + row.mtype;
                        return html;
                    },
                    className: "mt-icon cls-mt-",
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
                pageLength: 25,
                /*
                rowCallback: (row, data) => {
                    row.childNodes[0].classList.toggle('cls-mt-' + data.mtype, true);
                }
                */
            },
            data: []
        }
    },
    mounted() {
        this.execSearch();
    },
    methods: {
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
        },
        async execSearch() {
            genemedeAPI.apiGet("search?q=" + this.filterTmp).then((res) => {
                this.data = res.data.data
            });
        },
        btnClick(evt, btn) {
            if (btn) {
                this.execSearch()
            }
        }
    }
}
</script>

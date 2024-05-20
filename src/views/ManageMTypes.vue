<template>
    <div class="middle">
        <div class="wrapper">
            <h2>Metadata Types Management</h2>
            <p>
                Choose from the available types to see its structure and available fields
            </p>
        </div>
        <div class="wrapper">
            <span>Select MType</span>
            <VueMultiselect v-model="sel" :options="opts" @input="onSelChange"></VueMultiselect>
        </div>
        <div class="wrapper">
            <DataTable :columns="columns" :options="options" :data="data" class="display nowrap" width="100%" @click='clickDataTable'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Type</th>
                        <th>Label</th>
                        <th>Notes</th>
                    </tr>
                </thead>
            </DataTable>
        </div>
    </div>
</template>

<script>
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
import 'datatables.net-buttons';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-responsive';
import 'datatables.net-select';
import VueMultiselect from 'vue-multiselect'
import mtypes from '@/services/mtypes.js';

DataTable.use(DataTablesCore);

export default {
    name: 'ManageMTypes',
    data() {
        return {
            sel: null,
            opts: [],
            curMtype: null,
            columns: [
                { data: '_id', width: "20px", className: "dt-right" },
                { data: 'name',
                    render: (data, type, row) => {
                        var cls = ''
                        if (row._group) cls = 'pad-left-extra'
                        return '<span class="' + cls + '">' + data + '</span>';
                    }
                },
                { data: 'description' },
                {
                    data: 'datatype', width: "50px"
                },
                { data: 'label' },
                {
                    title: '', data: null, orderable: false, searchable: false, className: "dt-right",
                    render: (data, type, row) => {
                        var html = '';
                        var url = "/mtypes/lab"
                        //html = `<span href='${url}' data-clickable>open</span>`;
                        html = `<span test='${url}' data-clickable>open</span>`;
                        //html = html_button('aa', 'bb', 'open', 'small alternate')
                        html = this.$helpers.html_button('mtype-detail', 'details', 'small alternate disabled')

                        return html;
                        //return '<span>qweqwe</span>';
                    }
                }
            ],
            options: {
                //dom: 'Bftip',
                //responsive: true,
                select: true,
                paging: false,
                pageLength: -1
            },
            data: []
        }
    },
    mounted() {
        for (var i in mtypes.data) {
            this.opts.push(mtypes.data[i].mtype)
        }
        console.log('MMT Mounted');
    },
    methods: {
        onSelChange() {
            //
        },
        async clickDataTable(event, info) {
            var btn = event.target;
            if (btn.tagName == 'BUTTON') {
                var act = btn.getAttribute('action')
                console.log('btn', event.target, act)
            }
        },
        _addfield(i, n, o, g) {
            var obj = {
                "_id": i,
                "name": n,
                "description": o.description,
                "label": o.label,
                "datatype": o.datatype,
                "notes": {
                }
            }
            if (g) {
                obj._group = g
            }
            this.data.push(obj)
        },
        updateData(mtobj) {
            this.data = []
            var i = 0
            for (var o in mtobj.properties) {
                i++;
                this._addfield(i, o, mtobj.properties[o])
                if (mtobj.properties[o].datatype == 'group') {
                    for (var o2 in mtobj.properties[o].properties) {
                        i++;
                        this._addfield(i, o2, mtobj.properties[o].properties[o2], o)
                    }
                }
            }
        },
        showMtype(mt) {
            this.curMtype = mt
            for (var i in mtypes.data) {
                if (mtypes.data[i].mtype == mt) {
                    this.updateData(mtypes.data[i])
                    break
                }
            }
        }
    },
    watch: {
        sel(n, o) {
            //console.log('sel changed', n, o);
            this.showMtype(n)
        },
    },
    components: { DataTable, VueMultiselect }
}
</script>

<template>
    <div class="datagrid">
        <template v-if="navdata">
            <DataTable :columns="columns" :options="options" :data="navdata" class="display nowrap" width="100%" @click='clickDataTable'>
                <thead>
                    <tr>
                        <th>MType</th>
                        <th>Label</th>
                        <th>Guid</th>
                    </tr>
                </thead>
            </DataTable>
        </template>

    </div>
</template>

<script>
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
import 'datatables.net-buttons';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-responsive';
import 'datatables.net-select';

DataTable.use(DataTablesCore);

export default {
    props: {
        navdata: { type: Array },
        mtype: { type: String},
        actionLabel: { type: String},
    },
    emits: ["dataCellClick"],
    components: {
        DataTable
    },
    data() {
        return {
            rvar: 123,
            filterTmp: '',
            columns: [
                {
                    render: (data, type, row) => {
                        var icon = this.$mtypes.getIcon(row.mtype, "fa-sm");
                        var html = `<i class="${icon}"></i> ` + row.mtype;
                        return html;
                    },
                    className: "mt-icon",
                    width: "150px"
                },
                { data: 'label', searchable: true },
                {
                    title: '', data: null, orderable: false, searchable: false, className: "dt-right",
                    render: (data, type, row) => {
                        var html = this.$helpers.html_button(row.guid, this.actionLabel, 'small alternate')
                        return html;
                    }
                }
            ],
            options: {
                //dom: 'Bftip',
                //responsive: true,
                searching: true,
                select: true,
                paging: true,
                pageLength: 25
            },
            data: [],

        }
    },

    methods: {
        prepTable() {
        },
        click2() {

        },
        async clickDataTable(event, info) {
            var btn = event.target;
            if (btn.tagName == 'BUTTON') {
                var act = btn.getAttribute('action')
                this.$emit("dataCellClick", event, act);
            }
        },
    },
    mounted() {
        this.prepTable()
    }
}
</script>

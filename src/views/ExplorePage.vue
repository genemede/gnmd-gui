<template>

    <div class="middle">
        <!-- <div class="left-side">qwqeqwe</div> -->
        <div class="wrapper" v-if="false">
            <h2>Explore</h2>
            <p>Explore Data</p>
        </div>

        <div class="wrapper" v-if="false">
            <HelpBox class='spacer-top' icon candismiss helpid="tsthelpbox">
                <template v-slot:title>Top Level Data Items</template>
                <p>
                    This will show top level data items, which serve as a starting point for exploring the data

                </p>
            </HelpBox>
        </div>
        <div class="wrapper">
            <div class="std-grid" v-if="lst.length > 0">
                <template v-for="(itm, idx) in lst">
                    <div class="tmpdata" :class="`cls-mt-` + itm.mtype">
                        <div class="tdtitle">
                            <i :class='itm.icon'></i>
                            <strong style="margin-left: 8px">{{ itm.mtype }}</strong>
                        </div>
                        <div class="tdbody">
                            <span>{{ itm.total }}</span>
                        </div>
                        <div class="tdfooter">
                            <GButton class="" :action="`setmt:${itm.mtype}`" @click.prevent="btnClick">Select</GButton>
                        </div>

                    </div>
                </template>
            </div>
            <br>
        </div>
        <div class="wrapper">
            <div class="tmptitle">Current:
                <span v-if="curmt == null">none</span>
                <span v-else>{{ this.curmt}}</span>
            </div>
            <div class="wrapper wireframe">
                <p>(placeholder for stats and specifics)</p>
            </div>
        </div>

        <div class="wrapper">
            <InputField class='' v-model="filterTmp" type="text" help="Filter data">
                <template v-slot:suffix>
                    <GButton class="danger" @click.prevent="btnClick">Clear</GButton>
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
import genemedeAPI from '@/services/gnmd-api.js';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
import 'datatables.net-buttons';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-responsive';
import 'datatables.net-select';

DataTable.use(DataTablesCore);

export default {
    name: 'ExplorePage',
    components: {
        DataTable,
    },
    data () {
        return {
            lst: [],
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
                        var html = this.$helpers.html_button(row.guid, 'details', 'small secondary')
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
            curmt: null
        }
    },
    mounted() {
        console.log('mounted')
        this.lst = [
            {   mtype: "lab",
                total: 9,
                icon: 'fas fa-home'
            },
            {   mtype: "project",
                total: 1,
                icon: 'far fa-file-alt'
            },
            {   mtype: "researcher",
                total: 51,
                icon: 'fas fa-user'
            },
            {   mtype: "subject",
                total: 250,
                icon: 'fas fa-user'
            },

            {   mtype: "protocol",
                total: 10,
                icon: 'far fa-file-alt'
            },
            {   mtype: "session",
                total: 35,
                icon: 'far fa-file-alt'
            },
        ];
        /*

        genemedeAPI.apiGet("stats").then((res) => {
            console.log("get stats: ", res.data);
            this.lst = []
            for (var i in res.data.data.mtypes) {
                var icon = this.$mtypes.getIcon(i, "fa-sm");
                this.lst.push({
                    mtype: i,
                    count: res.data.data.mtypes[i],
                    icon: icon
                })
            }
            for (var i=1; i < 1000; i++) { this.lst.push({ mtype: 'fake' + i, count: i*3, icon: 'fas fa-tag' }) }
        });
        */

    },
    methods: {
        btnClick(evt, btn) {
            if (btn) {
                var act = btn.action.split(':');
                if (act[0] == 'setmt') {
                    this.fakeData(act[1])
                }
            }
        },
        fakeData(mt) {
            var tmp = []
            for (var i=0; i<50; i++) {
                tmp.push({
                    mtype: mt,
                    guid: '1234',
                    label: 'Fake row ' + i
                })
            }
            this.data = tmp;
            this.curmt = mt;
        },
        async clickDataTable(event, info) {
            var btn = event.target;
            if (btn.tagName == 'BUTTON') {
                var act = btn.getAttribute('action')
                //console.log('btn', event.target, act)
                router.push('/data/edit/' + act)
            }
        },
    }
}
</script>

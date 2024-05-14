<template>
    <div class="middle">
        <div class="wrapper">
            <h2>Welcome to Genemede</h2>
            <p>
                GENEMEDE is a generic metadata framework that may be used to comprehensively describe a neuroscience experiment.
            </p>
            <p>
                It comes with a variety of descriptors tailored to solving specific problems on the field of neuroscience,
                but it's designed to allow for any configuration needed.
            </p>
            <p><br></p>
            <div class="infobar">
                <span>GAT Status: </span>
                <span class="server-icon" v-if='this.$store.server.status === 0'>Unknown</span>
                <span class="server-icon" v-if='this.$store.server.status === 1'>Offline</span>
                <span class="server-icon" v-if='this.$store.server.status === 2'>Online</span>
            </div>
            <template v-if="this.$store.server.status === 2">
                <p>Try creating an instance of one of these metadata descriptors:<br><br>

                <template v-for="mt in $store.mtypes">
                    <GButton :class="{ 'alternate': mt.namespace != ''}" :action="'add:' + mt.mtype" @click.stop="btnClick">Add {{ mt.description }}</GButton>
                </template>
            </p>
            </template>
            <template v-else>
                <p>
                    Unable to connect to your local GAT server. Please make sure it is running.
                    <a href="https://genemede.github.io/about/#how-to-install-genemede" target="_blank">Read more here</a>
                </p>
            </template>
<!--
            <template v-for="this.$mtypes.">
                <div></div>
            </template>

             -->
        </div>
        <div class="wrapper">

            <HelpBox class='spacer-top' icon>
                <template v-slot:title>No data is stored here</template>
                <p>
                    This web application is only a frontend for the GAT api. All data is stored on your local GAT instance.
                    <br>
                    <a href="https://genemede.github.io/about/" target="_blank">Read more here</a>
                </p>
            </HelpBox>

        </div>

        <div class="wrapper" v-if="false">
            <div class="std-grid">
                <div class="grid-cell">
                    <GChart ref="c1" />
                </div>
                <div class="grid-cell">
                    <GChart ref="c2" />
                </div>
                <div class="grid-cell">
                    <GChart ref="c3" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Chart from 'chart.js/auto';
import GChart from '@/UI/GChart.vue'
import Tagify from '@yaireo/tagify';
import axios from 'axios';
import genemedeAPI from '@/services/gnmd-api.js';
import GTags from '@/UI/GTags.vue'
var tgf = null, controller = null;
import router from '/src/router/router.js'

export default {
    name: 'HomeView',
    components: {
        GChart, GTags
    },
    data() {
        return {
            tags1: 'a,b,c',
            tags2: '',
            text1: '',
            mtlist: []
        }
    },
    watch: {
        tags1(newVal, oldVal) {
            //this.tagify.loadOriginalValues(newVal)
            console.log('tags', newVal, oldVal)
        },
    },
    mounted() {
        //console.log(this.$mtypes.listMtypes())
        /*
        var input = document.querySelector('input[name=basic]');
        tgf = new Tagify(input, {
            whitelist: [],
            backspace: 'edit',
            dropdown: {
                fuzzySearch: true,
                //position: "input",
                enabled: 3 // always opens dropdown when input gets focus
            }
        })
        tgf.on('input', this.onTagifyInput);
        //this.initChart();
        */
    },
    methods: {
        onTagifyInput(evt) {
        },
        btnClick(evt, btn) {
            var act = btn.action.split(':')
            if (btn) {
                switch (act[0]) {
                case 'add':
                    router.push('/data/create/' + act[1])
                    break;
                default:
                }
            }
        },
        initChart() {
            // chart 1
            var data = [
                { mtype: 'lab', count: 10 },
                { mtype: 'project', count: 20 },
                { mtype: 'subject', count: 45 },
                { mtype: 'researcher', count: 25 },
                { mtype: 'other', count: 55 }
            ];
            var stg = {
                type: 'bar',
                data: {
                    labels: data.map(row => row.mtype),
                    datasets: [{
                        label: 'Data by media type',
                        data: data.map(row => row.count)
                    }]
                }
            }
            new Chart(this.$refs.c1.canvas, stg);

            // chart 2
            data = {
                labels: [
                    "Nicco hates",
                    'Pie',
                    'Charts'
                ],
                datasets: [{
                    label: 'Dataset',
                    data: [300, 50, 100],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)'
                    ],
                    hoverOffset: 4
                }]
            };
            stg = {
                type: 'doughnut',
                data: data
            }
            new Chart(this.$refs.c2.canvas, stg);

            // chart 3
            data = {
                labels: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul'
                ],
                datasets: [{
                    label: 'Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    //borderColor: 'rgb(75, 192, 192)',
                    borderColor: '#add9ec',
                    tension: 0.1,
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)'
                    ],
                }]
            };

            stg = {
                type: 'line',
                data: data
            }
            new Chart(this.$refs.c3.canvas, stg);
        }
    }
}
</script>
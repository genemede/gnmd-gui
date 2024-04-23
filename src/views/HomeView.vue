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
            <p>Try creating an instance of one of these metadata descriptors:<br><br>
                <GButton class="" action="newlab" @click.stop="btnClick">Add Lab</GButton>
                <GButton class="" action="newproject" @click.stop="btnClick">Add Project</GButton>
                <GButton class="" action="newresearcher" @click.stop="btnClick">Add Researcher</GButton>
                <GButton class="" action="newsubject" @click.stop="btnClick">Add Subject</GButton>
            </p>
        </div>
        <div class="wrapper">
            <span>{{ tags1 }}</span><br>
            <span>{{ tags2 }}</span><br>
            <span>{{ text1 }}</span><br>
        </div>
        <div class="wrapper">
            <div class="input-wrapper">
                <label class="label">Label</label>
                <div class="control full">
                    <input name='basic' xvalue="tags1">
                </div>
                <div style='flex-basis: 100%; height: 0'></div>
            </div>

            <InputField v-model="text1" class='xinline' title="Text field" type="text" />
            <!-- <GTags v-model="tags2" /> -->
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
            text1: ''
        }
    },
    watch: {
        tags1(newVal, oldVal) {
            //this.tagify.loadOriginalValues(newVal)
            console.log('tags', newVal, oldVal)
        },
    },
    mounted() {
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
    },
    methods: {
        onTagifyInput(evt) {
        },
        btnClick(evt, btn) {
            if (btn) {
                switch (btn.action) {
                case 'newproject':
                    router.push('/data/create/project')
                    break;
                case 'newresearcher':
                    router.push('/data/create/researcher')
                    break;
                case 'newlab':
                    router.push('/data/create/lab')
                    break;
                case 'newsubject':
                    router.push('/data/create/subject')
                    break;
                default:
                }
                //console.log('click', evt, btn.action);
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
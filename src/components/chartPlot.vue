<template>
    <div class="flex flex-col justify-start" >
        <dl class="mt-6 grid sm:gap-2 sm:grid-cols-4 h-25">
            <div class="px-4 py-2 bg-gray-100 shadow rounded-lg overflow-hidden sm:p-6 dark:bg-gray-600 dark:border-gray-600 ">
                <dt class="text-sm font-medium text-gray-500 truncate dark:text-white">
                    F
                </dt>
                <dd class="mt-1 text-3xl font-medium text-gray-900 dark:text-white">
                    {{ showData  }} 
                </dd>
            </div>
            <div class="px-4 py-5 bg-gray-100 shadow rounded-lg overflow-hidden sm:p-6 dark:bg-gray-600 dark:border-gray-600">
                <dt class="text-sm font-medium text-gray-500 truncate dark:text-white">
                    AUC-IV
                </dt>
                <dd class="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
                    {{ IVAUC  }}
                </dd>
            </div>
            <div class="px-4 py-5 bg-gray-100 shadow rounded-lg overflow-hidden sm:p-6 dark:bg-gray-600 dark:border-gray-600">
                <dt class="text-sm font-medium text-gray-500 truncate dark:text-white">
                    AUC-PO
                </dt>
                <dd class="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
                    {{ POAUC  }}
                </dd>
            </div>
            <div class="px-4 py-5 bg-gray-100 shadow rounded-lg overflow-hidden sm:p-6 dark:bg-gray-600 dark:border-gray-600">
                <dt class="text-sm font-medium text-gray-500 truncate dark:text-white">
                    Clearance
                </dt>
                <dd class="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
                    {{ IVCL  }}
                </dd>
            </div>
        </dl>

        <div class="flex flex-col mt-2">
            <div class="relative h-full">
                <suspense>
                    <template #default>
                        <canvas id="PlotChart" class="h-25"></canvas>
                    </template>
                    <template #fallback>
                        loding...
                    </template>
                </suspense>
                <!-- <canvas id="PlotChart" class="h-25"></canvas> -->
                <div v-if="loadingState" v-html="structure" class="w-50 h-50 absolute top-10 right-40 border-solid border-2 border-gray-600 max-md:w-20 max-md:h-20"></div>
            </div>
        </div>
                
    </div>
</template>

<script>
import { ref, onMounted, watch, computed, suspense } from 'vue';
import Chart from 'chart.js/auto';
import store from '@/store';
import { Buffer } from 'buffer';

export default {
props: {
    chartData: {
        type: Object,
        default: null
    }
},
setup(props) {
    const showData = ref(null);
    const IVAUC = ref(null);
    const POAUC = ref(null);
    const IVCL = ref(null);
    const IVTime = [0.083, 0.25, 0.5, 1.0, 2.0, 4.0, 7.0, 24.0];
    const POTime = [0.25, 0.5, 1.0, 2.0, 4.0, 7.0, 24.0];
    let IVValue;
    let POValue;
    let chart;
    const structure = ref(null);
    const loadingState = ref(false);

    onMounted(() => {
        console.log(store.state.responseData)
        showData.value = parseFloat(store.state.responseData.F).toFixed(4)
        IVAUC.value = parseFloat(store.state.responseData.AUC_IV).toFixed(4)
        POAUC.value = parseFloat(store.state.responseData.AUC_PO).toFixed(4)
        IVCL.value = parseFloat(store.state.responseData.CL).toFixed(4)
        IVValue = store.state.responseData.IV_Value
        POValue = store.state.responseData.PO_Value
        // structure.value = Buffer.from(store.state.responseData.Structure, 'base64')


        chart = new Chart(document.getElementById('PlotChart'), {
            type: 'line',
            data: {
                labels: IVTime,
                datasets: [
                    {
                        label: 'IV',
                        data: IVValue,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 3,
                    },
                    {
                        label: 'PO',
                        data: POValue,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 3,
                    },
                ],
            },
            options: {
                plugins: {
                    tooltip: {
                        enabled: true // <-- this option disables tooltips
                    }
                },
                scales: {
                    xAxes:[{
                        display: true,
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                    yAxes:[{
                        display: true,
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
            },
        });
                
        if(showData.value!=null) {
            loadingState.value = false
        }
    }) 


    watch(() => props.chartData, async (data)=>{
        if(chart) {
            chart.destroy(); 
        }

        showData.value = parseFloat(data.F).toFixed(4)
        IVAUC.value = parseFloat(data.AUC_IV).toFixed(4)
        POAUC.value = parseFloat(data.AUC_PO).toFixed(4)
        IVCL.value = parseFloat(data.CL).toFixed(4)
        // structure.value = atob(data.Structure)
        structure.value = Buffer.from(data.Structure, 'base64')

        IVValue = data.IV_Value
        POValue = data.PO_Value

        chart = new Chart(document.getElementById('PlotChart'), {
            type: 'line',
            data: {
                labels: IVTime,
                datasets: [
                    {
                        label: 'IV',
                        data: IVValue,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 3,
                    },
                    {
                        label: 'PO',
                        data: POValue,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 3,
                    },
                ],
            },
            options: {
                plugins: {
                    tooltip: {
                        enabled: true // <-- this option disables tooltips
                    }
                },
                scales: {
                    xAxes:[{
                        display: true,
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                    yAxes:[{
                        display: true,
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
            },
        });

        if(data.Structure!=null) {
            loadingState.value = true
        } else {
            loadingState.value = false
        }
        
    })

    return {
        showData,
        IVAUC,
        POAUC,
        IVTime,
        IVCL,
        structure,
        loadingState
    };
},
};
</script>



<template>
    <div class="flex flex-col justify-center" >
        F: {{ showData  }} 
        AUC: {{ IVAUC }}
      <canvas id="PlotChart" >
      </canvas>
    </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import Chart from 'chart.js/auto';

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
    const IVTime = [0.083, 0.25, 0.5, 1.0, 2.0, 4.0, 7.0, 24.0];
    let IVValue;
    let chart;
    
    watch(() => props.chartData, (data)=>{
        if(chart) {
            chart.destroy(); 
        }

        showData.value = data.F
        IVAUC.value = data.AUC
        IVValue = data.IV_Value

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
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                scales: {
                    xAxes:[{
                        display: true
                    }],
                    yAxes:[{
                        display: true
                    }]
                },
            },
        });
    })

    return {
        showData,
        IVAUC,
        IVTime
    };
},
};
</script>



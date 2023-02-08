<template>
    <div class="flex flex-col justify-center" >
        F: {{ showData  }} 
        AUC: {{ IVAUC }}
      <canvas ref="canvas" >
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
    const canvas = ref(null);
    const showData = ref(null);
    const IVAUC = ref(null);
    const IVTime = ref([0.083, 0.25, 0.5, 1.0, 2.0, 4.0, 7.0, 24.0]);
    const IVValue = ref(null);
    
    watch(() => props.chartData, (data)=>{
        console.log(data.F)
        showData.value = data.F
        IVAUC.value = data.IV_auc_predicted
        IVTime.value = data.IV_t_list
        IVValue.value = data.IV_predicted2
        console.log(IVTime.value)
        console.log(IVValue.value)
    })
    
    onMounted(() => {
        const ctx = canvas.value.getContext('2d');
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
            labels: IVTime.value,
            datasets: [
                {
                label: 'IV',
                data: IVAUC.value,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                },
            ],
            },
            options: {
            scales: {
                
            },
            },
        });
    });

    return {
        canvas,
        showData,
        IVAUC,
        IVTime
    };
},
};
</script>



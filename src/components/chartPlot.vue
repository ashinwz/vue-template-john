<template>
    <div class="flex flex-col justify-center">
      <canvas ref="canvas"></canvas>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';

export default {
setup() {
    const canvas = ref(null);

    onMounted(() => {
    const ctx = canvas.value.getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
            label: 'Sales',
            data: [40, 50, 60, 70, 80, 90, 100],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            },
        ],
        },
        options: {
        scales: {
            yAxes: [
            {
                ticks: {
                beginAtZero: true,
                },
            },
            ],
        },
        },
    });
    });

    return {
    canvas,
    };
},
};
</script>



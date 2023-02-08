<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="px-4 py-4">
    <div class="flex flex-col text-left">
      <div class="flex-col h-[2rem]">
        <h1 class="text-xl font-semibold text-gray-900">Plot</h1>
        <p class="mt-2 text-sm text-gray-700">
          The SDPK generated plot will be shown here.
        </p>
      </div>
      <div class="mx-auto my-auto flex justify-center items-center content-center h-[43rem] w-full">
        <div class="h-4/5 w-4/5 bg-gray-100 rounded flex justify-center items-center content-center" :class="[isLoading?'delay-1000 hidden':'']">
          <ChartBarSquareIcon class="h-40 w-40 text-gray-500 " :class="[isLoading?'rotate-180 tansform transition-all duration-1000 ease-in-out':'']"  aria-hidden="true" />
        </div>
        
        <div class="h-full w-4/5 rounded flex justify-center items-center content-center" :class="[isLoading?'':' hidden']">
          <chartPlot class="h-full w-full " :chartData="plotData"/>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ChartBarSquareIcon,
} from "@heroicons/vue/24/outline";
import chartPlot from './chartPlot.vue'


export default {
  components: {
    ChartBarSquareIcon,
    chartPlot
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    plotData:{
      type: Object,
      default: null
    }
  },
  setup() {
    
  }
}
</script>

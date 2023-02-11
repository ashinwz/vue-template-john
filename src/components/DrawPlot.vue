<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="px-4 py-4 max-md:px-2">
    <div class="flex flex-col text-left">
      <div class="flex-col h-[2rem]">
        <h1 class="text-xl font-semibold text-gray-900 dark:text-white">Plot</h1>
        <p class="mt-2 text-sm text-gray-700 dark:text-white">
          The SDPK generated plot will be shown here.
        </p>
      </div>
      <div class=" mt-6 flex justify-center items-center content-center h-[43rem] w-full">
        <div class="h-4/5 w-4/5 bg-gray-100 dark:bg-gray-600 rounded flex justify-center items-center content-center" :class="[isLoading?'hidden':'']">
          <ChartBarSquareIcon class="h-40 w-40 text-gray-500 dark:text-gray-200" :class="[isLoading?'animate-spin tansform transition-all duration-1000 ease-in-out':'']"  aria-hidden="true" />
        </div>
        
        <div class="h-full w-full  rounded flex justify-center items-center content-center dark:text-white" :class="[isLoading?'':' hidden']">
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
  }
}
</script>

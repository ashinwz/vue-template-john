<template>
  <div class="flex flex-col space-y-5">
    <div class="px-3 py-3 flex flex-row space-x-5">
      <div class="px-3 pt-3 w-1/3 h-[45rem] shadow">
        <SDPKForm @submit="onSubmit" />
      </div>
      <div class="w-2/3 h-[45rem] shadow">
        <DrawPlot :is-loading="isLoading" />
      </div> 
    </div>
    <div class="mx-3 px-3 py-3 h-[50rem] shadow justify-center">
      <PredictTable />
    </div>
  </div>
</template>
  
<script>
import SDPKForm from "@/components/SDPKForm.vue";
import DrawPlot from "@/components/DrawPlot.vue";
import PredictTable from "@/components/PredictTable.vue";
import { ref } from "vue";

export default {
  components: {
    SDPKForm,
    DrawPlot,
    PredictTable
  },
  setup() {
    const isLoading = ref(false);

    const onSubmit = () =>{
      isLoading.value = true
    };

    return {
      isLoading,
      onSubmit
    }
  }
}
</script>
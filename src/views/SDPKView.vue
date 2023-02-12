<template>
  <div class="flex flex-col space-y-5">
    <div class="px-3 py-3 flex flex-row space-x-5 max-xl:flex-col max-xl:space-x-0">
      <div class="px-3 pt-3 w-1/3 max-xl:w-full h-[45rem] shadow overflow-y-auto overflow-x-auto dark:bg-gray-700 rounded">
        <SDPKForm @submit="onSubmit" />
      </div>
      <div class="w-2/3 max-xl:w-full max-xl:mt-6 h-[45rem] shadow dark:bg-gray-700 rounded">
        <DrawPlot :is-loading="isLoading" :plotData="responseData"  />
      </div> 
    </div>
    <div class="mx-3 px-3 py-3 h-[50rem] shadow justify-center dark:bg-gray-700 rounded ">
      <PredictTable :isLoadingTable="isLoading" :plotDataTable="responseData" />
    </div>
  </div>
</template>
  
<script>
import SDPKForm from "@/components/SDPKForm.vue";
import DrawPlot from "@/components/DrawPlot.vue";
import PredictTable from "@/components/PredictTable.vue";
import { ref, onMounted } from "vue";
import store from "@/store";

export default {
  components: {
    SDPKForm,
    DrawPlot,
    PredictTable
  },
  setup() {
    const isLoading = ref(false);

    onMounted(() => {
      if(store.state.responseData.Structure!=null){
        isLoading.value = true
      }
    })

    const responseData = ref(null);
    const onSubmit = (data) =>{
      isLoading.value = true
      responseData.value = data
    };

    return {
      isLoading,
      onSubmit,
      responseData
    }
  }
}
</script>
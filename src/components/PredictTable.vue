<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="px-4 py-4 h-full">
    <div class="flex flex-col text-left">
      <div class="flex-col">
        <h1 class="text-xl font-semibold text-gray-900 dark:text-white">Results</h1>
        <p class="mt-2 text-sm text-gray-700 dark:text-white">
          A list of all the SDPK parameter results in the prediction including AUC, t-half, CL and F
        </p>
      </div>

      <!-- Icon -->
      <div class="mt-8 flex flex-col h-[40rem]" :class="hiddenTable?'hidden':''">
        <div class="mx-8 my-6 h-full bg-gray-100 rounded flex justify-center items-center content-center">
          <TableCellsIcon class="h-40 w-40 text-gray-500" aria-hidden="true" />
        </div>
      </div>
      <!-- Prediction result -->
      <div class="mt-8 flex flex-col overflow-x-auto h-[40rem] dark:text-white" :class="hiddenTable?'':'hidden'">
        <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8"
          >
            <div
              class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg dark:text-white"
            >
              <table class="min-w-full divide-y divide-gray-300 ">
                <thead class="bg-gray-50 dark:bg-gray-800 dark:border-gray-800 dark:text-white" >
                  <tr class="">
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-1 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-1 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6"
                    >
                      CURVE
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                    >
                      SMILES
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                    >
                      Structure
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                    >
                      ADMIN TYPE
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                    >
                      SPECIES
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                    >
                      AUC
                    </th>
                    
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                    >
                      CL
                    </th>
                    <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6 text-black">
                      <span class="sr-only">View</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white dark:bg-gray-500 dark:border-gray-500 dark:text-white">
                  <tr v-for="cp in cps" :key="cp.ID">
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 dark:text-white"
                    >
                      {{ cp.ID }}
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-white"
                    >
                      {{ cp.CURVE }}
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-white"
                    >
                      {{ cp.SMILES }}
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-white"
                    >
                      {{ cp.Structure }}
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-white"
                    >
                      {{ cp.ADMIN_TYPE }}
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-white"
                    >
                      {{ cp.SPECIES }}
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-white"
                    >
                      {{ cp.AUC }}
                    </td>
                  
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-white"
                    >
                      {{ cp.CL }}
                    </td>
                    <td
                      class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                    >
                      <a href="#" class="text-indigo-600 hover:text-indigo-900"
                        >View<span class="sr-only"></span></a
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  TableCellsIcon,
} from "@heroicons/vue/24/outline";
import { ref, onMounted, watch } from "vue";
import store from '@/store';

export default {
  components: {
    TableCellsIcon
  },
  props:{
    isLoadingTable: {
      type: Boolean,
      default: false
    },
    plotDataTable:{
      type: Object,
      default: null
    }
  },
  setup(props) {
    const cps = ref([]);
    const hiddenTable = ref(props.isLoadingTable);

    onMounted(() => {

      if(store.state.responseData.F!=null){
        hiddenTable.value = true
      }

      let currentRes = [{
        ID: 0,
        CURVE: "",
        SMILES:store.state.responseData.SMILES,
        Structure:"",
        ADMIN_TYPE:"IV",
        SPECIES:store.state.responseData.Species,
        AUC: parseFloat(store.state.responseData.AUC_IV).toFixed(4),
        CL:parseFloat(store.state.responseData.CL).toFixed(4)
      },{
        ID: 1,
        CURVE: "",
        SMILES:store.state.responseData.SMILES,
        Structure:"",
        ADMIN_TYPE:"PO",
        SPECIES:store.state.responseData.Species,
        AUC: parseFloat(store.state.responseData.AUC_PO).toFixed(4),
        CL:parseFloat(store.state.responseData.CL).toFixed(4)
      }]

      cps.value = currentRes

    });

    watch(() => props.plotDataTable, async (data)=>{
      hiddenTable.value = true

      let wactchRes = [
        {
        ID: 0,
        CURVE: "",
        SMILES:data.SMILES,
        Structure:"",
        ADMIN_TYPE:"IV",
        SPECIES:data.Species,
        AUC: parseFloat(data.AUC_IV).toFixed(4),
        CL:parseFloat(data.CL).toFixed(4)
      },
      {
        ID: 1,
        CURVE: "",
        SMILES:data.SMILES,
        Structure:"",
        ADMIN_TYPE:"PO",
        SPECIES:data.Species,
        AUC: parseFloat(data.AUC_PO).toFixed(4),
        CL:parseFloat(data.CL).toFixed(4)
      }
    ]

      cps.value = wactchRes

    })

    return {
      cps,
      hiddenTable
    }
  }
}


</script>

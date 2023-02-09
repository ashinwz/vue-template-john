<template>
    <form class="space-y-8 divide-y divide-gray-200 dark:text-white" @submit.prevent="submitForm">
        <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5 ">
        <div>
            <div class="flex-col">
                <h1 class="mx-4 text-xl font-semibold text-gray-900 dark:text-white">
                    Settings
                </h1>
                <p class="mx-4 mt-2 text-sm text-gray-700 dark:text-white">
                    Please fill the necessary parameters and then click the submit button.
                </p>
            </div>

            <div class="mx-4 my-2 pb-2 overflow-y-auto dark:text-white">
                <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                    <label for="SMILES" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 dark:text-white"> Input SMILES </label>
                    <div class="mt-1 sm:mt-0 sm:col-span-2">
                    <textarea id="SMILES" name="SMILES" v-model="form.SMILES"  rows="8" class="dark:text-black shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md" />
                    <p class="mt-2 text-sm text-gray-500">Please add COMPOUND SMILES in each line .</p>
                </div>
            </div>
            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5 dark:text-white">
                <label for="species" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 dark:text-white"> Species </label>
                <div class="mt-1 sm:mt-0 sm:col-span-2">
                <select id="species" name="species" v-model="form.species" autocomplete="species-name" class="dark:text-black block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
                    <option>MOUSE</option>
                    <option>RAT</option>
                </select>
                </div>
            </div>
            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5 dark:text-white">
                <label for="Admin" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 dark:text-white"> Admin Types </label>
                <div class="mt-1 sm:mt-0 sm:col-span-2">
                    <div class="grid grid-cols-1 gap-2 pr-1">
                        <RadioGroup v-model="form.SelectAdmin" class="mt-2" >
                            <div class="grid grid-cols-3 gap-3 sm:grid-cols-3">
                                <RadioGroupOption as="template" v-for="Admin in adminType" :key="Admin" :value="Admin" v-slot="{ active, checked }" >
                                <div class="cursor-pointer" :class="[active ? 'ring-2 ring-offset-2 ring-indigo-500' : '', checked ? 'bg-indigo-600 border-transparent text-white hover:bg-indigo-700' : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50', 'border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1']">
                                    <RadioGroupLabel as="p" >
                                    {{ Admin }}
                                    </RadioGroupLabel>
                                </div>
                                </RadioGroupOption>
                            </div>
                        </RadioGroup>
                    </div>
                </div>
            </div>
            <div class="sm:grid sm:grid-cols-3 sm:gap-2 sm:items-start sm:pt-5 dark:text-white">
                <label for="doseIV" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 dark:text-white"> Dose (IV) </label>
                <div class="mt-2 sm:mt-0 sm:col-span-2 justify-center">
                    <input v-model="form.doseIV" id="doseIV" type="range" min = "0" max = "10"  class="w-full h-2 appearance-none bg-gray-300 mb-5 cursor-pointer rounded "/>
                    <p class="text-sm font-medium">{{ form.doseIV }} mg/kg </p>
                </div>

            </div>
            <div class="sm:grid sm:grid-cols-3 sm:gap-2 sm:items-start sm:pt-5 dark:text-white">
                <label id="dosePO" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 dark:text-white"> Dose (PO)</label>
                <div class="mt-2 sm:mt-0 sm:col-span-2 justify-center">
                    <input v-model="form.dosePO" id="dosePO" type="range" min ="0" max = "100"  class="w-full h-2 appearance-none bg-gray-300 mb-5 cursor-pointer rounded "/>
                    <p class="text-sm font-medium">{{ form.dosePO }} mg/kg</p>
                </div>
            </div>
            <div class="sm:grid sm:grid-cols-3 sm:gap-2 sm:items-start sm:pt-5 dark:text-white">
                <label class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 dark:text-white"> Draw plot </label>
                <div class="mt-4 sm:mt-2 sm:col-span-2 justify-center">
                    <Switch v-model="form.DrawEnabled" :class="[form.DrawEnabled ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500']">
                        <span aria-hidden="true" :class="[form.DrawEnabled ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200']" />
                    </Switch>
                </div>
            </div>
            <div class="mt-4 sm:grid sm:grid-cols-2">
                <div class="place-self-center">
                    <button type="submit" class="w-32 bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">
                        Submit
                    </button>
                </div>
                <div class="place-self-center">
                    <button type="button" @click="resetPara" class="w-32 bg-gray-200 border border-transparent rounded-md shadow-sm py-2 px-4 text-base font-medium text-white hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">
                        Reset
                    </button>
                </div>
                
            </div>
        </div>
        </div>
        </div>
    </form>
</template>
    
<script>
import { ref } from 'vue';
import { Switch } from '@headlessui/vue'
import { reactive } from 'vue'
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue';
import axios from 'axios';
import { emit } from 'vue';

export default {
    components: {
        RadioGroup, 
        RadioGroupLabel, 
        RadioGroupOption,
        Switch
    },
    setup(props, {emit}) {
        const adminType = reactive(["IV","PO", "BOTH"])

        const form = ref({
            SMILES: 'Cc1cnc2C(=C(N)C(=O)Nc2c1C)c3ccc(F)c4[nH]ncc34',
            species: 'RAT',
            DrawEnabled: false,
            SelectAdmin:"BOTH",
            doseIV: 1,
            dosePO: 10
        })

        const predictionResults = ref([])

        async function submitForm() {
            try {
                
                const request_form = {
                    "StructureID": [
                        "R1"
                    ],
                    "Smiles": [
                        form.value.SMILES
                    ],
                    "Dose": {
                        "IV": [
                            form.value.doseIV
                        ],
                        "PO": [
                            form.value.dosePO
                        ]
                    },
                    "PlotSpecies": form.value.species,
                    "Draw": form.value.DrawEnabled,
                    "Format": "svg"
                }

                const response = await axios.post('http://10.86.176.27:7112/api/v1/dev/sdpk/predict/', request_form);
                let speciesID; 
                if (form.value.species == "MOUSE") {
                    speciesID = 0;
                } else {
                    speciesID = 1;
                }

                let reponseData;
                if (form.value.SelectAdmin == "BOTH") {
                    reponseData= {
                        "F": response.data.results[speciesID].F,
                        "IV_Value": Array.from(JSON.parse(`[${response.data.results[speciesID].pre_x}]`))[0],
                        "PO_Value": Array.from(JSON.parse(`[${response.data.results[speciesID].pre_y}]`))[0],
                        "AUC_IV": response.data.results[speciesID].IV_auc_predicted,
                        "AUC_PO": response.data.results[speciesID].PO_auc_predicted,
                        "CL": response.data.results[speciesID].IV_cl_predicted,
                        "Structure": response.data.stru_image[0]
                    }
                } else if (form.value.SelectAdmin == "IV") {
                    reponseData= {
                        "F": null,
                        "IV_Value": Array.from(JSON.parse(`[${response.data.results[speciesID].pre_x}]`))[0],
                        "PO_Value": null,
                        "AUC_IV": response.data.results[speciesID].IV_auc_predicted,
                        "AUC_PO": null,
                        "CL": response.data.results[speciesID].IV_cl_predicted,
                        "Structure": response.data.stru_image[0]
                    }
                } else if (form.value.SelectAdmin == "PO") {
                    reponseData= {
                        "F": null,
                        "IV_Value": Array.from(JSON.parse(`[${response.data.results[speciesID].pre_x}]`))[0],
                        "PO_Value": null,
                        "AUC_IV": null,
                        "AUC_PO": response.data.results[speciesID].PO_auc_predicted,
                        "CL": response.data.results[speciesID].IV_cl_predicted,
                        "Structure": response.data.stru_image[0]
                    }
                }

                


                emit('submit', reponseData)
                
            } catch (error) {
                console.log(error)
            }
        }

        function resetPara() {
            form.value = {
                SMILES: 'c1ccccc1',
                species: 'RAT',
                DrawEnabled: false,
                SelectAdmin:"IV",
                doseIV: 10,
                dosePO: 30
            }
            alert("The parameters have been reset!")
        }

        return {
            adminType,
            form,
            submitForm,
            resetPara
        }
    }
}




</script>
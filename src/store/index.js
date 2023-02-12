import { createStore } from 'vuex'

export default createStore({
  state: {
    formData: {
      SMILES: 'Cc1cnc2C(=C(N)C(=O)Nc2c1C)c3ccc(F)c4[nH]ncc34',
      species: 'RAT',
      DrawEnabled: true,
      SelectAdmin:"IV",
      doseIV: 1,
      dosePO: 10
    },
    responseData: {}
  },
  getters: {
  },
  mutations: {
    updateForm(state, formData) {
      state.formData = formData
      console.log("store")
      console.log(formData)
    },
    updateResponse(state, responseData) {
      state.responseData = responseData
      // console.log("store responseData")
      // console.log(responseData)
    }
  },
  actions: {
  },
  modules: {
  }
})

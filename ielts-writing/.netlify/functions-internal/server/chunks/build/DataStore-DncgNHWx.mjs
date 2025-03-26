import { reactive } from 'vue';

const state = reactive({
  answer: "",
  question: "",
  loading: false,
  apiResult: {
    scoringResult: null,
    correctionResult: { errors: [] }
  }
});

export { state as s };
//# sourceMappingURL=DataStore-DncgNHWx.mjs.map

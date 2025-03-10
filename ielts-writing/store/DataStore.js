import { reactive } from "vue";

export const state = reactive({
    answer: "",
    question: "",
    loading: false,
    apiResult: {
        scoringResult: null,
        correctionResult: { errors: [] }
    }, 
})
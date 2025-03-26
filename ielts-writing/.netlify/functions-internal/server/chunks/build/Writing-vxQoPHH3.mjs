import { _ as __nuxt_component_0 } from './nuxt-link-BXxPlIRz.mjs';
import { s as state } from './DataStore-DncgNHWx.mjs';
import { ref, computed, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';

function useMyFunction() {
  const fetchResults = async (answer, question) => {
    try {
      const response = await $fetch("/api/chatgpt", {
        method: "post",
        body: { answer, question }
      });
      state.apiResult.scoringResult = parseResultText(response.scoringResult);
      state.apiResult.correctionResult = parseCorrectionText(response.correctionResult);
    } catch (error) {
      console.error("L\u1ED7i khi l\u1EA5y d\u1EEF li\u1EC7u:", error);
      alert("\u0110\xE3 x\u1EA3y ra l\u1ED7i khi g\u1ECDi API.");
    }
  };
  const parseResultText = (resultText) => {
    const resultObjects = {
      taskAchievement: {},
      coherenceCohesion: {},
      lexicalResource: {},
      grammaticalRangeAccuracy: {},
      overallBand: {},
      overallComment: ""
    };
    const lines = resultText.split("\n").filter((line) => line.trim() !== "");
    lines.forEach((line) => {
      if (line.includes("Task Achievement")) {
        const [score, comment] = line.split(":")[1].split(" - ");
        resultObjects.taskAchievement = { score: score.trim(), comment: comment.trim() };
      } else if (line.includes("Coherence and Cohesion")) {
        const [score, comment] = line.split(":")[1].split(" - ");
        resultObjects.coherenceCohesion = { score: score.trim(), comment: comment.trim() };
      } else if (line.includes("Lexical Resource")) {
        const [score, comment] = line.split(":")[1].split(" - ");
        resultObjects.lexicalResource = { score: score.trim(), comment: comment.trim() };
      } else if (line.includes("Grammatical Range and Accuracy")) {
        const [score, comment] = line.split(":")[1].split(" - ");
        resultObjects.grammaticalRangeAccuracy = { score: score.trim(), comment: comment.trim() };
      } else if (line.includes("Overall Band")) {
        resultObjects.overallBand = { score: line.split(":")[1].trim() };
      } else if (line.includes("Nh\u1EADn x\xE9t t\u1ED5ng th\u1EC3")) {
        resultObjects.overallComment = line.split(":")[1].trim();
      }
    });
    return resultObjects;
  };
  const parseCorrectionText = (resultText) => {
    const resultObjects = { errors: [] };
    const lines = resultText.split("\n").filter((line) => line.trim() !== "");
    const errorStartIndex = lines.findIndex((line) => line.includes("(Error Start)"));
    const errorEndIndex = lines.findIndex((line) => line.includes("(Error End)"));
    if (errorStartIndex !== -1 && errorEndIndex !== -1) {
      const errorLines = lines.slice(errorStartIndex + 1, errorEndIndex);
      resultObjects.errors = errorLines.filter((entry) => entry.includes("->")).map((entry) => {
        const parts = entry.split("->").map((part) => part.trim());
        if (parts.length === 2) {
          const errorPart = parts[0].replace(/^-/, "").replace(/"/g, "").trim();
          const correctionSplit = parts[1].split(":").map((part) => part.trim());
          const correctPart = correctionSplit[0].replace(/[()\"]+/g, "").trim();
          const explainPart = correctionSplit.length > 1 ? correctionSplit[1].replace(/[()\"]+/g, "").trim() : "";
          return {
            error: errorPart,
            correct: correctPart,
            explain: explainPart
          };
        }
        return null;
      }).filter(Boolean);
    }
    return resultObjects;
  };
  return {
    parseResultText,
    parseCorrectionText,
    fetchResults,
    state
  };
}
const _sfc_main = {
  setup() {
    const question = ref("");
    const router = useRouter();
    useRoute();
    const { fetchResults } = useMyFunction();
    const wordCount = computed(() => {
      return (state.answer || "").trim().split(/\s+/).filter((word) => word.length > 0).length;
    });
    const validateAndCheckAnswer = async () => {
      if (wordCount.value < 200) {
        alert("B\u1EA1n ph\u1EA3i nh\u1EADp \xEDt nh\u1EA5t 200 t\u1EEB!");
        return;
      }
      state.loading = true;
      try {
        state.question = question.value;
        await fetchResults(state.answer, state.question);
        router.push({ path: "/result", query: { source: "writing" } });
      } catch (error) {
        console.error("Error:", error);
        alert("\u0110\xE3 x\u1EA3y ra l\u1ED7i khi ch\u1EA5m \u0111i\u1EC3m.");
      } finally {
        state.loading = false;
      }
    };
    const scoreSampleAnswer = async () => {
      state.loading = true;
      try {
        state.question = question.value;
        await fetchResults(state.answer, state.question);
        router.push({ path: "/result", query: { source: "sample" } });
      } catch (error) {
        console.error("Error:", error);
        alert("\u0110\xE3 x\u1EA3y ra l\u1ED7i khi ch\u1EA5m \u0111i\u1EC3m.");
      } finally {
        state.loading = false;
      }
    };
    return {
      question,
      state,
      wordCount,
      validateAndCheckAnswer,
      scoreSampleAnswer,
      fetchResults
    };
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_NuxtLink = __nuxt_component_0;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-orange-100 h-screen" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/question",
    class: "btn btn-outline btn-orange-400 text-orange-400 ml-10 px-5 mt-5 text-lg rounded-lg shadow hover:shadow-xl hover:bg-accent hover:border-accent"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Quay l\u1EA1i `);
      } else {
        return [
          createTextVNode(" Quay l\u1EA1i ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<div class="flex flex-col items-center"><p class="w-2/3 mt-0 px-5 py-3 mx-auto border border-gray-400 rounded-lg bg-white text-left italic font-semibold">${ssrInterpolate($setup.question)}</p>`);
  if ($setup.state.mode === "write") {
    _push(`<div class="w-5/6 text-center"><div class="flex justify-end items-end mx-32 mt-5 mb-1"><p>${ssrInterpolate($setup.wordCount)}/300</p></div><textarea class="textarea w-4/5 text-base mt-2 px-3 pb-96 pt-4 rounded-xl drop-shadow-xl shadow-inner border-2 border-base-300 focus:outline-none" required placeholder="Nh\u1EADp c\xE2u tr\u1EA3 l\u1EDDi c\u1EE7a b\u1EA1n...">${ssrInterpolate($setup.state.answer)}</textarea><button class="btn btn-wide btn-md btn-accent px-12 sm:w-2/5 sm:px-20 py-2 sm:py-3 mt-4 font-bold rounded-xl drop-shadow-xl shadow-xl"> Ch\u1EA5m \u0111i\u1EC3m </button></div>`);
  } else {
    _push(`<!---->`);
  }
  if ($setup.state.mode === "sample") {
    _push(`<div class="w-5/6 text-center mt-6"><div class="flex justify-end items-end mx-32 mb-1"><p>${ssrInterpolate($setup.wordCount)}/300</p></div><div class="flex justify-center"><textarea class="textarea text-base w-4/5 h-[480px] px-5 py-5 rounded-xl drop-shadow-xl shadow-inner border-2 border-base-300 focus:outline-none leading-relaxed" style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "text-align": "justify" })}">${ssrInterpolate($setup.state.answer)}</textarea></div><button class="btn btn-accent w-2/5 px-20 py-3 mt-5 font-bold rounded-xl drop-shadow-xl shadow-xl"> Ch\u1EA5m \u0111i\u1EC3m b\xE0i m\u1EABu </button></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
  if ($setup.state.loading) {
    _push(`<div class="fixed inset-0 bg-base-300 flex justify-center items-center"><div class="text-lg font-semibold"> \u0110\u1EE3i ch\xFAt nha, \u0111ang ch\u1EA5m r\xF9i n\xE8<span class="loading loading-dots loading-md ml-3 align-bottom"></span></div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/Writing.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Writing = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { Writing as default };
//# sourceMappingURL=Writing-vxQoPHH3.mjs.map

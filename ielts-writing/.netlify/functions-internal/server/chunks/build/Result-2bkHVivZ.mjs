import { _ as __nuxt_component_0 } from './nuxt-link-BXxPlIRz.mjs';
import { s as state } from './DataStore-DncgNHWx.mjs';
import { useRouter, useRoute } from 'vue-router';
import { ref, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrRenderStyle, ssrRenderList } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { _ as _export_sfc } from './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';

const _imports_0 = publicAssetsURL("/images/attention.png");
const _sfc_main = {
  setup() {
    useRouter();
    const route = useRoute();
    const source = ref(route.query.source || "demo");
    const currentQuestion = source === "demo" ? state.question : state.question;
    const currentAnswer = source === "demo" ? state.answer : state.answer;
    const activeTab = ref(1);
    const panel1 = ref(null);
    const panel2 = ref(null);
    const showTab = (tabNumber) => {
      var _a, _b;
      activeTab.value = tabNumber;
      if (tabNumber === 1) {
        (_a = panel1 == null ? void 0 : panel1.value) == null ? void 0 : _a.scrollTo(0, 0);
      }
      if (tabNumber === 2) {
        (_b = panel2 == null ? void 0 : panel2.value) == null ? void 0 : _b.scrollTo(0, 0);
      }
    };
    return {
      state,
      source,
      currentQuestion,
      currentAnswer,
      activeTab,
      showTab,
      panel1,
      panel2
    };
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_NuxtLink = __nuxt_component_0;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-screen bg-orange-100 pt-5" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/question",
    class: "btn btn-outline btn-orange-400 text-orange-400 ml-10 px-5 text-lg rounded-lg shadow hover:shadow-xl hover:bg-accent hover:border-accent"
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
  _push(`<div class="p-5 flex space-x-10"><div class="w-2/3 bg-base-100 py-5 px-10 rounded-xl"><p class="mt-4 mb-10 italic font-semibold border border-base-content px-5 py-2 rounded-md">${ssrInterpolate($setup.currentQuestion)}</p><p class="mt-4">${ssrInterpolate($setup.currentAnswer)}</p></div><div class="w-1/3">`);
  if ($setup.state.apiResult.scoringResult) {
    _push(`<div class="grid grid-cols-5 gap-x-1 text-center mb-10 bg-base-100 py-4 px-5 rounded-xl"><div class="relative border bg-green-600 p-2 rounded-lg text-white h-24 w-20"><p class="text-xs px-3">Band Score</p><p class="text-3xl font-semibold bottom-2 left-1/2 -translate-x-1/2 absolute">${ssrInterpolate($setup.state.apiResult.scoringResult.overallBand.score)}</p></div><div class="relative border bg-base-300 p-2 rounded-lg h-24 w-20"><p class="text-xs font-thin">Task Response</p><p class="font-semibold bottom-2 left-1/2 -translate-x-1/2 absolute">${ssrInterpolate($setup.state.apiResult.scoringResult.taskAchievement.score)}</p></div><div class="relative border bg-base-300 p-2 rounded-lg h-24 w-20"><p class="text-xs font-thin">Coherence &amp; Cohesion</p><p class="font-semibold bottom-2 left-1/2 -translate-x-1/2 absolute">${ssrInterpolate($setup.state.apiResult.scoringResult.coherenceCohesion.score)}</p></div><div class="relative border bg-base-300 p-2 rounded-lg h-24 w-20"><p class="text-xs font-thin">Lexical Resource</p><p class="font-semibold bottom-2 left-1/2 -translate-x-1/2 absolute">${ssrInterpolate($setup.state.apiResult.scoringResult.lexicalResource.score)}</p></div><div class="relative border bg-base-300 py-2 px-1 rounded-lg h-24 w-20"><p class="text-xs font-thin">Grammatical Range &amp; Accuracy</p><p class="font-semibold bottom-2 left-1/2 -translate-x-1/2 absolute">${ssrInterpolate($setup.state.apiResult.scoringResult.grammaticalRangeAccuracy.score)}</p></div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div><div class="tabs tabs-lifted tabs-lg font-semibold" role="tablist"><button class="${ssrRenderClass([{ "tab-active": $setup.activeTab === 1 }, "tab tab-bordered text-base"])}" role="tab"${ssrRenderAttr("aria-selected", $setup.activeTab === 1)} id="tab-1" aria-controls="panel-1"><label class="label cursor-pointer space-x-3"><input type="radio" name="radio-10" class="radio radio-sm checked:bg-orange-500" checked><span>Nh\u1EADn x\xE9t chung</span></label></button><button class="${ssrRenderClass([{ "tab-active": $setup.activeTab === 2 }, "tab tab-bordered text-base"])}" role="tab"${ssrRenderAttr("aria-selected", $setup.activeTab === 2)} id="tab-2" aria-controls="panel-2"><label class="label cursor-pointer space-x-3"><input type="radio" name="radio-10" class="radio radio-sm checked:bg-orange-500"><span>Nh\u1EADn x\xE9t chi ti\u1EBFt</span></label></button></div>`);
  if ($setup.activeTab === 1) {
    _push(`<div id="panel-1" role="tabpanel" aria-labelledby="tab-1" class="px-5 pb-10 pt-8 border-2 border-base-300 rounded-b-lg mt-[-2px] space-y-8 overflow-y-auto bg-base-100" style="${ssrRenderStyle({ "max-height": "calc(75vh - 120px)" })}">`);
    if ($setup.state.apiResult.scoringResult) {
      _push(`<div><p>${ssrInterpolate($setup.state.apiResult.scoringResult.overallComment)}</p></div>`);
    } else {
      _push(`<!---->`);
    }
    if ($setup.state.apiResult.correctionResult.errors.length) {
      _push(`<div><div class="flex pb-5 space-x-2 items-center"><img${ssrRenderAttr("src", _imports_0)} alt="attention" class="w-7 h-7"><p class="font-semibold">Nh\u1EEFng c\xE2u c\u1EA7n l\u01B0u \xFD:</p></div><ul class="space-y-10"><!--[-->`);
      ssrRenderList($setup.state.apiResult.correctionResult.errors, (error, index) => {
        _push(`<li class="space-y-3"><p class="border p-2 rounded-lg border-orange-500"><strong class="italic">C\xE2u c\u1EE7a b\u1EA1n:</strong> ${ssrInterpolate(error.error)}</p><p class="border p-2 rounded-lg bg-orange-200"><strong class="italic">C\xE2u AI s\u1EEDa cho b\u1EA1n:</strong> ${ssrInterpolate(error.correct)}</p><p><strong class="italic">==&gt; Gi\u1EA3i th\xEDch:</strong> ${ssrInterpolate(error.explain)}</p></li>`);
      });
      _push(`<!--]--></ul></div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
  if ($setup.state.apiResult.scoringResult) {
    _push(`<div>`);
    if ($setup.activeTab === 2) {
      _push(`<div id="panel-2" role="tabpanel" aria-labelledby="tab-2" class="px-5 pt-6 pb-10 border-2 border-base-300 rounded-b-lg mt-[-2px] space-y-5 overflow-y-auto bg-base-100" style="${ssrRenderStyle({ "max-height": "calc(75vh - 120px)" })}"><p class="font-semibold border border-orange-500 w-1/2 p-2 text-center text-orange-500 rounded-lg">Task Response</p><p>${ssrInterpolate($setup.state.apiResult.scoringResult.taskAchievement.comment)}</p><p class="font-semibold border border-orange-500 w-1/2 p-2 text-center text-orange-500 rounded-lg">Coherence &amp; Cohesion</p><p>${ssrInterpolate($setup.state.apiResult.scoringResult.coherenceCohesion.comment)}</p><p class="font-semibold border border-orange-500 w-1/2 p-2 text-center text-orange-500 rounded-lg">Lexical Resource</p><p>${ssrInterpolate($setup.state.apiResult.scoringResult.lexicalResource.comment)}</p><p class="font-semibold border border-orange-500 w-2/3 p-2 text-center text-orange-500 rounded-lg">Grammatical Range &amp; Accuracy</p><p>${ssrInterpolate($setup.state.apiResult.scoringResult.grammaticalRangeAccuracy.comment)}</p></div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/Result.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Result = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { Result as default };
//# sourceMappingURL=Result-2bkHVivZ.mjs.map

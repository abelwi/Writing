import { _ as __nuxt_component_0 } from './nuxt-link-BXxPlIRz.mjs';
import { ref, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { u as useRouter } from './server.mjs';
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
import 'vue-router';

const _sfc_main = {
  __name: "Question",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const questions = ref([]);
    const customQuestion = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mt-5 mb-20" }, _attrs))}><div class="flex justify-between mx-10">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "btn btn-outline btn-orange-400 text-orange-400 px-5 text-lg rounded-lg shadow hover:shadow-xl hover:bg-accent hover:border-accent"
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
      _push(`<div class="space-x-4"><input${ssrRenderAttr("value", customQuestion.value)} type="question" placeholder="Nh\u1EADp c\xE2u h\u1ECFi kh\xE1c . . ." class="py-2 px-5 w-96 input input-bordered"><button class="${ssrRenderClass([customQuestion.value.trim() ? "bg-orange-300 hover:bg-orange-400" : "bg-orange-300 cursor-not-allowed hover:bg-orange-300", "btn"])}"> L\xE0m b\xE0i </button></div></div><div class="my-10 mx-20 space-y-10"><!--[-->`);
      ssrRenderList(questions.value, (category, catIndex) => {
        _push(`<div><h2 class="text-xl font-bold flex items-center mb-4 ml-5 text-orange-600"><i class="${ssrRenderClass(`fas ${category.icon} mr-4`)}"></i> ${ssrInterpolate(category.title)}</h2><ul class="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-7"><!--[-->`);
        ssrRenderList(category.questions, (q, qIndex) => {
          _push(`<li class="relative block mb-2 border-2 px-4 py-10 rounded-lg group">${ssrInterpolate(q.text)} <div class="absolute -bottom-4 right-2 opacity-100 transition-opacity">`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: { path: "/writing", query: { question: q.text, mode: "write" } },
            class: "btn btn-md hover:btn-primary mr-2 rounded-lg hover:shadow-lg"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` T\u1EF1 vi\u1EBFt b\xE0i `);
              } else {
                return [
                  createTextVNode(" T\u1EF1 vi\u1EBFt b\xE0i ")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: { path: "/writing", query: { question: q.text, mode: "sample", sampleAnswer: q.sampleAnswer } },
            class: "btn btn-md hover:btn-secondary rounded-lg hover:shadow-lg"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Ch\u1EA5m \u0111i\u1EC3m b\xE0i m\u1EABu `);
              } else {
                return [
                  createTextVNode(" Ch\u1EA5m \u0111i\u1EC3m b\xE0i m\u1EABu ")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div></li>`);
        });
        _push(`<!--]--></ul></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/Question.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=Question-CBTKas2Q.mjs.map

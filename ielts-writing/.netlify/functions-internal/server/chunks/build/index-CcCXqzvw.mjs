import { p as publicAssetsURL, a as buildAssetsURL } from '../routes/renderer.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-BXxPlIRz.mjs';
import { ref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';
import 'vue-bundle-renderer/runtime';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import './server.mjs';
import 'vue-router';

const _imports_0 = publicAssetsURL("/images/home_logo.png");
const _imports_1 = "" + buildAssetsURL("personal_avatar.vf6Ft2DZ.jpg");
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const isMobile = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<!--[--><div class="h-full mt-10"><div class="flex justify-center items-center flex-col"><div><div class="flex justify-center"><img class="w-40 h-40 mt-10 sm:w-52 sm:h-52"${ssrRenderAttr("src", _imports_0)} alt="home_logo"></div><h1 class="font-medium text-xl sm:text-3xl my-4 sm:my-7">Ch\u1EA5m \u0111i\u1EC3m &amp; Ph\u1EA3n h\u1ED3i Ielts Writing Task 2!</h1><p class="text-sm sm:text-md font-light text-center">M\u1ED9t trang web gi\xFAp b\u1EA1n c\u1EA3i thi\u1EC7n tr\xECnh \u0111\u1ED9 Writing task 2 c\u1EE7a m\xECnh!</p><div class="mb-4 sm:mb-7 mt-10 sm:mt-16 flex justify-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/question",
        class: "btn btn-wide btn-accent px-8 py-3 sm:px-14 sm:py-4 rounded-lg drop-shadow-xl shadow hover:shadow-xl"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` B\u1EAET \u0110\u1EA6U `);
          } else {
            return [
              createTextVNode(" B\u1EAET \u0110\u1EA6U ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><div class="flex mt-10 bg-base-300 p-5 sm:p-10 shadow-inner space-x-2 sm:space-x-0"><div class="avatar"><div class="w-32 h-32 rounded-full shadow-inner drop-shadow-xl"><img${ssrRenderAttr("src", _imports_1)}></div></div><div class="mt-2 sm:mt-5"><p class="text-left mx-5 sm:mx-14 font-thin">My name is Lam, and I am the creator of this website. This is my personal project, and I hope you have a great experience using my website! Thanks a lot! &gt;.&lt; </p><p class="text-right mt-2 mr-3">Contact me via this <a href="https://www.facebook.com/huyenhuong.nguyen.77" target="_blank" class="link link-accent"> Facebook </a> ^^ </p></div></div></div>`);
      if (isMobile.value) {
        _push(`<div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 z-50 flex flex-col justify-center items-center text-white p-10 text-center"><h2 class="text-xl font-bold mb-4">Upss, b\u1EA1n \u01A1i h\xE3y chuy\u1EC3n sang m\xE0n h\xECnh m\xE1y t\xEDnh nha ^^</h2><p>Trang web n\xE0y \u0111\u01B0\u1EE3c thi\u1EBFt k\u1EBF t\u1ED1t nh\u1EA5t cho m\xE0n h\xECnh l\u1EDBn!!!</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CcCXqzvw.mjs.map

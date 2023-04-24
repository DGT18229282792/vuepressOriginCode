/**
 * Generated by "@vuepress/internal-routes"
 */

import { injectComponentOption, ensureAsyncComponentsLoaded } from '@app/util'
import rootMixins from '@internal/root-mixins'
import GlobalLayout from "C:\\studyspace\\vuepress\\node_modules\\@vuepress\\core\\lib\\client\\components\\GlobalLayout.vue"

injectComponentOption(GlobalLayout, 'mixins', rootMixins)
export const routes = [
  {
    name: "v-16f39a64",
    path: "/guide/1.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-16f39a64").then(next)
    },
  },
  {
    name: "v-b2589aac",
    path: "/",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-b2589aac").then(next)
    },
  },
  {
    path: "/index.html",
    redirect: "/"
  },
  {
    name: "v-69525104",
    path: "/guide/2.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-69525104").then(next)
    },
  },
  {
    name: "v-7161141e",
    path: "/guide/info/resume.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-7161141e").then(next)
    },
  },
  {
    name: "v-6304fdf7",
    path: "/guide/utils/sdk.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-6304fdf7").then(next)
    },
  },
  {
    name: "v-4a7eaffe",
    path: "/guide/info/intro.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-4a7eaffe").then(next)
    },
  },
  {
    name: "v-e4588252",
    path: "/guide/utils/utils.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-e4588252").then(next)
    },
  },
  {
    name: "v-8c7f1620",
    path: "/guide/utils/",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-8c7f1620").then(next)
    },
  },
  {
    path: "/guide/utils/index.html",
    redirect: "/guide/utils/"
  },
  {
    name: "v-0bb22a87",
    path: "/guide/clis/DGT-cli.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-0bb22a87").then(next)
    },
  },
  {
    name: "v-7fd140b9",
    path: "/guide/clis/npm.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-7fd140b9").then(next)
    },
  },
  {
    path: '*',
    component: GlobalLayout
  }
]
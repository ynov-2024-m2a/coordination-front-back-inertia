// vite.config.ts
import { defineConfig } from "file:///C:/Projets_Dev/Inertia/coordination-front-back-inertia/adonis-inertia-postgre/node_modules/vite/dist/node/index.js";
import { getDirname } from "file:///C:/Projets_Dev/Inertia/coordination-front-back-inertia/adonis-inertia-postgre/node_modules/@adonisjs/core/build/src/helpers/main.js";
import inertia from "file:///C:/Projets_Dev/Inertia/coordination-front-back-inertia/adonis-inertia-postgre/node_modules/@adonisjs/inertia/build/src/plugins/vite.js";
import vue from "file:///C:/Projets_Dev/Inertia/coordination-front-back-inertia/adonis-inertia-postgre/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import adonisjs from "file:///C:/Projets_Dev/Inertia/coordination-front-back-inertia/adonis-inertia-postgre/node_modules/@adonisjs/vite/build/src/client/main.js";
import tailwind from "file:///C:/Projets_Dev/Inertia/coordination-front-back-inertia/adonis-inertia-postgre/node_modules/tailwindcss/lib/index.js";
import autoprefixer from "file:///C:/Projets_Dev/Inertia/coordination-front-back-inertia/adonis-inertia-postgre/node_modules/autoprefixer/lib/autoprefixer.js";
import Components from "file:///C:/Projets_Dev/Inertia/coordination-front-back-inertia/adonis-inertia-postgre/node_modules/unplugin-vue-components/dist/vite.js";
var __vite_injected_original_import_meta_url = "file:///C:/Projets_Dev/Inertia/coordination-front-back-inertia/adonis-inertia-postgre/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    inertia({ ssr: { enabled: true, entrypoint: "inertia/app/ssr.ts" } }),
    vue(),
    adonisjs({ entrypoints: ["inertia/app/app.ts"], reload: ["resources/views/**/*.edge"] }),
    Components({
      dirs: ["inertia/components"],
      dts: true
    })
  ],
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()]
    }
  },
  /**
   * Define aliases for importing modules from
   * your frontend code
   */
  resolve: {
    alias: {
      "~/": `${getDirname(__vite_injected_original_import_meta_url)}/inertia/`
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxQcm9qZXRzX0RldlxcXFxJbmVydGlhXFxcXGNvb3JkaW5hdGlvbi1mcm9udC1iYWNrLWluZXJ0aWFcXFxcYWRvbmlzLWluZXJ0aWEtcG9zdGdyZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcUHJvamV0c19EZXZcXFxcSW5lcnRpYVxcXFxjb29yZGluYXRpb24tZnJvbnQtYmFjay1pbmVydGlhXFxcXGFkb25pcy1pbmVydGlhLXBvc3RncmVcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1Byb2pldHNfRGV2L0luZXJ0aWEvY29vcmRpbmF0aW9uLWZyb250LWJhY2staW5lcnRpYS9hZG9uaXMtaW5lcnRpYS1wb3N0Z3JlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHsgZ2V0RGlybmFtZSB9IGZyb20gJ0BhZG9uaXNqcy9jb3JlL2hlbHBlcnMnXHJcbmltcG9ydCBpbmVydGlhIGZyb20gJ0BhZG9uaXNqcy9pbmVydGlhL2NsaWVudCdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCBhZG9uaXNqcyBmcm9tICdAYWRvbmlzanMvdml0ZS9jbGllbnQnXHJcbmltcG9ydCB0YWlsd2luZCBmcm9tICd0YWlsd2luZGNzcydcclxuaW1wb3J0IGF1dG9wcmVmaXhlciBmcm9tICdhdXRvcHJlZml4ZXInXHJcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtcclxuICAgIGluZXJ0aWEoeyBzc3I6IHsgZW5hYmxlZDogdHJ1ZSwgZW50cnlwb2ludDogJ2luZXJ0aWEvYXBwL3Nzci50cycgfSB9KSxcclxuICAgIHZ1ZSgpLFxyXG4gICAgYWRvbmlzanMoeyBlbnRyeXBvaW50czogWydpbmVydGlhL2FwcC9hcHAudHMnXSwgcmVsb2FkOiBbJ3Jlc291cmNlcy92aWV3cy8qKi8qLmVkZ2UnXSB9KSxcclxuICAgIENvbXBvbmVudHMoe1xyXG4gICAgICBkaXJzOiBbJ2luZXJ0aWEvY29tcG9uZW50cyddLFxyXG4gICAgICBkdHM6IHRydWUsXHJcbiAgICB9KSxcclxuICBdLFxyXG5cclxuICBjc3M6IHtcclxuICAgIHBvc3Rjc3M6IHtcclxuICAgICAgcGx1Z2luczogW3RhaWx3aW5kKCksIGF1dG9wcmVmaXhlcigpXSxcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogRGVmaW5lIGFsaWFzZXMgZm9yIGltcG9ydGluZyBtb2R1bGVzIGZyb21cclxuICAgKiB5b3VyIGZyb250ZW5kIGNvZGVcclxuICAgKi9cclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICAnfi8nOiBgJHtnZXREaXJuYW1lKGltcG9ydC5tZXRhLnVybCl9L2luZXJ0aWEvYCxcclxuICAgIH0sXHJcbiAgfSxcclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFtYSxTQUFTLG9CQUFvQjtBQUNoYyxTQUFTLGtCQUFrQjtBQUMzQixPQUFPLGFBQWE7QUFDcEIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sY0FBYztBQUNyQixPQUFPLGNBQWM7QUFDckIsT0FBTyxrQkFBa0I7QUFDekIsT0FBTyxnQkFBZ0I7QUFQb1AsSUFBTSwyQ0FBMkM7QUFTNVQsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsUUFBUSxFQUFFLEtBQUssRUFBRSxTQUFTLE1BQU0sWUFBWSxxQkFBcUIsRUFBRSxDQUFDO0FBQUEsSUFDcEUsSUFBSTtBQUFBLElBQ0osU0FBUyxFQUFFLGFBQWEsQ0FBQyxvQkFBb0IsR0FBRyxRQUFRLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztBQUFBLElBQ3ZGLFdBQVc7QUFBQSxNQUNULE1BQU0sQ0FBQyxvQkFBb0I7QUFBQSxNQUMzQixLQUFLO0FBQUEsSUFDUCxDQUFDO0FBQUEsRUFDSDtBQUFBLEVBRUEsS0FBSztBQUFBLElBQ0gsU0FBUztBQUFBLE1BQ1AsU0FBUyxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUM7QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBTUEsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsTUFBTSxHQUFHLFdBQVcsd0NBQWUsQ0FBQztBQUFBLElBQ3RDO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==

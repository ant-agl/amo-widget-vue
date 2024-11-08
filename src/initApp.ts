import type { WidgetAmo } from "@/types/widget";
import type { DefineComponent } from "vue";
import { createApp } from "vue";
import { store } from "@/store";

export const initApp = (component: DefineComponent, widget: WidgetAmo) => {
  const app = createApp(component);
  const isDev = import.meta.env.VITE_WIDGET_MODE == "development";

  const devPath = `http://localhost:${import.meta.env.VITE_PORT}`;
  const wPath = isDev ? devPath : widget.params.path;

  app.provide("widget", widget);
  app.provide("isDev", isDev);
  app.provide("w_path", wPath);

  app.use(store);

  return app;
};

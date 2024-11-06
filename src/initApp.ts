import type { WidgetAmo } from "@/types/widget";
import { createApp } from "vue";
import { store } from "@/store";

export const initApp = (component: any, widget: WidgetAmo) => {
  const app = createApp(component);
  const isDev = import.meta.env.VITE_WIDGET_MODE == "development";

  app.provide("widget", widget);
  app.provide("isDev", isDev);
  app.provide("w_path", isDev ? "http://localhost:3000" : widget.params.path);

  app.use(store);

  return app;
};

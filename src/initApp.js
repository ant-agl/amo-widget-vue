import { createApp } from "vue";

export const initApp = (component, widget, store = undefined) => {
  const app = createApp(component);
  const isDev = import.meta.env.VITE_WIDGET_MODE == "development";

  app.provide("widget", widget);
  app.provide("isDev", isDev);
  app.provide("w_path", isDev ? "http://localhost:3000" : widget.params.path);

  if (store) app.use(store);

  return app;
};

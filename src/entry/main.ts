import type { WidgetAmo } from "@/types/widget";
import type { DefineComponent } from "vue";
import App from "@/views/App.vue";
import { initApp } from "@/initApp";

export default function (widget: WidgetAmo) {
  const app = initApp(App as DefineComponent, widget);
  app.mount(".card-widgets__elements"); // в реальной разработке нужно использовать id

  return app;
}

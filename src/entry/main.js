import App from "@/views/App.vue";
import { initApp } from "@/initApp";
import { store } from "@/store";

export default function (self) {
  const app = initApp(App, self, store);
  app.mount(".card-widgets__elements");

  return app;
}

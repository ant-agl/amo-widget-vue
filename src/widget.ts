import type { WidgetAmo } from "@/types/widget";
import "@/assets/vars.scss";
import "@/assets/style.scss";
import mainApp from "@/entry/main";

import Modal from "lib/components/base/modal";
import moment from "moment";

export default function (this: WidgetAmo) {
  const self = this;

  this.callbacks = {
    render: function () {
      return true;
    },
    init: function () {
      console.log("init");

      mainApp(self);

      console.log(moment().format("DD-MM-YYYY"));

      const data = "<h1>Test</h1><p>Some text</p>";
      const modal = new Modal({
        class_name: "modal-window",
        init: function ($modal_body: any) {
          $modal_body
            .trigger("modal:loaded")
            .html(data)
            .trigger("modal:centrify")
            .append("");
        },
        destroy: function () {},
      });

      return true;
    },
    bind_actions: function () {
      return true;
    },
    settings: function () {
      return true;
    },
    onSave: function () {
      return true;
    },
    destroy: function () {},
    advancedSettings: function () {
      return true;
    },
    contacts: {
      selected: function () {},
    },
    leads: {
      selected: function () {},
    },
    tasks: {
      selected: function () {},
    },
  };
  return this;
}

import mainApp from "@/entry/main";
import "@/assets/vars.scss";
import "@/assets/style.scss";

import Modal from "lib/components/base/modal";
import moment from "moment";

export default function() {
  const self = this;

  this.callbacks = {
    render: function() {
      return true;
    },
    init: function() {
      console.log("init");

      mainApp(self);

      console.log(moment().format("DD-MM-YYYY"));

      var data = "<h1>Test</h1><p>Some text</p>";
      modal = new Modal({
        class_name: "modal-window",
        init: function($modal_body) {
          var $this = $(this);
          $modal_body
            .trigger("modal:loaded") // запускает отображение модального окна
            .html(data)
            .trigger("modal:centrify") // настраивает модальное окно
            .append("");
        },
        destroy: function() {},
      });

      return true;
    },
    bind_actions: function() {
      return true;
    },
    settings: function() {
      return true;
    },
    onSave: function() {
      return true;
    },
    destroy: function() {},
    advancedSettings: function() {
      return true;
    },
    contacts: {
      selected: function() {},
    },
    leads: {
      selected: function() {},
    },
    tasks: {
      selected: function() {},
    },
  };
  return this;
}

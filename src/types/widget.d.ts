export interface WidgetAmo {
  callbacks: any;
  ns: string;
  init_once: string;
  langs: Langs;
  params: Params;
}

export interface Langs {
  widget: Widget;
  settings: Settings;
}

export interface Widget {
  name: string;
  short_description: string;
  description: string;
}

export interface Settings {
  w_settings: string;
}

export interface Params {
  active: string;
  currency: string;
  id: number;
  status: string;
  widget_code: string;
  path: string;
  version: string;
  oauth_client_uuid: string;
  widget_active: string;
  images_path: string;
  support: any[];
}

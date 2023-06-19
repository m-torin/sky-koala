export interface AppData {
  _id: string;
  users: {
    enabled: boolean;
    scope: string;
    registration: string;
  };
  ecommerce: {
    enabled: boolean;
  };
  counts: {
    total_entries: number;
    asset_count: number;
    asset_size: number;
  };
  field_count: number;
  thumb_count: number;
  object_count: number;
  task_count: number;
  view_count: number;
  scene_count: number;
  credential_count: number;
  status: string;
  settings: {
    geo: boolean;
    timezone: string;
    timezone_offset: string;
    timezone_dst: string;
    cluster: string;
    powered_by_link: boolean;
    new_count: boolean;
    registration_migration_status: string;
    https_redirect: boolean;
    should_purge_record_history: boolean;
    support_access: boolean;
    use_multiple_api_subdomains: boolean;
    scriptProtectionEnabled: boolean;
    embed_login_method: string;
    ignoreBilling: boolean;
    v3_beta: boolean;
    v3_open_beta: boolean;
    mongo: string;
    solr: string;
  };
  tasks: any[];
  payment_processors: any[];
  design: {
    general: {
      theme: string;
      font: string;
      links: {
        color: string;
      };
      buttons: {
        color: string;
        bg_color: string;
      };
      tables: {
        style: string;
        dividers: boolean;
        striped: boolean;
        hover: boolean;
        spacing: string;
      };
    };
    regions: {
      body: {
        full_width: boolean;
      };
      header: {
        bg_color: string;
        menu: {
          show: boolean;
          user_auth_based: boolean;
          format: string;
          color: string;
          outline_or_fill_color: string;
        };
        title: {
          color: string;
          show_logo: boolean;
        };
      };
    };
    components: {
      notifications: {
        color: string;
        bg_color: string;
      };
    };
  };
  layout: {
    entry_scene_menu: boolean;
    app_menu_auth: boolean;
    theme: string;
  };
  copying: boolean;
  feature_flags: boolean[];
  name: string;
  slug: string;
  distributions: any[];
  versions: {
    _id: string;
    status: string;
    objects: ObjectData[];
    scenes: SceneData[];
  }[];
  first_created: string;
  account_id: string;
  user_id: string;
}

export interface ObjectData {
  inflections: {
    singular: string;
    plural: string;
  };
  connections: {
    inbound: any[];
    outbound: any[];
  };
  user: boolean;
  status: string;
  tasks: any[];
  type: string;
  _id: string;
  name: string;
  fields: {
    type: string;
    required: boolean;
    unique: boolean;
    user: boolean;
    conditional: boolean;
    rules: any[];
    validation: any[];
    _id: string;
    key: string;
    name: string;
  }[];
  template: string;
  key: string;
  identifier: string;
}

export interface SceneData {
  groups: any[];
  _id: string;
  name: string;
  parent: null;
  object: null;
  type: string;
  views: {
    columns: any[];
    links: any[];
    inputs: any[];
    _id: string;
    name: string;
    title: string;
    type: string;
    description: string;
    limit_profile_access: boolean;
    allowed_profiles: any[];
    registration_type: string;
    key: string;
  }[];
  key: string;
  slug: string;
}

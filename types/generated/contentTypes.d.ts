import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCategoryGroupCategoryGroup extends Schema.CollectionType {
  collectionName: 'category_groups';
  info: {
    singularName: 'category-group';
    pluralName: 'category-groups';
    displayName: 'Category List';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required & Attribute.Unique;
    description: Attribute.Text &
      Attribute.SetMinMaxLength<{
        maxLength: 1000;
      }>;
    icon_home: Attribute.Media;
    icon_inner: Attribute.Media;
    banner_inner: Attribute.Media;
    youtube_code: Attribute.String;
    video_caption: Attribute.String;
    title_hi: Attribute.String & Attribute.Unique;
    short_description: Attribute.Text &
      Attribute.SetMinMaxLength<{
        maxLength: 250;
      }>;
    display_order: Attribute.Integer;
    services: Attribute.Relation<
      'api::category-group.category-group',
      'manyToMany',
      'api::service.service'
    >;
    category_list: Attribute.Relation<
      'api::category-group.category-group',
      'oneToOne',
      'api::category-group.category-group'
    >;
    mytab: Attribute.String &
      Attribute.CustomField<'plugin::npistrapi.npistrapi'>;
    statefield: Attribute.String &
      Attribute.CustomField<'plugin::npistrapi.npistrapi1'>;
    is_show_homepage: Attribute.Boolean;
    nested_data: Attribute.JSON &
      Attribute.CustomField<'plugin::npistrapi.npistrapi2'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::category-group.category-group',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::category-group.category-group',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCentralMinistryDeptCentralMinistryDept
  extends Schema.CollectionType {
  collectionName: 'central_ministry_depts';
  info: {
    singularName: 'central-ministry-dept';
    pluralName: 'central-ministry-depts';
    displayName: 'Ministry/Dept.';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required & Attribute.Unique;
    title_hi: Attribute.String & Attribute.Unique;
    icon_scroll: Attribute.Media;
    is_dept: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    services: Attribute.Relation<
      'api::central-ministry-dept.central-ministry-dept',
      'oneToMany',
      'api::service.service'
    >;
    cmd_id: Attribute.Integer & Attribute.Unique;
    cmd_parent: Attribute.Integer;
    council_of_ministers: Attribute.Relation<
      'api::central-ministry-dept.central-ministry-dept',
      'manyToMany',
      'api::council-of-minister.council-of-minister'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::central-ministry-dept.central-ministry-dept',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::central-ministry-dept.central-ministry-dept',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCouncilOfMinisterCouncilOfMinister
  extends Schema.CollectionType {
  collectionName: 'council_of_ministers';
  info: {
    singularName: 'council-of-minister';
    pluralName: 'council-of-ministers';
    displayName: 'Council of Ministers';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Title: Attribute.String & Attribute.Required;
    Profile_image: Attribute.Media;
    central_ministry_depts: Attribute.Relation<
      'api::council-of-minister.council-of-minister',
      'manyToMany',
      'api::central-ministry-dept.central-ministry-dept'
    >;
    Facebook_URL: Attribute.String;
    Twitter_URL: Attribute.String;
    Contact_URL: Attribute.String;
    Minister_type: Attribute.Enumeration<
      [
        'Prime Minister',
        'Cabinet Minister',
        'Ministers of State (Independent Charge)',
        'State Minister'
      ]
    > &
      Attribute.Required;
    Weight: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
        max: 60;
      }> &
      Attribute.DefaultTo<1>;
    Language: Attribute.Enumeration<['Language neutral', 'English']> &
      Attribute.DefaultTo<'English'>;
    Body: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::council-of-minister.council-of-minister',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::council-of-minister.council-of-minister',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDiscoveringBharatDiscoveringBharat
  extends Schema.CollectionType {
  collectionName: 'discovering_bharats';
  info: {
    singularName: 'discovering-bharat';
    pluralName: 'discovering-bharats';
    displayName: 'Discovering_Bharat';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    homepage_img: Attribute.Media;
    is_show_homepage: Attribute.Boolean & Attribute.DefaultTo<false>;
    type: Attribute.Enumeration<
      ['travel', 'profile', 'culinary', 'produce', 'states']
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::discovering-bharat.discovering-bharat',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::discovering-bharat.discovering-bharat',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiGalleryImageGalleryImage extends Schema.CollectionType {
  collectionName: 'gallery_images';
  info: {
    singularName: 'gallery-image';
    pluralName: 'gallery-images';
    displayName: 'Gallery Image';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    alt: Attribute.String;
    image: Attribute.String;
    thumb_img_url: Attribute.String;
    full_img_url: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::gallery-image.gallery-image',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::gallery-image.gallery-image',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiImageImage extends Schema.CollectionType {
  collectionName: 'images';
  info: {
    singularName: 'image';
    pluralName: 'images';
    displayName: 'Images';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    homepage_img: Attribute.Media;
    url: Attribute.String;
    is_show_homepage: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::image.image',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::image.image',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiInitiativeInitiative extends Schema.CollectionType {
  collectionName: 'initiatives';
  info: {
    singularName: 'initiative';
    pluralName: 'initiatives';
    displayName: 'Initiative';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    homepage_img: Attribute.Media;
    url: Attribute.String;
    description: Attribute.Text;
    is_show_homepage: Attribute.Boolean & Attribute.DefaultTo<false>;
    weight: Attribute.Integer;
    banner_keywords: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::initiative.initiative',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::initiative.initiative',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiInteractionTypeInteractionType
  extends Schema.CollectionType {
  collectionName: 'interaction_types';
  info: {
    singularName: 'interaction-type';
    pluralName: 'interaction-types';
    displayName: 'Interaction Type';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    int_id: Attribute.Integer & Attribute.Unique;
    services: Attribute.Relation<
      'api::interaction-type.interaction-type',
      'manyToMany',
      'api::service.service'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::interaction-type.interaction-type',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::interaction-type.interaction-type',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiLandingPageLandingPage extends Schema.CollectionType {
  collectionName: 'landing_pages';
  info: {
    singularName: 'landing-page';
    pluralName: 'landing-pages';
    displayName: 'Landing Sections';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    subtitle: Attribute.String;
    description: Attribute.Text;
    bg_image: Attribute.Media;
    dataset: Attribute.Component<'dataset.cards', true>;
    section: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::landing-page.landing-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::landing-page.landing-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiLocationStateDistLocationStateDist
  extends Schema.CollectionType {
  collectionName: 'location_state_dists';
  info: {
    singularName: 'location-state-dist';
    pluralName: 'location-state-dists';
    displayName: 'State/Dist.';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    services: Attribute.Relation<
      'api::location-state-dist.location-state-dist',
      'manyToMany',
      'api::service.service'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::location-state-dist.location-state-dist',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::location-state-dist.location-state-dist',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPeopleGroupPeopleGroup extends Schema.CollectionType {
  collectionName: 'people_groups';
  info: {
    singularName: 'people-group';
    pluralName: 'people-groups';
    displayName: 'People Group';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    title: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    pg_id: Attribute.Integer &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    services: Attribute.Relation<
      'api::people-group.people-group',
      'manyToMany',
      'api::service.service'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::people-group.people-group',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::people-group.people-group',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::people-group.people-group',
      'oneToMany',
      'api::people-group.people-group'
    >;
    locale: Attribute.String;
  };
}

export interface ApiServiceService extends Schema.CollectionType {
  collectionName: 'services';
  info: {
    singularName: 'service';
    pluralName: 'services';
    displayName: 'Services';
    description: '';
  };
  options: {
    draftAndPublish: true;
    populateCreatorFields: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    url: Attribute.String & Attribute.Required & Attribute.Unique;
    power_by_service_plus: Attribute.Boolean & Attribute.DefaultTo<false>;
    service_plus_id: Attribute.String;
    url_is_on_gov_domain: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    keywords: Attribute.String & Attribute.Required;
    service_maturity: Attribute.Relation<
      'api::service.service',
      'manyToOne',
      'api::service-maturity.service-maturity'
    >;
    owner: Attribute.Relation<
      'api::service.service',
      'manyToOne',
      'api::service-type.service-type'
    >;
    central_ministry_dept: Attribute.Relation<
      'api::service.service',
      'manyToOne',
      'api::central-ministry-dept.central-ministry-dept'
    >;
    description: Attribute.Text & Attribute.Required;
    people_groups: Attribute.Relation<
      'api::service.service',
      'manyToMany',
      'api::people-group.people-group'
    >;
    service_language: Attribute.Relation<
      'api::service.service',
      'manyToOne',
      'api::service-language.service-language'
    >;
    interaction_types: Attribute.Relation<
      'api::service.service',
      'manyToMany',
      'api::interaction-type.interaction-type'
    >;
    category_list: Attribute.Relation<
      'api::service.service',
      'manyToMany',
      'api::category-group.category-group'
    >;
    state_dists: Attribute.Relation<
      'api::service.service',
      'manyToMany',
      'api::location-state-dist.location-state-dist'
    >;
    state_dept_orgs: Attribute.Relation<
      'api::service.service',
      'manyToMany',
      'api::state-dept-org.state-dept-org'
    >;
    is_show_homepage: Attribute.Boolean & Attribute.DefaultTo<false>;
    homepage_img: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::service.service',
      'oneToOne',
      'admin::user'
    >;
    updatedBy: Attribute.Relation<
      'api::service.service',
      'oneToOne',
      'admin::user'
    >;
  };
}

export interface ApiServiceLanguageServiceLanguage
  extends Schema.CollectionType {
  collectionName: 'service_languages';
  info: {
    singularName: 'service-language';
    pluralName: 'service-languages';
    displayName: 'Service Language';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    language: Attribute.String & Attribute.Required;
    services: Attribute.Relation<
      'api::service-language.service-language',
      'oneToMany',
      'api::service.service'
    >;
    language_id: Attribute.Integer & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::service-language.service-language',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::service-language.service-language',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiServiceMaturityServiceMaturity
  extends Schema.CollectionType {
  collectionName: 'service_maturities';
  info: {
    singularName: 'service-maturity';
    pluralName: 'service-maturities';
    displayName: 'Maturity';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    services: Attribute.Relation<
      'api::service-maturity.service-maturity',
      'oneToMany',
      'api::service.service'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::service-maturity.service-maturity',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::service-maturity.service-maturity',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiServiceTypeServiceType extends Schema.CollectionType {
  collectionName: 'service_types';
  info: {
    singularName: 'service-type';
    pluralName: 'service-types';
    displayName: 'Owner';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    services: Attribute.Relation<
      'api::service-type.service-type',
      'oneToMany',
      'api::service.service'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::service-type.service-type',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::service-type.service-type',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSpotlightSpotlight extends Schema.CollectionType {
  collectionName: 'spotlights';
  info: {
    singularName: 'spotlight';
    pluralName: 'spotlights';
    displayName: 'Spotlight';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    url: Attribute.String;
    homepage_img: Attribute.Media;
    is_show_homepage: Attribute.Boolean & Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::spotlight.spotlight',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::spotlight.spotlight',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiStateDeptOrgStateDeptOrg extends Schema.CollectionType {
  collectionName: 'state_dept_orgs';
  info: {
    singularName: 'state-dept-org';
    pluralName: 'state-dept-orgs';
    displayName: 'State Dept/Org.';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required & Attribute.Unique;
    services: Attribute.Relation<
      'api::state-dept-org.state-dept-org',
      'manyToMany',
      'api::service.service'
    > &
      Attribute.Private;
    code: Attribute.String & Attribute.Unique;
    lgd_code: Attribute.Integer & Attribute.Unique;
    state_or_ut: Attribute.Enumeration<['S', 'U']> &
      Attribute.Required &
      Attribute.DefaultTo<'S'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::state-dept-org.state-dept-org',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::state-dept-org.state-dept-org',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTouristPlaceTouristPlace extends Schema.CollectionType {
  collectionName: 'tourist_places';
  info: {
    singularName: 'tourist-place';
    pluralName: 'tourist-places';
    displayName: 'Tourist Place';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    image_url: Attribute.String;
    description: Attribute.Text;
    url: Attribute.String;
    cityName: Attribute.String;
    districtName: Attribute.String;
    stateName: Attribute.String;
    how_to_reach: Attribute.JSON;
    display_order: Attribute.Integer & Attribute.Required;
    gallery_images: Attribute.Relation<
      'api::tourist-place.tourist-place',
      'oneToMany',
      'api::gallery-image.gallery-image'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::tourist-place.tourist-place',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::tourist-place.tourist-place',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiWhoSWhoListWhoSWhoList extends Schema.CollectionType {
  collectionName: 'who_s_who_lists';
  info: {
    singularName: 'who-s-who-list';
    pluralName: 'who-s-who-lists';
    displayName: "Who'sWhoList";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Title: Attribute.String & Attribute.Required;
    Display_order: Attribute.Integer & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::who-s-who-list.who-s-who-list',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::who-s-who-list.who-s-who-list',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiWhoSWhoVvipWhoSWhoVvip extends Schema.CollectionType {
  collectionName: 'who_s_who_vvips';
  info: {
    singularName: 'who-s-who-vvip';
    pluralName: 'who-s-who-vvips';
    displayName: 'VVIPs';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    url: Attribute.String;
    WhosWho_type: Attribute.Enumeration<
      [
        'President',
        'Vice-President',
        'Prime minister',
        'Council of Ministers',
        'Governors',
        'Lt. Governors & Administrators',
        'Chief Ministers',
        'Judges of Supreme Court',
        'Chiefs of Armed Forces',
        'Members of Parliament',
        'MLAs/MLCs'
      ]
    > &
      Attribute.Required;
    coverage_state_ut: Attribute.Enumeration<
      [
        'Andaman and Nicobar Island (UT)',
        'Andhra Pradesh',
        'Arunachal Pradesh',
        'Assam',
        'Bihar',
        'Chandigarh (UT)',
        'Chhattisgarh',
        'Dadra and Nagar Haveli and Daman and Diu (UT)',
        'Delhi (NCT)',
        'Jammu and Kashmir (UT)',
        'Goa',
        'Gujarat',
        'Haryana',
        'Himachal Pradesh',
        'Jharkhand',
        'Karnataka',
        'Kerala',
        'Ladakh (UT)',
        'Lakshadweep (UT)',
        'Madhya Pradesh',
        'Maharashtra',
        'Manipur',
        'Meghalaya',
        'Mizoram',
        'Nagaland',
        'Odisha',
        'Puducherry (UT)',
        'Punjab',
        'Rajasthan',
        'Sikkim',
        'Tamil Nadu',
        'Telangana',
        'Tripura',
        'Uttar Pradesh',
        'Uttarakhand',
        'West Bengal'
      ]
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::who-s-who-vvip.who-s-who-vvip',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::who-s-who-vvip.who-s-who-vvip',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiWhosWhoWhosWho extends Schema.CollectionType {
  collectionName: 'whos_whos';
  info: {
    singularName: 'whos-who';
    pluralName: 'whos-whos';
    displayName: 'Chiefs of India';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    updatedBy_email: Attribute.String;
    updatedBy_name: Attribute.String;
    title: Attribute.String & Attribute.Required;
    text_format: Attribute.Enumeration<['Full HTML', 'Plain Text']>;
    name: Attribute.String & Attribute.Unique;
    homepage_img: Attribute.Media;
    bg_photo: Attribute.Media;
    facebook_url: Attribute.String & Attribute.Unique;
    x_url: Attribute.String & Attribute.Unique;
    phone: Attribute.String & Attribute.Unique;
    education: Attribute.Text;
    career: Attribute.Text;
    contact_details: Attribute.Text;
    body: Attribute.Text;
    state: Attribute.String &
      Attribute.CustomField<'plugin::npistrapi.npistrapi1'>;
    review: Attribute.String &
      Attribute.CustomField<'plugin::npistrapi.npistrapi'>;
    is_show_homepage: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::whos-who.whos-who',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::whos-who.whos-who',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiWhosWhoMainSectionWhosWhoMainSection
  extends Schema.CollectionType {
  collectionName: 'whos_who_main_sections';
  info: {
    singularName: 'whos-who-main-section';
    pluralName: 'whos-who-main-sections';
    displayName: 'Main section';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    WhosWho_type: Attribute.Enumeration<
      [
        'President',
        'Vice-President',
        'Prime minister',
        'Council of Ministers',
        'Governors',
        'Lt. Governors & Administrators',
        'Chief Ministers',
        'Judges of Supreme Court',
        'Chiefs of Armed Forces',
        'Members of Parliament',
        'MLAs/MLCs'
      ]
    > &
      Attribute.Required;
    image: Attribute.Media;
    body: Attribute.Text;
    text_format: Attribute.Enumeration<['Full HTML', 'Plain text']> &
      Attribute.DefaultTo<'Full HTML'>;
    attachments: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::whos-who-main-section.whos-who-main-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::whos-who-main-section.whos-who-main-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::category-group.category-group': ApiCategoryGroupCategoryGroup;
      'api::central-ministry-dept.central-ministry-dept': ApiCentralMinistryDeptCentralMinistryDept;
      'api::council-of-minister.council-of-minister': ApiCouncilOfMinisterCouncilOfMinister;
      'api::discovering-bharat.discovering-bharat': ApiDiscoveringBharatDiscoveringBharat;
      'api::gallery-image.gallery-image': ApiGalleryImageGalleryImage;
      'api::image.image': ApiImageImage;
      'api::initiative.initiative': ApiInitiativeInitiative;
      'api::interaction-type.interaction-type': ApiInteractionTypeInteractionType;
      'api::landing-page.landing-page': ApiLandingPageLandingPage;
      'api::location-state-dist.location-state-dist': ApiLocationStateDistLocationStateDist;
      'api::people-group.people-group': ApiPeopleGroupPeopleGroup;
      'api::service.service': ApiServiceService;
      'api::service-language.service-language': ApiServiceLanguageServiceLanguage;
      'api::service-maturity.service-maturity': ApiServiceMaturityServiceMaturity;
      'api::service-type.service-type': ApiServiceTypeServiceType;
      'api::spotlight.spotlight': ApiSpotlightSpotlight;
      'api::state-dept-org.state-dept-org': ApiStateDeptOrgStateDeptOrg;
      'api::tourist-place.tourist-place': ApiTouristPlaceTouristPlace;
      'api::who-s-who-list.who-s-who-list': ApiWhoSWhoListWhoSWhoList;
      'api::who-s-who-vvip.who-s-who-vvip': ApiWhoSWhoVvipWhoSWhoVvip;
      'api::whos-who.whos-who': ApiWhosWhoWhosWho;
      'api::whos-who-main-section.whos-who-main-section': ApiWhosWhoMainSectionWhosWhoMainSection;
    }
  }
}

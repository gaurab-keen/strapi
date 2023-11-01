import type { Schema, Attribute } from '@strapi/strapi';

export interface DatasetCards extends Schema.Component {
  collectionName: 'components_dataset_cards';
  info: {
    displayName: 'cards';
    icon: 'apps';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    desc: Attribute.String;
    bg_img: Attribute.Media;
    img: Attribute.Media;
    redirect_url: Attribute.String;
    nid: Attribute.Integer;
  };
}

export interface DatasetDataList extends Schema.Component {
  collectionName: 'components_dataset_data_lists';
  info: {
    displayName: 'DataList';
    icon: 'bulletList';
  };
  attributes: {
    title: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'dataset.cards': DatasetCards;
      'dataset.data-list': DatasetDataList;
    }
  }
}

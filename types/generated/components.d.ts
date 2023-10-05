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

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'dataset.cards': DatasetCards;
    }
  }
}

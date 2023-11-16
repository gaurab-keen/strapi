import type { Schema, Attribute } from '@strapi/strapi';

export interface CardDataCard1 extends Schema.Component {
  collectionName: 'components_card_data_card_1s';
  info: {
    displayName: 'card-1';
    icon: 'landscape';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    subtitle: Attribute.Text;
    img: Attribute.Media;
    visibility: Attribute.Boolean;
  };
}

export interface CardDataCard2 extends Schema.Component {
  collectionName: 'components_card_data_card_2s';
  info: {
    displayName: 'card-2';
    icon: 'landscape';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    img: Attribute.Media;
    visibility: Attribute.Boolean;
  };
}

export interface CardDataCards extends Schema.Component {
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
      'card-data.card-1': CardDataCard1;
      'card-data.card-2': CardDataCard2;
      'card-data.cards': CardDataCards;
      'dataset.data-list': DatasetDataList;
    }
  }
}

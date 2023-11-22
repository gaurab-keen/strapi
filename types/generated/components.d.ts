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

export interface CardDataExploreCard extends Schema.Component {
  collectionName: 'components_card_data_explore_cards';
  info: {
    displayName: 'explore_card';
    icon: 'server';
    description: '';
  };
  attributes: {
    title_1: Attribute.String;
    title_2: Attribute.String;
    title_3: Attribute.String;
    body_1: Attribute.Text;
    body_2: Attribute.String;
    img_1: Attribute.Media;
    img_2: Attribute.Media;
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

export interface PagesFactsPage extends Schema.Component {
  collectionName: 'components_pages_facts_pages';
  info: {
    displayName: 'facts page';
    icon: 'file';
    description: '';
  };
  attributes: {
    page_title: Attribute.String;
    is_visible: Attribute.Boolean;
    page_content: Attribute.RichText;
    page_icon: Attribute.Media;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'card-data.card-1': CardDataCard1;
      'card-data.card-2': CardDataCard2;
      'card-data.cards': CardDataCards;
      'card-data.explore-card': CardDataExploreCard;
      'dataset.data-list': DatasetDataList;
      'pages.facts-page': PagesFactsPage;
    }
  }
}

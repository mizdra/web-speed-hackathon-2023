/* eslint-disable @typescript-eslint/no-unused-vars */
import { LimitedTimeOffer } from '../../model/limited_time_offer';
import type { Product } from '../../model/product';
import { ProductMedia } from '../../model/product_media';
import { Review } from '../../model/review';
import { dataSource } from '../data_source';

import { LimitedTimeOfferLoader, ProductMediaLoader, ReviewLoader } from './dataloader';
import type { GraphQLModelResolver } from './model_resolver';

export const productResolver: GraphQLModelResolver<Product> = {
  media: (parent) => {
    return ProductMediaLoader.findByProductId.load(parent.id);
    // return dataSource.manager.find(ProductMedia, {
    //   where: {
    //     product: parent,
    //   },
    // });
  },
  offers: (parent) => {
    return LimitedTimeOfferLoader.findByProductId.load(parent.id);
    // return dataSource.manager.find(LimitedTimeOffer, {
    //   where: {
    //     product: parent,
    //   },
    // });
  },
  reviews: (parent) => {
    return ReviewLoader.findByProductId.load(parent.id);
    // return dataSource.manager.find(Review, {
    //   where: {
    //     product: parent,
    //   },
    // });
  },
};

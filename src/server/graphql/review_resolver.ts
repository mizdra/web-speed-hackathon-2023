/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Review } from '../../model/review';
import { dataSource } from '../data_source';

import { ReviewLoader } from './dataloader';
import type { GraphQLModelResolver } from './model_resolver';

export const reviewResolver: GraphQLModelResolver<Review> = {
  product: async (parent) => {
    const review = await ReviewLoader.findByReviewId.load(parent.id);
    if (review === undefined) {
      return Promise.reject();
    }
    return review.product;
    // const review = await dataSource.manager.findOneOrFail(Review, {
    //   relations: {
    //     product: true,
    //   },
    //   where: { id: parent.id },
    // });

    // return review.product;
  },
  user: async (parent) => {
    const review = await ReviewLoader.findByReviewId.load(parent.id);
    if (review === undefined) {
      return Promise.reject();
    }
    return review.user;
    // const review = await dataSource.manager.findOneOrFail(Review, {
    //   relations: {
    //     user: true,
    //   },
    //   where: { id: parent.id },
    // });

    // return review.user;
  },
};

/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Recommendation } from '../../model/recommendation';
import { dataSource } from '../data_source';

import { RecommendationLoader } from './dataloader';
import type { GraphQLModelResolver } from './model_resolver';

export const recommendationResolver: GraphQLModelResolver<Recommendation> = {
  product: async (parent) => {
    const recommendation = await RecommendationLoader.findOneByRecommendationId.load(parent.id);
    if (recommendation === undefined) {
      return Promise.reject();
    }
    return recommendation.product;
    // const recommendation = await dataSource.manager.findOneOrFail(Recommendation, {
    //   relations: {
    //     product: true,
    //   },
    //   where: { id: parent.id },
    // });

    // return recommendation.product;
  },
};

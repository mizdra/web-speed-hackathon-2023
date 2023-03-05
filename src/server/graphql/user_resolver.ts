/* eslint-disable @typescript-eslint/no-unused-vars */
import { Order } from '../../model/order';
import { Profile } from '../../model/profile';
import { Review } from '../../model/review';
import type { User } from '../../model/user';
import { dataSource } from '../data_source';

import { OrderLoader, ProfileLoader, ReviewLoader } from './dataloader';
import type { GraphQLModelResolver } from './model_resolver';

async function unwrap<T>(value: Promise<T | undefined>): Promise<T> {
  const result = await value;
  if (result === undefined) {
    return Promise.reject();
  }
  return result;
}

export const userResolver: GraphQLModelResolver<User> = {
  orders: (parent) => {
    return OrderLoader.findByUser.load(parent.id);
    // return dataSource.manager.find(Order, {
    //   where: {
    //     user: parent,
    //   },
    // });
  },
  profile: async (parent) => {
    return unwrap(ProfileLoader.findOneByUser.load(parent.id));
    // return dataSource.manager.findOneOrFail(Profile, {
    //   where: {
    //     user: parent,
    //   },
    // });
  },
  reviews: (parent) => {
    return ReviewLoader.findByUser.load(parent.id);
    // return dataSource.manager.find(Review, {
    //   where: {
    //     user: parent,
    //   },
    // });
  },
};

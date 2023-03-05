/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Profile } from '../../model/profile';
import { dataSource } from '../data_source';

import { ProfileLoader } from './dataloader';
import type { GraphQLModelResolver } from './model_resolver';

export const profileResolver: GraphQLModelResolver<Profile> = {
  avatar: async (parent) => {
    const profile = await ProfileLoader.findOneByProfileId.load(parent.id);
    if (profile === undefined) {
      return Promise.reject();
    }
    return profile.avatar;
    // const profileProfileLoader = await dataSource.manager.findOneOrFail(Profile, {
    //   relations: {
    //     avatar: true,
    //   },
    //   where: { id: parent.id },
    // });

    // return profile.avatar;
  },
};

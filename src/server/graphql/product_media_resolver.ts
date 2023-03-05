/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ProductMedia } from '../../model/product_media';
import { dataSource } from '../data_source';

import { ProductMediaLoader } from './dataloader';
import type { GraphQLModelResolver } from './model_resolver';

export const productMediaResolver: GraphQLModelResolver<ProductMedia> = {
  file: async (parent) => {
    const productMedia = await ProductMediaLoader.findOneByProductMediaId.load(parent.id);
    // const productMedia = await dataSource.manager.findOneOrFail(ProductMedia, {
    //   relations: {
    //     file: true,
    //   },
    //   where: { id: parent.id },
    // });
    if (productMedia === undefined) {
      return Promise.reject();
    }
    return productMedia.file;
  },
};

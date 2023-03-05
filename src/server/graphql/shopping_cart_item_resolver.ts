/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ShoppingCartItem } from '../../model/shopping_cart_item';
import { dataSource } from '../data_source';

import { ShoppingCartItemLoader } from './dataloader';
import type { GraphQLModelResolver } from './model_resolver';

export const shoppingCartItemResolver: GraphQLModelResolver<ShoppingCartItem> = {
  product: async (parent) => {
    const item = await ShoppingCartItemLoader.findOneByShoppingCartItemId.load(parent.id);
    if (item === undefined) {
      return Promise.reject();
    }
    return item.product;
    // const item = await dataSource.manager.findOneOrFail(ShoppingCartItem, {
    //   relations: {
    //     product: true,
    //   },
    //   where: {
    //     id: parent.id,
    //   },
    // });

    // return item.product;
  },
};

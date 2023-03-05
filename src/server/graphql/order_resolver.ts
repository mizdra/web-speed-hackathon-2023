/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Order } from '../../model/order';
import { ShoppingCartItem } from '../../model/shopping_cart_item';
import { dataSource } from '../data_source';

import { ShoppingCartItemLoader } from './dataloader';
import type { GraphQLModelResolver } from './model_resolver';

export const orderResolver: GraphQLModelResolver<Order> = {
  items: async (parent) => {
    return ShoppingCartItemLoader.findByOrderId.load(parent.id);
    // return dataSource.manager.find(ShoppingCartItem, {
    //   where: {
    //     order: parent,
    //   },
    // });
  },
};

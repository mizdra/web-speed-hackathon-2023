import DataLoader from 'dataloader';

import { FeatureItem } from '../../model/feature_item';
import { LimitedTimeOffer } from '../../model/limited_time_offer';
import { Order } from '../../model/order';
import { ProductMedia } from '../../model/product_media';
import { Profile } from '../../model/profile';
import { Recommendation } from '../../model/recommendation';
import { Review } from '../../model/review';
import { ShoppingCartItem } from '../../model/shopping_cart_item';
import { dataSource } from '../data_source';

export function groupBy<T, K>(array: T[], toKey: (item: T) => K): Map<K, T[]> {
  const map = new Map<K, T[]>();

  for (const item of array) {
    const key = toKey(item);
    const oldValue = map.get(key);
    const newValue = oldValue ? [...oldValue, item] : [item];
    map.set(key, newValue);
  }

  return map;
}

export const ProfileLoader = {
  findOneByProfileId: new DataLoader(async (ids: readonly number[]) => {
    const profiles = await dataSource.manager
      .createQueryBuilder(Profile, 'profile')
      .leftJoinAndSelect('profile.avatar', 'user')
      .where('profile.id IN (:...ids)', { ids: ids })
      .getMany();

    const result = ids.map((id) => profiles.find((profile) => profile.id === id));
    return result;
  }),
  findOneByUser: new DataLoader(async (userIds: readonly number[]) => {
    const profiles = await dataSource.manager
      .createQueryBuilder(Profile, 'profile')
      .leftJoinAndSelect('profile.user', 'user')
      .where('profile.userId IN (:...userIds)', { userIds: userIds })
      .getMany();

    const result = userIds.map((userId) => profiles.find((profile) => profile.user.id === userId));
    return result;
  }),
};

export const OrderLoader = {
  findByUser: new DataLoader(async (userIds: readonly number[]) => {
    const orders = await dataSource.manager
      .createQueryBuilder(Order, 'order')
      .leftJoinAndSelect('order.user', 'user')
      .where('order.userId IN (:...userIds)', { userIds: userIds })
      .getMany();
    const userIdToOrders = groupBy(orders, (order) => order.user.id);
    const result = userIds.map((userId) => userIdToOrders.get(userId) ?? []);
    return result;
  }),
};

export const ReviewLoader = {
  findByProductId: new DataLoader(async (ids: readonly number[]) => {
    const reviews = await dataSource.manager
      .createQueryBuilder(Review, 'review')
      .leftJoinAndSelect('review.product', 'product')
      .where('review.productId IN (:...ids)', { ids: ids })
      .getMany();
    const productIdToReviews = groupBy(reviews, (review) => review.product.id);
    const result = ids.map((id) => productIdToReviews.get(id) ?? []);
    return result;
  }),
  findByReviewId: new DataLoader(async (ids: readonly number[]) => {
    const reviews = await dataSource.manager
      .createQueryBuilder(Review, 'review')
      .leftJoinAndSelect('review.product', 'product') // join が必要な箇所があるので
      .leftJoinAndSelect('review.user', 'user') // join が必要な箇所があるので
      .where('review.id IN (:...ids)', { ids: ids })
      .getMany();
    const result = ids.map((id) => reviews.find((review) => review.id === id));
    return result;
  }),
  findByUser: new DataLoader(async (userIds: readonly number[]) => {
    const reviews = await dataSource.manager
      .createQueryBuilder(Review, 'review')
      .leftJoinAndSelect('review.user', 'user')
      .where('review.userId IN (:...userIds)', { userIds: userIds })
      .getMany();
    const userIdToReviews = groupBy(reviews, (review) => review.user.id);
    const result = userIds.map((userId) => userIdToReviews.get(userId) ?? []);
    return result;
  }),
};

export const FeatureItemLoader = {
  findByFeatureSectionId: new DataLoader(async (sectionIds: readonly number[]) => {
    const featureItems = await dataSource.manager
      .createQueryBuilder(FeatureItem, 'feature_item')
      .leftJoinAndSelect('feature_item.section', 'feature_section')
      .leftJoinAndSelect('feature_item.product', 'product') // join が必要な箇所があるので
      .where('feature_item.sectionId IN (:...sectionIds)', { sectionIds: sectionIds })
      .getMany();
    const sectionIdToFeatureItems = groupBy(featureItems, (featureItem) => featureItem.section.id);
    const result = sectionIds.map((sectionId) => sectionIdToFeatureItems.get(sectionId) ?? []);
    return result;
  }),
};

export const ShoppingCartItemLoader = {
  findByOrderId: new DataLoader(async (ids: readonly number[]) => {
    const shoppingCartItems = await dataSource.manager
      .createQueryBuilder(ShoppingCartItem, 'shopping_cart_item')
      .leftJoinAndSelect('shopping_cart_item.order', 'order')
      .where('shopping_cart_item.orderId IN (:...ids)', { ids })
      .getMany();
    const orderIdToShoppingCartItems = groupBy(shoppingCartItems, (shoppingCartItem) => shoppingCartItem.order.id);
    const result = ids.map((id) => orderIdToShoppingCartItems.get(id) ?? []);
    return result;
  }),
  findOneByShoppingCartItemId: new DataLoader(async (ids: readonly number[]) => {
    const shoppingCartItems = await dataSource.manager
      .createQueryBuilder(ShoppingCartItem, 'shopping_cart_item')
      .leftJoinAndSelect('shopping_cart_item.product', 'product') // join が必要な箇所があるので
      .where('shopping_cart_item.id IN (:...ids)', { ids })
      .getMany();
    const result = ids.map((id) => shoppingCartItems.find((shoppingCartItem) => shoppingCartItem.id === id));
    return result;
  }),
};

export const ProductMediaLoader = {
  findByProductId: new DataLoader(async (ids: readonly number[]) => {
    const productMedias = await dataSource.manager
      .createQueryBuilder(ProductMedia, 'product_media')
      .leftJoinAndSelect('product_media.product', 'product')
      .where('product_media.productId IN (:...ids)', { ids })
      .getMany();
    const productIdToProductMedias = groupBy(productMedias, (productMedia) => productMedia.product.id);
    const result = ids.map((id) => productIdToProductMedias.get(id) ?? []);
    return result;
  }),
  findOneByProductMediaId: new DataLoader(async (ids: readonly number[]) => {
    const productMedias = await dataSource.manager
      .createQueryBuilder(ProductMedia, 'product_media')
      .leftJoinAndSelect('product_media.file', 'media_file') // join が必要な箇所があるので
      .where('product_media.id IN (:...ids)', { ids })
      .getMany();

    const result = ids.map((id) => productMedias.find((productMedia) => productMedia.id === id));
    return result;
  }),
};

export const LimitedTimeOfferLoader = {
  findByProductId: new DataLoader(async (ids: readonly number[]) => {
    const limitedTimeOffers = await dataSource.manager
      .createQueryBuilder(LimitedTimeOffer, 'limited_time_offer')
      .leftJoinAndSelect('limited_time_offer.product', 'product')
      .where('limited_time_offer.productId IN (:...ids)', { ids })
      .getMany();
    const productIdToLimitedTimeOffers = groupBy(limitedTimeOffers, (limitedTimeOffer) => limitedTimeOffer.product.id);
    const result = ids.map((id) => productIdToLimitedTimeOffers.get(id) ?? []);
    return result;
  }),
};

export const RecommendationLoader = {
  findOneByRecommendationId: new DataLoader(async (ids: readonly number[]) => {
    const recommendations = await dataSource.manager
      .createQueryBuilder(Recommendation, 'recommendation')
      .leftJoinAndSelect('recommendation.product', 'product') // join が必要な箇所があるので
      .where('recommendation.id IN (:...ids)', { ids })
      .getMany();

    const result = ids.map((id) => recommendations.find((recommendation) => recommendation.id === id));
    return result;
  }),
};

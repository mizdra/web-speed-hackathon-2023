import { useEffect, useState } from 'react';

import type { LimitedTimeOfferFragmentResponse, ProductFragmentResponse } from '../graphql/fragments';
import { getActiveOffer } from '../utils/get_active_offer';

export function useActiveOffer(product: ProductFragmentResponse | undefined) {
  const [activeOffer, setActiveOffer] = useState<LimitedTimeOfferFragmentResponse | undefined>(
    product ? getActiveOffer(product.offers) : undefined,
  );

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (activeOffer) {
      const endDateTime = new Date(activeOffer.endDate).getTime();
      timer = setTimeout(() => {
        if (product) setActiveOffer(getActiveOffer(product.offers));
      }, endDateTime - Date.now());
    } else {
      const nextOffer = product?.offers
        // 昇順にソート
        .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
        // 未来のものだけに絞る
        .find((offer) => new Date(offer.startDate).getTime() >= Date.now());
      if (nextOffer) {
        const startDateTime = new Date(nextOffer.startDate).getTime();
        timer = setTimeout(() => {
          if (product) setActiveOffer(getActiveOffer(product.offers));
        }, startDateTime - Date.now());
      }
    }
    return () => {
      clearTimeout(timer);
    };
  }, [activeOffer, product]);

  return { activeOffer };
}

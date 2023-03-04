import { useEffect, useState } from 'react';

import type { LimitedTimeOfferFragmentResponse, ProductFragmentResponse } from '../graphql/fragments';
import { getActiveOffer } from '../utils/get_active_offer';

export function useActiveOffer(product: ProductFragmentResponse | undefined) {
  const [activeOffer, setActiveOffer] = useState<LimitedTimeOfferFragmentResponse | undefined>(undefined);

  useEffect(() => {
    // TODO: もうちょっといい方法があるはず
    const timer = setTimeout(() => {
      if (!product) {
        setActiveOffer(undefined);
        return;
      }

      const offer = getActiveOffer(product.offers);
      setActiveOffer(offer);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [product]);

  return { activeOffer };
}

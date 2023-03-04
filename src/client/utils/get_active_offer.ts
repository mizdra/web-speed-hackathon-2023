import type { LimitedTimeOfferFragmentResponse } from '../graphql/fragments';

export function getActiveOffer(
  offers: LimitedTimeOfferFragmentResponse[],
): LimitedTimeOfferFragmentResponse | undefined {
  const activeOffer = offers.find((offer) => {
    const now = window.Temporal.Now.instant();
    const startDate = window.Temporal.Instant.from(offer.startDate);
    const endDate = window.Temporal.Instant.from(offer.endDate);

    return window.Temporal.Instant.compare(startDate, now) < 0 && window.Temporal.Instant.compare(now, endDate) < 0;
  });

  return activeOffer;
}

// export function getOfferUpdateTime(offers: LimitedTimeOfferFragmentResponse[]): number | undefined {
//   const activeOffer = getActiveOffer(offers);

//   if (activeOffer === undefined) {
//     const nextOffer = offers
//       // 昇順にソート
//       .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
//       // 未来のものだけに絞る
//       .find((offer) => new Date(offer.startDate).getTime() >= new Date().getTime());
//     // 一応 + 500ms しておく
//     return nextOffer ? new Date(nextOffer.startDate).getTime() + 500 : undefined;
//   } else {
//     // 一応 + 500ms しておく
//     return new Date(activeOffer.endDate).getTime() + 500;
//   }
// }

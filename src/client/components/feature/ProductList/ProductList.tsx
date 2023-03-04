import _ from 'lodash';
import type { FC } from 'react';
import { memo } from 'react';

import type { FeatureSectionFragmentResponse } from '../../../graphql/fragments';
import { DesktopOnly, MobileOnly } from '../../foundation/GetDeviceType/GetDeviceType';
import { ProductGridList } from '../ProductGridList';
import { ProductListSlider } from '../ProductListSlider';

type Props = {
  featureSection: FeatureSectionFragmentResponse;
};

export const ProductList: FC<Props> = memo(({ featureSection }) => {
  return (
    <>
      <DesktopOnly>
        <ProductListSlider featureSection={featureSection} />
      </DesktopOnly>
      <MobileOnly>
        <ProductGridList featureSection={featureSection} />
      </MobileOnly>
    </>
  );
}, _.isEqual);

ProductList.displayName = 'ProductList';

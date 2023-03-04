import _ from 'lodash';
import type { FC } from 'react';
import { memo } from 'react';

import type { FeatureSectionFragmentResponse } from '../../../graphql/fragments';
import { ProductGridList } from '../ProductGridList';
import { ProductListSlider } from '../ProductListSlider';

import * as styles from './ProductList.styles';

type Props = {
  featureSection: FeatureSectionFragmentResponse;
};

export const ProductList: FC<Props> = memo(({ featureSection }) => {
  return (
    <>
      <div className={styles.list__desktop()}>
        <ProductListSlider featureSection={featureSection} />
      </div>
      <div className={styles.list__mobile()}>
        <ProductGridList featureSection={featureSection} />
      </div>
    </>
  );
}, _.isEqual);

ProductList.displayName = 'ProductList';

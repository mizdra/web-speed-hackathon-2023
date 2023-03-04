import classNames from 'classnames';
import _ from 'lodash';
import { memo } from 'react';
import type { FC } from 'react';

import type { ProductFragmentResponse } from '../../../graphql/fragments';
import { Anchor } from '../../foundation/Anchor';
import { AspectRatio } from '../../foundation/AspectRatio';
import { DesktopOnly, MobileOnly } from '../../foundation/GetDeviceType';
import { WidthRestriction } from '../../foundation/WidthRestriction';

import * as styles from './ProductHeroImage.styles';

type Props = {
  product: ProductFragmentResponse;
  title: string;
};

export const ProductHeroImage: FC<Props> = memo(({ product, title }) => {
  const thumbnailFile = product.media.find((productMedia) => productMedia.isThumbnail)?.file;

  if (thumbnailFile === undefined) {
    return null;
  }

  return (
    <>
      <DesktopOnly>
        <WidthRestriction>
          <Anchor href={`/product/${product.id}`}>
            <div className={styles.container()}>
              <AspectRatio ratioHeight={9} ratioWidth={16}>
                {/* TODO: サイズ指定したいかも? */}
                {<img className={styles.image()} loading="eager" src={thumbnailFile.filename} />}
              </AspectRatio>

              <div className={styles.overlay()}>
                <p
                  className={classNames(styles.title(), {
                    [styles.title__desktop()]: true,
                  })}
                >
                  {title}
                </p>
                <p
                  className={classNames(styles.description(), {
                    [styles.description__desktop()]: true,
                  })}
                >
                  {product.name}
                </p>
              </div>
            </div>
          </Anchor>
        </WidthRestriction>
      </DesktopOnly>
      <MobileOnly>
        <WidthRestriction>
          <Anchor href={`/product/${product.id}`}>
            <div className={styles.container()}>
              <AspectRatio ratioHeight={9} ratioWidth={16}>
                {/* TODO: サイズ指定したいかも? */}
                {<img className={styles.image()} loading="eager" src={thumbnailFile.filename} />}
              </AspectRatio>

              <div className={styles.overlay()}>
                <p
                  className={classNames(styles.title(), {
                    [styles.title__mobile()]: true,
                  })}
                >
                  {title}
                </p>
                <p
                  className={classNames(styles.description(), {
                    [styles.description__mobile()]: true,
                  })}
                >
                  {product.name}
                </p>
              </div>
            </div>
          </Anchor>
        </WidthRestriction>
      </MobileOnly>
    </>
  );
}, _.isEqual);

ProductHeroImage.displayName = 'ProductHeroImage';

import classNames from 'classnames';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

import { Layout } from '../../components/application/Layout';
import { AspectRatio } from '../../components/foundation/AspectRatio';
import { PrimaryAnchor } from '../../components/foundation/PrimaryAnchor';
import { WidthRestriction } from '../../components/foundation/WidthRestriction';
import { ProductHeroImage } from '../../components/product/ProductHeroImage';
import { useAuthUser } from '../../hooks/useAuthUser';
import { useRecommendation } from '../../hooks/useRecommendation';
import { loadFonts } from '../../utils/load_fonts';

import * as styles from './OrderComplete.styles';

const OrderComplete: FC = () => {
  const navigate = useNavigate();
  const [isReadyFont, setIsReadyFont] = useState(false);
  const { authUserLoading, isAuthUser } = useAuthUser();
  const { recommendation } = useRecommendation();

  useEffect(() => {
    loadFonts().then(() => {
      setIsReadyFont(true);
    });
  }, []);

  if (!recommendation || !isReadyFont || authUserLoading) {
    return null;
  }
  if (!isAuthUser) {
    navigate('/');
    return null;
  }

  return (
    <>
      <Helmet>
        <title>購入が完了しました</title>
      </Helmet>
      <Layout>
        <WidthRestriction>
          <div className={styles.container()}>
            <div className={styles.notice()}>
              <h2 className={styles.noticeHeading()}>購入が完了しました</h2>
              <AspectRatio ratioHeight={1} ratioWidth={2}>
                <div className={styles.noticeDescriptionWrapper()}>
                  <p
                    className={classNames(styles.noticeDescription(), {
                      [styles.noticeDescription__desktop()]: true,
                      [styles.noticeDescription__mobile()]: true,
                    })}
                  >
                    このサイトは架空のサイトであり、商品が発送されることはありません
                  </p>
                </div>
              </AspectRatio>
            </div>

            <div className={styles.recommended()}>
              <h2 className={styles.recommendedHeading()}>こちらの商品もオススメです</h2>
              <ProductHeroImage product={recommendation.product} title={recommendation.product.name} />
            </div>

            <div className={styles.backToTopButtonWrapper()}>
              <PrimaryAnchor href="/" size="lg">
                トップへ戻る
              </PrimaryAnchor>
            </div>
          </div>
        </WidthRestriction>
      </Layout>
    </>
  );
};
export default OrderComplete;

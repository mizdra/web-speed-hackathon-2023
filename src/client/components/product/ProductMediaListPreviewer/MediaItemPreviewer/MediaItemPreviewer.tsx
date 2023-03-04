import classNames from 'classnames';
import type { FC } from 'react';

import type { MediaFileFragmentResponse } from '../../../../graphql/fragments';
import { getMediaType } from '../../../../utils/get_media_type';
import { DesktopOnly, MobileOnly } from '../../../foundation/GetDeviceType';
import { Image } from '../../../foundation/Image';

import * as styles from './MediaItemPreiewer.styles';

type Props = {
  file: MediaFileFragmentResponse;
};

export const MediaItemPreviewer: FC<Props> = ({ file }) => {
  const type = getMediaType(file.filename);

  return (
    <div className={styles.container()}>
      {type === 'image' && <Image fill src={file.filename} />}
      {type === 'video' && (
        <>
          <DesktopOnly>
            <video
              autoPlay
              controls
              muted
              playsInline
              className={classNames(styles.video(), {
                [styles.video__desktop()]: true,
              })}
              src={file.filename}
            />
          </DesktopOnly>
          <MobileOnly>
            <video
              autoPlay
              controls
              muted
              playsInline
              className={classNames(styles.video(), {
                [styles.video__mobile()]: true,
              })}
              src={file.filename}
            />
          </MobileOnly>
        </>
      )}
    </div>
  );
};

import type { FC, ReactNode } from 'react';

import * as styles from './AspectRatio.styles';

type Props = {
  ratioWidth: number;
  ratioHeight: number;
  children: ReactNode;
};

export const AspectRatio: FC<Props> = ({ children, ratioHeight, ratioWidth }) => {
  return <div className={styles.container({ ratioHeight, ratioWidth })}>{children}</div>;
};

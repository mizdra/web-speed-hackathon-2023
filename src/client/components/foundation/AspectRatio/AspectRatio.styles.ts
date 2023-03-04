import { css } from '@emotion/css';

export const container = ({ ratioHeight, ratioWidth }: { ratioWidth: number; ratioHeight: number }) => css`
  aspect-ratio: ${ratioWidth} / ${ratioHeight};
`;

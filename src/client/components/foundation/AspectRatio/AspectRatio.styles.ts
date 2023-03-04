import { css } from '@emotion/css';

export const container = ({ ratioHeight, ratioWidth }: { ratioWidth: number; ratioHeight: number }) => css`
  position: relative;
  width: 100%;
  aspect-ratio: ${ratioWidth} / ${ratioHeight};
`;

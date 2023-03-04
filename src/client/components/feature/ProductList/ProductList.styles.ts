import { css } from '@emotion/css';

export const container = () => css`
  padding: 24px 16px;
`;

export const list__desktop = () => css`
  display: none;
  @media (min-width: 1024px) {
    display: block;
  }
`;

export const list__mobile = () => css`
  display: none;
  @media not (min-width: 1024px) {
    display: block;
  }
`;

import { css } from '@emotion/css';

export const mobileOnlyContainer = () => css`
  @media not (min-width: 1024px) {
    display: none;
  }
`;

type MobileOnlyProps = {
  children: React.ReactNode;
};

export function MobileOnly({ children }: MobileOnlyProps) {
  return <div className={mobileOnlyContainer()}>{children}</div>;
}

export const desktopOnlyContainer = () => css`
  @media (min-width: 1024px) {
    display: none;
  }
`;

type DesktopOnlyProps = {
  children: React.ReactNode;
};

export function DesktopOnly({ children }: DesktopOnlyProps) {
  return <div className={desktopOnlyContainer()}>{children}</div>;
}

import React from 'react';
import styles from './Logo.module.scss';

export interface LogoProps {
  wrapperClass?: string;
  color?: string;
}

const Logo: React.FC<LogoProps> = ({ wrapperClass, color }) => (
  <div className={wrapperClass}>
    <svg width="100%" height="100%" viewBox="0 0 321.75 286.95" xmlns="http://www.w3.org/2000/svg">
      <g
        transform="matrix(.95021 -.31162 .31162 .95021 -106.29 132.88)"
        fill={`${color}`}
        fillRule="evenodd"
        strokeDashoffset="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="4.1"
        strokeWidth="10"
      >
        <path d="m290.76-39.011c-116.29 5.9117-207.84 67.222-207.84 141.94 0 78.622 101.38 142.44 226.28 142.44 21.72 0 42.737-1.9295 62.625-5.5312v-39.312c-17.014 3.0554-34.967 4.6875-53.531 4.6875-107.62 0-194.97-54.977-194.97-122.72 0-61.859 72.843-113.07 167.44-121.5z" />
        <path d="m304.42-37.858c-89.455 4.5475-159.88 51.71-159.88 109.18 0 60.479 77.983 109.57 174.06 109.57 16.708 0 32.875-1.4842 48.173-4.2548v-30.24c-13.088 2.3503-26.898 3.6058-41.178 3.6058-82.783 0-149.98-42.29-149.98-94.399 0-47.584 56.033-86.978 128.8-93.462z" />
        <path d="m317.45-35.731c-66.322 3.3715-118.54 38.338-118.54 80.948 0 44.839 57.817 81.234 129.05 81.234 12.387 0 24.373-1.1004 35.716-3.1545v-22.42c-9.7033 1.7425-19.942 2.6733-30.529 2.6733-61.376 0-111.19-31.354-111.19-69.988 0-35.279 41.543-64.486 95.491-69.293z" />
      </g>
    </svg>
  </div>
);

Logo.defaultProps = {
  wrapperClass: styles.container,
  color: '#ececec',
};

export default Logo;

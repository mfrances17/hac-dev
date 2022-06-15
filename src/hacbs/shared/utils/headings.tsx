import * as React from 'react';

export const SectionHeading: React.SFC<SectionHeadingProps> = ({ text, children, style, id }) => (
  <h2 className="co-section-heading" style={style} data-test-section-heading={text} id={id}>
    <span>{text}</span>
    {children}
  </h2>
);

export type SectionHeadingProps = {
  children?: any;
  style?: any;
  text: string;
  required?: boolean;
  id?: string;
};

SectionHeading.displayName = 'SectionHeading';

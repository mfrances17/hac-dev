import * as React from 'react';
import { useHistory } from 'react-router-dom';
import {
  KEY_CODES,
  MenuItem,
  Tooltip,
  DropdownItemProps,
  MenuItemProps,
} from '@patternfly/react-core';
import classNames from 'classnames';
import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';
import { Action } from './types';

export type ActionMenuItemProps = {
  action: Action;
  component?: React.ComponentType<MenuItemProps | DropdownItemProps>;
  autoFocus?: boolean;
  onClick?: () => void;
  onEscape?: () => void;
};

const ActionItem: React.FC<ActionMenuItemProps & { isAllowed: boolean }> = ({
  action,
  onClick,
  onEscape,
  autoFocus,
  isAllowed,
  component,
}) => {
  const { label, icon, disabled, cta } = action;
  const { href, external } = cta as { href: string; external?: boolean };
  const isDisabled = !isAllowed || disabled;
  const classes = classNames({ 'pf-m-disabled': isDisabled });
  const history = useHistory();

  const handleClick = React.useCallback(
    (event) => {
      event.preventDefault();
      if (isFunction(cta)) {
        cta();
      } else if (isObject(cta)) {
        if (!cta.external) {
          history.push(cta.href);
        }
      }
      onClick && onClick();
    },
    [cta, history, onClick],
  );

  const handleKeyDown = (event) => {
    if (event.keyCode === KEY_CODES.ESCAPE_KEY) {
      onEscape && onEscape();
    }

    if (event.keyCode === KEY_CODES.ENTER) {
      handleClick(event);
    }
  };
  const Component = component ?? MenuItem;

  const props = {
    icon,
    autoFocus,
    isDisabled,
    className: classes,
    onClick: handleClick,
    'data-testid': label,
  };

  const extraProps = {
    onKeyDown: handleKeyDown,
    ...(external ? { to: href, isExternalLink: external } : {}),
  };

  return (
    <Component {...props} {...(component ? {} : extraProps)}>
      {label}
    </Component>
  );
};

const ActionMenuItem: React.FC<ActionMenuItemProps> = (props) => {
  const { action } = props;
  const item = <ActionItem {...props} isAllowed />;

  return action.tooltip ? (
    <Tooltip position="left" content={action.tooltip}>
      {item}
    </Tooltip>
  ) : (
    item
  );
};

export default ActionMenuItem;

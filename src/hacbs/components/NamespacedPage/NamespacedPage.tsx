import React from 'react';
import { Bullseye, Spinner } from '@patternfly/react-core';
import { useActiveNamespace } from '../../hooks';
import AppBanner from '../AppBanner/AppBanner';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';

import './NamespacedPage.scss';

type NamespaceContextData = {
  namespace: string;
};

export const NamespaceContext = React.createContext<NamespaceContextData>({
  namespace: '',
});

type NamespacedPageProps = {
  children: React.ReactNode;
};

const NamespacedPage: React.FunctionComponent<NamespacedPageProps> = ({ children }) => {
  const [activeNamepace, namespaceLoaded] = useActiveNamespace();

  if (!namespaceLoaded) {
    return (
      <Bullseye>
        <Spinner />
      </Bullseye>
    );
  }

  return (
    <NamespaceContext.Provider value={{ namespace: activeNamepace }}>
      <AppBanner />
      <ErrorBoundary>{children}</ErrorBoundary>
    </NamespaceContext.Provider>
  );
};

export default NamespacedPage;

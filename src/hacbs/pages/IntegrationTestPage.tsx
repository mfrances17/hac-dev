import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import NamespacedPage from '../../components/NamespacedPage/NamespacedPage';
import IntegrationEditTestView from '../components/IntegrationTestForm/IntegrationEditTestView';
import IntegrationTestView from '../components/IntegrationTestForm/IntegrationTestView';

const IntegrationTestPage: React.FunctionComponent = () => {
  const { appName, testName } = useParams();

  return (
    <NamespacedPage>
      <Helmet>
        <title>Create integration test</title>
      </Helmet>
      {testName ? (
        <IntegrationEditTestView applicationName={appName} integrationTestName={testName} />
      ) : (
        <IntegrationTestView applicationName={appName} />
      )}
    </NamespacedPage>
  );
};

export default IntegrationTestPage;

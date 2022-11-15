import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useK8sWatchResource } from '@openshift/dynamic-plugin-sdk-utils';
import { Bullseye, Spinner } from '@patternfly/react-core';
import { Formik } from 'formik';
import { useNamespace } from '../../../utils/namespace-context-utils';
import { IntegrationTestScenarioGroupVersionKind } from '../../models/hacbs';
import { IntegrationTestScenarioKind } from '../../types/coreBuildService';
import { createIntegrationTest } from '../ImportForm/create-utils';
import { IntegrationTestLabels } from '../ImportForm/types';
import { integrationTestValidationSchema } from '../ImportForm/utils/validation-utils';
import IntegrationTestForm from './IntegrationTestForm';

type IntegrationTestViewProps = {
  applicationName: string;
  integrationTestName?: string;
};

const IntegrationTestView: React.FunctionComponent<IntegrationTestViewProps> = ({
  applicationName,
  integrationTestName,
}) => {
  const navigate = useNavigate();
  const namespace = useNamespace();

  let savedValues = {};

  const [intTest, loaded] = useK8sWatchResource<IntegrationTestScenarioKind>({
    groupVersionKind: IntegrationTestScenarioGroupVersionKind,
    name: integrationTestName,
    namespace,
  });

  const loading = (
    <Bullseye>
      <Spinner data-test="spinner" />
    </Bullseye>
  );

  if (!loaded) {
    return loading;
  }

  if (integrationTestName) {
    const optionalReleaseLabel =
      intTest.metadata.labels && intTest.metadata.labels[IntegrationTestLabels.OPTIONAL];

    savedValues = {
      integrationTest: {
        name: intTest.metadata.name,
        bundle: intTest.spec.bundle,
        pipeline: intTest.spec.pipeline,
        optional: optionalReleaseLabel ? true : false,
      },
      isDetected: '',
    };
  }

  const initialValues = {
    integrationTest: {
      name: '',
      bundle: '',
      pipeline: '',
      optional: false,
    },
    isDetected: true,
  };

  const handleSubmit = (values, actions) => {
    return createIntegrationTest(values.integrationTest, applicationName, namespace)
      .then(() => {
        navigate(`/app-studio/applications/${applicationName}?activeTab=integrationtests`);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.warn('Error while submitting integration test:', error);
        actions.setSubmitting(false);
        actions.setStatus({ submitError: error.message });
      });
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      onReset={() => navigate(-1)}
      initialValues={integrationTestName ? savedValues : initialValues}
      validationSchema={integrationTestValidationSchema}
    >
      {(props) => (
        <IntegrationTestForm
          applicationName={applicationName}
          integrationTestName={integrationTestName}
          {...props}
        />
      )}
    </Formik>
  );
};

export default IntegrationTestView;

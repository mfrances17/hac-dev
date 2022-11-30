import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  // k8sUpdateResource,
  useK8sWatchResource,
} from '@openshift/dynamic-plugin-sdk-utils';
import { Bullseye, Spinner } from '@patternfly/react-core';
import { Formik } from 'formik';
import { useNamespace } from '../../../utils/namespace-context-utils';
import {
  IntegrationTestScenarioGroupVersionKind,
  // IntegrationTestScenarioModel,
} from '../../models/hacbs';
import { IntegrationTestScenarioKind } from '../../types/coreBuildService';
import { IntegrationTestLabels } from '../ImportForm/types';
import { integrationTestValidationSchema } from '../ImportForm/utils/validation-utils';
import IntegrationTestForm from './IntegrationTestForm';

type IntegrationTestViewProps = {
  applicationName: string;
  integrationTestName?: string;
};

const IntegrationEditTestView: React.FunctionComponent<IntegrationTestViewProps> = ({
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
      isDetected: true,
    };
  }
  // Uncaught (in promise) Error: Resource payload name not specified
  const updateIntegrationTest = (values) => {
    // eslint-disable-next-line no-console
    console.log(`values: ${JSON.stringify(values, null, 4)}`);
    // try {
    //   k8sUpdateResource({
    //     model: IntegrationTestScenarioModel,
    //     resource: values.integrationTest,
    //     },
    //  )
    //     .then(() => {
    //       navigate(`/app-studio/applications/${applicationName}?activeTab=integrationtests`);
    //     });
    // } catch (error) {
    //   // eslint-disable-next-line no-console
    //   console.warn('Error while updating integration test:', error);
    // }
  };

  const handleSubmit = (values) => {
    // not working yet
    return updateIntegrationTest(values);
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      onReset={() => navigate(-1)}
      initialValues={savedValues}
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

export default IntegrationEditTestView;

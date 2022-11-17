import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  // k8sPatchResource,
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

  // const updateIntegrationTest = (values) => {
  //   try {
  //     k8sPatchResource({
  //       model: IntegrationTestScenarioModel,
  //       queryOptions: {
  //         name: intTest.metadata.name,
  //         ns: intTest.metadata.namespace,
  //       },
  //       patches: [{ op: 'replace', path: '/spec/IntegrationTest', value: values }],
  //     });
  //   } catch {
  //     (error) => {
  //       console.warn('Error while updating integration test:', error);
  //     };
  //   }
  // };

  // const handleSubmit = (values) => {
  //   // not working yet
  //   return updateIntegrationTest(values.integrationTest);
  // };
  const handleSubmit = () => {};

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

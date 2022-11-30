import React from 'react';
import { Form, FormSection, PageSection, PageSectionVariants } from '@patternfly/react-core';
import { useFormikContext } from 'formik';
import isEmpty from 'lodash/isEmpty';
import PageLayout from '../../../components/PageLayout/PageLayout';
import { FormFooter } from '../../../shared';
import IntegrationTestSection from './IntegrationTestSection';

import '../../../shared/style.scss';

type IntegrationTestFormProps = {
  applicationName: string;
  integrationTestName?: string;
};

const IntegrationTestForm: React.FunctionComponent<IntegrationTestFormProps> = ({
  applicationName,
  integrationTestName,
}) => {
  const { dirty, handleSubmit, handleReset, isSubmitting, status, errors } = useFormikContext();
  const footer = (
    <FormFooter
      submitLabel={`${!integrationTestName ? 'Add' : 'Save'} integration test`}
      handleCancel={handleReset}
      handleSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      disableSubmit={!dirty || !isEmpty(errors) || isSubmitting}
      errorMessage={status?.submitError}
    />
  );

  return (
    <PageLayout
      breadcrumbs={[
        { path: '/app-studio/applications', name: 'Applications' },
        { path: `/app-studio/applications/${applicationName}`, name: applicationName },
        {
          path: `/app-studio/applications/${applicationName}?activeTab=integrationtests`,
          name: 'Integration tests',
        },
        { path: '#', name: 'Integration test' },
      ]}
      title={`${!integrationTestName ? 'Add' : 'Edit'} integration test`}
      description={
        <>
          Specify an integration test to test all your components.
          <br />
          By default, previous GitHub credentials will be used to validate your URL. If it fails,
          you must revalidate with a different repo.
          <br />
        </>
      }
      footer={footer}
    >
      <PageSection isFilled variant={PageSectionVariants.light}>
        <Form onSubmit={handleSubmit}>
          <FormSection>
            <IntegrationTestSection isInPage integrationTestName={integrationTestName} />
          </FormSection>
        </Form>
      </PageSection>
    </PageLayout>
  );
};

export default IntegrationTestForm;

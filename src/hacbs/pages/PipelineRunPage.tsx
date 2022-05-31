import React from 'react';
import { Helmet } from 'react-helmet';
import { PageSection, PageSectionVariants } from '@patternfly/react-core';
// import PipelineDetailsView from '../components/PipelineDetailsView/PipelineDetailsView';
import NamespacedPage from '../../components/NamespacedPage/NamespacedPage';
import PageLayout from '../../components/PageLayout/PageLayout';
import { useQuickstartCloseOnUnmount } from '../../hooks/useQuickstartCloseOnUnmount';
import { getQueryArgument } from '../../shared/utils';
import PipelineRunsListView from '../components/pipelineruns/PipelineRunListView/PipelineRunsListView';

const PipelineRunPage = () => {
  useQuickstartCloseOnUnmount();
  const applicationName = getQueryArgument('name');

  return (
    <NamespacedPage>
      {applicationName ? (
        <React.Fragment>
          <Helmet>
            <title>Pipeline Run Details Page</title>
          </Helmet>
          {/* <PipelineDetailsView applicationName={applicationName} /> */}
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Helmet>
            <title>Pipeline Runs List Page</title>
          </Helmet>
          <PageLayout title="Pipelines" description="Pipeline runs are listed here.">
            <PageSection
              padding={{ default: 'noPadding' }}
              variant={PageSectionVariants.light}
              isFilled
            >
              <PipelineRunsListView />
            </PageSection>
          </PageLayout>
        </React.Fragment>
      )}
    </NamespacedPage>
  );
};

export default PipelineRunPage;

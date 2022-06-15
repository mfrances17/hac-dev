import React from 'react';
import { Helmet } from 'react-helmet';
import { PageSection, PageSectionVariants } from '@patternfly/react-core';
import NamespacedPage from '../../components/NamespacedPage/NamespacedPage';
import PageLayout from '../../components/PageLayout/PageLayout';
import { useQuickstartCloseOnUnmount } from '../../hooks/useQuickstartCloseOnUnmount';
import { getQueryArgument } from '../../shared/utils';
import PipelineDetailsView from '../components/PipelineRunDetailsView/PipelineRunDetailsView';
import PipelineRunsListView from '../components/PipelineRunListView/PipelineRunsListView';

const PipelineRunPage = () => {
  useQuickstartCloseOnUnmount();
  const pipelineRunName = getQueryArgument('name');

  return (
    <NamespacedPage>
      {pipelineRunName ? (
        <React.Fragment>
          <Helmet>
            <title>Pipeline Run Details Page</title>
          </Helmet>
          <PipelineDetailsView />
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

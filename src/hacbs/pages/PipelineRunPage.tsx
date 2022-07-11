import React from 'react';
import { Helmet } from 'react-helmet';
import { PageSection, PageSectionVariants } from '@patternfly/react-core';
import NamespacedPage from '../../components/NamespacedPage/NamespacedPage';
import PageLayout from '../../components/PageLayout/PageLayout';
import { useQuickstartCloseOnUnmount } from '../../hooks/useQuickstartCloseOnUnmount';
import { getQueryArgument } from '../../shared/utils';
import { PipelineRunDetailsView } from '../components/PipelineRunDetailsView/PipelineRunDetailsView';
import { PipelineRunListView } from '../components/PipelineRunListView/PipelineRunListView';

const PipelineRunPage = () => {
  useQuickstartCloseOnUnmount();
  const pipelineRunName = getQueryArgument('name');

  return (
    <NamespacedPage>
      {pipelineRunName ? (
        <React.Fragment>
          <Helmet>
            <title>PipelineRun Details Page</title>
          </Helmet>
          <PipelineRunDetailsView pipelineRunName={pipelineRunName} />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Helmet>
            <title>PipelineRuns List Page</title>
          </Helmet>
          <PageLayout title="PipelineRuns" description="PipelineRuns are listed here.">
            <PageSection
              padding={{ default: 'noPadding' }}
              variant={PageSectionVariants.light}
              isFilled
            >
              <PipelineRunListView />
            </PageSection>
          </PageLayout>
        </React.Fragment>
      )}
    </NamespacedPage>
  );
};

export default PipelineRunPage;

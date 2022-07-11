import * as React from 'react';
import { Link } from 'react-router-dom';
import { useK8sWatchResource } from '@openshift/dynamic-plugin-sdk-utils';
import {
  Bullseye,
  Button,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateVariant,
  Spinner,
  Title,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from '@patternfly/react-core';
import { CubesIcon } from '@patternfly/react-icons/dist/esm/icons/cubes-icon';
import { NamespaceContext } from '../../../components/NamespacedPage/NamespacedPage';
import { Table } from '../../../shared';
import { PipelineRunGroupVersionKind } from '../../models';
import { PipelineRunKind } from '../../types';
import { PipelineRunListHeader } from './PipelineRunListHeader';
import PipelineRunListRow from './PipelineRunListRow';

export const PipelineRunListView: React.FC = () => {
  const { namespace } = React.useContext(NamespaceContext);

  const [pipelineRuns, loaded] = useK8sWatchResource<PipelineRunKind[]>({
    groupVersionKind: PipelineRunGroupVersionKind,
    namespace,
    isList: true,
  });

  if (!loaded) {
    return (
      <Bullseye>
        <Spinner />
      </Bullseye>
    );
  }

  pipelineRuns?.sort(
    (app1, app2) =>
      +new Date(app2.metadata.creationTimestamp) - +new Date(app1.metadata.creationTimestamp),
  );

  if (!pipelineRuns || pipelineRuns.length === 0) {
    return (
      <EmptyState variant={EmptyStateVariant.large}>
        <EmptyStateIcon icon={CubesIcon} />
        <Title headingLevel="h4" size="lg">
          No PipelineRuns
        </Title>
        <EmptyStateBody>To get started, create a PipelineRun.</EmptyStateBody>
        <Button
          variant="primary"
          component={(props) => <Link {...props} to="/app-studio/import" />}
        >
          Create PipelineRun
        </Button>
      </EmptyState>
    );
  }

  return (
    <>
      <Toolbar usePageInsets>
        <ToolbarContent>
          <ToolbarItem>
            <Button
              variant="primary"
              component={(props) => <Link {...props} to="/app-studio/import" />}
            >
              Create PipelineRun
            </Button>
          </ToolbarItem>
        </ToolbarContent>
      </Toolbar>
      <Table
        data={pipelineRuns}
        aria-label="PipelineRun List"
        Header={PipelineRunListHeader}
        Row={PipelineRunListRow}
        loaded={loaded}
        getRowProps={(obj: PipelineRunKind) => ({
          id: obj.metadata.name,
        })}
      />
    </>
  );
};

export default PipelineRunListView;

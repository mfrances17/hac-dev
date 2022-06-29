import * as React from 'react';
import { useK8sWatchResource } from '@openshift/dynamic-plugin-sdk-utils';
import { Bullseye, Spinner } from '@patternfly/react-core';
import { NamespaceContext } from '../../../components/NamespacedPage/NamespacedPage';
import { PipelineRunGroupVersionKind } from '../../models';
import { PipelineRunKind } from '../../types';
import { calculateDuration } from '../../utils/pipeline-utils';
import './PipelineRunDetailsView.scss';

export interface PipelineRunDetailsProps {}

export const PipelineRunsDetailsView: React.FC<PipelineRunDetailsProps> = () => {
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

  const pipelineRun = pipelineRuns[0];

  const duration = calculateDuration(
    typeof pipelineRun.status.startTime === 'string' ? pipelineRun.status.startTime : '',
    typeof pipelineRun.status.completionTime === 'string' ? pipelineRun.status.completionTime : '',
  );

  return (
    <>
      <div className="co-m-pane__body odc-pipeline-run-details">
        <dt className="hacbs-dt">Name</dt>
        <dd className="hacbs-dd">{pipelineRun.metadata.name}</dd>

        <dt className="hacbs-dt">Namespace</dt>
        <dd className="hacbs-dd">{pipelineRun.metadata.namespace}</dd>

        <dt className="hacbs-dt">Labels</dt>
        <dd className="hacbs-dd">{'---'}</dd>

        <dt className="hacbs-dt">Created at</dt>
        <dd className="hacbs-dd">{'---'}</dd>

        <dt className="hacbs-dt">Owner</dt>
        <dd className="hacbs-dd">{'---'}</dd>

        <dt className="hacbs-dt">Duration:</dt>
        <dd className="hacbs-dd">{duration}</dd>

        <dt className="hacbs-dt">Status</dt>
        <dd className="hacbs-dd">
          {pipelineRun.status.conditions[0].status === 'False' ? 'Failed' : 'Succeeded'}
        </dd>

        <dt className="hacbs-dt">Message</dt>
        <dd className="hacbs-dd"> {pipelineRun.status.conditions[0].message}</dd>

        <dt className="hacbs-dt">Log snippet</dt>
        <dd className="hacbs-dd">{'---'}</dd>

        <dt className="hacbs-dt">Triggered by</dt>
        <dd className="hacbs-dd">{'---'}</dd>

        <dt className="hacbs-dt">Application</dt>
        <dd className="hacbs-dd">{'---'}</dd>

        <dt className="hacbs-dt">Component</dt>
        <dd className="hacbs-dd">
          {pipelineRun.metadata.labels['build.appstudio.openshift.io/component']}
        </dd>

        <dt className="hacbs-dt">Source</dt>
        <dd className="hacbs-dd">{'---'}</dd>

        <dt className="hacbs-dt">Workspace</dt>
        <dd className="hacbs-dd">{'---'}</dd>

        <dt className="hacbs-dt">Compliance</dt>
        <dd className="hacbs-dd">{'---'}</dd>

        <dt className="hacbs-dt">Environment</dt>
        <dd className="hacbs-dd">{'---'}</dd>
      </div>
    </>
  );
};

export default PipelineRunsDetailsView;

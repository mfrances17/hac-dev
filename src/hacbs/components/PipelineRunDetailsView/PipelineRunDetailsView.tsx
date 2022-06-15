import * as React from 'react';
import { useK8sWatchResource } from '@openshift/dynamic-plugin-sdk-utils';
import { Bullseye, Spinner } from '@patternfly/react-core';
import { NamespaceContext } from '../../../components/NamespacedPage/NamespacedPage';
import { PipelineRunGroupVersionKind } from '../../../models';
// import { useK8sWatchResource } from '../../../dynamic-plugin-sdk';
import { PipelineRunKind } from '../../types';
import { calculateDuration } from '../../utils/pipeline-utils';
import './TriggeredBySection.scss';
import './PipelineRunDetails.scss';

export interface PipelineRunDetailsProps {
  // obj: PipelineRunKind;
}

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

  // const allLabels = pipelineRun.metadata.labels;
  // console.log(Object.entries(allLabels));

  // allLabels.map(label =>

  //   const labelEquals = allLabels.ForEach(label) {
  //  }

  // console.log(pipelineRun);
  //   console.log(pipelineRun.metadata.labels['build.appstudio.openshift.io/component']);

  return (
    <>
      <div className="co-m-pane__body odc-pipeline-run-details">
        {/* <PipelineRunDetailsSection pipelineRun={pipelineRuns} /> */}
        <dt className="dt">Name</dt>
        <dd className="dd">{pipelineRun.metadata.name}</dd>

        <dt className="dt">Namespace</dt>
        <dd className="dd">{pipelineRun.metadata.namespace}</dd>

        <dt className="dt">Labels</dt>
        <dd className="dd">{'---'}</dd>

        <dt className="dt">Created at</dt>
        <dd className="dd">{'---'}</dd>

        <dt className="dt">Owner</dt>
        <dd className="dd">{'---'}</dd>

        <dt className="dt">Duration:</dt>
        <dd className="dd">{duration}</dd>

        <dt className="dt">Status</dt>
        <dd className="dd">
          {pipelineRun.status.conditions[0].status === 'False' ? 'Failed' : 'Succeeded'}
        </dd>

        <dt className="dt">Message</dt>
        <dd className="dd"> {pipelineRun.status.conditions[0].message}</dd>

        <dt className="dt">Log snippet</dt>
        <dd className="dd">{'---'}</dd>

        <dt className="dt">Triggered by</dt>
        <dd className="dd">{'---'}</dd>

        <dt className="dt">Application</dt>
        <dd className="dd">{'---'}</dd>

        <dt className="dt">Component</dt>
        <dd className="dd">
          {pipelineRun.metadata.labels['build.appstudio.openshift.io/component']}
        </dd>

        <dt className="dt">Source</dt>
        <dd className="dd">{'---'}</dd>

        <dt className="dt">Workspace</dt>
        <dd className="dd">{'---'}</dd>

        <dt className="dt">Compliance</dt>
        <dd className="dd">{'---'}</dd>

        <dt className="dt">Environment</dt>
        <dd className="dd">{'---'}</dd>
      </div>
    </>
  );
};

export default PipelineRunsDetailsView;

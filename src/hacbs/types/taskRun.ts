import { K8sResourceCommon } from '@openshift/dynamic-plugin-sdk-utils';
import {
  Condition,
  PipelineTaskParam,
  PipelineTaskRef,
  PLRTaskRunStep,
  TektonResource,
  TektonResultsRun,
  TektonTaskSpec,
  VolumeClaimTemplateType,
  VolumeTypeConfigMaps,
  VolumeTypePVC,
  VolumeTypeSecret,
} from './../../hacbs/shared/components/pipeline-run-logs/types';

export type TaskRunWorkspace = {
  name: string;
  volumeClaimTemplate?: VolumeClaimTemplateType;
  persistentVolumeClaim?: VolumeTypePVC;
  configMap?: VolumeTypeConfigMaps;
  emptyDir?: {};
  secret?: VolumeTypeSecret;
  subPath?: string;
};

export type TaskRunStatus = {
  completionTime?: string;
  conditions?: Condition[];
  podName?: string;
  startTime?: string;
  steps?: PLRTaskRunStep[];
  taskResults?: TektonResultsRun[];
};

export type TaskRunKind = K8sResourceCommon & {
  spec: {
    taskRef?: PipelineTaskRef;
    taskSpec?: TektonTaskSpec;
    serviceAccountName?: string;
    params?: PipelineTaskParam[];
    resources?: TektonResource[];
    timeout?: string;
    workspaces?: TaskRunWorkspace[];
  };
  status?: TaskRunStatus;
};

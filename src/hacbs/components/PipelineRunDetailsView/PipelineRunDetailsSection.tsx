import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { SectionHeading } from '../../shared/utils/headings';
import { PipelineRunKind } from '../../types';

export interface PipelineRunDetailsSectionProps {
  pipelineRun: PipelineRunKind;
}

const PipelineRunDetailsSection: React.FC<PipelineRunDetailsSectionProps> = ({ pipelineRun }) => {
  const { t } = useTranslation();
  return (
    <>
      <SectionHeading text={t('pipelines-plugin~PipelineRun details')} />
      <div className="row">
        <div className="col-sm-6">{pipelineRun.metadata.name}</div>
        <div className="col-sm-6">{/* <ResourceSummary resource={pipelineRun} /> */}</div>
      </div>
    </>
  );
};

export default PipelineRunDetailsSection;

import * as React from 'react';
import { Link } from 'react-router-dom';
import { EllipsisVIcon } from '@patternfly/react-icons/dist/js/icons';
import { RowFunctionArgs, TableData } from '../../../../shared/components/table';
import { Timestamp } from '../../../../shared/components/timestamp/Timestamp';
import { PipelineRunKind } from '../../../../types';
import { calculateDuration } from './pipeline-utils';
import { pipelineRunTableColumnClasses } from './PipelineRunListHeader';

const PipelineListRow: React.FC<RowFunctionArgs<PipelineRunKind>> = ({ obj }) => {
  return (
    <>
      <TableData className={pipelineRunTableColumnClasses.name}>
        <Link to={`/app-studio/pipelineruns?name=${obj.metadata.name}`} title={obj.metadata.name}>
          {obj.metadata.name}
        </Link>
      </TableData>
      <TableData className={pipelineRunTableColumnClasses.namespace}>
        {obj.metadata.namespace}
      </TableData>
      <TableData className={pipelineRunTableColumnClasses.status}>
        {obj.status.conditions[0].status === 'False' ? 'Failed' : 'Succeeded'}
      </TableData>
      <TableData className={pipelineRunTableColumnClasses.taskstatus}>
        {obj.status.conditions[0].status === 'False' ? 'Failed' : 'Succeeded'}
      </TableData>
      <TableData className={pipelineRunTableColumnClasses.started}>
        <Timestamp
          timestamp={typeof obj.status.startTime === 'string' ? obj.status.startTime : ''}
        />
      </TableData>
      <TableData className={pipelineRunTableColumnClasses.duration}>
        {calculateDuration(
          typeof obj.status.startTime === 'string' ? obj.status.startTime : '',
          typeof obj.status.completionTime === 'string' ? obj.status.completionTime : '',
        )}
      </TableData>
      <TableData className={pipelineRunTableColumnClasses.kebab}>
        <EllipsisVIcon />
      </TableData>
    </>
  );
};

export default PipelineListRow;

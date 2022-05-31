export const pipelineRunTableColumnClasses = {
  name: 'pf-m-width-20',
  namespace: 'pf-m-width-15',
  status: 'pf-m-width-15',
  taskstatus: 'pf-m-width-15',
  started: 'pf-m-width-15',
  duration: 'pf-m-hidden pf-m-visible-on-xl',
  kebab: 'dropdown-kebab-pf pf-c-table__action',
};

export const PipelineRunListHeader = () => {
  return [
    {
      title: 'Name',
      props: { className: pipelineRunTableColumnClasses.name },
    },
    {
      title: 'Namespace',
      props: { className: pipelineRunTableColumnClasses.namespace },
    },
    {
      title: 'Status',
      props: { className: pipelineRunTableColumnClasses.status },
    },
    {
      title: 'Task Status',
      props: { className: pipelineRunTableColumnClasses.taskstatus },
    },
    {
      title: 'Started',
      props: { className: pipelineRunTableColumnClasses.started },
    },
    {
      title: 'Duration',
      props: { className: pipelineRunTableColumnClasses.duration },
    },
    {
      title: '',
      props: { className: pipelineRunTableColumnClasses.kebab },
    },
  ];
};

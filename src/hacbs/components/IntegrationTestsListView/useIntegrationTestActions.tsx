import { createDeleteModalLauncher } from '../../../components/modal/DeleteResourceModal';
import { useModalLauncher } from '../../../components/modal/ModalProvider';
import { Action } from '../../../shared/components/action-menu/types';
import { IntegrationTestScenarioModel } from '../../models';
import { IntegrationTestScenarioKind } from '../../types/coreBuildService';

export const integrationTestDeleteModal = (integrationTestObj: IntegrationTestScenarioKind) =>
  createDeleteModalLauncher(integrationTestObj.kind)({
    obj: integrationTestObj,
    model: IntegrationTestScenarioModel,
    displayName: integrationTestObj.metadata.name,
  });

export const integrationTestDeleteModalAndNavigate = (
  integrationTestObj: IntegrationTestScenarioKind,
) =>
  createDeleteModalLauncher(integrationTestObj.kind)({
    obj: integrationTestObj,
    model: IntegrationTestScenarioModel,
    displayName: integrationTestObj.metadata.name,
    isEntryNotRequired: true,
  });

export const useIntegrationTestActions = (
  integrationTest: IntegrationTestScenarioKind,
): Action[] => {
  const showModal = useModalLauncher();
  return [
    {
      cta: () => showModal(integrationTestDeleteModal(integrationTest)),
      id: `delete-${integrationTest.metadata.name.toLowerCase()}`,
      label: 'Remove',
    },
    {
      cta: {
        href: `/app-studio/applications/${
          integrationTest.spec.application
        }/integration-test/${integrationTest.metadata.name.toLowerCase()}`,
      },
      id: `edit-${integrationTest.metadata.name.toLowerCase()}`,
      label: 'Edit',
    },
  ];
};

// import React from 'react';
// import { Helmet } from 'react-helmet';
// import { PageSection, PageSectionVariants } from '@patternfly/react-core';
// // import PipelineDetailsView from '../components/PipelineDetailsView/PipelineDetailsView';
// import NamespacedPage from '../../components/NamespacedPage/NamespacedPage';
// import PageLayout from '../../components/PageLayout/PageLayout';
// import { useQuickstartCloseOnUnmount } from '../../hooks/useQuickstartCloseOnUnmount';
// import { getQueryArgument } from '../../shared/utils';
// // import { PipelineRunDetails } from '../components/pipelineruns/PipelineRunDetailsView/PipelineRunDetailsView';

// const PipelineRunDetailsPage = () => {
//   useQuickstartCloseOnUnmount();
//   const applicationName = getQueryArgument('name');

//   console.log(`application name is: ${applicationName}`);

//   return (
//     <NamespacedPage>
//       {applicationName ? (
//         <React.Fragment>
//           <Helmet>
//             <title>Pipeline Run Details Page</title>
//           </Helmet>
//           {/* <PipelineRunDetails obj={applicationName} /> */}
//         </React.Fragment>
//       ) : (
//         <React.Fragment>
//           <Helmet>
//             <title>Pipeline Runs Details Page</title>
//           </Helmet>
//           <PageLayout title="Pipelines" description="Pipeline run details are shown here.">
//             <PageSection
//               padding={{ default: 'noPadding' }}
//               variant={PageSectionVariants.light}
//               isFilled
//             >
//               {/* <PipelineRunDetails obj /> */}
//             </PageSection>
//           </PageLayout>
//         </React.Fragment>
//       )}
//     </NamespacedPage>
//   );
// };

// export default PipelineRunDetailsPage;

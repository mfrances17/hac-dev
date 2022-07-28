import * as React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import '@patternfly/quickstarts/dist/quickstarts.min.css';
import {
  QuickStartContainer,
  QuickStartCatalogPage,
  useLocalStorage,
  setQueryArgument,
  removeQueryArgument,
  QUICKSTART_ID_FILTER_KEY,
} from '@patternfly/quickstarts';
import { Button } from '@patternfly/react-core';
import jsYaml from 'js-yaml';
// quick start files could be yaml files or js files, or really anything,
// as long as they get parsed out to the expected JSON format

const HacbsApplicationQuickStart = () => {
  const [quickStarts, setQuickStarts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // You can use the useLocalStorage hook if you want to store user progress in local storage
  // Otherwise you can use React.useState here or another means (backend) to store the active quick start ID and state
  const [activeQuickStartID, setActiveQuickStartID] = useLocalStorage('quickstartId', '');
  const [allQuickStartStates, setAllQuickStartStates] = useLocalStorage('quickstarts', {});
  // or
  // const [activeQuickStartID, setActiveQuickStartID] = React.useState("");
  // const [allQuickStartStates, setAllQuickStartStates] = React.useState({});

  React.useEffect(() => {
    const loadedQuickStarts = [jsYaml.load('./HacbsApplicationQsContent.yml')];
    setQuickStarts(loadedQuickStarts);
    setLoading(false);
  }, []);

  const withQueryParams = true;

  const drawerProps = {
    quickStarts,
    activeQuickStartID,
    allQuickStartStates,
    setActiveQuickStartID,
    setAllQuickStartStates,
    // Set to true to opt-out of default hidden card footers
    showCardFooters: false,
    // Set to true to opt-out of default drawer header colors of blue with white text
    useLegacyHeaderColors: false,
    loading,
    useQueryParams: withQueryParams,
  };

  const toggleQuickStart = (quickStartId: string) => {
    if (activeQuickStartID !== quickStartId) {
      // activate
      setActiveQuickStartID(quickStartId);
      // optionally add the browser URL query param
      withQueryParams && setQueryArgument(QUICKSTART_ID_FILTER_KEY, quickStartId);
    } else {
      // deactivate
      setActiveQuickStartID('');
      // optionally remove the browser URL query param
      withQueryParams && removeQueryArgument(QUICKSTART_ID_FILTER_KEY);
    }
  };

  return (
    <QuickStartContainer {...drawerProps}>
      <Button onClick={() => toggleQuickStart('node-with-s2i')}>
        Toggle quick start through prop
      </Button>
      <QuickStartCatalogPage
        showFilter
        title="Quick starts"
        hint="Learn how to create, import, and run applications with step-by-step instructions and tasks."
      />
    </QuickStartContainer>
  );
};

// const SomeNestedComponent = () => {
//   const qsContext = React.useContext(QuickStartContext);
//   // the quick start ID is defined in the quick start object's metadata.name field
//   return (
//     <button onClick={() => qsContext.setActiveQuickStart('monitor-sampleapp')}>
//       Toggle quick start through context
//     </button>
//   );
// };

export default HacbsApplicationQuickStart;

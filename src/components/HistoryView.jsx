import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { dummyList } from '../dummyData/data';
import HistoryViewQuery from './HistoryViewQuery';
import { getTimeline, setActiveQuery } from '../store/entities/apollo';

// export interface HistoryViewProps {}
const getTimelineData = getTimeline; // Per Redux Docs, defining outside component perserves memoized memory state

const HistoryView = () => {
  const dispatch = useDispatch();
  const queryHistory = useSelector(getTimelineData);
  const activeTimelineObj = useSelector((state) => state.apollo.activeQuery);
  const queries = [];
  const [activeQuery, changeActiveQuery] = React.useState(activeTimelineObj);
  React.useEffect(() => {
    if (activeQuery.id) {
      document.getElementById(activeQuery.id).classList.add('active-query');
    }
  }, [activeQuery]);
  for (let i = 0; i < queryHistory.length; i += 1) {
    const timelineObj = queryHistory[i];
    queries.push(
      <HistoryViewQuery
        key={timelineObj.id}
        id={timelineObj.id}
        timelineObj={timelineObj}
        onClick={() => {
          if (activeQuery.id)
            document.getElementById(activeQuery.id).classList.remove('active-query');
          changeActiveQuery(timelineObj);
          dispatch(setActiveQuery(timelineObj.id));
        }}
      />
    );
  }

  return (
    <div className="history-view">
      <h1>Queries</h1>
      {activeTimelineObj.type && (
        <h2>
          ActiveQuery:
          {` ${activeTimelineObj.type} ${activeTimelineObj.id}`}
        </h2>
      )}
      <div className="query-cards">{queries}</div>
    </div>
  );
};

export default HistoryView;

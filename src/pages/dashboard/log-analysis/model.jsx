import {
  staticSankyData,
  staticScatterplotData,
  staticCalendarData,
  staticReportableEventsData,
  staticRadarData,
  staticBehavior2vecData,
  staticParallelData,
} from './service';

const initState = {
  params: {
    startTime: '',
    endTime: '',
    currentUser: '',
  },
  sankeyData: {},
  scatterplotData: {},
  calendarData: [],
  reportableEventsData: [],
  radarData: {},
  behavior2vecData: {},
  parallelData: []
};
const Model = {
  namespace: 'logAnalysis',
  state: initState,
  effects: {

    *fetchSankeyData(_, { call, put }) {
      const response = yield call(staticSankyData);
      yield put({
        type: 'save',
        payload: { sankeyData: response },
      });
    },

    *fetchScatterplotData(_, { call, put }) {
      const response = yield call(staticScatterplotData);
      yield put({
        type: 'save',
        payload: { scatterplotData: response },
      });
    },

    *fetchCalendarData(_, { call, put }) {
      const response = yield call(staticCalendarData);
      yield put({
        type: 'save',
        payload: { calendarData: response },
      });
    },

    *fetchReportableEventsData(_, { call, put }) {
      const response = yield call(staticReportableEventsData);
      yield put({
        type: 'save',
        payload: { reportableEventsData: response },
      });
    },

    *fetchRadarData(_, { call, put }) {
      const response = yield call(staticRadarData);
      yield put({
        type: 'save',
        payload: { radarData: response },
      });
    },

    *fetchBehavior2vecData(_, { call, put }) {
      const response = yield call(staticBehavior2vecData);
      yield put({
        type: 'save',
        payload: { behavior2vecData: response },
      });
    },

    *fetchParallelData(_, { call, put }) {
      const response = yield call(staticParallelData);
      yield put({
        type: 'save',
        payload: { parallelData: response },
      });
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },

    setOptions(state, { payload }) {
      const params = { ...state.params, ...payload };
      return { ...state, ...{ params } };
    },

    clear() {
      return initState;
    },
  },
};
export default Model;

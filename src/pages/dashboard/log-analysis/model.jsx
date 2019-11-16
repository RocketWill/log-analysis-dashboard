import {
  fakeChartData,
  staticSankyData,
  staticScatterplotData,
  staticCalendarData,
  staticReportableEventsData,
  staticRadarData,
  staticBehavior2vecData,
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
  behavior2vecData: {}
};
const Model = {
  namespace: 'logAnalysis',
  state: initState,
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(fakeChartData);
      yield put({
        type: 'save',
        payload: response,
      });
    },

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

    *fetchSalesData(_, { call, put }) {
      const response = yield call(fakeChartData);
      yield put({
        type: 'save',
        payload: {
          salesData: response.salesData,
        },
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

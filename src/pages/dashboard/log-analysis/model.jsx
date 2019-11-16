import { fakeChartData, staticSankyData, staticScatterplotData, staticCalendarData } from './service';

const initState = {
  params: {
    startTime: '',
    endTime: '',
    currentUser: ""
  },
  visitData: [],
  visitData2: [],
  salesData: [],
  searchData: [],
  offlineData: [],
  offlineChartData: [],
  salesTypeData: [],
  salesTypeDataOnline: [],
  salesTypeDataOffline: [],
  radarData: [],
  sankeyData: {},
  scatterplotData: {},
  calendarData: []
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
        payload: {sankeyData: response},
      });
    },

    *fetchScatterplotData(_, { call, put }) {
      const response = yield call(staticScatterplotData);
      yield put({
        type: 'save',
        payload: {scatterplotData: response},
      });
    },

    *fetchCalendarData(_, { call, put }) {
      const response = yield call(staticCalendarData);
      yield put({
        type: 'save',
        payload: {calendarData: response},
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

import { fakeChartData, staticSankyData, staticScatterplotData } from './service';

const initState = {
  params: {
    startTime: '',
    endTime: '',
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
  scatterplotData: {}
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

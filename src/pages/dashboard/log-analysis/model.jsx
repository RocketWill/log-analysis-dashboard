import { fakeChartData } from './service';

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

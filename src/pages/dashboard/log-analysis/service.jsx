import request from '@/utils/request';

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function staticSankyData() {
  return request('/api/static_sankey_data');
}

export async function staticScatterplotData() {
  return request('/api/static_scatterplot_data');
}
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

export async function staticCalendarData() {
  return request('/api/static_calendar_data');
}

export async function staticReportableEventsData() {
  return request('/api/static_reportable_events_data');
}

export async function staticRadarData() {
  return request('/api/static_radar_data');
}

export async function staticBehavior2vecData() {
  return request('/api/static_behavior2vec_data');
}

export async function staticParallelData() {
  return request('/api/static_parallel_data');
}
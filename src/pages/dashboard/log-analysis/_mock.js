import { staticSankeyData } from './static-data/staticSankeyData';
import { staticScatterplotData } from './static-data/staticScatterplotData';
import { staticCalendarData } from './static-data/staticCalendarData';
import { staticReportableEventsData } from './static-data/staticReportableEvents';
import { staticRadarData } from './static-data/staticRadarData';
import { staticBehavior2vecData } from './static-data/staticBehavior2vecData';
import { staticParalleldata } from './static-data/staticParallelData';

export default {
  'GET  /api/static_sankey_data': staticSankeyData,
  'GET  /api/static_scatterplot_data': staticScatterplotData(),
  'GET  /api/static_calendar_data': staticCalendarData,
  'GET  /api/static_reportable_events_data': staticReportableEventsData,
  'GET  /api/static_radar_data': staticRadarData,
  'GET  /api/static_behavior2vec_data': staticBehavior2vecData,
  'GET  /api/static_parallel_data': staticParalleldata,
};

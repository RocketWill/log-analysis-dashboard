import { Col, Dropdown, Icon, Menu, Row } from 'antd';
import React, { Component, Suspense } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from './style.less';

const Filters = React.lazy(() => import('./components/Filters'));
const FlowSankey = React.lazy(() => import('./components/system-level/Flow-Sankey'));
const Scatterplot = React.lazy(() => import('./components/system-level/Scatterplot'));
const Calendar = React.lazy(() => import('./components/user-level/Calendar'));
const ReportableEvents = React.lazy(() => import('./components/user-level/ReportableEvents'));
const Radar = React.lazy(() => import('./components/user-level/Radar'));
const Behavior2vec = React.lazy(() => import('./components/user-level/Behavior2vec'));
const Parallel = React.lazy(() => import('./components/user-level/Parallel'));

@connect(({ logAnalysis, loading }) => ({
  logAnalysis,
  loading: loading.effects['logAnalysis/fetch'],
}))
class Analysis extends Component {
  reqRef = 0;
  timeoutId = 0;

  componentDidMount() {}

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'logAnalysis/clear',
    });
    cancelAnimationFrame(this.reqRef);
    clearTimeout(this.timeoutId);
  }

  render() {
    return (
      <GridContent>
        <React.Fragment>
          <Row
            gutter={24}
            type="flex"
            style={{
              marginTop: 12,
            }}
          >
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={null}>
                <Filters />
              </Suspense>
            </Col>
          </Row>

          <Row
            gutter={24}
            type="flex"
            style={{
              marginTop: 24,
            }}
          >
            <Col span={14}>
              <Suspense fallback={null}>
                <FlowSankey />
              </Suspense>
            </Col>
            <Col span={10}>
              <Suspense fallback={null}>
                <Scatterplot />
              </Suspense>
            </Col>
          </Row>

          <Row
            gutter={24}
            type="flex"
            style={{
              marginTop: 24,
            }}
          >
            <Col span={10}>
              <Suspense fallback={null}>
                <Calendar />
              </Suspense>
            </Col>
            <Col span={6}>
              <Suspense fallback={null}>
                <ReportableEvents />
              </Suspense>
            </Col>
            <Col span={8}>
              <Suspense fallback={null}>
                <Radar />
              </Suspense>
            </Col>
          </Row>
          <Row
            gutter={24}
            type="flex"
            style={{
              marginTop: 24,
            }}
          >
            <Col span={24}>
              <Suspense fallback={null}>
                <Behavior2vec />
              </Suspense>
            </Col>
          </Row>
          <Row
            gutter={24}
            type="flex"
            style={{
              marginTop: 24,
            }}
          >
            <Col span={24}>
              <Suspense fallback={null}>
                <Parallel />
              </Suspense>
            </Col>
          </Row>
        </React.Fragment>
      </GridContent>
    );
  }
}

export default Analysis;

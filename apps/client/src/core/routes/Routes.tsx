import { lazy, Suspense } from 'react';
import Layout from '@templates/Layout';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoadingPage from '@components/commons/loading/LoadingPage';
import RoutesWithNotFound from '@routes/components/RoutesWithNotFound';

const IngestDatasetLayout = lazy(
  () => import('@/modules/ingest-dataset/container/IngestDatasetLayout'),
);
const Dashboard = lazy(() => import('@/modules/dashboard/container/DashboardLayout'));
const RecordData = lazy(() => import('@/modules/record-data/container/RecordDataLayout'));

function MainRoutes() {
  return (
    <Router>
      <Suspense fallback={<LoadingPage />}>
        <RoutesWithNotFound>
          <Route path='/' element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path='upload' element={<IngestDatasetLayout />} />
            <Route path='table' element={<RecordData />} />
          </Route>
        </RoutesWithNotFound>
      </Suspense>
    </Router>
  );
}

export default MainRoutes;

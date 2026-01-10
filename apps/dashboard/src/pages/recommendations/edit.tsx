import { useParams } from 'react-router-dom';

import { PageSpinner } from '@/components/page-spinner';
import { EmptyPage } from '@/views/pages/empty.page';
import { useGetRecommendationById } from '@/views/recommendation/api/recommendation.query';
import { FormUpdateRecommendation } from '@/views/recommendation/components/form-update-recommendation';

export default function RecommendationEditPage() {
  const recommendationId = useParams()['recommendation_id'] || '';

  const recommendationRes = useGetRecommendationById(recommendationId);

  if (recommendationRes.isPending) {
    return <PageSpinner />;
  }

  if (!recommendationRes.data?.data) {
    return <EmptyPage />;
  }

  return (
    <div>
      <FormUpdateRecommendation recommendation={recommendationRes.data?.data} />
    </div>
  );
}

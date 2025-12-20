import { Card, CardContent } from '@workspace/ui/components/card';

export default function DashboardPage() {
  return (
    <div className='grid auto-rows-min gap-4 grid-cols-3'>
      <Card>
        <CardContent>
          <h2>Total Transaction</h2>
          <p className='font-semibold text-3xl'>9</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <h2>Total Revenue</h2>
          <p className='font-semibold text-3xl'>9</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <h2>Average Revenue</h2>
          <p className='font-semibold text-3xl'>9</p>
        </CardContent>
      </Card>
    </div>
  );
}

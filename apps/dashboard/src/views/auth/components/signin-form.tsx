import { Card, CardContent } from '@workspace/ui/components/card';
import { Input } from '@workspace/ui/components/input';
import { Field, FieldLabel } from '@workspace/ui/components/field';

export function SignInForm() {
  return (
    <Card>
      <CardContent>
        <Field>
          <FieldLabel></FieldLabel>
        </Field>
        <Input />
      </CardContent>
    </Card>
  );
}

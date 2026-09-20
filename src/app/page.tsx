import { Badge } from '@radix-ui/themes';
import { TodoApp } from '@/features/todos/ui/TodoApp';
import { Page } from '@/ui/Page';
import { Muted, Title } from '@/ui/type';

export const dynamic = 'force-dynamic';

export default function Home() {
  const env = process.env.NEXT_PUBLIC_ENV ?? 'preview';
  return (
    <Page>
      <Badge color="jade" variant="surface">
        {env}
      </Badge>
      <Title>Todos</Title>
      <Muted>Anonymous session in this browser. Data is per user via RLS.</Muted>
      <TodoApp />
    </Page>
  );
}

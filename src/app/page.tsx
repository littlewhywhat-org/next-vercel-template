import { TodoApp } from '@/todos/ui/TodoApp';
import { Badge } from '@/ui/Badge';
import { Page } from '@/ui/Page';
import { Muted, Title } from '@/ui/type';

export const dynamic = 'force-dynamic';

export default function Home() {
  const env = process.env.NEXT_PUBLIC_ENV ?? 'preview';
  return (
    <Page>
      <Badge>{env}</Badge>
      <Title>Todos</Title>
      <Muted>Anonymous session in this browser. Data is per user via RLS.</Muted>
      <TodoApp />
    </Page>
  );
}

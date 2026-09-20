import { Badge, Box, Flex, Heading, Text } from '@radix-ui/themes';
import TodoList from '@/components/TodoList';

export const dynamic = 'force-dynamic';

export default function Home() {
  const env = process.env.NEXT_PUBLIC_ENV ?? 'preview';
  return (
    <Box asChild style={{ minHeight: '100vh', background: '#09090b' }}>
      <main>
        <Flex direction="column" align="center" gap="5" style={{ maxWidth: '40rem', margin: '0 auto', padding: '4rem 1.5rem' }}>
          <Badge color="jade" variant="surface">
            {env}
          </Badge>
          <Heading size="8">Todos</Heading>
          <Text color="gray" size="2">
            Anonymous session in this browser. Data is per user via RLS.
          </Text>
          <TodoList />
        </Flex>
      </main>
    </Box>
  );
}

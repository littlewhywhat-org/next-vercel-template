import { Box, Container } from '@radix-ui/themes';
import type { ReactNode } from 'react';
import { Stack } from '@/ui/Stack';

export function Page({ children }: { children: ReactNode }) {
  return (
    <Box asChild style={{ minHeight: '100vh', background: '#09090b' }}>
      <main>
        <Container size="2" px="4" py="9">
          <Stack gap="5" align="center">
            {children}
          </Stack>
        </Container>
      </main>
    </Box>
  );
}

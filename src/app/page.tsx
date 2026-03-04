import Hello from '@/components/Hello';
import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Link,
  Separator,
  Text,
} from '@radix-ui/themes';
import NextLink from 'next/link';

// paranoia - cache forever (until next deploy)
export const revalidate = false;
export const dynamic = 'force-static';

export default function Home() {
  const env = process.env.NEXT_PUBLIC_ENV ?? 'preview';
  const features = [
    {
      title: 'Radix Themes',
      description: 'Preconfigured design system with accessible building blocks and consistent styling.',
    },
    {
      title: 'CI-ready',
      description: 'Linting and type-check scripts wired for Vercel deployments out of the box.',
    },
    {
      title: 'API health route',
      description: 'Monitor deployments quickly with a built-in health check endpoint.',
    },
  ];

  return (
    <Box
      asChild
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at 0% 0%, rgba(129, 140, 248, 0.2), transparent 55%), radial-gradient(circle at 80% 0%, rgba(45, 212, 191, 0.18), transparent 60%), #09090b',
      }}
    >
      <main>
        <Flex
          direction="column"
          align="center"
          gap="6"
          style={{ maxWidth: '960px', margin: '0 auto', padding: '96px 24px', textAlign: 'center' }}
        >
          <Badge color="jade" variant="surface">
            Now shipping with Radix Themes
          </Badge>
          <Hello />
          <Text size="4" color="gray">
            Opinionated Next.js starter wired for Vercel — lean tooling, health checks, and a modern UI kit.
          </Text>

          <Flex gap="4" wrap="wrap" justify="center">
            <Button size="3" asChild>
              <NextLink href="/api/health">Check API Health</NextLink>
            </Button>
            <Button size="3" variant="soft" asChild>
              <Link href="https://nextjs.org/docs" target="_blank" rel="noreferrer">
                Next.js Docs
              </Link>
            </Button>
          </Flex>

          <Card
            variant="surface"
            size="4"
            style={{
              width: '100%',
              maxWidth: '520px',
              background:
                'linear-gradient(135deg, rgba(14, 165, 233, 0.18), transparent 60%), rgba(15, 23, 42, 0.85)',
            }}
          >
            <Flex direction="column" gap="3" align="center">
              <Badge color="blue" variant="soft">
                Active Environment
              </Badge>
              <Heading size="6" weight="bold">
                {env.toUpperCase()}
              </Heading>
              <Text size="2" color="gray">
                Tailor your deployment previews with <code>NEXT_PUBLIC_ENV</code>.
              </Text>
              <Separator orientation="horizontal" size="4" my="1" />
              <Text size="2" color="gray">
                Deploy to Vercel and your environment will surface right here.
              </Text>
            </Flex>
          </Card>

          <Flex gap="4" wrap="wrap" justify="center">
            {features.map((feature) => (
              <Card key={feature.title} size="3" variant="classic" style={{ width: '260px' }}>
                <Flex direction="column" gap="2" align="start">
                  <Heading as="h3" size="4">
                    {feature.title}
                  </Heading>
                  <Text size="2" color="gray" align="left">
                    {feature.description}
                  </Text>
                </Flex>
              </Card>
            ))}
          </Flex>
        </Flex>
      </main>
    </Box>
  );
}

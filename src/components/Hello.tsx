import { Heading, Text } from '@radix-ui/themes';

export default function Hello() {
  return (
    <Heading size="9" weight="bold" align="center">
      Launch faster with{' '}
      <Text as="span" color="indigo">
        Vibe
      </Text>
    </Heading>
  );
}

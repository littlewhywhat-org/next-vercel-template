import { Flex, type FlexProps } from '@radix-ui/themes';

export function Cluster({ gap = '2', ...props }: FlexProps) {
  return <Flex align="center" gap={gap} {...props} wrap="wrap" />;
}

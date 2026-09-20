import { Flex, type FlexProps } from '@radix-ui/themes';

export function Stack({ gap = '4', ...props }: FlexProps) {
  return <Flex gap={gap} {...props} direction="column" />;
}

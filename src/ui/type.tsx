import { Heading, Text, type HeadingProps, type TextProps } from '@radix-ui/themes';

export function Title(props: HeadingProps) {
  return <Heading {...props} size="8" />;
}

export function Body(props: TextProps) {
  return <Text {...props} size="3" />;
}

export function Muted(props: TextProps) {
  return <Text {...props} size="2" color="gray" />;
}

export function Label(props: TextProps) {
  return <Text {...props} size="1" weight="medium" />;
}

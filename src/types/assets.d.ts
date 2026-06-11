declare module "*.png" {
  const source: import("react-native").ImageSourcePropType;

  export default source;
}

declare module "*.svg" {
  const component: React.FC<import("react-native-svg").SvgProps>;

  export default component;
}

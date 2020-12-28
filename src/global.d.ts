declare module '@/assets/*' {
  const path: string;
  export default path;
}

declare module '*.css' {
  const css: { [k: string]: string };
  export default css;
}

declare module '*.scss' {
  const css: { [k: string]: string };
  export default css;
}

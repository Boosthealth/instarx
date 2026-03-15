declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      savvy: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

export {};

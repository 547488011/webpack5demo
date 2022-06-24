declare module '*.vue' {
    import { Component } from 'vue'
    const component: Component
    export default component
}
declare module '*.less'{
    const classes: { readonly [key: string]: string };
   export default classes;
}

declare module '*.svg';
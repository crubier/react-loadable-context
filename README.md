# react-loadable-context

Website at https://crubier.github.io/react-loadable-context/

A component to asynchronously load any object into the react context, for example when using [Code Splitting](https://webpack.js.org/guides/code-splitting/).

```
npm install --save react-loadable-context
```

Just like [the new context API](https://reactjs.org/docs/context.html), this function returns:

* A `Provider`, which injects the loaded object into the context as soon as the promise is resolved
* Various `Consumer` components, which gracefully handle loading and error states.

This is particularly usefull when creating libraries which interface react with third party heavy libraries, such as Cesium, vis.js, openlayers and others. The main "wrapper" component for the library uses the `Provider`. The various "elements" of the library use the `Consumer`.

Losely inspired by [react-loadable](https://github.com/jamiebuilds/react-loadable) and [the new context API](https://reactjs.org/docs/context.html).

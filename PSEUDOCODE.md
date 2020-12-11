work it out 😎

## main.js
imports `Vue` `App.vue` `router` `store`
creates new `Vue` instance with `App.vue` `router` and `store`
mounts to `#app`

## App.vue
`<router-view>`

## Home.vue
`<SprawlingCity />`
imports `SprawlingCity`

## SprawlingCity.vue
imports
`three` - ThreeJS
`OrbitControls` - ThreeJS Orbit Controls
`SCLogo` - Sprawling City svg logo
`TimesSolid` - close button svg

let `camera` `scene` `renderer`

**data**
`showHeader`
`showFooter`
`showButtons`
`showClose`

**methods**
`init()`
- `canvas` = #c
- `renderer` = new Three Web GL Renderer with `canvas`
- `scene` = new Three scene
- set `scene.background` to white
- 

`animate()`
`toggleUI()`

**mounted**
==init()==
==animate()==

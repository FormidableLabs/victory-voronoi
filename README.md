[![Travis Status][trav_img]][trav_site]

Victory Voronoi
=============

`victory-voronoi` draws an SVG voronoi chart with [React](https://github.com/facebook/react) and [D3](https://github.com/mbostock/d3). Styles and data can be customized by passing in your own values as properties to the component. Data changes are animated with [victory-animation](https://github.com/FormidableLabs/victory-animation).

##Examples

The plain component has baked-in sample data, style, angle, and sort defaults, so rendering the voronoi with no custom properties, like so:

``` javascript
<VictoryVoronoi/>
```

Will look like this:

[insert default state of voronoi image]

Pass your data in as an array of centriods:


## The API

### Props

All props are *optional*. They can be omitted and the component will
still render.

The following props are supported:

## Development

Please see [DEVELOPMENT](DEVELOPMENT.md)

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md)

[trav_img]: https://api.travis-ci.org/FormidableLabs/victory-pie.svg
[trav_site]: https://travis-ci.org/FormidableLabs/victory-pie

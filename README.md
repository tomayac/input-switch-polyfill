# `<input switch type="checkbox">` Polyfill

This project is a small, zero-dependency polyfill for the
[HTML switch control](https://webkit.org/blog/15054/an-html-switch-control/)
`<input switch type="checkbox">`.

The polyfill provides a visual switch-style control for checkboxes using the
`switch` attribute, and gracefully defers to native browser support where
available.

## Installation

### Using npm

Install the package as a dependency (for example, in a static site or simple web
app):

```bash
npm install input-switch-polyfill
```

This package ships the following files:

- `input-switch.js` – the polyfill logic
- `input-switch.css` – the accompanying styles

### Using a simple static copy

Alternatively, copy `input-switch.js` and `input-switch.css` into your project
(for example, next to your `index.html`) and reference them directly.

## Usage

In your HTML, use checkboxes with the `switch` attribute:

```html
<label>
  Default
  <input type="checkbox" switch />
</label>

<label>
  Accent color red
  <input type="checkbox" switch style="accent-color: red" />
</label>

<label>
  Accent color #00ff00 default checked
  <input type="checkbox" switch checked style="accent-color: #00ff00" />
</label>
```

Then, conditionally load the polyfill as an ES module to only apply it when the
browser does **not** already support `input[switch]` natively:

```html
<script type="module">
  if (!('switch' in HTMLInputElement.prototype)) {
    await import('./input-switch.js');
  }
</script>
```

This mirrors the usage in `index.html` in this repository.

### Accent color support

The polyfill reads the computed `accent-color` of each
`input[type="checkbox"][switch]` and maps it to a CSS custom property
`--switch-accent`. You can:

- Rely on inherited `accent-color`
- Set `accent-color` inline (as in the examples above)
- Or set `accent-color` via CSS rules

The provided `input-switch.css` uses `--switch-accent` to style the visual
switch.

## Demo

You can see a [demo](https://tomayac.github.io/input-switch-polyfill/) of this
polyfill right in your browser.

## Development

Clone the repository and install dependencies:

```bash
git clone https://github.com/tomayac/input-switch-polyfill.git
cd input-switch-polyfill
npm install
```

Start a simple static server (as defined in `package.json`):

```bash
npm start
```

Then open `index.html` in your browser (or follow the URL printed by the dev
server) to see the demo, which corresponds to the usage shown above.

## License

Licensed under the Apache License, Version 2.0. See [`LICENSE`](./LICENSE) for
details.

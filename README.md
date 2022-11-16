# Bem Class

A small, simple tool (without dependencies) for writing class names in [BEM-syntax](https://en.bem.info/methodology/html/) for DOM elements, with a simplified syntax that avoids large amounts of repetition.

## Installation

```
npm install --save @henit/bem-class
```

## Usage
*The examples use React, but bem-class can be used with any library or framework*

### Example without any class library

```jsx
function Button({ className, icon, variant, size, disabled, label }) {
  return (
    <button className={`button button--variant-${variant} button--size-${size} ${disabled ? 'button--disabled' : ''} ${className}`}>
      <i className={`button__icon button__icon--large iconlib-${type}`} />
      <span className="button__label">
        {label}
      </span>
    </button>
  )
}
```

### Example with standard classname library (not made for BEM)

```jsx
import classLib from 'class-library';

function Button({ className, icon, variant, size, disabled, label }) {
  const classNames = classLib(
    'button',
    `button--variant-${variant}`,
    `button--size-${size}`,
    { 'button--disabled': disabled },
    className,
  };

  return (
    <button className={classNames}>
      <i className={classLib('button__icon', 'button__icon--' + size, 'iconlib-' + type} />
      <span className="button__label">
        {label}
      </span>
    </button>
  )
}
```

### Example with bem-class

```jsx
import bemClass from '@henit/bem-class';

const cn = bemClass('button');

function Button({ className, icon, variant, size, disabled, label }) {
  return (
    <button className={cn({ variant, size, disabled }, [className])>
      <i className={cn('icon', { large }, [`iconlib-${type}`]} />
      <span className={cn('label')}>
        {label}
      </span>
    </button>
  )
}
```

## API

The default export from bem-class is a factory function that takes the [block](https://en.bem.info/methodology/key-concepts/#block) name as argument, and returns a classname-creator function for that block:

```
import bemClass from '@henit/bem-class';

const cn = bemClass('button');
```

The block function returns a class name string ready for use in the DOM.

Three types of arguments can be sent to the created block function (i.e. `cn`):

- `string` - [Element](https://en.bem.info/methodology/key-concepts/#element) name
- `object` - [Modifiers](https://en.bem.info/methodology/key-concepts/#modifier)
- `array` - [Mix](https://en.bem.info/methodology/key-concepts/#mix) classes

When called without an element (string argument), the block function return the block (with any given modifiers/mixes).

### Examples

```
cn() // 'button'

cn({ color: 'blue', outlined: true, disabled: false }) // 'button button--color-blue button--outlined'

cn(['save-button']) // 'button save-button'

cn({ color: 'blue' }, ['form-control', 'save-button']) // 'button button--color-blue form-control save-button'

cn('label') // 'button__label'

cn('label', { color: 'blue', outlined: true, disabled: false }) // 'button__label button__label--color-blue button__label--outlined'

cn('label', ['form-label']) // 'button__label form-label'

cn('label', { variant: 'large' }, ['form-label']) // 'button__label button__label--variant-large form-label'
```

And that's it!

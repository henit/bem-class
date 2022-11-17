export type TBlock = string;
export type TElement = string;
export type TModifiers = Record<string, string | number | boolean | undefined>;
export type TMixes = Array<string | undefined>;
export type TClassName = string;

const isElement = (arg: TElement | TModifiers | TMixes): arg is TElement => (typeof arg) === 'string';
const isModifiers = (arg: TElement | TModifiers | TMixes): arg is TModifiers => (typeof arg) === 'object' && !Array.isArray(arg) && Object.keys(arg).length > 0;
const isMixes = (arg: TElement | TModifiers | TMixes): arg is TMixes => (typeof arg) === 'object' && Array.isArray(arg) && arg.length > 0;

const defaultElementSeparator = '__';
const defaultModifierSeparator = '--';
const defaultModifierValueSeparator = '-';

const elementStr = (elementSeparator: string, block: TBlock, element: TElement): TClassName =>
  block + elementSeparator + element;

const concatModifiers = (modifierSeparator: string, modifierValueSeparator: string, cn: TClassName, prefix: string, mods: TModifiers): TClassName => {
  const includeMods = Object.entries(mods)
    .filter(([, value]) => {
      if (value === false || value === undefined || value === null) {
        // Skip false mods from props
        return false;
      }
      return true;
    });
  if (includeMods.length > 0) {
    const modsStr = includeMods
      .map(([key, value]) => {
        if (value === true) {
          return key;
        }
        return key + modifierValueSeparator + value;
      });

    return cn + ' ' + prefix + modifierSeparator + modsStr.join(' ' + prefix + modifierSeparator);
  }
  return cn;
};

const concatMixes = (cn: TClassName, mixes: TMixes): TClassName =>
  mixes.length > 0 ?
    (cn.length > 0 ? `${cn} ` : '') + mixes.filter(Boolean).join(' ')
    :
    cn;

function className(
  elementSeparator: string,
  modifierSeparator: string,
  modifierValueSeparator: string,
  block: TBlock,
  arg1?: any,
  arg2?: any,
  arg3?: any,
): any {
  if (typeof arg1 === 'undefined') {
    // BLOCK
    return block;
  } else if (isElement(arg1)) {
    if (isMixes(arg2)) {
      // ELEMENT MIXES
      return concatMixes(elementStr(elementSeparator, block, arg1), arg2);
    } else if (isModifiers(arg2)) {
      if (isMixes(arg3)) {
        // ELEMENT MODIFIERS MIXES
        return concatMixes(concatModifiers(modifierSeparator, modifierValueSeparator, elementStr(elementSeparator, block, arg1), elementStr(elementSeparator, block, arg1), arg2), arg3);
      }
      // ELEMENT MODIFIERS
      return concatModifiers(modifierSeparator, modifierValueSeparator, elementStr(elementSeparator, block, arg1), elementStr(elementSeparator, block, arg1), arg2);
    }
    // ELEMENT
    return elementStr(elementSeparator, block, arg1);
  } else if (isModifiers(arg1)) {
    if (isMixes(arg2)) {
      // BLOCK MODIFIERS MIXES
      return concatMixes(concatModifiers(modifierSeparator, modifierValueSeparator, block, block, arg1), arg2);
    }
    // BLOCK MODIFIERS
    return concatModifiers(modifierSeparator, modifierValueSeparator, block, block, arg1);
  } else if (isMixes(arg1)) {
    // BLOCK MIXES
    return concatMixes(block, arg1);
  }

  // Fallback for empty modifiers/mixes
  return block;
}

export const bemClass = (
  block: TBlock,
  elementSeparator = defaultElementSeparator,
  modifierSeparator = defaultModifierSeparator,
  modifierValueSeparator = defaultModifierValueSeparator,
) => {
  function blockFn(): TClassName; // 'block'
  function blockFn(modifiers: TModifiers): TClassName; // 'block block--mod'
  function blockFn(mixes: TMixes): TClassName; // 'block mix'
  function blockFn(modifiers: TModifiers, mixes: TMixes): TClassName; // 'block block--mod mix'
  function blockFn(element: TElement): TClassName; // 'block block__element'
  function blockFn(element: TElement, modifiers: TModifiers): TClassName; // 'block__element block__element--mod'
  function blockFn(element: TElement, mixes: TMixes): TClassName; // 'block__element mix'
  function blockFn(element: TElement, modifiers: TModifiers, mixes: TMixes): TClassName; // 'block__element block__element--mod mix'
  function blockFn(arg1?: any, arg2?: any, arg3?: any): TClassName {
    return className(elementSeparator, modifierSeparator, modifierValueSeparator, block, arg1, arg2, arg3);
  }

  return blockFn;
}

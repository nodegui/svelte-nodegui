import { View } from 'tns-core-modules/ui/core/view'
import ViewNode from './ViewNode'


export type ComponentClassResolver = () => View;

interface ElementEntry {
  resolver: ComponentClassResolver,
  meta: ComponentMeta
}

export interface ComponentMeta {
    skipAddToDom?: boolean
    isUnaryTag?: boolean
    tagNamespace?: string
    canBeLeftOpenTag?: boolean
    component?: View
    insertChild?: (parent: ViewNode, child: ViewNode, index: number) => void;
    removeChild?: (parent: ViewNode, child: ViewNode) => void;
}

const elementMap:{ [index: string]: ElementEntry}  = {}
const dashRegExp = /-/g

const defaultViewMeta = {
  skipAddToDom: false,
  isUnaryTag: false,
  tagNamespace: '',
  canBeLeftOpenTag: false,
  component: null as View
}

export function normalizeElementName(elementName: string) {
  return `${elementName
    .replace(dashRegExp, '')
    .toLowerCase()}`
}

export function registerElement(elementName:string, resolver: ComponentClassResolver, meta: ComponentMeta = null) {
  const normalizedName = normalizeElementName(elementName)

  meta = Object.assign({}, defaultViewMeta, meta)

  if (elementMap[normalizedName]) {
    throw new Error(`Element for ${elementName} already registered.`)
  }

  const entry = {
    resolver: resolver,
    meta: meta
  }
  elementMap[normalizedName] = entry
}

export function getElementMap() {
  return elementMap
}

export function getViewClass(elementName:string) {
  const normalizedName = normalizeElementName(elementName)
  const entry = elementMap[normalizedName]

  if (!entry) {
    throw new TypeError(`No known component for element ${elementName}.`)
  }

  try {
    return entry.resolver()
  } catch (e) {
    throw new TypeError(`Could not load view for: ${elementName}. ${e}`)
  }
}

export function getViewMeta(elementName:string) {
  const normalizedName = normalizeElementName(elementName)

  let meta:ComponentMeta = defaultViewMeta
  const entry = elementMap[normalizedName]

  if (entry && entry.meta) {
    meta = entry.meta
  }

  return meta
}

export function isKnownView(elementName:string) {
  return elementMap[normalizeElementName(elementName)]
}


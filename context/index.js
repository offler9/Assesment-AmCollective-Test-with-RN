import { generateComponent } from './_generate'

/** REGISTER the Contexts with 3 STEPS */

/** 1. import context provider used here */
import { ArticleProvider } from './article'

/** 2. add context provider used here. NB: orders matters */
const registeredProvider = [
  ArticleProvider
]

/** 3. export all context provider used here */
export * from './article'

// generate context provider component
export const ContextProviderCollection = generateComponent(registeredProvider)

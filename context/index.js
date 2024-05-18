import { generateComponent } from './_generate'

/** REGISTER the Contexts with 3 STEPS */

/** 1. import context provider used here */
import { ArticleProvider } from './article'
import { UserProvider } from './user'

/** 2. add context provider used here. NB: orders matters */
const registeredProvider = [
  ArticleProvider,
  UserProvider
]

/** 3. export all context provider used here */
export * from './article'
export * from './user'

// generate context provider component
export const ContextProviderCollection = generateComponent(registeredProvider)

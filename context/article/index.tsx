/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, {
  createContext, useContext,useState,
} from 'react'
import axios from 'axios'
import { ArticleProps } from '@/screen/home/prototype'

const ArticleContext = createContext<{
  articleData: ArticleProps,
  getArticleData: (e?: string) => void
  isLoading: boolean,
  errorMessage: {
    message: string,
    msg: string,
  }
 }>({
  articleData: {
    data: [],
    pagination: null
  },
  isLoading: false,
  errorMessage: {
    message: '',
    msg: ''
  },
  getArticleData: () => null,
})

export const useArticleContext = () => useContext(ArticleContext)

export const ArticleProvider = ({ children }: {children: any}) => {

  const [data, setData] = useState<ArticleProps>({
    data: [],
    pagination: null,
  })
  const [errorMessage, setErrorMessage] = useState<any>()
  const [isLoading, setIsLoading] = useState(false)

  const getData = async (next?: string) => {
    setIsLoading(true)
    const url = next || 'https://next.api.whathebyte.com/posts'
    
    try {
      const response = await axios.get(url)
      const responseData = response.data
      
      setData(prevData => {
        if (next) {
          // If fetching more data, filter out any duplicates before appending
          const newData = responseData.data.filter((newItem: { id: string }) => {
            return !prevData?.data?.some(prevItem => prevItem.id === newItem.id)
          })
          return {
            data: [...prevData.data, ...newData],
            pagination: responseData.pagination
          }
        } else {
          // If it's the initial fetch, set the data and pagination
          return responseData
        }
      })
      
    } catch (error) {
      // console.error('Error fetching data: ', JSON.parse(error))
      setErrorMessage(error || '')
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }
 
  return (
    <ArticleContext.Provider value={{
      articleData: data,
      isLoading,
      errorMessage,
      getArticleData: getData,
      // clearArticleData,
    }}
    >
      {children}
    </ArticleContext.Provider>
  )
}

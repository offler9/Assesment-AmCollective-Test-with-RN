/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, {
  createContext, useCallback, useContext, useEffect, useState,
} from 'react'
// import AP from '@/utils'
import axios from 'axios'
// import { shallowEqual, useDispatch, useSelector } from 'react-redux'

const ArticleContext = createContext<{
  articleData: any[],
  getArticleData: () => void
}>({
      articleData: [],
      getArticleData: () => null
    })

export const useArticleContext = () => useContext(ArticleContext)

export const ArticleProvider = ({ children }: {children: any}) => {

  const [data, setData] = useState([])
  const ap = async () => {
    await axios.get('https://next.api.whathebyte.com/posts').then((response) => {
      setData(response?.data)
    });
  }
  return (
    <ArticleContext.Provider value={{
      articleData: data,
      getArticleData: ap
      
    }}
    >
      {children}
    </ArticleContext.Provider>
  )
}

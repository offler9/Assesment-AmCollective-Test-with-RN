import { ModAsyncStorage, USER_INFO } from '@/utils/asyncStorage';
import React, {
    createContext, useContext, useEffect, useState, useReducer, Dispatch
  } from 'react'
  
  interface UserInfoProps {
    userInfo: {
      username: string,
      uid: string,
    } | null
  }

  interface UserAction {
    // Define action types and payload structure here
    type: string;
    payload?: any;
  }
  const initialState: UserInfoProps = {
    userInfo: null
  }
  const UserContext = createContext<{
    userInfo: UserInfoProps | null
    setUserInfo: (e:string) => void,
    dispatch: Dispatch<UserAction>
    logout: () => void
  }>({
      userInfo: initialState,
      setUserInfo: () => null,
      logout: () => null,
      dispatch: () => null
    })

  const appReducer = (state: UserInfoProps, action: UserAction): UserInfoProps => {
    // Implement your reducer logic here based on action types
    switch (action.type) {
      case 'UPDATE_USER_INFO':
        return {
          ...state,
          userInfo: action.payload,
        };
      case 'DELETE_USER_INFO':
        return {
          ...state,
          userInfo: null,
        };
      // Add other cases as needed
      default:
        return state;
    }
  };
  export const useUserContext = () => useContext(UserContext)
  
  export const UserProvider = ({ children }: {children: any}) => {
  
    // const [userInfo, setUserInfo] = useState<UserInfoProps | null>(null)
    const [userInfo, dispatch] = useReducer(appReducer, initialState)
    
    const updateUserInfo = (e: string) => {
    const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    // Generate a random number
    const randomNumber = Math.floor(Math.random() * 9000) + 1000;
    // Combine date and random number
    const randomId = `${currentDate}${randomNumber}`;
      const userInfo = {
        username: e,
        uid: randomId
      }

    dispatch({ type: 'UPDATE_USER_INFO', payload: userInfo })
    ModAsyncStorage.save(USER_INFO, JSON.stringify(userInfo))
    }

    const resetUserInfo = async() => {
      dispatch({ type: 'DELETE_USER_INFO', payload: null });
      await ModAsyncStorage.delete(USER_INFO)
    }

    useEffect(() => {
      const checkUserInfo = async () => {
        await ModAsyncStorage.getValue(USER_INFO, (value: string) => {
          // console.log('mod',value)
          if (value !== null) dispatch({ type: 'UPDATE_USER_INFO', payload: JSON.parse(value) })
        })
      }
      checkUserInfo()
    }, [])
  
    return (
      <UserContext.Provider value={{
        userInfo: userInfo,
        setUserInfo: (e) => updateUserInfo(e),
        logout: resetUserInfo,
        dispatch,
      }}
      >
        {children}
      </UserContext.Provider>
    )
  }
  
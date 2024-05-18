import React, {
    useEffect, FunctionComponent, useRef,
  } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native'
import { Text, TouchableOpacity } from 'react-native'

import { useArticleContext, useUserContext } from '@/context'

import Login from './login'
import Home from './home'
import Webview from './webview'
  
  const Stack = createNativeStackNavigator()
  const navigationRef = React.createRef<NavigationContainerRef<any>>()
  let MainNavigator: FunctionComponent | null
  
  // @refresh reset
  const ApplicationNavigator = () => {
    const routeNameRef = useRef<string>()
    const { logout, userInfo, } = useUserContext()
  
    useEffect(
      () => () => {
        // setIsApplicationLoaded(false)
        MainNavigator = null
      },
      [],
    )

    return (
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name
        }}
        >
        <Stack.Navigator>
          {!Boolean(userInfo?.userInfo?.username) ?
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                animation: 'none',
                headerShown: false,
              }}
            /> 
            :
            <>
              <Stack.Screen
                name="Home"
                component={Home}
                options={{
                 animation: 'none',
                //  headerShown: false,
                headerRight:() => (
                  <TouchableOpacity
                    onPress={() => logout()}
                  >
                    <Text>Logout</Text>
                  </TouchableOpacity>
                )
                }}
              />
              <Stack.Screen
                name="Webview"
                component={Webview}
                options={{
                 animation: 'none',
                //  headerShown: false,
                 headerTitle: ''
                }}
              />
            </>
          }
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
  
  export default ApplicationNavigator
  
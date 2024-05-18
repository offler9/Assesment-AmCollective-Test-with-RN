import { useEffect, useState } from "react"
import { TextInput, View, Text, TouchableOpacity } from "react-native"
import { responsiveHeight } from "react-native-responsive-dimensions"

import { useUserContext } from '@/context/user'

const Login = () => {
    const [username, setUsername] = useState('')
    
    const { setUserInfo } = useUserContext()

    useEffect(() => {
      setUsername('')
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TextInput
              style={{ borderWidth: 0.3, padding: 10, borderRadius: 5, width: '90%', justifyContent: 'center' }}
              placeholder="username"
              value={username}
              autoFocus
              onChangeText={(e) => setUsername(e)}
            />
            <TouchableOpacity
              disabled={username.length < 3}
              onPress={() =>setUserInfo(username)}
              style={{ backgroundColor: 'transparent', marginTop: responsiveHeight(1), }}
            >
              <Text
                style={{ fontSize: 18, fontWeight: '600', padding: 5, textDecorationLine: 'underline', color: username.length >= 3 ? 'black' : 'gray' }}
              >
                Login
              </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login
import { memo } from 'react'
import { View } from 'react-native'
import { WebView } from 'react-native-webview'

const Webview = (props: any) => {
const { articleLink } = props?.route?.params
  return (
    <View style={{ flex: 1, backgroundColor: '#ededeb'}}>
      <WebView 
        style={{ flex : 1, }} 
        source={{uri: articleLink}}
        cacheEnabled
        allowsLinkPreview
      />
    </View>
  )
}

export default memo(Webview)
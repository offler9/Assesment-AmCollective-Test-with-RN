import { useEffect, useState } from 'react'
import { ActivityIndicator, Button, FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import moment from 'moment'
import { WebView } from 'react-native-webview'
import { EvilIcons } from '@expo/vector-icons'

import { useArticleContext } from '@/context/article'
import ModalContainer from '@/components/Modal'
// import { TouchableOpacity } from 'react-native-gesture-handler'

const Home = () => {
    const [showModal, setShowModal] = useState(false)
    const [articleLink, setArticleLink] = useState('')
    
    const runBeforeLoaded = `
      const meta = document.createElement('meta');
      meta.setAttribute(
        'content',
        // 'width=width, initial-scale=0.5, maximum-scale=0.5, user-scalable=2.0'
      );
      meta.setAttribute('name', 'viewport');
      document.getElementsByTagName('head')[0].appendChild(meta);
      true; // note: this is required, or you'll sometimes get silent failures
    `

  const runAfterLoaded = `
      true; // note: this is required, or you'll sometimes get silent failures
    `

    const { getArticleData, articleData } = useArticleContext()
    function removeTags(str: string) {
        if ((str === null) || (str === ''))
            return false;
        else
            str = str.toString();
    
        // Regular expression to identify HTML tags in
        // the input string. Replacing the identified
        // HTML tag with a null string.
        return str.replace(/(<([^>]+)>)/ig, '');
    }
    const onClickArticle = (link:string) => {
        setArticleLink(link)
        setShowModal(true)
    }
    const Item = (data: any) => {
        const lastUpdated = moment(data?.data?.lastUpdatedAt);
        const formattedDate = lastUpdated.format('DD/MM/YY');
        return (
          <View style={{backgroundColor: 'white', marginVertical: 8, padding: 14, borderRadius: 8 }}>
            <TouchableOpacity onPress={() =>onClickArticle(data?.data?.externalData?.link)} style={{ flexDirection: 'row', gap: 5 }}>
              <Image style={{ width: 100, height: 100, borderRadius: 6}} src={data?.data?.image} />
              <View style={{ flex: 1 }}>
                <Text style={{fontWeight: '700'}} numberOfLines={2} lineBreakMode="clip">{data?.data?.title}</Text>
                <Text style={{ marginTop: 5, opacity: 0.5, fontSize: 13}} numberOfLines={3} lineBreakMode="clip">{removeTags(data?.data?.description)}</Text>
              </View>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                  <EvilIcons name="comment" size={22} />
                  <Text style={{fontSize: 12, opacity: 0.6}}>Last updated on {formattedDate}</Text>
                </View>

            <View style={{ flexDirection: 'row', gap: 7, marginTop: 10}}>
              {data?.data?.tags.map((item: any) => (
                <Text key={item?.id} style={{borderWidth: 0.7, borderRadius: 5, padding: 5, fontSize: 11}}>{item?.handle}</Text>
              ))}
            </View>
          </View>
          )
    };
    const renderLoading = () => {
        return (
            <ActivityIndicator
                color="red"
                size="large"
                style={{flex:1, justifyContent: 'center' }}
             /> 
        )
    }

    useEffect(() => {
        getArticleData() // get article data from api
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: '#ededeb'}}
        >
            <FlatList
                style={{ margin: 12 }}
                contentContainerStyle={{}}
                data={articleData?.data || []}
                nestedScrollEnabled
                renderItem={({item}) => <Item data={item} />}
                keyExtractor={(item) => item.id}
            />

            <ModalContainer
              title=""
              description={''}
              show={showModal}
              onDismiss={() =>setShowModal(false)}
              style={{ width: '100%', height: '70%'}}
            >
                <WebView 
                    style={{ flex : 1, }} 
                    source={{uri: articleLink}}
                    renderLoading={renderLoading}
                    cacheEnabled
                    allowsLinkPreview
                    injectedJavaScriptBeforeContentLoaded={runAfterLoaded}
                    injectedJavaScript={runBeforeLoaded}
                />
                <Button title="Read article" />
            </ModalContainer>

        </View>
    )
}

export default Home
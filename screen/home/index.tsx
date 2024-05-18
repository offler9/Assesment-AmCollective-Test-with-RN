import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  ActivityIndicator, Button, FlatList, Text, TouchableOpacity, View,
  TextInput,
} from 'react-native'
import { WebView } from 'react-native-webview'
import { EvilIcons } from '@expo/vector-icons'
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet"

import { useArticleContext } from '@/context/article'
import ModalContainer from '@/components/Modal'
import { useUserContext } from '@/context'
import { ModAsyncStorage, USER_COMMENT } from '@/utils/asyncStorage'

import CommentItem from './components/commentItem'
import ArticleItem from './components/articleItem'

import { ArticleCommentProps, ArticleCommentRepliesProps, ArticleDataProps, RepliedComponentProps } from './prototype'

const Home = ({navigation}: any) => {
  const [previewArticleModal, setPreviewArticleModal] = useState(false)
  const [comment, setComment] = useState('')
  const [showCommentComponent, setShowCommentComponent] = useState(false) 
  const [articleLink, setArticleLink] = useState('')
  const [articleID, setShowArticleID] = useState('')
  const [commentData, setCommentData] = useState<ArticleCommentProps[]>([])
  const [replyComment, setReplyComment] = useState<RepliedComponentProps>({
    showReplyComponent: false, 
    selectedReplyComment: null,
    type: '',
  })
  const sheetRef = useRef<BottomSheet>(null)
  const inputRef = useRef(null)

  const { userInfo } = useUserContext()
  const { getArticleData, articleData, isLoading, errorMessage } = useArticleContext()

  const handleClosePress = useCallback(() => { // reset state when close the bottom sheets
    sheetRef.current?.close()
    setShowCommentComponent(false)
    setComment('')
    setReplyComment({
      selectedReplyComment: null, showReplyComponent: false, type: ''
    })
  }, [])

  const snapPoints = useMemo(() => ["100%"], []) // set bottom-sheet to full-screen when showing

  const handlePressArticle = (link:string) => {
      setArticleLink(link)
      setPreviewArticleModal(true)
  }
  const onPressCommentIcon = (articleID: string) => {
    setShowArticleID(articleID)
    setShowCommentComponent(true)
  }

  const addCommentOrReply = () => {
    // Clone the original comment data array
    const updatedData = [...commentData]
  
    // Find the index of the comment to update or -1 if it's a new comment
    const commentIndex = updatedData.findIndex(item => item?.comment_id === replyComment.selectedReplyComment?.comment_id)
    
    // Prepare the new comment or reply object
    const newCommentOrReply = {
      reply_id: Math.floor(Math.random() * 9000) + 1000,
      comment_id: replyComment.selectedReplyComment?.comment_id || '',
      username: userInfo?.userInfo?.username || '',
      reply_text: comment,
      timestamp: new Date(),
      replies: [],
      replies_count: 0,
    }
  
    // Handle adding a new comment or reply to an existing comment
    if (commentIndex !== -1 && replyComment.showReplyComponent) {
      const commentToUpdate = updatedData[commentIndex]
      if (replyComment.type === '1-reply') {
        // Adding a reply to an existing comment
        commentToUpdate.replies.push(newCommentOrReply)
        commentToUpdate.replies_count++
      } else if (replyComment.type === '2-reply') {
        // Adding a reply to a reply of an existing comment
        const commentRepliesIndex = commentToUpdate.replies.findIndex(item => item?.reply_id === replyComment?.selectedReplyComment?.reply_id)
        if (commentRepliesIndex !== -1) {
          const commentRepliesToUpdate = commentToUpdate.replies[commentRepliesIndex]
          commentRepliesToUpdate.replies.push(newCommentOrReply)
          commentRepliesToUpdate.replies_count++
          commentToUpdate.replies_count++
        }
      }
    } else {
      // Adding a new comment
      const userComment = {
        article_id: articleID,
        user_id: userInfo?.userInfo?.uid || '',
        comment_id: `${Math.floor(Math.random() * 9000) + 1000}${articleID}`,
        username: userInfo?.userInfo?.username || '',
        comment_text: comment,
        timestamp: new Date(),
        replies_count: 0,
        replies: [],
      }
      updatedData.push(userComment)
    }
  
    // Save updated data to AsyncStorage
    ModAsyncStorage.save(USER_COMMENT, JSON.stringify(updatedData))
      .then(() => {
        // Reset state and update comment data
        setComment('')
        setReplyComment({ showReplyComponent: false, selectedReplyComment: null, type: '' })
        setCommentData(updatedData)
      })
      .catch(error => console.error("Error saving comment data to AsyncStorage:", error))
  }
  
  // const handleDeleteComment = (commentItem: ArticleCommentProps) => {
  //   const tempData = commentData
  //   const updatedCommentData = tempData?.filter((item) => item !== commentItem)
  //   setCommentData(updatedCommentData)
  //   ModAsyncStorage.save(USER_COMMENT, JSON.stringify(updatedCommentData))
  // }

  const handleOnPressReply = (type: string, repliesItem: ArticleCommentRepliesProps, item: any, index: number) => {
    inputRef?.current?.focus()
    switch (type) {
      case '1-reply':
        setReplyComment({
          showReplyComponent: true,
          selectedReplyComment: item,
          type: type,
        })
        break
      case '2-reply':
        setReplyComment({
          showReplyComponent: true,
          selectedReplyComment: repliesItem,
          type: type
        })
      default:
        break
    }
  }

  const handleCancelComment = () => {
    setReplyComment({
      selectedReplyComment: null, showReplyComponent: false, type: ''
    })
    setComment('')
  }

  const FlatListArticleItemKeyExtractor = useCallback((item:any) => item?.id?.toString(), [])

  const FlatListArticleCommentKeyExtractor = useCallback((item:any) => item?.comment_id?.toString(), [])

  const renderLoading = () => {
    return (
      <ActivityIndicator
        color="#2e2e2d"
        size="large"
        style={{flex:1, justifyContent: 'center' }}
       /> 
    )
  }

  const FlatListArticleItem = ({ item }: { item: ArticleDataProps }) => (
    <ArticleItem
      title={item?.title}
      description={item?.description}
      imageLink={item?.image}
      lastUpdatedAt={item?.lastUpdatedAt}
      authorName={item?.externalData?.authorName}
      commentTotal={commentData?.filter((comment) => item.id === comment.article_id)?.length}
      tags={item?.tags}
      onPressArticle={() => handlePressArticle(item?.externalData?.link)}
      onPressCommentIcon={() => onPressCommentIcon(item?.id)}
    />
  )

  const FlatListCommentItem = ({item, index} : {item: ArticleCommentProps, index: number}) => (
    <CommentItem
      username={item?.username}
      commentText={item?.comment_text}
      timestamp={item?.timestamp}
      repliesData={item?.replies}
      repliesTotal={item?.replies_count}
      // handleDeleteComment={() => handleDeleteComment(item)}
      handlePressReply={(type, repliesItem) => handleOnPressReply(type, repliesItem, item, index)}
    />
  )

  const FlatListCommentHeader = () => <Text style={{fontSize: 17, fontWeight: '600', alignSelf: 'center'}}>Comments</Text>

  const FlatListEmptyCommentComponent = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{ fontSize: 15, fontWeight: '600', textDecorationLine: 'underline'}}>
        No comments yet.
      </Text>
      <Text>Start a discussion</Text>
    </View>
  )

  useEffect(() => {
    const getCommentData = async() => {
      await ModAsyncStorage.getValue(USER_COMMENT, (value: string) => {
        const parsedValue = JSON.parse(value)
        if (parsedValue?.length > 0) setCommentData(parsedValue)
      })
    }

    getArticleData() // get article data from api
    getCommentData() // load comment data from storage
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: '#ededeb'}}>

      {/* render error message when failed call the api */}
      {Boolean(errorMessage) && <Text style={{ color: 'red', alignSelf: 'center' }}>{errorMessage?.msg || errorMessage?.message || ''}</Text>}

      <FlatList
        style={{ margin: 12 }}
        data={articleData?.data || []}
        nestedScrollEnabled
        removeClippedSubviews
        onEndReached={() => getArticleData(articleData?.pagination?.next)}
        onEndReachedThreshold={0.3}
        renderItem={FlatListArticleItem}
        ListFooterComponent={() => isLoading && renderLoading()}
        keyExtractor={FlatListArticleItemKeyExtractor} 
      />

      {/* preview component when user pressed the article */}
      <ModalContainer
        title=""
        description={''}
        show={previewArticleModal}
        onDismiss={() =>setPreviewArticleModal(false)}
        style={{ width: '100%', height: '70%'}}
      >
        <WebView 
          style={{ flex : 1, }} 
          source={{uri: articleLink}}
          renderLoading={renderLoading}
          cacheEnabled
          allowsLinkPreview
        />
        <Button title="Read article" onPress={() => {
          setPreviewArticleModal(false)
          navigation?.navigate('Webview', {articleLink})
        } }/>
      </ModalContainer>

      {/* component for render comment sections */}
      {showCommentComponent && (
        <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          onClose={handleClosePress}
          enablePanDownToClose
        >
          <BottomSheetFlatList
            data={commentData?.filter((item) => item?.article_id === articleID) || []}
            keyExtractor={FlatListArticleCommentKeyExtractor}
            contentContainerStyle={{paddingHorizontal: 12, flex: 1}}
            renderItem={FlatListCommentItem}
            scrollEnabled
            nestedScrollEnabled
            ListHeaderComponent={FlatListCommentHeader}
            ListEmptyComponent={FlatListEmptyCommentComponent}
          />
          <View style={{ margin: 15, borderWidth: 0.7, borderRadius: 6, padding: 8}} >
            {replyComment.showReplyComponent && (
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style={{}}>Replying to {replyComment?.selectedReplyComment?.username}</Text>
                <EvilIcons
                  name="close"
                  size={17}
                  onPress={() => handleCancelComment()} />
              </View>
            )}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <TextInput
                ref={inputRef}
                placeholder="write a comment"
                autoFocus
                value={comment}
                multiline
                onChangeText={(e) => setComment(e)}
                style={{ fontSize: 15, flex: 1 }}
              />
              <TouchableOpacity style={{justifyContent: 'center', marginLeft: 5}} disabled={comment.length < 3} onPress={() => addCommentOrReply()}>
                <Text style={{ color: comment.length < 3 ? 'gray' : 'black' }}>post</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheet>
      )}

    </View>
  )
}

export default memo(Home)
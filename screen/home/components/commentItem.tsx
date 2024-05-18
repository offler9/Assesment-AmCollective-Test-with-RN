import { memo, useState } from "react"
import moment from "moment"
import { TouchableOpacity, View, Text, FlatList } from "react-native"
import { EvilIcons } from "@expo/vector-icons"

import { ArticleCommentRepliesProps, RepliedComponentProps } from "../prototype"

interface CommentItemProps {
  timestamp: Date // time to show when user was reply the comment
  username: string // who comment the article
  commentText: string
  // handleDeleteComment: () => void
  handlePressReply: (type: string, item?:ArticleCommentRepliesProps) => void
  repliesData: ArticleCommentRepliesProps[]
  repliesTotal: number
}
const CommentItem = ({
    timestamp, username, commentText, repliesData, repliesTotal,
    handlePressReply, // handleDeleteComment, 
}: CommentItemProps) => {
  const [showRepliesCommentData, setShowRepliesComment] = useState(false)
  
  const FlatListCommentReplyItem = ({item } :{item: ArticleCommentRepliesProps}) => (
    <View style={{ paddingHorizontal: 6 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
        <Text style={{ fontSize: 14, fontWeight: '500' }}>{item?.username}</Text>
        <Text style={{ fontSize: 10.5 }}>{moment(item?.timestamp).fromNow()}</Text>
      </View>
      <Text style={{ fontSize: 13.5, paddingLeft: 2}}><Text style={{ fontWeight: 'bold'}}>{`@${item?.username} `}</Text>{item?.reply_text}</Text>
      <TouchableOpacity onPress={() => handlePressReply('2-reply', item)}>
        <Text style={{ fontSize: 13, fontWeight: '500', opacity: 0.7}}>Reply</Text>
      </TouchableOpacity>
      
      {/* render reply to reply comment */}
        {item?.replies?.length > 0 && (
          <>
            {item?.replies?.map((repliesItem, index) => (
              <>
                <View key={index} style={{ flexDirection: 'row', alignItems: 'center', gap: 5}}>
                  <Text style={{ fontSize: 14, fontWeight: '500' }}>{repliesItem?.username}</Text>
                  <Text style={{ fontSize: 10.5 }}>{moment(repliesItem?.timestamp).fromNow()}</Text>
                </View>
               <Text style={{ fontSize: 13.5, paddingLeft: 2}}>{`@${repliesItem?.username} ${repliesItem.reply_text}`}</Text>
              </>
            ))}
            </>
          )}
      </View>
  )
  return (
    <View>
      {/* render main comment item */}
      <View style={{backgroundColor: '#ededeb', padding: 2, borderRadius: 5}}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
        <Text style={{ fontSize: 15.5, fontWeight: '600'}}>{username}</Text>
        <Text style={{ fontSize: 11}}>{moment(timestamp).fromNow()}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 3 }}>
        <Text style={{ fontSize: 14.5, paddingLeft: 2}}>{commentText}</Text>
        {/* <TouchableOpacity onPress={handleDeleteComment}>
          <EvilIcons name="trash" size={18} color="#d13126" />
        </TouchableOpacity> */}
      </View>
      </View>
      <TouchableOpacity onPress={() => handlePressReply('1-reply')}>
        <Text style={{ fontSize: 12.5, fontWeight: '500', opacity: 0.7}}>Reply</Text>
      </TouchableOpacity>

      {repliesTotal > 0 && (
        <TouchableOpacity
          onPress={() => setShowRepliesComment(!showRepliesCommentData)}
          style={{ paddingHorizontal: 4}}
        >
          <Text style={{ fontSize: 13, color: '#858585', paddingHorizontal: 10 }}>{showRepliesCommentData ? 'hide replies' : `show more replies(${repliesTotal})`}</Text>
        </TouchableOpacity>
      )}

      {/* ender main comment replies */}
      {showRepliesCommentData && (
        <FlatList
          data={repliesData || []}
          keyExtractor={(item) => item?.reply_id.toString()}
          style={{ marginHorizontal: 10, marginVertical: 5}}
          renderItem={FlatListCommentReplyItem}
        />
      )}

    </View>
  )
 }

 export default memo(CommentItem)
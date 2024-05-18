import { memo, useState } from 'react'
import {
Image, Text, TouchableOpacity, View,
} from 'react-native'
import { EvilIcons } from '@expo/vector-icons'
import moment from 'moment'
import { ArticleTagsProps } from '../prototype'

interface ArticleItemProps {
    title: string,
    description: string,
    tags: ArticleTagsProps[],
    lastUpdatedAt: Date,
    commentTotal: number,
    imageLink: string,
    authorName: string,
    onPressArticle: () => void,
    onPressCommentIcon: () => void
}
const ArticleItem = ({
    title, description,tags,commentTotal, lastUpdatedAt, onPressArticle, onPressCommentIcon, imageLink,
    authorName,
}:ArticleItemProps) => {

  const removeTags = (str: string) => {
    if ((str === null) || (str === ''))
      return false
    else
      str = str?.toString()
    // Regular expression to identify HTML tags in
    // the input string. Replacing the identified
    // HTML tag with a null string.
    return str?.replace(/(<([^>]+)>)/ig, '');
  }  
  const lastUpdated = moment(lastUpdatedAt);
  const formattedDate = lastUpdated.format('DD/MM/YY') // format last updated value

  return (
    <View style={{flex: 1, backgroundColor: 'white', marginVertical: 8, padding: 14, borderRadius: 8 }}>
      <TouchableOpacity onPress={onPressArticle} style={{ flexDirection: 'row', gap: 5 }}>
        <Image style={{ width: 100, height: 100, borderRadius: 6}} src={imageLink} />
        <View style={{ flex: 1 }}>
          <Text style={{fontWeight: '700'}} numberOfLines={2} lineBreakMode="clip">{title}</Text>
          <Text style={{ marginTop: 5, opacity: 0.7, fontSize: 13}} numberOfLines={3} lineBreakMode="clip">{removeTags(description)}</Text>
          <Text style={{ color: '#858585', fontSize: 12.5}}>{authorName !== null ? `by ${authorName}` : '-'}</Text>
        </View>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, flex: 1 }}>
        <Text style={{fontSize: 12, opacity: 0.6}}>Last updated on {formattedDate}</Text>
        <View style={{flexDirection: 'row' }}>
          <EvilIcons onPress={onPressCommentIcon} name="comment" size={23} style={{}}/>
          <Text style={{fontSize: 14 }}>{commentTotal}</Text>
        </View>
      </View>

      <View style={{ flex:1, flexWrap: 'wrap', flexDirection: 'row', gap: 7, marginTop: 10}}>
        {tags?.map((item: any) => (
          <Text key={item?.id} style={{borderWidth: 0.7, borderRadius: 5, padding: 5, fontSize: 11}}>{item?.handle}</Text>
        ))}
      </View>
    </View>
  )
}

export default memo(ArticleItem)
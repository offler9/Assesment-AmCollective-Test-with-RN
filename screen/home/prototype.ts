export interface ArticleProps {
  data: ArticleDataProps[]
   pagination: {
    total: number,
    cursors: {
    before: string,
     after: string
    },
   prev: string
   next: string
  } | null
}

export interface ArticleDataProps {
  id: string
  createdAt: string
  lastUpdatedAt: Date
  publishedAt: string
  image: string
  imagePlaceholder: string
  title: string
  slug: string
  description: string
  language: string | null
  featured: boolean
  editorPick: boolean
  authorId: string | null
  author: any
  channelId: string
  channel: {
    id: string
    createdAt: string
    lastUpdatedAt: string
    handle: string
    name: string
    about: string
    image: string
    imagePlaceholder: string
    type: string
    public: boolean
    country: string | null
    mainLanguage: string | null
    verified: boolean
    ownerId: string | null
  }
  externalData: {
    id: string
    sourceId: string
    link: string
    imageOrigin: string
    authorName: string
    authorAvatar: string
    authorAvatarOrigin: string
    authorAvatarPlaceholder: string
    authorId: string
    postId: string
  }
  statsId: string
  stats: {
    id: string
    lastUpdatedAt: string
    impressionStatsId: string
    readStatsId: string
    shareStatsId: string
    impression: {
      id: string
      daily: number
      weekly: number
      monthly: number
      yearly: number
    }
    read: {
      id: string
      daily: number
      weekly: number
      monthly: number
      yearly: number
    }
    share: {
      id: string
      daily: number
      weekly: number
      monthly: number
      yearly: number
    }
  }
  tags: ArticleTagsProps[]
}
export interface ArticleCommentRepliesProps {
  reply_id: number,
  comment_id: string
  username: string,
  reply_text: string,
  timestamp: Date
  replies_count: number,
  replies: {
    reply_id: number,
    comment_id: string
    username: string,
    reply_text: string,
    timestamp: Date
  }[]
}

export interface ArticleCommentProps {
  article_id: string,
  user_id: string,
  comment_id: string,
  username:string,
  comment_text: string,
  timestamp: Date,
  replies_count: number,
  replies: ArticleCommentRepliesProps[]
}

export interface ArticleTagsProps {
  id: string
  createdAt: Date
  lastUpdatedAt: string,
  handle: string
}

export interface RepliedComponentProps {
  showReplyComponent: boolean,
  selectedReplyComment: ArticleCommentProps & ArticleCommentRepliesProps | null,
  type: string
}
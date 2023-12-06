interface ReplyData {
    id: string,
    comment_id: string,
    content: string,
    created_at: string,
    likes: string[],
    post_id: string,
    reports: string[],
    user_id: string,
    users: {
        id: string,
        avatar_url: string,
        full_name: string
    }
}

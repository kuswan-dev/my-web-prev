interface CommentData {
    id: string,
    content: string,
    created_at: string,
    likes: string[],
    post_id: string,
    read: boolean,
    reports: string[],
    user_id: string,
    users: {
        id: string,
        avatar_url: string,
        full_name: string
    }
}

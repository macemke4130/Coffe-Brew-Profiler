export interface IPost {
    id: number,
    user_id: number,
    title: string,
    content: string,
    is_visible: number,
    created_at: Date,
    updated_at: Date,
    username: string
}
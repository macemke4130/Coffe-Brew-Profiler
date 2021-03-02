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

export interface IOption {
    id: number,
    name: string
}

export interface ICoffeeBag {
    id: number,
    baristaid: number,
    coffeename: string,
    region: string,
    elevation: number,
    breed: string,
    blend: number,
    brand: string,
    process: string
}
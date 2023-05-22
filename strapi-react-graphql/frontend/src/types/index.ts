export interface DishImageData {
    data: {
        attributes: {
            url: string
        }
    }
}
export interface Dish {
    id: number
    attributes: {
        name: string
        price: number
        description: string
        updatedAt: string
        img: DishImageData
    }
}

export interface Dishes {
    dishes: {
        data: Dish[]
    }
}

export interface DishesArr {
    id: number
    name: string
    price: number
    description: string
    img: {
        url: string
    }
}
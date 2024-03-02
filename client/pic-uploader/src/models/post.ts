export interface Post {
    caption:  string   
    createdAt: string  
    updatedAt: string 
    id:        string | null    
    userId:    string     
    image_url: string   
    location?: string   
    category?: string
}
   
    
    export class PostEntity implements Post {
        caption: string = ''
        createdAt: string = ''
        updatedAt: string = ''
        id: string | null = null
        userId: string = ''
        image_url: string = ''
        location?: string | undefined
        category?: string | undefined

    }
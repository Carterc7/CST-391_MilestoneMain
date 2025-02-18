// Record model to define properties and types
export interface Record {
    recordId: number,
    recordTitle: string,
    artist: string,
    description: string,
    videoUrl: string,
    imageUrl: string,
    favorite: boolean
}
export interface UserContext {
    countriesVisited?: Array<{
        name: string,
        count: number,
    }>;
    themesPopular?: Array<{
        type: string,
        count: number,
    }>;
}
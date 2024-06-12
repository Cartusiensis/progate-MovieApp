export type RootTabParamList = {
    Home: undefined,
    Search: undefined,
    Favorite: undefined,
}

export type HomeStackParamList = {
    HomeScreen: undefined,
    MovieDetail: { id: number },
}

export type FavoriteStackParamList = {
    FavoriteScreen: undefined,
    MovieDetail: {id: number}
}
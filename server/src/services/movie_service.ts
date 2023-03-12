import {
    APIError,
    MovieLongType,
    MovieShortType,
} from '../models/MovieType.type';
import { API_KEY } from '../util/environment';
import { isApiError } from '../util/typeHandlers';

export const getMovieFromApi = async (id: string) => {
    try {
        const response = await fetch(
            `http://www.omdbapi.com/?i=${id}&type=movie&apikey=${API_KEY}`
        );
        if (!response.ok) {
            throw response.statusText;
        }
        const data: (MovieLongType[] & { Response: string }) | APIError =
            await response.json();
        if (isApiError(data)) {
            throw data.Error;
        }
        return data as MovieLongType[];
    } catch (err: any) {
        return err.statusText as string;
    }
};

export const getMoviesFromApi = async (title: string) => {
    try {
        const response = await fetch(
            `http://www.omdbapi.com/?s=${title}&type=movie&apikey=${API_KEY}`
        );
        if (!response.ok) {
            throw response.statusText;
        }
        const data: (MovieShortType[] & { Response: string }) | APIError =
            await response.json();
        if (isApiError(data)) {
            throw data.Error;
        }
        return data as MovieShortType[];
    } catch (err: any) {
        return err.statusText as string;
    }
};

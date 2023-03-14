import { MovieTable } from '../models/movie_database';

export const getWishlistDatabase = async () => await MovieTable.findAll();

export const getWishlistIdDatabase = async (id: string) =>
    await MovieTable.findOne({ where: { movieId: id } });

export const createWishlistIdDatabase = async (id: string) =>
    await MovieTable.create({ movieId: id });

export const deleteWishlistIdDatabase = async (id: string) =>
    await MovieTable.destroy({ where: { movieId: id } });

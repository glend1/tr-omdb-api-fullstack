import {
    createWishlistIdDatabase,
    deleteWishlistIdDatabase,
    getWishlistDatabase,
    getWishlistIdDatabase,
} from '../../services/wishlist_service';
import { Request, Response } from 'express';

export const getWishlist = async (req: Request, res: Response) => {
    const database = await getWishlistDatabase();
    const wishlistIds = database.map((v) => v.dataValues.movieId);
    res.status(200).json(wishlistIds);
};

export const getWishlistId = async (req: Request, res: Response) => {
    const database = await getWishlistIdDatabase(req.params.id);
    const id = { id: database === null ? false : true };
    res.status(200).json(id);
};

export const createWishlistId = async (req: Request, res: Response) => {
    const id = req.body.id;
    const database = await createWishlistIdDatabase(id);
    const isCreatedId = {
        created: database.dataValues.movieId === null ? false : true,
    };
    res.status(200).json(isCreatedId);
};

export const deleteWishlistId = async (req: Request, res: Response) => {
    const id = req.body.id;
    const database = await deleteWishlistIdDatabase(id);
    const isDeletedId = {
        deleted: !!database,
    };
    res.status(200).json(isDeletedId);
};

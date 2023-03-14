import request from 'supertest';
import { app } from '../../app';
import { MovieTable } from '../../models/movie_database';
import * as wishlistDatabase from '../../services/wishlist_service';

describe('GET /api/v1/wishlist endpoint', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    it('Should return data from the db', async () => {
        const fakeData: Promise<MovieTable[]> = new Promise(
            (resolve, reject) => {
                resolve([
                    new MovieTable({ movieId: 'test' }),
                    new MovieTable({ movieId: 'number' }),
                ]);
            }
        );
        jest.spyOn(wishlistDatabase, 'getWishlistDatabase').mockReturnValue(
            fakeData
        );
        const res = await request(app).get('/api/v1/wishlist');
        expect(res.body).toStrictEqual(['test', 'number']);
        expect(res.statusCode).toEqual(200);
    });
});

describe('GET /api/v1/wishlist/id endpoint', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    it('Should return true with the key id db', async () => {
        const fakeData: Promise<MovieTable | null> = new Promise(
            (resolve, reject) => {
                resolve(new MovieTable({ movieId: 'test' }));
            }
        );
        jest.spyOn(wishlistDatabase, 'getWishlistIdDatabase').mockReturnValue(
            fakeData
        );
        const res = await request(app).get('/api/v1/wishlist/test');
        expect(res.body).toStrictEqual({ id: true });
        expect(res.statusCode).toEqual(200);
    });
    it('Should return true with the key id db', async () => {
        const fakeData: Promise<MovieTable | null> = new Promise(
            (resolve, reject) => {
                resolve(null);
            }
        );
        jest.spyOn(wishlistDatabase, 'getWishlistIdDatabase').mockReturnValue(
            fakeData
        );
        const res = await request(app).get('/api/v1/wishlist/test');
        expect(res.body).toStrictEqual({ id: false });
        expect(res.statusCode).toEqual(200);
    });
});

describe('POST /api/v1/wishlist endpoint', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    it('Should return true with the key id from db', async () => {
        const fakeData: Promise<MovieTable> = new Promise((resolve, reject) => {
            resolve(new MovieTable({ movieId: 'test' }));
        });
        jest.spyOn(
            wishlistDatabase,
            'createWishlistIdDatabase'
        ).mockReturnValue(fakeData);
        const res = await request(app).post('/api/v1/wishlist');
        expect(res.body).toStrictEqual({ created: true });
        expect(res.statusCode).toEqual(200);
    });
    it('Should return false with the key id from db', async () => {
        const fakeData: Promise<MovieTable> = new Promise((resolve, reject) => {
            resolve(new MovieTable({ movieId: null as any as string }));
        });
        jest.spyOn(
            wishlistDatabase,
            'createWishlistIdDatabase'
        ).mockReturnValue(fakeData);
        const res = await request(app).post('/api/v1/wishlist');
        expect(res.body).toStrictEqual({ created: false });
        expect(res.statusCode).toEqual(200);
    });
});

describe('DELETE /api/v1/wishlist endpoint', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    it('Should return true with the key id from db', async () => {
        const fakeData: Promise<number> = new Promise((resolve, reject) => {
            resolve(1);
        });
        jest.spyOn(
            wishlistDatabase,
            'deleteWishlistIdDatabase'
        ).mockReturnValue(fakeData);
        const res = await request(app).delete('/api/v1/wishlist');
        expect(res.body).toStrictEqual({ deleted: true });
        expect(res.statusCode).toEqual(200);
    });
    it('Should return false with the key id from db', async () => {
        const fakeData: Promise<number> = new Promise((resolve, reject) => {
            resolve(0);
        });
        jest.spyOn(
            wishlistDatabase,
            'deleteWishlistIdDatabase'
        ).mockReturnValue(fakeData);
        const res = await request(app).delete('/api/v1/wishlist');
        expect(res.body).toStrictEqual({ deleted: false });
        expect(res.statusCode).toEqual(200);
    });
});

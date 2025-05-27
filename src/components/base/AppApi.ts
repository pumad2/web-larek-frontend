import { IApi, IPostApi, IProduct, IProductApi, IUser } from "../../types";

export class AppApi {
    private _baseApi: IApi;

    constructor(baseApi: IApi) {
        this._baseApi = baseApi;
    }

    getProductList(): Promise<IProductApi> {
        return this._baseApi.get<IProductApi>(`/product`)
        .then((productList: IProductApi) => productList);
    }

    getProductItem(productId: string): Promise<IProduct> {
        return this._baseApi.get<IProduct>(`/product/${productId}`)
        .then((productItem: IProduct) => productItem);
    }

    setUserOrder(data: IUser): Promise<IPostApi> {
        return this._baseApi.post<IPostApi>(`/order`, data, 'POST')
        .then((res: IPostApi) => res);
    }
}
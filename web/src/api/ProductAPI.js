import {
  GET_ALL_PRODUCTS_ENDPOINT,
  GET_SINGLE_PRODUCT_ENDPOINT
} from '../constants/endpoints';
import instanceAxios from './base';

class ProductAPI {
  static async getAllProducts(page = 1) {
    const response = await instanceAxios.get(
      `${GET_ALL_PRODUCTS_ENDPOINT}?page=${page}`
    );
    return response.data;
  }

  static async getSingleProduct(id) {
    const response = await instanceAxios.get(
      `${GET_SINGLE_PRODUCT_ENDPOINT}${id}`
    );
    return response.data;
  }
}

export default ProductAPI;

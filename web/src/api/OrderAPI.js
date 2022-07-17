import {
  USER_CREATE_ORDER_ENDPOINT,
  USER_GET_ALL_ORDERS_ENDPOINT,
  USER_GET_DETAIL_ORDER_ENDPOINT
} from '../constants/endpoints';
import { getUserToken } from '../utils/userAuth';
import instanceAxios from './base';

class OrderAPI {
  static async createOrder(data) {
    const token = getUserToken();
    const response = await instanceAxios.post(
      USER_CREATE_ORDER_ENDPOINT,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  }

  static async userGetAllOrders(page = 1) {
    const token = getUserToken();
    const response = await instanceAxios.get(
      `${USER_GET_ALL_ORDERS_ENDPOINT}?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  }

  static async userGetDetailOrder(id) {
    const token = getUserToken();
    const response = await instanceAxios.get(
      `${USER_GET_DETAIL_ORDER_ENDPOINT}${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  }
}

export default OrderAPI;

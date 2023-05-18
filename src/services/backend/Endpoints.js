import { api } from "boot/axios";
import { useShowStore } from "src/stores/showstore";

class ListApi {
  static async get() {
    return api.get();
  }

  static async show(id) {
    const { data } = await api.get(`/${id}`);
    useShowStore().showData(data.data);
    return data;
  }

  static async create(form) {
    const { data } = await api.post("/", form);
    return data;
  }

  static async update(id, form) {
    const { data } = await api.put(`${id}`, form);
    return data;
  }

  static async delete(id) {
    const { data } = await api.delete(`/${id}`);
    return data;
  }
}

export default ListApi;

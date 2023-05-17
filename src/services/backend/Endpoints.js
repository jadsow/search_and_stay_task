import { api } from 'boot/axios'
import { useShowStore } from 'src/stores/showstore'


class ListApi {
  static async get () {
    return api.get()
  }

  static async show (id) {
    const {data} = await api.get(`/${id}`)
    useShowStore().showData(data.data)
    return data
  }
}

export default ListApi

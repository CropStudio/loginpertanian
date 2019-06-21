/*
export function someAction (context) {
}
*/
import { axiosInstance } from 'boot/axios'
const qs = require('querystring')
import { Cookies } from 'quasar'
export function simpan ({ commit }, payload) {
  return new Promise((resolve, reject) => {
    axiosInstance.defaults.headers.common['token'] = Cookies.get('token')
    axiosInstance.post('pupuk', qs.stringify({
      kode: payload.kode,
      nama_pupuk: payload.nama_pupuk,
      jenis_pupuk: payload.jenis_pupuk,
      harga: payload.harga,
      tipe: payload.tipe
    }))
      .then(({ data }) => {
        resolve(data)
      })
      .catch(() => {
        reject()
      })
  })
}
export function editsimpan ({ commit }, payload) {
  return new Promise((resolve, reject) => {
    axiosInstance.defaults.headers.common['token'] = Cookies.get('token')
    axiosInstance.put('pupuk/' + payload._id, qs.stringify({
      kode: payload.kode,
      nama_pupuk: payload.nama_pupuk,
      jenis_pupuk: payload.jenis_pupuk,
      harga: payload.harga,
      tipe: payload.tipe
    }))
      .then(({ data }) => {
        resolve(data)
      })
      .catch(() => {
        reject()
      })
  })
}
export function delet ({ commit }, payload) {
  return new Promise((resolve, reject) => {
    axiosInstance.defaults.headers.common['token'] = Cookies.get('token')
    axiosInstance.delete('pupuk/' + payload._id)
      .then(({ data }) => {
        resolve(data)
      })
      .catch(() => {
        reject()
      })
  })
}
export function show ({ commit }, payload) {
  return new Promise((resolve, reject) => {
    axiosInstance.defaults.headers.common['token'] = Cookies.get('token')
    axiosInstance.get('pupuk/' + payload.id)
      .then((response) => {
        resolve(response)
      })
      .catch((response) => {
        reject()
      })
  })
}

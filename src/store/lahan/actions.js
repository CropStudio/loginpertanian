/*
export function someAction (context) {
}
*/
import { axiosInstance } from 'boot/axios'
const qs = require('qs')
import { Cookies } from 'quasar'
export function simpan ({ commit }, payload) {
  return new Promise((resolve, reject) => {
    axiosInstance.defaults.headers.common['token'] = Cookies.get('token')
    axiosInstance.post('lahan', qs.stringify({
      ktp: payload.form.ktp,
      alamat_lahan: payload.form.alamat_lahan,
      kepemilikan: payload.form.kepemilikan,
      jenis_lahan: payload.form.jenis_lahan,
      luas_lahan: payload.form.luas_lahan,
      peruntukan: payload.form.peruntukan
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
    axiosInstance.put('lahan/' + payload.form._id, qs.stringify({
      ktp: payload.form.ktp,
      alamat_lahan: payload.form.alamat_lahan,
      kepemilikan: payload.form.kepemilikan,
      jenis_lahan: payload.form.jenis_lahan,
      luas_lahan: payload.form.luas_lahan,
      peruntukan: payload.form.peruntukan
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
    axiosInstance.delete('lahan/' + payload._id)
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
    axiosInstance.get('lahan/' + payload.id)
      .then((response) => {
        resolve(response)
      })
      .catch((response) => {
        reject()
      })
  })
}

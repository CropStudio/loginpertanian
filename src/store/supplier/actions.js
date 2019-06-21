/*
export function someAction (context) {
}
*/
import { axiosInstance } from 'boot/axios'
import { Cookies } from 'quasar'
const qs = require('qs/lib')
export function simpan ({ commit }, payload) {
  return new Promise((resolve, reject) => {
    axiosInstance.defaults.headers.common['token'] = Cookies.get('token')
    axiosInstance.post('supplier', qs.stringify({
      kodesup: payload.form.kodesup,
      namasup: payload.form.namasup,
      penanggung_jawab: payload.form.penanggung_jawab,
      alamat: payload.form.alamat,
      notelp: payload.form.notelp
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
    axiosInstance.put('supplier/' + payload.form._id, qs.stringify({
      kodesup: payload.form.kodesup,
      namasup: payload.form.namasup,
      penanggung_jawab: payload.form.penanggung_jawab,
      alamat: payload.form.alamat,
      notelp: payload.form.notelp
    }))
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
    axiosInstance.get('supplier/' + payload.id)
      .then((response) => {
        resolve(response)
      })
      .catch((response) => {
        reject()
      })
  })
}
export function delet ({ commit }, payload) {
  return new Promise((resolve, reject) => {
    axiosInstance.defaults.headers.common['token'] = Cookies.get('token')
    axiosInstance.delete('supplier/' + payload.form._id)
      .then(({ data }) => {
        resolve(data)
      })
      .catch(() => {
        reject()
      })
  })
}

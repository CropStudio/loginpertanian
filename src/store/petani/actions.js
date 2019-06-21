/*
export function someAction (context) {
}
*/
import { axiosInstance } from 'boot/axios'
import { Cookies } from 'quasar'
const qs = require('qs')
export function simpan ({ commit }, payload) {
  return new Promise((resolve, reject) => {
    axiosInstance.defaults.headers.common['token'] = Cookies.get('token')
    axiosInstance.post('petani', qs.stringify({
      ktp: payload.form.ktp,
      nama: payload.form.nama,
      tempat_lahir: payload.form.tempat_lahir,
      tanggal_lahir: payload.form.tanggal_lahir,
      jenis_kelamin: payload.form.jenis_kelamin,
      pendidikan: payload.form.pendidikan,
      status_keluarga: payload.form.status_keluarga,
      alamat: payload.form.alamat,
      no_hp: payload.form.no_hp,
      namakelopoktani: payload.form.nama_kelompok_petani
    }))
      .then((response) => {
        resolve(response)
      })
      .catch(() => {
        reject()
      })
  })
}
export function editsimpan ({ commit }, payload) {
  return new Promise((resolve, reject) => {
    axiosInstance.defaults.headers.common['token'] = Cookies.get('token')
    axiosInstance.put('petani/' + payload.form._id, qs.stringify({
      ktp: payload.form.ktp,
      nama: payload.form.nama,
      tempat_lahir: payload.form.tempat_lahir,
      tanggal_lahir: payload.form.tanggal_lahir,
      jenis_kelamin: payload.form.jenis_kelamin,
      pendidikan: payload.form.pendidikan,
      status_keluarga: payload.form.status_keluarga,
      alamat: payload.form.alamat,
      no_hp: payload.form.no_hp,
      namakelopoktani: payload.form.nama_kelompok_petani
    }))
      .then((response) => {
        resolve(response)
      })
      .catch(() => {
        reject()
      })
  })
}
export function hapus ({ commit }, payload) {
  return new Promise((resolve, reject) => {
    axiosInstance.defaults.headers.common['token'] = Cookies.get('token')
    axiosInstance.delete('petani/' + payload._id)
      .then((response) => {
        resolve(response)
      })
      .catch(() => {
        reject()
      })
  })
}
export function show ({ commit }, payload) {
  axiosInstance.defaults.headers.common['token'] = Cookies.get('token')
  return new Promise((resolve, reject) => {
    axiosInstance.get('petani/' + payload.id)
      .then((response) => {
        resolve(response)
      })
      .catch((response) => {
        reject()
      })
  })
}

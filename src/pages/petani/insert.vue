<template>
    <q-page padding>
        <q-form
                @submit="onSubmit"
                @reset="onReset"
                class="q-gutter-md"
        >
            <q-input
                    filled
                    v-model="data.ktp"
                    label="KTP"
                    hint="Kartu tanda Penduduk"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type your KTP']"
            />
            <q-input
                    filled
                    v-model="data.nama"
                    label="NAMA"
                    hint="NAMA"
            />
            <q-input
                    filled
                    v-model="data.tempat_lahir"
                    label="Tempat Lahir"
                    hint="Tempat Lahir"
            />
            <q-input
                    filled
                    v-model="data.tanggal_lahir"
                    hint="Tanggal Lahir"
                    type="datetime"
            />
            <q-input
                    filled
                    v-model="data.jenis_kelamin"
                    label="Jenis Kelamin"
                    hint="Jenis Kelamin"
            />
            <q-input
                    filled
                    v-model="data.pendidikan"
                    label="Pendidikan"
                    hint="Pendidikan"
            />
            <q-input
                    filled
                    v-model="data.status_keluarga"
                    label="Status Keluarga"
                    hint="Status Keluarga"
            />
            <q-input
                    filled
                    v-model="data.alamat"
                    label="Alamat"
                    hint="Alamat"
            />
            <q-input
                    filled
                    v-model="data.no_hp"
                    label="No Handphone"
                    hint="No Handphone"
            />
            <q-input
                    filled
                    v-model="data.nama_kelompok_petani"
                    label="Nama Kelompok Tani"
                    hint="Nama Kelompok Tani"
            />

            <div>
                <q-btn label="Submit" type="submit" color="primary"/>
                <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
        </q-form>
    </q-page>
</template>
<script>
export default {
  data () {
    return {
      data: {},
      id: this.$route.params.id
    }
  },
  methods: {
    onSubmit () {
      if (this.$route.params.id) {
        // ini fungsi simpan edit
        this.$q.loading.show()
        this.$store.dispatch({
          type: 'petani/editsimpan',
          _id: this.data._id,
          ktp: this.data.ktp,
          nama: this.data.nama,
          tempat_lahir: this.data.tempat_lahir,
          tanggal_lahir: this.data.tanggal_lahir,
          jenis_kelamin: this.data.jenis_kelamin,
          pendidikan: this.data.pendidikan,
          status_keluarga: this.data.status_keluarga,
          alamat: this.data.alamat,
          no_hp: this.data.no_hp,
          nama_kelompok_petani: this.data.nama_kelompok_petani
        })
          .then((response) => {
            this.$q.loading.hide()
            if (response.status) {
              this.loadData()
              this.$q.notify({
                message: 'Berhasil simpan',
                color: 'positive',
                icon: 'checkmark'
              })
            } else {
              this.$q.notify({
                message: 'Gagal simpan',
                color: 'negative',
                icon: 'close'
              })
            }
          })
      } else {
        // ini fungsi simpan
        this.$q.loading.show()
        this.$store.dispatch({
          type: 'petani/simpan',
          ktp: this.data.ktp,
          nama: this.data.nama,
          tempat_lahir: this.data.tempat_lahir,
          tanggal_lahir: this.data.tanggal_lahir,
          jenis_kelamin: this.data.jenis_kelamin,
          pendidikan: this.data.pendidikan,
          status_keluarga: this.data.status_keluarga,
          alamat: this.data.alamat,
          no_hp: this.data.no_hp,
          nama_kelompok_petani: this.data.nama_kelompok_petani
        })
          .then((response) => {
            this.$q.loading.hide()
            if (response.status) {
              this.$q.notify({
                message: 'Berhasil simpan',
                color: 'positive',
                icon: 'checkmark'
              })
            } else {
              this.$q.notify({
                message: 'Gagal simpan',
                color: 'negative',
                icon: 'close'
              })
            }
          })
      }
    },
    onReset () {
      this._id = null
      this.ktp = null
      this.nama = null
      this.tempat_lahir = null
      this.tanggal_lahir = null
      this.jenis_kelamin = null
      this.pendidikan = null
      this.status_keluarga = null
      this.alamat = null
      this.no_hp = null
      this.nama_kelompok_petani = null
      this.accept = false
    }
  },
  mounted () {
    if (this.$route.params.id) {
      this.$axios.get('petani/' + this.$route.params.id)
        .then((response) => {
          if (response.data.status) {
            this.data = response.data.message
          } else {
            this.$q.notify({
              color: 'negative',
              message: 'Gagal mendapatkan data',
              icon: 'close'
            })
          }
        })
    }
  }
}
</script>

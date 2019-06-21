<template>
  <q-page padding>
    <p v-if="!id">Ini Tambah</p>
    <p v-else>Ini Edit Data : {{id}}</p>
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="data.kodesup"
        label="ID Supplier"
        hint="id_supplier"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type your Id Supplier']"
      />
      <q-input
        filled
        v-model="data.namasup"
        label="Nama Supplier"
        hint="Nama"
      />
      <q-input
        filled
        v-model="data.penanggung_jawab"
        label="Penanggung Jawab Perusahaan"
        hint="Penanggung Jawab Perusahaan"
      />
      <q-input
        filled
        v-model="data.alamat"
        label="Alamat"
        hint="Alamat"
      />
      <q-input
        filled
        v-model="data.notelp"
        label="No Telpon"
        hint="no notelp"
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
          type: 'supplier/editsimpan',
          _id: this.data._id,
          kodesup: this.data.kodesup,
          namasup: this.data.namasup,
          penanggung_jawab: this.data.penanggung_jawab,
          alamat: this.data.alamat,
          notelp: this.data.notelp
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
      } else {
        // ini fungsi simpan
        this.$q.loading.show()
        this.$store.dispatch({
          type: 'supplier/simpan',
          kodesup: this.data.kodesup,
          namasup: this.data.namasup,
          penanggung_jawab: this.data.penanggung_jawab,
          alamat: this.data.alamat,
          notelp: this.data.notelp
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
      this.kodesup = null
      this.namasup = null
      this.penanggung_jawab = null
      this.alamat = null
      this.notelp = null
      this.accept = false
    }
  },
  mounted () {
    if (this.$route.params.id) {
      this.$axios.get('supplier/' + this.$route.params.id)
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

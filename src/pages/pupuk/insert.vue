<template>
    <q-page padding>
        <q-form
                @submit="onSubmit"
                class="q-gutter-md"
        >
            <q-input
                    filled
                    v-model="data.kode"
                    label="Kode Pupuk"
                    hint="Tidak Boleh Kosong"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'kode harus di isi']"
            />

            <q-input
                    filled
                    v-model="data.nama_pupuk"
                    label="Nama Pupuk"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Mohon isi Nama Pupuknya']"
            />

            <q-input
                    filled
                    v-model="data.jenis_pupuk"
                    label="Jenis Pupuk"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Mohon isi Jenis Pupuknya']"
            />
            <q-input
                    filled
                    v-model="data.harga"
                    label="Harga Pupuk"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Mohon isi Harga Pupuknya']"
            />
            <q-select filled v-model="data.tipe" :options="options" label="Tipe pupuk" />
            <div>
                <q-btn label="Submit" type="submit" color="primary"/>
            </div>
        </q-form>
    </q-page>
</template>
<script>
export default {
  data () {
    return {
      data: {},
      model: '',
      kode: '',
      nama_pupuk: '',
      jenis_pupuk: '',
      harga: '',
      id: this.$route.params.id,
      options: [
        'Cair', 'Padat'
      ]
    }
  },
  methods: {
    onSubmit () {
      if (this.$route.params.id) {
        // ini fungsi simpan edit
        this.$q.loading.show()
        this.$store.dispatch({
          type: 'pupuk/editsimpan',
          _id: this.data._id,
          kode: this.data.kode,
          nama_pupuk: this.data.nama_pupuk,
          jenis_pupuk: this.data.jenis_pupuk,
          harga: this.data.harga,
          tipe: this.data.tipe
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
          type: 'pupuk/simpan',
          kode: this.data.kode,
          nama_pupuk: this.data.nama_pupuk,
          jenispupuk: this.data.jenis_pupuk,
          harga: this.data.harga,
          tipe: this.data.tipe
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
    }
  },
  mounted () {
    if (this.$route.params.id) {
      this.$axios.get('pupuk/' + this.$route.params.id)
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

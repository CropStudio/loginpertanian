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
                    label="Kartu Tanda Penduduk"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type your No KTP']"
            />
            <q-input
                    filled
                    v-model="data.alamat_lahan"
                    label="Alamat Lahan"
            />
            <q-select filled v-model="data.kepemilikan" :options="options" label="Kepemilikan" />
            <q-input
                    filled
                    v-model="data.jenis_lahan"
                    label="Jenis Lahan"
            />
            <q-input
                    filled
                    v-model="data.luas_lahan"
                    label="Luas Lahan"
            />
            <q-input
                    filled
                    v-model="data.peruntukan"
                    label="Peruntukan"
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
      id: this.$route.params.id,
      model: null,
      options: [
        'Sewa', 'Bagi Hasil', 'Gadai', 'Waris', 'Titisari', 'Pribadi'
      ]
    }
  },
  methods: {
    onSubmit () {
      if (this.$route.params.id) {
        // ini fungsi simpan edit
        this.$q.loading.show()
        this.$store.dispatch({
          type: 'lahan/editsimpan',
          _id: this.data._id,
          ktp: this.data.ktp,
          alamat_lahan: this.data.alamat_lahan,
          kepemilikan: this.data.kepemilikan,
          jenis_lahan: this.data.jenis_lahan,
          luas_lahan: this.data.luas_lahan,
          peruntukan: this.data.peruntukan

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
          type: 'lahan/simpan',
          ktp: this.data.ktp,
          alamat_lahan: this.data.alamat_lahan,
          kepemilikan: this.data.kepemilikan,
          jenis_lahan: this.data.jenis_lahan,
          luas_lahan: this.data.luaslahan,
          peruntukan: this.data.peruntukan
        })
          .then((response) => {
            this.$q.loading.hide()
            if (response.status) {
              this.closeDialog()
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
      }
    },
    onReset () {
      this.ktp = null
      this.alamat_lahan = null
      this.kepemilikan = null
      this.jenis_lahan = null
      this.luas_lahan = null
      this.peruntukan = null
      this.accept = false
    }
  },
  mounted () {
    if (this.$route.params.id) {
      this.$axios.get('lahan/' + this.$route.params.id)
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

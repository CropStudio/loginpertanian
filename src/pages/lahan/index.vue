<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="q-pa-md">
        <q-table
                title="lahan" :data="data" :columns="columns" row-key="ktp" :loading="loading" selection="multiple" :selected.sync="selected"
        >
            <template v-slot:top="props">
                <div class="col-4 q-table__title">Data Lahan</div>
                <q-space/>
                <q-input outlined dense debounce="300" color="primary" v-model.trim="filter">
                    <template v-slot:append>
                        <q-icon name="search"/>
                    </template>
                </q-input>
                <q-btn
                        icon="add"
                        unelevated
                        label="Tambah"
                        size="sm"
                        class="q-ml-xs q-mr-xs q-pa-sm bg-green-5 text-white"
                        dense
                        @click="tambah()"
                />
            </template>
            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td class="bg-grey-3" auto-width>
                        <q-toggle dense v-model="props.selected"/>
                    </q-td>
                    <q-td key="ktp" :props="props">
                        {{ props.row.ktp }}
                        <q-btn dense round flat :icon="props.expand ? 'arrow_drop_up' : 'arrow_drop_down'" @click="props.expand = !props.expand" />
                    </q-td>
                    <q-td key="alamatlahan" :props="props">{{ props.row.alamat_lahan }}</q-td>
                    <q-td key="kepemilikan" :props="props">{{ props.row.kepemilikan }}</q-td>
                    <q-td key="jenislahan" :props="props">{{ props.row.jenis_lahan }}</q-td>
                    <q-td key="luaslahan" :props="props">{{ props.row.luas_lahan }}</q-td>
                    <q-td key="peruntukan" :props="props">{{ props.row.peruntukan }}</q-td>
                </q-tr>
                <q-tr v-show="props.expand" :props="props">
                    <q-td colspan="100%">
                        <div class="text-center q-gutter-sm">
                            <q-btn
                                    dense
                                    size="sm"
                                    class="bg-red text-white q-pl-sm q-pr-sm"
                                    icon="ion-trash"
                                    @click="delet(props.row._id)"
                            >delete</q-btn>
                            <q-btn
                                    dense
                                    size="sm"
                                    class="bg-light-blue text-white q-pl-sm q-pr-sm"
                                    icon="ion-create"
                                    @click="edit(props.row._id)"
                            >edit</q-btn>
                        </div>
                    </q-td>
                </q-tr>
            </template>

        </q-table>
        <q-dialog v-model="action" transition-show="rotate" transition-hide="rotate">
            <q-card style="width: 700px; max-width: 80vw;">
                <q-card-section>
                    <div class="text-h6">Silahkan Tambah Data</div>
                <q-form
                        @submit="onSubmit"
                        class="q-gutter-md"
                >
                    <q-input
                            filled
                            v-model="form.ktp"
                            label="Kartu Tanda Penduduk"
                            lazy-rules
                            :rules="[ val => val && val.length > 0 || 'Please type your No KTP']"
                    />
                    <q-input
                            filled
                            v-model="form.alamat_lahan"
                            label="Alamat Lahan"
                    />
                    <q-select filled v-model="form.kepemilikan" :options="options" label="Kepemilikan" />
                    <q-input
                            filled
                            v-model="form.jenis_lahan"
                            label="Jenis Lahan"
                    />
                    <q-input
                            filled
                            v-model="form.luas_lahan"
                            label="Luas Lahan"
                    />
                    <q-input
                            filled
                            v-model="form.peruntukan"
                            label="Peruntukan"
                    />

                    <div>
                        <q-btn label="Submit" type="submit" color="primary"/>
                        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
                    </div>
                </q-form>

                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Decline" color="primary" v-close-popup />
                    <q-btn flat label="Accept" color="primary" v-close-popup />
                </q-card-actions>

            </q-card>
        </q-dialog>
    </div>
</template>
<script>
export default {
  data () {
    return {
      form: {},
      text: '',
      action: false,
      fixed: false,
      editMode: false,
      options: [
        'Sewa', 'Bagi Hasil', 'Gadai', 'Waris', 'Titisari', 'Pribadi'
      ],
      id: this.$route.params.id,
      selected: [],
      columns: [
        {
          name: 'ktp',
          required: true,
          label: 'Kartu Tanda Penduduk',
          align: 'left',
          field: row => row.ktp,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'alamatlahan', align: 'center', label: 'Alamat Lahan', field: 'alamat_lahan', sortable: true },
        { name: 'kepemilikan', label: 'Kepemilikan', field: 'kepemilikan', sortable: true, style: 'width: 10px' },
        { name: 'jenislahan', label: 'Jenis Lahan', field: 'jenis_lahan' },
        { name: 'luaslahan', label: 'Luas Lahan', field: 'luas_lahan' },
        { name: 'peruntukan', label: 'Peruntukan', field: 'peruntukan' }
      ],
      data: [],
      loading: false,
      filter: ''
    }
  },
  methods: {
    closeDialog () {
      this.action = false
      this.editMode = false
      this.form = {}
    },
    delet (_id) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Yakin mau dihapus?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$q.loading.show()
        this.$store.dispatch({
          type: 'lahan/delet',
          _id: _id
        })
          .then((response) => {
            this.$q.loading.hide()
            if (response.status) {
              this.loadData()
              this.$q.notify({
                message: 'Berhasil dihapus',
                color: 'positive',
                icon: 'checkmark'
              })
            } else {
              this.$q.notify({
                message: 'Gagal hapus',
                color: 'negative',
                icon: 'close'
              })
            }
          })
      })
    },
    tambah () {
      this.action = true
      this.editMode = false
    },
    loadData () {
      this.loading = true
      this.$axios.get('lahan').then(({ data }) => {
        this.loading = false
        if (data.status) {
          this.data = data.message
          console.log(data)
        } else {
          this.$q.notify({
            message: 'Gagal load data/tidak ada data!',
            color: 'negative',
            icon: 'close'
          })
        }
      })
    },
    edit (id) {
      this.loadingAction = true
      this.editMode = true
      this.action = true
      this.$store.dispatch({
        type: 'lahan/show',
        id: id
      })
        .then((response) => {
          this.loadingAction = false
          this.form = response.data.message
        })
    },
    onSubmit () {
      if (this.editMode) {
        // ini fungsi simpan edit
        this.$q.loading.show()
        this.$store.dispatch({
          type: 'lahan/editsimpan',
          form: this.form
        })
          .then((response) => {
            this.$q.loading.hide()
            if (response.status) {
              this.loadData()
              this.closeDialog()
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
          form: this.form
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
    }
  },
  mounted () {
    this.loadData()
    if (this.$route.params.id) {
      this.$axios.defaults.headers.common['token'] = this.$q.cookies.get('token')
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

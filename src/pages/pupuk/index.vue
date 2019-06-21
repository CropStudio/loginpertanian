<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="q-pa-md">
        <q-table
                title="Pupuk"
                :data="data"
                :columns="columns"
                row-key="kode"
                :loading="loading"
                selection="multiple"
                :selected.sync="selected"
                :filter="filter"
        >
            <template v-slot:top="props">
                <div class="col-4 q-table__title">Data Pupuk</div>
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
                    <q-td key="kode" :props="props">
                        {{ props.row.kode }}
                        <q-btn dense round flat :icon="props.expand ? 'arrow_drop_up' : 'arrow_drop_down'" @click="props.expand = !props.expand" />
                    </q-td>
                    <q-td key="nama_pupuk" :props="props">{{ props.row.nama_pupuk }}</q-td>
                    <q-td key="jenis_pupuk" :props="props">{{ props.row.jenis_pupuk }}</q-td>
                    <q-td key="harga" :props="props">{{ props.row.harga }}</q-td>
                    <q-td key="tipe" :props="props">{{ props.row.tipe }}</q-td>
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
                            > delete</q-btn>
                            <q-btn
                                    dense
                                    size="sm"
                                    class="bg-light-blue text-white q-pl-sm q-pr-sm"
                                    icon="ion-create"
                                    @click="edit(props.row._id)"
                            >&nbsp;edit</q-btn>
                        </div>
                    </q-td>
                </q-tr>
            </template>

        </q-table>
        <q-dialog v-model="action" transition-show="rotate" transition-hide="rotate" >
            <q-card style="width: 700px; max-width: 80vw;">
                <q-card-section>
                    <div class="text-h6">Data Pupuk</div>
                </q-card-section>

                <q-card-section>
                    <q-form
                            @submit="onSubmit"
                            class="q-gutter-md"
                    >
                        <q-input
                                filled
                                v-model="form.kode"
                                label="Kode Pupuk"
                                hint="Tidak Boleh Kosong"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'kode harus di isi']"
                        />

                        <q-input
                                filled
                                v-model="form.nama_pupuk"
                                label="Nama Pupuk"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Mohon isi Nama Pupuknya']"
                        />

                        <q-input
                                filled
                                v-model="form.jenis_pupuk"
                                label="Jenis Pupuk"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Mohon isi Jenis Pupuknya']"
                        />
                        <q-input
                                filled
                                v-model="form.harga"
                                label="Harga Pupuk"
                                type="number"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Mohon isi Harga Pupuknya']"
                        />
                        <q-select filled v-model="form.tipe" :options="options" label="Tipe pupuk" />
                        <div>
                            <q-btn label="Submit" type="submit" color="primary"/>
                        </div>
                    </q-form>
                </q-card-section>

            </q-card>
        </q-dialog>
    </div>
</template>
<script>
export default {
  data () {
    return {
      text: '',
      action: false,
      fixed: false,
      id: this.$route.params.id,
      selected: [],
      options: [
        'Cair', 'Padat'
      ],
      columns: [
        {
          name: 'kode',
          required: true,
          label: 'Kode Pupuk',
          align: 'left',
          field: row => row.kode,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'nama_pupuk', align: 'center', label: 'Nama Pupuk', field: 'nama_pupuk', sortable: true },
        { name: 'jenis_pupuk', label: 'Jenis Pupuk', field: 'jenis_pupuk', sortable: true, style: 'width: 10px' },
        { name: 'harga', label: 'Harga Pupuk', field: 'harga' },
        { name: 'tipe', label: 'Tipe Pupuk', field: 'tipe' }
      ],
      data: [],
      loading: false,
      filter: '',
      form: {},
      editMode: false,
      loadingAction: false
    }
  },
  methods: {
    closeDialog () {
      this.action = false
      this.editMode = false
      this.form = {}
    },
    tambah () {
      this.action = true
      this.editMode = false
    },
    edit (id) {
      this.loadingAction = true
      this.editMode = true
      this.action = true
      console.log(id)
      this.$store.dispatch({
        type: 'pupuk/show',
        id: id
      })
        .then((response) => {
          this.loadingAction = false
          this.form = response.data.message
        })
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
          type: 'pupuk/delet',
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
    loadData () {
      this.loading = true
      this.$axios.defaults.headers.common['token'] = this.$q.cookies.get('token')
      this.$axios.get('pupuk').then(({ data }) => {
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
    onSubmit () {
      if (this.editMode) {
        // ini fungsi simpan edit
        this.$q.loading.show()
        this.$store.dispatch({
          type: 'pupuk/editsimpan',
          _id: this.form._id,
          kode: this.form.kode,
          nama_pupuk: this.form.nama_pupuk,
          jenis_pupuk: this.form.jenis_pupuk,
          harga: this.form.harga,
          tipe: this.form.tipe
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
      } else {
        // ini fungsi simpan
        this.$q.loading.show()
        this.$store.dispatch({
          type: 'pupuk/simpan',
          kode: this.form.kode,
          nama_pupuk: this.form.nama_pupuk,
          jenis_pupuk: this.form.jenis_pupuk,
          harga: this.form.harga,
          tipe: this.form.tipe
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

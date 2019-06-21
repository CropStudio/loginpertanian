<template>
    <q-page padding>
        <div class="row">
            <div class="col">
                <q-table
                        :data="data"
                        :columns="columns"
                        row-key="ktp"
                        :selected.sync="terpilih"
                        selection="multiple"
                        :loading="loading"
                        :filter="filter"
                >
                    <template v-slot:top>
                        <span class="text-h5 text-weight-light">Data Petani</span>
                        <q-space></q-space>
                        <q-input outlined dense debounce="300" color="primary" v-model.trim="filter">
                            <template v-slot:append>
                                <q-icon name="search"/>
                            </template>
                        </q-input>
                        <q-btn
                                icon="ion-add"
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
                            <q-td auto-width>
                                <q-toggle dense v-model="props.selected"/>
                            </q-td>
                            <q-td key="ktp" :props="props">
                                {{ props.row.ktp }}
                                <q-btn dense round flat :icon="props.expand ? 'arrow_drop_up' : 'arrow_drop_down'" @click="props.expand = !props.expand" />
                            </q-td>
                            <q-td key="nama" :props="props">{{ props.row.nama }}</q-td>
                            <q-td key="tempat_lahir" :props="props">{{ props.row.tempat_lahir }}</q-td>
                            <q-td key="tanggal_lahir" :props="props">{{ props.row.tanggal_lahir }}</q-td>
                            <q-td key="jenis_kelamin" :props="props">{{ props.row.jenis_kelamin }}</q-td>
                            <q-td key="pendidikan" :props="props">{{ props.row.pendidikan }}</q-td>
                            <q-td key="status_keluarga" :props="props">{{ props.row.status_keluarga }}</q-td>
                            <q-td key="alamat" :props="props">{{ props.row.alamat }}</q-td>
                            <q-td key="no_hp" :props="props">{{ props.row.no_hp }}</q-td>
                            <q-td key="nama_kelompok_petani" :props="props">{{ props.row.nama_kelompok_petani }}</q-td>
                        </q-tr>
                        <q-tr v-show="props.expand" :props="props">
                            <q-td colspan="100%">
                                <div class="text-left q-gutter-x-xs">
                                    <q-btn color="primary" dense size="sm" class="q-px-xs" icon="edit" @click="edit(props.row._id)" label="Edit"/>
                                    <q-btn
                                            color="red"
                                            dense
                                            size="sm"
                                            @click="hapus(props.row._id)"
                                            class="q-px-xs"
                                            icon="delete"
                                            label="Delete"
                                    />
                                </div>
                            </q-td>
                        </q-tr>
                    </template>
                </q-table>
            </div>
        </div>
        <q-dialog v-model="action" persistent>
            <q-card style="width: 500px; max-width: 80vw;">
                <q-card-section class="row items-center">
                    <div class="text-h6">{{ editMode ? 'Edit Data Pengguna' : 'Tambah Data Pengguna'}}</div>
                    <q-space/>
                    <q-btn icon="close" flat round dense @click="closeDialog()"/>
                </q-card-section>

                <q-separator/>
                <q-form @submit="onSubmit">
                    <q-card-section style="max-height: 50vh" class="scroll">
                        <q-input
                                outlined
                                dense
                                maxlength="12"
                                v-model="form.ktp"
                                label="Kartu Tanda Penduduk"
                                :rules="[
                  val => !!val || 'KTP dibutuhkan'
                  ]"
                        ></q-input>
                        <q-input
                                outlined
                                dense
                                maxlength="50"
                                v-model="form.nama"
                                label="Nama Lengkap"
                                :rules="[
                  val => !!val || 'Nama Lengkap dibutuhkan'
                  ]"
                        ></q-input>
                        <q-input
                                outlined
                                dense
                                type="text"
                                v-model="form.tempat_lahir"
                                maxlength="50"
                                label="Tempat Lahir"
                                :rules="[
                  val => !!val || 'Tempat Lahir dibutuhkan'
                  ]"
                        ></q-input>
                        <q-input outlined v-model="form.tanggal_lahir" mask="date" :rules="['date']" label="Tanggal Lahir">
                            <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy ref ="qDateProxy" transition-show="scale" transition-hide="scale">
                                        <q-date v-model="form.tanggal_lahir" @input="() => $refs.qDateProxy.hide()" />
                                        </q-popup-proxy>
                                    </q-icon>
                                </template>
                        ></q-input>
                        <q-select
                                outlined v-model="form.jenis_kelamin"
                                :options="['Perempuan', 'Laki-Laki']"
                                label="Jenis Kelamin"
                                :rules="[
                  val => !!val || 'Status Keluarga dibutuhkan'
                  ]"/>
                        <q-input
                                outlined
                                dense
                                type="text"
                                v-model="form.status_keluarga"
                                label="Status Keluarga"
                                :rules="[
                  val => !!val || 'Status Keluarga dibutuhkan'
                  ]"
                        ></q-input>
                        <q-input
                                outlined
                                dense
                                type="text"
                                v-model="form.alamat"
                                label="Alamat"
                                :rules="[
                  val => !!val || 'Alamat dibutuhkan'
                  ]"
                        ></q-input>
                        <q-select outlined v-model="form.pendidikan"
                                  :options="['Tidak Sekolah', 'SD', 'SMP', 'SMA', 'S1', 'S2', 'S3']"
                                  label="Pendidikan"
                                  :rules="[
                  val => !!val || 'No Handphone dibutuhkan'
                  ]"/>
                        <q-input
                                outlined
                                dense
                                type="number"
                                v-model="form.no_hp"
                                label="No Handphone"
                                :rules="[
                  val => !!val || 'No Handphone dibutuhkan'
                  ]"
                        ></q-input>
                        <q-input
                                outlined
                                dense
                                type="text"
                                v-model="form.nama_kelompok_petani"
                                label="Nama Kelompok Petani"
                                :rules="[
                  val => !!val || 'Nama Kelompok Tani dibutuhkan'
                  ]"
                        ></q-input>
                    </q-card-section>
                    <q-separator/>

                    <q-card-actions align="right">
                        <q-btn flat label="Simpan" type="submit" color="primary"/>
                    </q-card-actions>
                </q-form>
                <q-inner-loading :showing="loadingAction">
                    <q-spinner-dots size="50px" color="primary"/>
                </q-inner-loading>
            </q-card>
        </q-dialog>
    </q-page>
</template>
<script>
export default {
  data () {
    return {
      // tabel
      data: [],
      loading: false,
      filter: '',
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
        { name: 'nama', align: 'center', label: 'Nama Petani', field: 'nama', sortable: true },
        { name: 'tempat_lahir', label: 'Tempat Lahir', field: 'tempatlahir', sortable: true, style: 'width: 10px' },
        { name: 'tanggal_lahir', label: 'Tanggal Lahir', field: 'tanggallahir' },
        { name: 'jenis_kelamin', label: 'Jenis Kelamin', field: 'jeniskelamin' },
        { name: 'pendidikan', label: 'Pendidikan', field: 'pendidikan' },
        { name: 'status_keluarga', label: 'Status keluarga', field: 'statuskeluarga', sortable: true },
        { name: 'alamat', label: 'Alamat', field: 'alamat', sortable: true },
        { name: 'no_hp', label: 'No HP', field: 'nohp', sortable: true },
        { name: 'nama_kelompok_petani', label: 'Nama Kelompok Tani', field: 'nama_kelompok_petani', sortable: true }
      ],
      terpilih: [],
      // Dialog Action
      editMode: false,
      action: false,
      form: {},
      loadingAction: false
    }
  },
  methods: {
    hapus (_id) {
      this.$q
        .dialog({
          title: 'Konfirmasi Hapus',
          message: 'Ingin menghapus username: ' + _id + '?',
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.$q.loading.show()
          this.$store
            .dispatch({
              type: 'petani/hapus',
              _id: _id
            })
            .then(response => {
              this.$q.loading.hide()
              if (response.data.status) {
                this.loadData()
                this.$q.notify({
                  color: 'positive',
                  message: response.data.message,
                  icon: 'ion-checkmark'
                })
              } else {
                this.$q.notify({
                  color: 'negative',
                  icon: 'ion-close',
                  message: response.data.message
                })
              }
            })
        })
    },
    onSubmit () {
      this.$q.loading.show()
      if (!this.editMode) {
        // ini fungsi simpan ke database
        this.$store.dispatch({
          type: 'petani/simpan',
          form: this.form
        })
          .then((response) => {
            this.$q.loading.hide()
            if (response.data.status) {
              this.closeDialog()
              this.loadData()
              this.$q.notify({
                color: 'positive',
                message: response.data.message,
                icon: 'ion-checkmark'
              })
            } else {
              this.$q.notify({
                color: 'negative',
                message: response.data.message,
                icon: 'ion-close'
              })
            }
          })
      } else {
        // ini fungsi edit ke database
        this.$store.dispatch({
          type: 'petani/editsimpan',
          form: this.form
        })
          .then((response) => {
            this.$q.loading.hide()
            if (response.data.status) {
              this.closeDialog()
              this.loadData()
              this.$q.notify({
                color: 'positive',
                message: response.data.message,
                icon: 'ion-checkmark'
              })
            } else {
              this.$q.notify({
                color: 'negative',
                message: response.data.message,
                icon: 'ion-close'
              })
            }
          })
      }
    },
    edit (id) {
      this.loadingAction = true
      this.editMode = true
      this.action = true
      this.$store.dispatch({
        type: 'petani/show',
        id: id
      })
        .then((response) => {
          this.loadingAction = false
          this.form = response.data.message
        })
    },
    tambah () {
      this.action = true
      this.editMode = false
    },
    closeDialog () {
      this.action = false
      this.editMode = false
      this.form = {}
    },
    loadData () {
      this.loading = true
      this.$axios.defaults.headers.common['token'] = this.$q.cookies.get('token')
      this.$axios
        .get('petani')
        .then(response => {
          this.loading = false
          this.data = response.data.message
        })
        .catch(error => {
          this.loading = false
          console.log(error)
          this.$q.notify({
            color: 'negative',
            icon: 'ion-close',
            message: 'Sambungan ke server bermasalah!'
          })
        })
    }
  },
  mounted () {
    this.loadData()
  }
}
</script>

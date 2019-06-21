 <template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="q-pa-md">
    <q-table
      title="Master Supplier" :data="data" :columns="columns" row-key="kodesup" :loading="loading" selection="multiple" :selected.sync="selected"
    >
      <template v-slot:top="props">
        <div class="col-4 q-table__title">Data Master Supplier</div>
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
          <q-td key="kodesup" :props="props">
            {{ props.row.kodesup }}
            <q-btn dense round flat :icon="props.expand ? 'arrow_drop_up' : 'arrow_drop_down'" @click="props.expand = !props.expand" />
          </q-td>
          <q-td key="namasup" :props="props">{{ props.row.namasup }}</q-td>
          <q-td key="penanggung_jawab" :props="props">{{ props.row.penanggung_jawab }}</q-td>
          <q-td key="alamat" :props="props">{{ props.row.alamat }}</q-td>
          <q-td key="notelp" :props="props">{{ props.row.notelp }}</q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <div class="text-center q-gutter-sm">
              <q-btn
                dense
                size="sm"
                class="bg-red text-white q-pl-sm q-pr-sm"
                icon="ion-trash"
                @click="del(props.row._id)"
              >&nbsp;delete</q-btn>
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
          <div class="text-h6">Silahkan Tambah Data</div>
        </q-card-section>

        <q-card-section>
          <q-form
            @submit="onSubmit"
            class="q-gutter-md"
          >
            <q-input
              filled
              v-model="form.kodesup"
              label="ID Supplier"
              hint="id_supplier"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type your Id Supplier']"
            />
            <q-input
              filled
              v-model="form.namasup"
              label="Nama Supplier"
              hint="Nama"
            />
            <q-input
              filled
              v-model="form.penanggung_jawab"
              label="Penanggung Jawab Perusahaan"
              hint="Penanggung Jawab Perusahaan"
            />
            <q-input
              filled
              v-model="form.alamat"
              label="Alamat"
              hint="Alamat"
            />
            <q-input
              filled
              v-model="form.notelp"
              type="number"
              label="No Telpon"
              hint="no notelp"
            />

            <div>
              <q-btn label="Submit" type="submit" color="primary"/>
              <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
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
      form: {},
      text: '',
      action: false,
      fixed: false,
      id: this.$route.params.id,
      editMode: false,
      selected: [],
      columns: [
        {
          name: 'kodesup',
          required: true,
          label: 'ID Supplier',
          align: 'left',
          field: row => row.id_supplier,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'namasup', align: 'center', label: 'Nama Supplier', field: 'namasup', sortable: true },
        { name: 'penanggung_jawab', label: 'Penanggung Jawab Perusahaan', field: 'penanggung_jawab' },
        { name: 'alamat', label: 'Alamat', field: 'alamat' },
        { name: 'notelp', label: 'No Telpon', field: 'notelp' }
      ],
      data: [],
      loading: false,
      filter: ''
    }
  },
  methods: {
    closeDialog () {
      this.action = false
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
      console.log('Coi ' + id)
      this.$store.dispatch({
        type: 'supplier/show',
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
          type: 'supplier/editsimpan',
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
          type: 'supplier/simpan',
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
    },
    del (_id) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Yakin mau dihapus?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$q.loading.show()
        this.$store.dispatch({
          type: 'supplier/delet',
          _id: _id
        })
          .then((response) => {
            this.$q.loading.hide()
            if (response.status) {
              this.$q.notify({
                message: 'Berhasil dihapus',
                color: 'positive',
                icon: 'checkmark'
              })
              this.loadData()
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
      this.$axios.get('supplier').then(({ data }) => {
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
    }
  },
  mounted () {
    this.loadData()
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

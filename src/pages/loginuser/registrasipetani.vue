<template>
    <q-page padding>
        <!-- content -->
        <div class="row justify-center">
            <div class="col-sm-11 col-md-4 col-lg-4">
                <q-card align="center" class="q-pb-lg q-pl-md q-pr-md q-pt-sm">
                    <q-card-section>
                        <div class="text-center"/>
                        <p class="text-h4 text-weight-light">Registrasi</p>
                        <p class="q-mb-lg">
                            Harap isi dengan lengkap
                        </p>
                        <form @submit.prevent.stop="onSubmit">
                            <q-input
                                    v-model="form.ktp"
                                    type="text"
                                    ref="ktp"
                                    class="q-mr-lg-xl q-ml-lg-xl"
                                    outlined
                                    label="Kartu Tanda Penduduk"
                                    :rules="[
              val => !!val || 'KTP dibutuhkan..',
              ]"
                            />
                            <q-input
                                v-model="form.firstname"
                                type="text"
                                ref="firstname"
                                class="q-mr-lg-xl q-ml-lg-xl"
                                outlined
                                label="Firstname"
                                :rules="[
              val => !!val || 'Firstname dibutuhkan..',
              ]"
                        />
                            <q-input
                                    v-model="form.lastname"
                                    type="text"
                                    ref="lastname"
                                    class="q-mr-lg-xl q-ml-lg-xl"
                                    outlined
                                    label="Last Name"
                                    :rules="[
              val => !!val || 'Lastname dibutuhkan..',
              ]"
                            />
                            <q-input
                                    v-model="form.username"
                                    type="text"
                                    ref="username"
                                    class="q-mr-lg-xl q-ml-lg-xl"
                                    outlined
                                    label="Username"
                                    :rules="[
              val => !!val || 'Username dibutuhkan..',
              ]"
                            />
                            <q-input
                                    v-model="form.email"
                                    type="email"
                                    ref="email"
                                    class="q-mr-lg-xl q-ml-lg-xl"
                                    outlined
                                    label="Email"
                                    :rules="[
              val => !!val || 'Email dibutuhkan..',
              ]"
                            />
                            <q-input
                                    v-model="form.nohp"
                                    type="text"
                                    ref="nohp"
                                    class="q-mr-lg-xl q-ml-lg-xl"
                                    outlined
                                    label="No. Handphone"
                                    :rules="[
              val => !!val || 'No. Handphone dibutuhkan..',
              ]"
                            />
                            <q-input outlined v-model="form.tgllahir" mask="date" :rules="['date']" label="Tanggal Lahir">
                                <template v-slot:append>
                                    <q-icon name="event" class="cursor-pointer">
                                        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                            <q-date v-model="form.tgllahir" @input="() => $refs.qDateProxy.hide()" />
                                        </q-popup-proxy>
                                    </q-icon>
                                </template>
                            </q-input>
                            <q-input
                                    v-model="form.alamat"
                                    type="text"
                                    ref="alamat"
                                    class="q-mr-lg-xl q-ml-lg-xl"
                                    outlined
                                    label="Alamat"
                                    :rules="[
              val => !!val || 'Alamat dibutuhkan..',
              ]"
                            />
                            <q-input
                                    class="q-mr-lg-xl q-ml-lg-xl"
                                    v-model="form.password"
                                    outlined
                                    ref="password"
                                    :type="isPwd ? 'password' : 'text'"
                                    label="Password"
                                    :rules="[
              val => !!val || 'Password dibutuhkan..',
              ]"
                            >
                                <template v-slot:append>
                                    <q-icon
                                            :name="isPwd ? 'visibility_off' : 'visibility'"
                                            class="cursor-pointer"
                                            @click="isPwd = !isPwd"
                                    />
                                </template>
                            </q-input>
                            <!-- <p>Daftar</p> -->
                            <q-toolbar class="bg-white center">
                                <q-space/>
                                <q-btn color="primary" type="submit" text-color="white" label="Daftar"/>
                            </q-toolbar>
                            <div class="text-center">
                                <router-link
                                        style="text-decoration:none"
                                        to="/auth/login"
                                        exact
                                        class="text-primary text-weight-bold q-mt-md q-mr-md text-right"
                                >Sudah punya akun? Login disini</router-link>
                            </div>
                        </form>
                    </q-card-section>
                    <q-inner-loading :showing="visible">
                        <q-spinner-dots size="50px" color="primary"/>
                    </q-inner-loading>
                </q-card>
            </div>
        </div>
    </q-page>
</template>

<script>
import Form from 'vform'
const qs = require('querystring')

export default {
  name: 'Registrasi',
  data () {
    return {
      isPwd: true,
      visible: false,
      form: new Form({
        ktp: '',
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        nohp: '',
        tgllahir: '',
        alamat: '',
        level: '',
        password: ''
      })
    }
  },
  methods: {
    onSubmit () {
      this.visible = true
      this.$axios.post('registrasi', qs.stringify({
        ktp: this.form.ktp,
        firstname: this.form.firstname,
        lastname: this.form.lastname,
        username: this.form.username,
        email: this.form.email,
        notelp: this.form.nohp,
        tgllahir: this.form.tgllahir,
        alamat: this.form.alamat,
        level: 1,
        password: this.form.password
      }))
        .then((response) => {
          this.visible = false
          if (response.data.success) {
            this.$q.notify({
              icon: 'ion-checkmark',
              color: 'positive',
              message: response.data.message
            })
            setTimeout(() => {
              this.$router.go('/')
            }, 1000)
          } else {
            this.$q.notify({
              icon: 'ion-close',
              color: 'negative',
              message: response.data.message
            })
            this.visible = false
            this.form.password = ''
            this.$store.commit({
              type: 'user/authError'
            })
          }
        })
    }
  }
}
</script>

<style>
</style>

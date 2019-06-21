<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <q-page class="flex items-center justify-center">
        <!-- content -->
        <div class="row justify-center">
            <div class="col-sm-11 col-md-12 col-lg-12">
                <q-card align="center" class="q-pb-lg q-pl-md q-pr-md q-pt-sm">
                    <q-card-section>
                        <q-img src="statics/app-logo-128x128.png"/>
                        <div class="text-center"/>
                        <p class="text-h4 text-weight-light">Login</p>
                        <p class="q-mb-lg">
                            untuk melanjutkan ke dalam aplikasi
                        </p>
                        <form @submit.prevent.stop="onSubmit">
                            <q-input
                                    v-model="form.username"
                                    type="text"
                                    ref="username"
                                    class="q-mr-xl-xl q-ml-xl-xl"
                                    outlined
                                    label="Username"
                                    :rules="[
              val => !!val || 'Username dibutuhkan..',
              ]"
                            />
                            <q-input
                                    class="q-mr-sm-xl q-ml-sm-xl"
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
                            <q-toolbar class="bg-white">
                                <q-space/>
                                <q-btn color="primary" type="submit" text-color="white" label="MASuk"/>
                            </q-toolbar>
                            <div class="text-center">
                                <router-link
                                        style="text-decoration:none"
                                        to="/auth/reset"
                                        exact
                                        class="text-primary text-weight-bold q-mt-md q-mr-md text-right"
                                >Lupa kata sandi ?</router-link>
                            </div>
                            <div class="text-center">
                                <router-link
                                        style="text-decoration:none"
                                        to="/auth/registrasi"
                                        exact
                                        class="text-primary text-weight-bold q-mt-md q-mr-md text-right"
                                >Belum punya akun? Daftar disini</router-link>
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

export default {
  name: 'Login',
  data () {
    return {
      isPwd: true,
      visible: false,
      form: new Form({
        username: '',
        password: ''
      })
    }
  },
  methods: {
    onSubmit () {
      this.basicAuth = 'Basic ' + window.btoa(this.form.username + ':' + this.form.password)
      console.log(this.basicAuth)
      this.visible = true
      this.$axios.defaults.headers.common['Authorization'] = this.basicAuth
      this.$axios.post('login')
        .then(({ data }) => {
          if (data.success) {
            this.$q.notify({
              icon: 'ion-checkmark',
              color: 'positive',
              message: 'Login berhasil, Redirecting...'
            })
            const token = data.token
            this.$axios.defaults.headers.common['Authorization'] = 'bearer ' + token
            this.$q.cookies.set('token', token, { expires: 10, path: '/' })
            setTimeout(() => {
              this.$router.go('/auth/login')
            }, 1000)
          } else {
            this.$q.notify({
              icon: 'ion-close',
              color: 'negative',
              message: data.message
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

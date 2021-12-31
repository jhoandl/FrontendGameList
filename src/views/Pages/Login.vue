<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-primary py-7 py-lg-8 pt-lg-9">
      <b-container>
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="8" class="px-5">
              <h1 class="text-white">Bienvenido!</h1>
              <p class="text-lead text-white">Use sus credenciales para ingresar a la aplicación</p>
            </b-col>
          </b-row>
        </div>
      </b-container>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1"
             xmlns="http://www.w3.org/2000/svg">
          <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <b-container class="mt--8 pb-5">
      <b-row class="justify-content-center">
        <b-col lg="5" md="7">
          <b-card no-body class="bg-secondary border-0 mb-0">
            <b-card-header class="bg-transparent pb-5"  >
              <div class="text-muted text-center mt-2 mb-3"><small>Iniciar Sesion</small></div>

            </b-card-header>
            <b-card-body class="px-lg-5 py-lg-5">
              <div class="text-center text-muted mb-4">
              </div>
              <validation-observer v-slot="{handleSubmit}" ref="formValidator">
                <b-form role="form" @submit.prevent="handleSubmit(onSubmit)">
                  <base-input alternative
                              class="mb-3"
                              name="Usuario"
                              rules="required"
                              prepend-icon="ni ni-email-83"
                              placeholder="Nombre de usuario"
                              v-model="model.username">
                  </base-input>
                  <base-input alternative
                              class="mb-3"
                              name="Contraseña"
                              rules="required"
                              prepend-icon="ni ni-lock-circle-open"
                              type="password"
                              placeholder="********"
                              v-model="model.password">
                  </base-input>

                  <div class="text-center">
                    <base-button type="primary" native-type="submit" class="my-4">Ingresar</base-button>
                  </div>
                </b-form>
              </validation-observer>
            </b-card-body>
          </b-card>
          <b-row class="mt-3">
            <b-col cols="6">
              <router-link to="/dashboard" class="text-light"><small>Recuperar Contraseña?</small></router-link>
            </b-col>
            <b-col cols="6" class="text-right">
              <router-link to="/register" class="text-light"><small>Crear Nueva Cuenta</small></router-link>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        model: {
          username: '',
          password: '',
        },
      };
    },
    methods: {
      onSubmit() {
        this.$refs.formValidator.validate().then(success => {
          if (success) {
            this.$http.post('/api/auth/singin', this.model)
            .then(res => {
              const userData = res.data
              localStorage.setItem('userData', JSON.stringify(userData))
              localStorage.setItem('accessToken', res.data.accessToken)
              this.$router.push('/dashboard');
            })
          }
        })
      }
    }
  };
</script>

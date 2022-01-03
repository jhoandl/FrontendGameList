<template>
    <div>
       <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-primary">
       <b-row>
            <b-col xl="4" md="4" sm="12">
          <stats-card title="Usuario registrados"
                      type="gradient-blue"
                      :sub-title="totalUsers"
                      icon="ni ni-chart-bar-32"
                      class="mb-4">

          </stats-card>
        </b-col>
        <b-col xl="4" md="4" sm="12">
          <stats-card title="Usuarios Inactivos"
                      type="gradient-blue"
                      :sub-title="totalUsersInactive || '0'"
                      icon="ni ni-chart-bar-32"
                      class="mb-4">

          </stats-card>
        </b-col>
        <b-col xl="4" md="4" sm="12">
          <stats-card title="Usuarios Activos"
                      type="gradient-blue"
                      :sub-title="totalUsersActive"
                      icon="ni ni-chart-bar-32"
                      class="mb-4">
  
          </stats-card>
        </b-col>
       </b-row>
       </base-header>
       <b-container fluid class="mt-5">
         <b-row class="justify-content-center">
             <b-col lg="12">
              <b-card>
              <vue-good-table
                :columns="columns"
                :rows="items"
                compact-mode
                :sort-options="{
                  enabled: true,
                  initialSortBy: {field: 'id', type: 'asc'}
                }"
                :pagination-options="{
                  enabled: true,
                  perPage:pageLength
                }"
                style-class="vgt-table striped condensed"
                @filtered="onFiltered"
              >
                <div slot="emptystate" class="text-center">
                  No se encontraron resultados
                </div>
                <template
                  slot="table-row"
                  slot-scope="props"
                >
                  <div
                    v-if="props.column.field === 'id'"
                    class="text-nowrap"
                  >
                    <span class="text-nowrap">{{ props.row.id }}</span>
                  </div>
                  <div
                    v-if="props.column.field === 'nombres'"
                    class="text-nowrap"
                  >
                    <span class="text-nowrap">{{ props.row.nombres }}</span>
                  </div>
                  <div
                    v-if="props.column.field === 'apellidos'"
                    class="text-nowrap"
                  >
                    <span class="text-nowrap">{{ props.row.apellidos }}</span>
                  </div>
                  <div
                    v-if="props.column.field === 'username'"
                    class="text-nowrap"
                  >
                    <span class="text-nowrap">{{ props.row.usernam }}</span>
                  </div>
                  <div
                    v-if="props.column.field === 'estado'"
                    class="text-nowrap"
                  >
                    <!-- <span class="text-nowrap">{{ props.row.estado }}</span> -->
                    <label class="custom-toggle">
                      <input type="checkbox" :checked="props.row.estado">
                      <span class="custom-toggle-slider rounded-circle" data-label-off="OFF" data-label-on="ON"></span>
                    </label>
                  </div>
                  <div
                    v-if="props.column.field === 'action'"
                    class="text-nowrap"
                  >
                    <font-awesome-icon icon="eye" class="text-primary" style="cursor: pointer" />
                  </div>
                </template>
              </vue-good-table>
              </b-card>
             </b-col>
         </b-row>
       </b-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
        items: [],
        columns: [
        {
          label: 'Código',
          field: 'id',
          type: 'number',
          width: '150px',
          filterOptions: {
            enabled: true,
            placeholder: 'Buscar Código',
          },
        },
        {
          label: 'Nombres',
          field: 'nombres',
          filterOptions: {
            enabled: true,
            placeholder: 'Buscar Nombres',
          },
        },
        {
          label: 'Apellidos',
          field: 'apellidos',
          filterOptions: {
            enabled: true,
            placeholder: 'Buscar Apellidos',
          },
        },
        {
          label: 'Usuario',
          field: 'username',
          filterOptions: {
            enabled: true,
            placeholder: 'Buscar Usuario',
          },
        },
        {
          label: 'Estado',
          field: 'estado',
        },
        {
          label: 'Acción',
          field: 'action',
          sortable: false,
        },
      ],
       pageLength: 5,
       totalRows: '',
      perPage: 10,
      currentPage: 1,
      totalUsers: '',
      totalUsersInactive: '',
      totalUsersActive: '',
     }
    },
    mounted() {
     this.listUsers()
     this.countUsers()
     this.countUsersInactive()
     this.countUsersActive()
    },
    methods: {
     onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
     },

     countUsers() {
       this.$http.get('/api/count-users')
       .then(res => {
         this.totalUsers = res.data
       })
     },
     countUsersInactive() {
       this.$http.get('/api/count-usersInactive')
       .then(res => {
         console.log(res.data)
         this.totalUsersInactive = res.data
       })
     },
     countUsersActive() {
       this.$http.get('/api/count-usersActive')
       .then(res => {
         this.totalUsersActive = res.data
       })
     },
     listUsers() {
       this.items = []
       this.$http.get('/api/get-users', {
         params: {
           pageSize: this.pageLength,
           pageNumber: this.currentPage - 1
         }
       })
       .then(res => {
         this.totalRows = res.data.totalElements
         this.items = res.data.content
       })
     }
    }
}
</script>
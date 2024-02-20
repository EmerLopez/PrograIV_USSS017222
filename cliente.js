Vue.component('componente-clientes', {
    data() {
        return {
            valor:'',
            clientes:[],
            accion:'nuevo',
            cliente:{
                idCliente: new Date().getTime(),
                codigo:'',
                nombre:'',
                direccion:'',
                zona:''
            }
        }
    },
    methods:{
        buscarCliente(e){
            this.listar();
        },
        eliminarCliente(idCliente){
            if( confirm(`Esta seguro de elimina el cliente?`) ){
                let store = abrirStore('clientes', 'readwrite'),
                query = store.delete(idCliente);
            query.onsuccess = e=>{
                this.nuevoCliente();
                this.listar();
            };
            }
        },
        modificarCliente(cliente){
            this.accion = 'modificar';
            this.cliente = cliente;
        },
        guardarCliente(){
            //almacenamiento del objeto Clientes en indexedDB
            let store = abrirStore('clientes', 'readwrite'),
                query = store.put({...this.cliente});
            query.onsuccess = e=>{
                this.nuevoCliente();
                this.listar();
            };
            query.onerror = e=>{
                console.error('Error al guardar en clientes', e.message());
            };
        },
        nuevoCliente(){
            this.accion = 'nuevo';
            this.cliente = {
                idCliente: new Date().getTime(),
                codigo:'',
                nombre:'',
                direccion:'',
                zona: ''
            }
        },
        listar(){
            let store = abrirStore('clientes', 'readonly'),
                data = store.getAll();
            data.onsuccess = resp=>{
                this.clientes = data.result
                    .filter(cliente=>cliente.codigo.includes(this.valor) || 
                    cliente.nombre.toLowerCase().includes(this.valor.toLowerCase()) ||
                    cliente.direccion.toLowerCase().includes(this.valor.toLowerCase()) ||
                    cliente.zona.toLowerCase().includes(this.valor.toLowerCase()));
            };
            

        
        },

    },
    template: `
    <div class="my-4">
        <div class="row">
            <div class="col col-md-6">
                <div class="card text-bg">
                    <div class="card-header">REGISTRO DE CLIENTES</div>
                    <div class="catd-body">
                    <div class="row p-1">
                        <div class="col col-md-2">Codigo</div>
                        <div class="col col-md-3">
                            <input v-model="cliente.codigo" type="text" class="form-control">
                        </div>
                    </div>
                    <div class="row p-1">
                        <div class="col col-md-2">Nombre</div>
                        <div class="col col-md-5">
                            <input v-model="cliente.nombre" type="text" class="form-control">
                        </div>
                    </div>
            
                    <div class="row p-1">
                        <div class="col col-md-2">Direccion</div>
                        <div class="col col-md-3">
                            <input v-model="cliente.direccion" type="text" class="form-control">
                        </div>
                    </div>
                    <div class="row p-1">
                        <div class="col col-md-2">Zona</div>
                        <div class="col col-md-3">
                            <input v-model="cliente.zona"  type="text" class="form-control">
                        </div>
                    </div>


                        <div class="row p-1">
                        <div class="col text-center">
                            <div class="d-flex justify-content-center ">
                                <button @click.prevent.default="guardarCliente" class="btn btn-outline-success ">GUARDAR</button>
                                <div style="margin-right: 20px;"></div>
                                <button @click.prevent.default="nuevoCliente" class="btn btn-outline-warning">NUEVO</button>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="my-4">
            <div class="col col-md-8">
                <div class="card text-bg">
                    <div class="card-header">LISTADO DE CLIENTES</div>
                    <div class="card-body">
                        <form id="frmCliente">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>BUSCAR</th>
                                        <th colspan="5">
                                            <input placeholder="Codigo, Nombre, Direccion" type="search" v-model="valor" @keyup="buscarCliente" class="form-control">
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>CODIGO</th>
                                        <th>NOMBRE</th>
                                        <th>DIRECCION</th>
                                        <th>ZONA</th>
                                        
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr @click="modificarCliente(cliente)" v-for="cliente in clientes" :key="cliente.idCliente">
                                        <td>{{cliente.codigo}}</td>
                                        <td>{{cliente.nombre}}</td>
                                        <td>{{cliente.direccion}}</td>
                                        <td>{{cliente.zona}}</td>
                                        
                                        <td><button @click.prevent.default="eliminarCliente(cliente.idCliente)" class="btn btn-outline-danger">delete</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `
});
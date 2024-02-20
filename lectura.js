Vue.component('componente-lecturas', {
    data() {
        return {
            valor:'',
            lecturas:[],
            accion:'nuevo',
            lectura:{
                idLectura: new Date().getTime(),
                cliente:'',
                fecha:'',
                lectura_anterior:'',
                lectura_actual:'',
                pago:'',
                
            }
        }
    },
    methods:{
        buscarLectura(e){
            this.listar();
        },
        eliminarLectura(idLectura){
            if( confirm(`Esta seguro de elimina lectura?`) ){
                let store = abrirStore('lecturas', 'readwrite'),
                query = store.delete(idLectura);
            query.onsuccess = e=>{
                this.nuevoLectura();
                this.listar();
            };
            }
        },
        modificarLectura(lectura){
            this.accion = 'modificar';
            this.lectura = lectura;
        },
        guardarLectura(){
            //almacenamiento del objeto Lecturas en indexedDB
            let store = abrirStore('lecturas', 'readwrite'),
                query = store.put({...this.lectura});
            query.onsuccess = e=>{
                this.nuevoLectura();
                this.listar();
            };
            query.onerror = e=>{
                console.error('Error al guardar en clientes', e.message());
            };
        },
        nuevoLectura(){
            this.accion = 'nuevo';
            this.lectura = {
                idLectura: new Date().getTime(),
                cliente:'',
                fecha:'',
                lectura_anterior:'',
                lectura_actual:'',
                pago:''
                
            }
        },
        listar(){
            let store = abrirStore('lecturas', 'readonly'),
                data = store.getAll();
            data.onsuccess = resp=>{
                this.lecturas = data.result
                    .filter(lectura=>lectura.cliente.includes(this.valor) || 
                    lectura.fecha.toLowerCase().includes(this.valor.toLowerCase()) || 
                    lectura.lectura_anterior.toLowerCase().includes(this.valor.toLowerCase()) ||
                    lectura.lectura_actual.toLowerCase().includes(this.valor.toLowerCase()) ||
                    lectura.pago.toLowerCase().includes(this.valor.toLowerCase()));
            };

        
        },

    },
    template: `
    <div class="my-4">
        <div class="row">
            <div class="col col-md-6">
                <div class="card text-bg">
                    <div class="card-header">REGISTRO DE LECTURAS</div>
                    <div class="catd-body">
                        <div class="row p-1">
                            <div class="col col-md-2">Lectura</div>
                            <div class="col col-md-3">
                                <input v-model="lectura.cliente" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">Fecha</div>
                            <div class="col col-md-5">
                                <input v-model="lectura.fecha" type="date" class="form-control">
                            </div>
                        </div>
                
                        <div class="row p-1">
                            <div class="col col-md-2">Lectura Anterior</div>
                            <div class="col col-md-3">
                                <input v-model="lectura.lectura_anterior" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">Lectura Actual</div>
                            <div class="col col-md-3">
                                <input v-model="lectura.lectura_actual"  type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                        <div class="col col-md-2">Pago</div>
                        <div class="col col-md-3">
                            <input v-model="lectura.pago"  type="text" class="form-control">
                        </div>
                    </div>
                        

                        <div class="row p-1">
                        <div class="col text-center">
                            <div class="d-flex justify-content-center ">
                                <button @click.prevent.default="guardarLectura" class="btn btn-outline-success ">GUARDAR</button>
                                <div style="margin-right: 20px;"></div>
                                <button @click.prevent.default="nuevoLectura" class="btn btn-outline-warning">NUEVO</button>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="my-4">
            <div class="col col-md-8">
                <div class="card text-bg">
                    <div class="card-header">LISTADO DE LECTURAS</div>
                    <div class="card-body">
                        <form id="frmLectura">
                            <table class="table table table-hover">
                                <thead>
                                    <tr>
                                        <th>BUSCAR</th>
                                        <th colspan="5">
                                            <input placeholder="codigo, nombre, direccion" type="search" v-model="valor" @keyup="buscarLectura" class="form-control">
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>CLIENTE</th>
                                        <th>FECHA</th>
                                        <th>LECTURA ANTERIOR</th>
                                        <th>LECTURA ACTUAL</th>
                                        <th>PAGO</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr @click="modificarLectura(lectura)" v-for="lectura in lecturas" :key="lectura.idLectura">
                                        <td>{{lectura.cliente}}</td>
                                        <td>{{lectura.fecha}}</td>
                                        <td>{{lectura.lectura_anterior}}</td>
                                        <td>{{lectura.lectura_actual}}</td>
                                        <td>{{lectura.pago}}</td>
                                        <td><button @click.prevent.default="eliminarLectura(lectura.idLectura)" class="btn btn-danger">del</button></td>
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
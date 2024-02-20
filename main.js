var app = new Vue({
    el: '#app',
    data:{
        forms:{
            cliente:{mostrar:false},
            lectura:{mostrar:false},
            
        }
    },
    methods:{
        abrirFormulario(form){
            this.forms[form].mostrar = !this.forms[form].mostrar;
            this.$refs[form].listar();
        }
    }
});

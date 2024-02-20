var db;
const funcdb = ()=>{
    let indexDB = indexedDB.open('db_USSS017222_USSS017722_libreria',1);
    indexDB.onupgradeneeded = e=>{
        let req = e.target.result,
            tblcliente = req.createObjectStore('clientes',{keyPath:'idCliente'}),
            tbllectura = req.createObjectStore('lecturas',{keyPath:'idLectura'});
        tblcliente.createIndex('idCliente','idCliente',{unique:true});
        tblcliente.createIndex('codigo','codigo',{unique:true});
        tbllectura.createIndex('lecturas','idLectura',{unique:true});
        tbllectura.createIndex('cliente','cliente',{unique:true});
    };
    indexDB.onsuccess = e=>{
        db = e.target.result;
    };
    indexDB.onerror = e=>{
        console.error('Error al crear la base de datos', e.message());
    };
}, abrirStore = (store, modo)=>{
    let ltx = db.transaction(store, modo);
    return ltx.objectStore(store);
};
funcdb();
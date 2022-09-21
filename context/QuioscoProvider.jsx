import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router"

const QuioscoContext = createContext()

const QuioscoProvider = ({children}) =>{
    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({});
    const [producto, setProducto] = useState({});
    const [modal, setModal] = useState(false);
    const [pedido, setPedido] = useState([]);
    const router = useRouter()

    const obtenerCategorias = async () =>{
        const { data } = await axios('/api/categorias')
        setCategorias(data)
    }

    useEffect(() => {
        obtenerCategorias()
    }, []);

    useEffect(() => {
        setCategoriaActual(categorias[0])
    }, [categorias]);

    /* Guardando categoria presionada en el state */
    const handleClickCategoria = id =>{
        const categoria = categorias.filter(cat => cat.id === id)
        setCategoriaActual(categoria[0])
        router.push('/')
    }

    /* Obteniendo producto seleccionado */
    const handleSetProductos = producto =>{
        setProducto(producto)
    }

    /* Manejando del modal */
    const handleChangeModal = () =>{
        setModal(!modal)
    }
    /* Agregar pedido al state */
    const handleAgregarPedido = ({categoriaId, ...producto}) =>{
        if(pedido.some(productoState => productoState.id === producto.id)){
            /* Actualizando cantidad */
            const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id? producto: productoState)
            setPedido(pedidoActualizado)
            toast.success('Guardado correctamente')
        }else{
            setPedido([...pedido, producto])
            toast.success('Agregado al pedido')
        }
        setModal(false)
    }

    const handleEditarCantidades = id =>{
        const productoActualizar = pedido.filter( producto => producto.id === id)
        setProducto(productoActualizar[0])
        setModal(!modal)
    }

    const handleEliminarProducto = id =>{
        const productoActualizado = pedido.filter( producto => producto.id !== id)
        setPedido(productoActualizado);
    }

    return(
        <QuioscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                producto,
                handleSetProductos,
                modal,
                handleChangeModal,
                handleAgregarPedido,
                pedido,
                handleEditarCantidades,
                handleEliminarProducto,
            }}
        >
            {children}
        </QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}
export default QuioscoContext
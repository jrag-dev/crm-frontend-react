// TODO: Funciones que utilizaré en el proyecto, creadas para
// TODO : no colocar lógica en los componentes de la app.

export const stringUpperCase = (string) => {
  console.log(string)
  let cadena = string.charAt(0).toUpperCase() + string.slice(1)
  return cadena;
}


export const totalValorPedido = (arr) => {
  const total = arr.reduce((acc, el) => acc + el.precio*el.cantidad, 0)
  return total
};


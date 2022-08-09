import { createContext, useState } from "react";
import {
  calcularMarca,
  calcularPlan,
  formatearDinero,
  obtenerDiferenciaYear,
} from "../helper";

const CotizadorContext = createContext();

const CotizadorProvider = ({ children }) => {
  const [datos, setDatos] = useState({
    marca: "",
    year: "",
    plan: "",
  });

  const [error, setError] = useState("");
  const [resultado, setResultado] = useState(0);
  const [cargando, setCargando] = useState(false);

  const handleChangeDatos = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const cotizarSeguro = () => {
    // una Base:
    let resultado = 2000;

    //Obtener diferencia de años
    const diferencia = obtenerDiferenciaYear(datos.year);

    //hay que restar el 3% por cada año

    resultado -= (diferencia * 3 * resultado) / 100;

    //Europeo 30%
    //Americano 15%
    //Asiatico 5%
    resultado *= calcularMarca(datos.marca);

    //Basico 20%
    //Completo 50%
    resultado *= calcularPlan(datos.plan);

    resultado = resultado.toFixed(2);

    //formatear dinero
    resultado = formatearDinero(resultado);

    setCargando(true);

    setTimeout(() => {
      setResultado(resultado);
      setCargando(false);
    }, 3000);
  };

  return (
    <CotizadorContext.Provider
      value={{
        datos,
        handleChangeDatos,
        setError,
        error,
        cotizarSeguro,
        resultado,
        cargando,
      }}
    >
      {children}
    </CotizadorContext.Provider>
  );
};

export { CotizadorProvider };

export default CotizadorContext;

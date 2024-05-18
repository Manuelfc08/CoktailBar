import { useEffect, useState } from "react";

function Prueba (){
    const [loading, setLoading] = useState (false);
    useEffect(()=>{
        setLoading(true);
        setTimeout(()=>{
            setLoading(false);
        },3000)
        
    },[])
    return (<>
            {loading == false ? <h1>Saludos</h1> : <h1>Loading...</h1>}
    </>)
}
export default Prueba;
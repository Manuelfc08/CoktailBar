
import "../css/error.css";
export default function Error ({message}){
    return(
        <div className="div-error">
            <h1>❌{`${message} !`}</h1>
            <h5>Lo sentimos actualmente estamos teniendo problemas 😑</h5>
        </div>
    )
}
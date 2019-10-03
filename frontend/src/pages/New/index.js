import React,{useState,useMemo} from 'react';
import camera from '../../assets/camera.svg';
import "./style.css";
import api from '../../services/api';

export default function New({history}){
    const [company,setCompany] = useState('')
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);

    //Criar preview da imagem
    const preview = useMemo(()=>{
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    },[thumbnail])

    async function handleSubmit(event){
        event.preventDefault()
        const data = new FormData();
        const user_id = localStorage.getItem('user')
        data.append('thumbnail',thumbnail);
        data.append('company',company);
        data.append('techs',techs);
        data.append('price',price);

        await api.post('/spots', data,{
            headers:{user_id}
        });
        
        history.push('/dashboard')
    }

    return(
        <form onSubmit={handleSubmit}>

            <label id="thumbnail" style={{backgroundImage:`url(${preview})`}} className={thumbnail ? 'has-thumb' : ''}>
                <input type="file" onChange={event =>setThumbnail(event.target.files[0])}/>
                <img src={camera} alt="Select img"/>
            </label>

            <label htmlFor="company">EMPRESA *</label>
            <input id="company"
             placeholder="Sua incrivel empresa"
             value={company}
             onChange={event=>setCompany(event.target.value)}/>

            <label htmlFor="techs">TECNOLOGIAS *</label>
            <input id="techs"
             placeholder="Sua incrivel empresa*"
             value={techs}
             onChange={event=>setTechs(event.target.value)}/>

            <label htmlFor="price">VALOR DA DIARIA * <span>(em branco para GRATUITO)</span></label>
            <input id="price"
             placeholder="Sua incrivel empresa*"
             value={price}
             onChange={event=>setPrice(event.target.value)}/>

            <button type="submit" className="btn">Cadastrar</button>
        </form>
    )
}
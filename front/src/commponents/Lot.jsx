import { useEffect, useState } from 'react'
import './css/lot.css'

export default function Lot() {
    const [lots, setLots] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
 
        const fetchData = fetch('http://localhost:5000/lot')
            .then(response => response.json());

 
        const timer = new Promise(resolve => setTimeout(resolve, 2000));

 
        Promise.all([fetchData, timer])
            .then(([data]) => {
                setLots(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching Lots:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <p style={{ textAlign: 'center', fontSize: '45px', color: '#006837', marginTop: '250px' }}>
                Loading...
            </p>
        );
    }

    return (
        <div className='lot'>
            <div className="box">
                {lots.map((elem) => (
                    <div key={elem.id} className="lot_result">
                        <img src={elem.image} alt="" />
                        <div style={{ padding: '15px' }}>
                            <p><strong>Price:</strong> ${elem.price_usd.toLocaleString()}</p>
                            <p><strong>Area_sqm:</strong> {elem.area_sqm} qm</p>
                            <p><strong>Location:</strong> {elem.location}</p>
                            <p style={{ fontSize: '0.9em', color: '#555' }}>{elem.description}</p>
                            <div style={{ marginTop: '10px', fontStyle: 'italic', color: '#888' }}>
                                {elem.features}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
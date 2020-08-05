import React from 'react';
import {Chart} from 'primereact/chart';

const Dashboard = () => {
    const dataRegisteredUsers = {
        labels: ['01/08', '02/08', '03/08', '04/08'],
        datasets: [
            {
                label: "Quantidade diária",
                data: [65, 59, 80, 81],
                fill: false,
                backgroundColor: '#42A5F5',
                borderColor: '#42A5F5'
            },
        ]
    };
    const dataConectedUsers = {
        labels: ['01/08', '02/08', '03/08', '04/08', '05/08', '06/08', '07/08', '08/08', '09/08', '10/08', '11/08', '12/08'],
        datasets: [
            {
                label: "Quantidade diária",
                data: [120, 89, 120, 122, 131, 91, 100, 85, 160, 120, 135, 114],
                fill: false,
                backgroundColor: '#00bf36',
                borderColor: '#00bf36'
            },
        ]
    };

    return (
        <>
            <div className="row m-2 justify-content-center">
                <div className="card shadow mt-3 p-3 mb-5 col-sm-3 mx-auto border">
                    <p className="h5">Usuários cadastrados</p>
                    <p className="h2">285</p>
                </div>
            </div>
            <div className="row m-2">
                <div className="card shadow p-3 col-sm-5 mb-5 mx-auto border">
                    <p className="h5">Quantidade diária de usuários registrados</p>
                    <Chart type="line" data={dataRegisteredUsers} />
                </div>
                <div className="card shadow p-3 col-sm-5 mb-5 mx-auto border">
                    <p className="h5">Quantidade diária de usuários conectados</p>
                    <Chart type="line" data={dataConectedUsers} />
                </div>
            </div>
        </>
    )
}

export default Dashboard;
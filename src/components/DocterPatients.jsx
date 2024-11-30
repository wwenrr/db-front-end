import React, { useState } from 'react';

const DoctorPatients = () => {
    const [doctor, setDoctor] = useState('');
    const [patients, setPatients] = useState([]);

    const handleSearch = () => {
        // Giả lập dữ liệu
        const mockPatients = [
            'Nguyễn Văn A',
            'Trần Thị B',
            'Lê Văn C',
        ];
        setPatients(mockPatients);
    };

    return (
        <div>
            <h3>Bệnh nhân của bác sĩ</h3>
            <label>
                Tên bác sĩ:
                <input
                    type="text"
                    value={doctor}
                    onChange={(e) => setDoctor(e.target.value)}
                />
            </label>
            <button onClick={handleSearch}>Liệt kê</button>
            <ul>
                {patients.map((name, index) => (
                    <li key={index}>{name}</li>
                ))}
            </ul>
        </div>
    );
};

export default DoctorPatients;

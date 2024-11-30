import React, { useState } from 'react';

const PatientSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = () => {
        // Giả lập kết quả tìm kiếm
        const mockResults = [
            { name: 'Nguyễn Văn A', phone: '0123456789', treatment: 'Khám tổng quát' },
            { name: 'Trần Thị B', phone: '0987654321', treatment: 'Điều trị nội trú' },
        ];
        setResults(mockResults);
    };

    return (
        <div>
            <h3>Tìm kiếm bệnh nhân</h3>
            <input
                type="text"
                placeholder="Nhập tên bệnh nhân..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Tìm kiếm</button>
            <ul>
                {results.map((patient, index) => (
                    <li key={index}>
                        <strong>{patient.name}</strong> - {patient.phone} - {patient.treatment}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PatientSearch;

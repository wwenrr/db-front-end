import React, { useState } from 'react';

const AddPatientForm = () => {
    const [patient, setPatient] = useState({
        name: '',
        phone: '',
        treatment: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatient({ ...patient, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Bệnh nhân ${patient.name} đã được thêm thành công!`);
        setPatient({ name: '', phone: '', treatment: '' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Thêm bệnh nhân mới</h3>
            <label>
                Tên:
                <input
                    type="text"
                    name="name"
                    value={patient.name}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Số điện thoại:
                <input
                    type="text"
                    name="phone"
                    value={patient.phone}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Điều trị:
                <input
                    type="text"
                    name="treatment"
                    value={patient.treatment}
                    onChange={handleChange}
                    required
                />
            </label>
            <button type="submit">Thêm</button>
        </form>
    );
};

export default AddPatientForm;

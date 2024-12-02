import React, { useState } from 'react';
const url = 'https://db-latest-nprr.onrender.com';

const AddPatientForm = () => {
    const [patient, setPatient] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        dob: '',
        address: '',
        phone: '',
        treatment: '',  
        doctorCode: '',  
        nurseCode: '',   
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatient({ ...patient, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!patient.firstName || !patient.lastName || !patient.phone || !patient.dob || !patient.address) {
            setError('Vui lòng nhập đầy đủ thông tin bệnh nhân');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        const token = localStorage.getItem('token');  
        if (!token) {
            setError('Chưa đăng nhập');
            setLoading(false);
            return;
        }

        const patientData = {
            p_first_name: patient.firstName,
            p_last_name: patient.lastName,
            p_gender: patient.gender,
            p_dob: patient.dob,
            p_address: patient.address,
            p_phone_number: patient.phone,
        };

        const isOutpatient = patient.treatment === 'outpatient'; 
        let apiEndpoint = '';
        let requestData = {};

        if (isOutpatient) {
            apiEndpoint = '/api/insertOutpatient';
            requestData = { ...patientData, doctor_code: patient.doctorCode };
        } else {
            apiEndpoint = '/api/insertInpatient';
            requestData = { ...patientData, nurse_code: patient.nurseCode };
        }

        try {
            const response = await fetch(`${url}${apiEndpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,  
                },
                body: JSON.stringify(requestData),  
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Không thể thêm bệnh nhân');
            }

            const data = await response.json();
            if (data && data.code === 200) {
                setSuccess('Bệnh nhân đã được thêm thành công!');
                setPatient({
                    firstName: '',
                    lastName: '',
                    gender: '',
                    dob: '',
                    address: '',
                    phone: '',
                    treatment: '',
                    doctorCode: '',
                    nurseCode: '',
                });
            } else {
                setError('Đã có lỗi xảy ra, vui lòng thử lại.');
            }
        } catch (error) {
            setError('Đã có lỗi xảy ra, vui lòng thử lại.');
            console.error('Lỗi khi gọi API:', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Thêm bệnh nhân mới</h3>
            <label>
                Tên:
                <input
                    type="text"
                    name="firstName"
                    value={patient.firstName}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Họ:
                <input
                    type="text"
                    name="lastName"
                    value={patient.lastName}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Giới tính:
                <input
                    type="text"
                    name="gender"
                    value={patient.gender}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Ngày sinh:
                <input
                    type="date"
                    name="dob"
                    value={patient.dob}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Địa chỉ:
                <input
                    type="text"
                    name="address"
                    value={patient.address}
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
                <select
                    name="treatment"
                    value={patient.treatment}
                    onChange={handleChange}
                    required
                >
                    <option value="">Chọn điều trị</option>
                    <option value="outpatient">Ngoại trú</option>
                    <option value="inpatient">Nội trú</option>
                </select>
            </label>
            {patient.treatment === 'outpatient' && (
                <label>
                    Mã bác sĩ:
                    <input
                        type="text"
                        name="doctorCode"
                        value={patient.doctorCode}
                        onChange={handleChange}
                    />
                </label>
            )}
            {patient.treatment === 'inpatient' && (
                <label>
                    Mã y tá:
                    <input
                        type="text"
                        name="nurseCode"
                        value={patient.nurseCode}
                        onChange={handleChange}
                    />
                </label>
            )}
            <button type="submit" disabled={loading}>
                {loading ? 'Đang thêm bệnh nhân...' : 'Thêm'}
            </button>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </form>
    );
};

export default AddPatientForm;

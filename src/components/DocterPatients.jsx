import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/DoctorPatients.css';

const url = 'https://db-latest-nprr.onrender.com';

const DoctorPatients = () => {
    const [doctor, setDoctor] = useState('');
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate(); 

    const handleSearch = async () => {
        if (!doctor) return;

        setLoading(true);
        setError('');

        const token = localStorage.getItem('token');  
        console.log(token);
        if (!token) {
            setError('Chưa đăng nhập');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${url}/api/findPatientByDoctorCode?d_code=${doctor}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,  
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Không thể tải dữ liệu bệnh nhân');
            }

            const data = await response.json();

            if (data && data.code === 200) {
                setPatients(data.message);
            } else {
                setError('Không tìm thấy bệnh nhân.');
            }
        } catch (error) {
            setError('Đã có lỗi xảy ra, vui lòng thử lại.');
            console.error('Lỗi khi gọi API:', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="doctor-patients">
            <h3>Bệnh nhân của bác sĩ</h3>

            {/* Mã bác sĩ */}
            <label>
                Mã bác sĩ:
                <input
                    type="text"
                    value={doctor}
                    onChange={(e) => setDoctor(e.target.value)}
                    required
                />
            </label>
            <button onClick={handleSearch} disabled={loading}>
                {loading ? 'Đang tải...' : 'Liệt kê'}
            </button>

            {/* Hiển thị lỗi nếu có */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Danh sách bệnh nhân */}
            <div className="patients-list">
                {patients.length > 0 ? (
                    patients.map((patient, index) => (
                        <div key={index} className="patient-card">
                            <h4>Bệnh nhân {index + 1}</h4>
                            <div className="patient-info">
                                <p><strong>Tên:</strong> {patient.p_first_name} {patient.p_last_name}</p>
                                <p><strong>Giới tính:</strong> {patient.p_gender}</p>
                                <p><strong>Ngày sinh:</strong> {patient.p_dob}</p>
                                <p><strong>Địa chỉ:</strong> {patient.p_address}</p>
                                <p><strong>Số điện thoại:</strong> {patient.p_phone_number}</p>
                                <p><strong>Mã Bệnh Nhân:</strong> {patient.p_char}{patient.p_number}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Không có bệnh nhân nào.</p>
                )}
            </div>
        </div>
    );    
};

export default DoctorPatients;
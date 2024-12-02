import React, { useState } from 'react';

const url = 'https://db-latest-nprr.onrender.com';  

const PatientSearch = () => {
    const [patientType, setPatientType] = useState('inpatient'); 
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        setLoading(true);
        setError('');

        const token = localStorage.getItem('token');  
        if (!token) {
            setError('Chưa đăng nhập');
            setLoading(false);
            return;
        }

        try {
            const apiUrl =
                patientType === 'inpatient'
                    ? `${url}/api/getAllInPatienInfo`
                    : `${url}/api/getAllOutPatientInfo`;

            const response = await fetch(apiUrl, {
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

            if (data.message && data.message.length > 0) {
                setResults(data.message);
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
        <div>
            <h3>Tìm kiếm bệnh nhân</h3>
            
            {/* Dropdown để chọn loại bệnh nhân */}
            <select onChange={(e) => setPatientType(e.target.value)} value={patientType}>
                <option value="inpatient">Nội trú</option>
                <option value="outpatient">Ngoại trú</option>
            </select>

            <button onClick={handleSearch} disabled={loading}>
                {loading ? 'Đang tải...' : 'Lấy thông tin'}
            </button>

            {/* Hiển thị lỗi nếu có */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Hiển thị kết quả tìm kiếm */}
            <div className="patients-list">
                {results.length > 0 ? (
                    results.map((patient, index) => (
                        <div key={index} className="patient-card">
                            <h4>Bệnh nhân {index + 1}</h4>
                            <div className="patient-info">
                                <p><strong>Tên:</strong> {patient.p_first_name} {patient.p_last_name}</p>
                                <p><strong>Giới tính:</strong> {patient.p_gender}</p>
                                <p><strong>Ngày sinh:</strong> {patient.p_dob}</p>
                                <p><strong>Địa chỉ:</strong> {patient.p_address}</p>
                                <p><strong>Số điện thoại:</strong> {patient.p_phone_number}</p>

                                {/* Thông tin cho ngoại trú */}
                                {patient.p_char === 'OP' && (
                                    <>
                                        <p><strong>Chẩn đoán:</strong> {patient.exam_diagnosis}</p>
                                        <p><strong>Mã bác sĩ:</strong> {patient.doctor_code}</p>
                                        <p><strong>Lệ phí khám:</strong> {patient.exam_fee}</p>
                                        <p><strong>Ngày khám:</strong> {patient.examdate}</p>
                                        <p><strong>Ngày khám tiếp theo:</strong> {patient.exam_next_date}</p>
                                    </>
                                )}

                                {/* Thông tin cho nội trú */}
                                {patient.p_char === 'IN' && (
                                    <>
                                        <p><strong>Mã y tá:</strong> {patient.nurse_code}</p>
                                        <p><strong>Mã điều trị:</strong> {patient.treat_code}</p>
                                        <p><strong>Ngày bắt đầu điều trị:</strong> {patient.treat_start_date}</p>
                                        <p><strong>Ngày kết thúc điều trị:</strong> {patient.treat_end_date}</p>
                                        <p><strong>Kết quả điều trị:</strong> {patient.treat_result}</p>
                                    </>
                                )}
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

export default PatientSearch;
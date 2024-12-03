import React, { useState, useEffect } from 'react';

const url = 'https://db-latest-nprr.onrender.com'; 

const PaymentReport = () => {
    const [examinationReports, setExaminationReports] = useState([]);
    const [treatmentReports, setTreatmentReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchReports = async () => {
            const token = localStorage.getItem('token'); 
            if (!token) {
                setError('Chưa đăng nhập');
                setLoading(false);
                return;
            }

            try {
                const examResponse = await fetch(`${url}/api/getAllExaminationReport`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!examResponse.ok) {
                    const errorData = await examResponse.json();
                    throw new Error(errorData.message || 'Không thể tải báo cáo khám');
                }

                const examData = await examResponse.json();
                setExaminationReports(examData.message || []);
            } catch (error) {
                setError('Đã có lỗi xảy ra khi tải báo cáo khám');
                console.error('Lỗi khi gọi API báo cáo khám:', error.message);
            }

            try {
                const treatResponse = await fetch(`${url}/api/getAllTreatmentReport`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!treatResponse.ok) {
                    const errorData = await treatResponse.json();
                    throw new Error(errorData.message || 'Không thể tải báo cáo điều trị');
                }

                const treatData = await treatResponse.json();
                setTreatmentReports(treatData.message || []);
            } catch (error) {
                setError('Đã có lỗi xảy ra khi tải báo cáo điều trị');
                console.error('Lỗi khi gọi API báo cáo điều trị:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, []); 

    useEffect(() => {
        console.log(treatmentReports);
    }, [treatmentReports])

    return (
        <div style={{
            overflow: 'auto'
        }}>
            <h3>Báo cáo khám và điều trị</h3>

            {/* Hiển thị lỗi nếu có */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Hiển thị báo cáo khám */}
            {examinationReports.length > 0 && (
                <div className="report-table">
                    <h4>Báo cáo khám</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Mã khám</th>
                                <th>Ngày khám</th>
                                <th>Chẩn đoán</th>
                                <th>Phí khám</th>
                                <th>Ngày khám tiếp theo</th>
                                <th>Mã thuốc</th>
                                <th>Ngày hết hạn thuốc</th>
                                <th>Tên thuốc</th>
                                <th>Giá thuốc</th>
                                <th>Mã Bệnh Nhân</th>
                                <th>Tác Dụng Thuốc</th>
                            </tr>
                        </thead>
                        <tbody>
                            {examinationReports.map((report, index) => (
                                <tr key={index}>
                                    <td>{report.exam_id}</td>
                                    <td>{report.examdate}</td>
                                    <td>{report.exam_diagnosis}</td>
                                    <td>{report.exam_fee}</td>
                                    <td>{report.exam_next_date}</td>
                                    <td>{report.m_code}</td>
                                    <td>{report.m_expiration_date}</td>
                                    <td>{report.m_name}</td>
                                    <td>{report.m_price}</td>
                                    <td>{report.p_char}{report.p_code}</td>
                                    <td>{report.effect}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Hiển thị báo cáo điều trị */}
            {treatmentReports.length > 0 && (
                <div className="report-table">
                    <h4>Báo cáo điều trị</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Mã thuốc</th>
                                <th>Ngày hết hạn thuốc</th>
                                <th>Tên thuốc</th>
                                <th>Giá thuốc</th>
                                <th>Ngày bắt đầu điều trị</th>
                                <th>Ngày kết thúc điều trị</th>
                                <th>Kết quả điều trị</th>
                                <th>Mã Bệnh Nhân</th>
                                <th>Tác Dụng Thuốc</th>
                            </tr>
                        </thead>
                        <tbody>
                            {treatmentReports.map((report, index) => (
                                <tr key={index}>
                                    <td>{report.m_code}</td>
                                    <td>{report.m_expiration_date}</td>
                                    <td>{report.m_name}</td>
                                    <td>{report.m_price}</td>
                                    <td>{report.treat_start_date}</td>
                                    <td>{report.treat_end_date}</td>
                                    <td>{report.treat_result}</td>
                                    <td>{report.p_char}{report.p_number}</td>
                                    <td>{report.effect}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Hiển thị thông báo nếu không có báo cáo */}
            {examinationReports.length === 0 && treatmentReports.length === 0 && (
                <p>Chưa có báo cáo nào để hiển thị.</p>
            )}
        </div>
    );
};

export default PaymentReport;
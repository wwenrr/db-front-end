import React from 'react';
import Layout from '../components/Layout';
import '../assets/styles/Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStethoscope, faScissors, faFlask, faHospital, faAmbulance, faPills } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
    return (
        <Layout>
                {/* Giao diện Dashboard */}
                <h1 className="title">Chào mừng đến Hệ thống Quản lý Bệnh viện</h1>

                {/* Hình ảnh bệnh viện */}
                <div className="hospital-banner">
                    <img src="https://www.shutterstock.com/image-vector/green-hospital-building-modern-sustainable-600nw-2517328331.jpg" alt="Bệnh viện" />
                </div>

                {/* Phần giới thiệu dịch vụ */}
                <div className="service-section">
                    <div className="service-card">
                        <FontAwesomeIcon icon={faStethoscope} size="4x" />
                        <h3>Dịch vụ Khám Chữa Bệnh</h3>
                        <p>Khám và điều trị các bệnh lý thông thường và chuyên sâu.</p>
                    </div>
                    <div className="service-card">
                        <FontAwesomeIcon icon={faScissors} size="4x" />
                        <h3>Phẫu Thuật</h3>
                        <p>Cung cấp các dịch vụ phẫu thuật an toàn và hiệu quả.</p>
                    </div>
                    <div className="service-card">
                        <FontAwesomeIcon icon={faFlask} size="4x" />
                        <h3>Xét Nghiệm</h3>
                        <p>Các dịch vụ xét nghiệm với công nghệ hiện đại.</p>
                    </div>
                    <div className="service-card">
                        <FontAwesomeIcon icon={faHospital} size="4x" />
                        <h3>Cơ Sở Vật Chất</h3>
                        <p>Trang thiết bị y tế hiện đại, phòng khám tiện nghi.</p>
                    </div>
                    <div className="service-card">
                        <FontAwesomeIcon icon={faAmbulance} size="4x" />
                        <h3>Dịch Vụ Cấp Cứu</h3>
                        <p>Đội ngũ cấp cứu 24/7, sẵn sàng phục vụ mọi tình huống khẩn cấp.</p>
                    </div>
                    <div className="service-card">
                        <FontAwesomeIcon icon={faPills} size="4x" />
                        <h3>Nhà Thuốc</h3>
                        <p>Nhà thuốc với đầy đủ thuốc và vật tư y tế cần thiết cho bệnh nhân.</p>
                    </div>
                </div>

                {/* Phần giới thiệu đội ngũ bác sĩ */}
                <div className="doctor-section">
                    <div className="doctor-card">
                        <img src="https://png.pngtree.com/png-vector/20240208/ourmid/pngtree-doctor-and-health-care-png-image_11719602.png" alt="Dr. Nguyễn Văn A" />
                        <h3>Dr. Nguyễn Văn A</h3>
                        <p>Bác sĩ chuyên khoa Nội tổng hợp.</p>
                    </div>
                    <div className="doctor-card">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSihDrOkJZhChQRcbhWgPI73lXpPeNUT9FLtw&s" alt="Dr. Trần Thị B" />
                        <h3>Dr. Trần Thị B</h3>
                        <p>Bác sĩ chuyên khoa Ngoại tổng hợp.</p>
                    </div>
                    <div className="doctor-card">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnAP8sZpMSJahXSxhGYaClv1i0nq18ZNZNcg&s" alt="Dr. Lê Minh C" />
                        <h3>Dr. Lê Minh C</h3>
                        <p>Bác sĩ chuyên khoa Nhi.</p>
                    </div>
                </div>
        </Layout>
    );
};

export default Dashboard;

import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import PatientSearch from '../components/PatientSearch';
import AddPatientForm from '../components/AddPatientForm';
import DoctorPatients from '../components/DocterPatients';
import PaymentReport from '../components/PaymentReport';
import Layout from '../components/Layout';
import '../assets/styles/HospitalDatabase.css';

const HospitalDatabase = () => {
    const [activeTab, setActiveTab] = useState('search');

    return (
        <Layout>
            <div className="container">
                <div className="tabs">
                    <button
                        className={activeTab === 'search' ? 'active' : ''}
                        onClick={() => setActiveTab('search')}
                    >
                        Tìm kiếm bệnh nhân
                    </button>
                    <button
                        className={activeTab === 'add' ? 'active' : ''}
                        onClick={() => setActiveTab('add')}
                    >
                        Thêm bệnh nhân
                    </button>
                    <button
                        className={activeTab === 'doctor' ? 'active' : ''}
                        onClick={() => setActiveTab('doctor')}
                    >
                        Bệnh nhân của bác sĩ
                    </button>
                    <button
                        className={activeTab === 'report' ? 'active' : ''}
                        onClick={() => setActiveTab('report')}
                    >
                        Báo cáo thanh toán
                    </button>
                </div>

                <div className="tab-content">
                    <CSSTransition
                        in={activeTab === 'search'}
                        timeout={300}
                        classNames="tab-content"
                        unmountOnExit
                    >
                        <PatientSearch />
                    </CSSTransition>

                    <CSSTransition
                        in={activeTab === 'add'}
                        timeout={300}
                        classNames="tab-content"
                        unmountOnExit
                    >
                        <AddPatientForm />
                    </CSSTransition>

                    <CSSTransition
                        in={activeTab === 'doctor'}
                        timeout={300}
                        classNames="tab-content"
                        unmountOnExit
                    >
                        <DoctorPatients />
                    </CSSTransition>

                    <CSSTransition
                        in={activeTab === 'report'}
                        timeout={300}
                        classNames="tab-content"
                        unmountOnExit
                    >
                        <PaymentReport />
                    </CSSTransition>
                </div>
            </div>
        </Layout>
    );
};

export default HospitalDatabase;

import React, { useState } from 'react';

const PaymentReport = () => {
    const [payments, setPayments] = useState([
        { patient: 'Nguyễn Văn A', amount: '500.000 VNĐ', date: '01/01/2024' },
        { patient: 'Trần Thị B', amount: '700.000 VNĐ', date: '02/01/2024' },
    ]);

    return (
        <div>
            <h3>Báo cáo thanh toán</h3>
            <table>
                <thead>
                    <tr>
                        <th>Tên bệnh nhân</th>
                        <th>Số tiền</th>
                        <th>Ngày thanh toán</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment, index) => (
                        <tr key={index}>
                            <td>{payment.patient}</td>
                            <td>{payment.amount}</td>
                            <td>{payment.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentReport;

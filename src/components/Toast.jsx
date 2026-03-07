// src/components/Toast.jsx
import React from 'react';
import { useApp } from '../context/AppContext';

export default function Toast() {
    const { toasts } = useApp();
    return (
        <div className="toast-container">
            {toasts.map(t => (
                <div className="toast" key={t.id}>
                    <span>{t.icon}</span>
                    <span>{t.msg}</span>
                </div>
            ))}
        </div>
    );
}

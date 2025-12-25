import React from 'react';
import './notification.css';

export const showErrMsg = (msg) => {
    const reload = async () => {
        window.location.reload(false);
    }

    return (
        <>
            <div className="errMsg alert alert-warning alert-dismissible fade show" role="alert">
                <strong>{msg}</strong>
                <button onClick={reload} type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        </>
    )
}

export const showSuccessMsg = (msg) => {

    const reload = async () => {
        window.location.reload(false);
    }

    return (
        <>
            <div className="successMsg alert alert-success alert-dismissible fade show" role="alert">
                <strong>{msg}</strong>
                <button onClick={reload} type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        </>
    )
}
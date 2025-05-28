"use client"
import React, { useState } from 'react'
import axios from 'axios';

export const useSendLineMessage = () => {
    const [loading, setLaoding] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const sendMessage = async (message: string, userId: string) => {
        setLaoding(true);
        setError(null);

        axios.post('/api/line-test', {
            userId,
            message
        })
            .then(response => {
                setResponse(response.data);
            })
            .catch(error => {
                setError(error);
            })
            .finally(() => {
                setLaoding(false);
            })
    }
    return { sendMessage, loading, response, error };
}
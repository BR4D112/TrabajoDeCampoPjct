export const mockResponses = {
    success: {
        status: 'success',
        token: 'mocked-token',
    },
    successWithData: {
        status: 'success',
        token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsImZpcnN0X25hbWUiOiJzZWNyZXRhcnkiLCJyb2xlcyI6WyJTRUNSRVRBUlkiXSwiaWF0IjoxNzQ0NTYzMjQxLCJleHAiOjE3NDQ1ODQ4NDF9.SEa194Ywb8doBHi-KbT44AikPyIC2ofgD4x6tG-oQO0",
        user: {
            id: 21,
            first_name: "secretary",
            last_name: "stringtorres",
            email: "secretary@gmail.com",
            is_active: true,
            roles: [
                {
                    "id": "SECRETARY",
                    "name": "SecretariaEscuela",
                    "route": "/roles/secretary"
                }
            ]
        }
    },   
    error: {
        status: 'error',
        message: 'Credencial equivocada',
    },
    errorEmptyMessage:{
        status: 'error',
        message: '',
    },
    empty:{

    },
    variableNull:null,
    connectionError: new Error('Error de conexión'),
};
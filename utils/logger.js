const logger = async (message = '', { data = {}, exception = {} }, level = 'INFO') => {
    const logPayload = {
        level: level,
        Message: message,
        Data: data,
        Exception: {
            Message: exception.message,
            StackTrace: exception.stack
        }
    };
    
    return console.log(logPayload);
};

export default logger;
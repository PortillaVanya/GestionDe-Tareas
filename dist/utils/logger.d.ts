declare const logger: {
    info: (message: string) => void;
    error: (message: string, error?: unknown) => void;
    warn: (message: string) => void;
};
export default logger;

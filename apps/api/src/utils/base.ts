export const decodeBase64 = (data: string): string => {
    try {
        return Buffer.from(data, 'base64').toString('ascii');
    } catch (e) {
        return null;
    }
};

export const encodeBase64 = (data: string): string => {
    try {
        return Buffer.from(data).toString('base64');
    } catch (e) {
        return null;
    }
};

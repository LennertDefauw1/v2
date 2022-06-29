export const findAllTwinsQuery = {
    select: {
        yggdrasilIp: true,
        appId: true,
        user: {
            select: {
                username: true,
            },
        },
    },
};

export const findAllTwinsByUsernameQuery = userId => {
    return {
        select: {
            user: {
                select: {
                    username: true,
                },
            },
            yggdrasilIp: true,
            appId: true,
            derivedPublicKey: true,
        },
        where: {
            user: {
                userId: userId,
            },
        },
    };
};

export const findTwinByUsernameAndAppIdQuery = (userId: string, appId: string) => {
    return {
        select: {
            user: {
                select: {
                    username: true,
                },
            },
            yggdrasilIp: true,
            appId: true,
            derivedPublicKey: true,
            id: true,
        },
        where: {
            appId: appId,
            user: {
                userId: userId,
            },
        },
    };
};

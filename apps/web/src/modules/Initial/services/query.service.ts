// @TODO: improve typings overall projects
import { RouteLocationNormalizedLoaded } from 'vue-router';
import { setLocalStorageData } from '@/modules/Core/services/storage.service';
import { appId, appPublicKey, redirectUrl, scope, state } from '@/modules/Initial/data';

export type QueryOptions = {
    appid: string;
    publickey: string;
    state: string;
    redirecturl: string;
    username: string;
    scope: any;
};

export const isValidLoginUrl = (route: RouteLocationNormalizedLoaded): boolean => {
    setLocalStorageData(route);

    return !(!scope.value || !state.value || !appId.value || !redirectUrl.value || !appPublicKey.value);
};

export const isValidVerificationUrl = (route: RouteLocationNormalizedLoaded): boolean => {
    const q = route.query;
    return !(!q.userId || !q.verificationCode);
};

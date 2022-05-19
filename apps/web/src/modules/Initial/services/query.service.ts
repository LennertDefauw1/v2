// @TODO: improve typings overall projects
import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router';
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

export const isValidQueryUrl = (route: RouteLocationNormalizedLoaded) => {
    setLocalStorageData(route);

    return !(!scope.value || !state.value || !appId.value || !redirectUrl.value || !appPublicKey.value);
};

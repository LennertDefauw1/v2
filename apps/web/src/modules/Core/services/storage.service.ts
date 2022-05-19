import { QueryOptions } from '@/modules/Initial/services/query.service';
import { useRoute } from 'vue-router';
import { appId, appPublicKey, redirectUrl, scope, state, username } from '@/modules/Initial/data';

export const setLocalStorageData = () => {
    const route = useRoute();
    const queryParams: QueryOptions = route.query as QueryOptions;

    username.value = queryParams.username;
    appId.value = queryParams.appid;
    scope.value = queryParams.scope;
    state.value = queryParams.state;
    appPublicKey.value = queryParams.publickey;
    redirectUrl.value = queryParams.redirecturl;
};

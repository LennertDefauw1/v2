import { isDev } from '@/utils/environment';
import flagsmith from 'flagsmith';
// @ts-ignore
import axios from 'axios';

export const initFlags = async (name: string) => {
    const override = 'T3vCeteoyrXNw82VGErnEL';

    const environmentID = isDev ? override : (await axios.get('/api/v1/env')).data.flagsmith;
    console.log({ env: environmentID });

    await flagsmith.init({
        environmentID,
        api: 'https://flagsmith.jimber.io/api/v1/',
    });

    await flagsmith.identify(name);
    await flagsmith.getFlags();

    console.table({ flags: flagsmith.getAllFlags() });
};

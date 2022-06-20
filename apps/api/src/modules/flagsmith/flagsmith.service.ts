import { Injectable } from '@nestjs/common';
import * as flagsmith from 'flagsmith-nodejs';
import * as nodecache from 'node-cache';

@Injectable()
export class FlagsmithService {
    constructor() {
        flagsmith.init({
            environmentID: process.env.FLAGSMITH_API_KEY,
            api: process.env.FLAGSMITH_URL,
            //@ts-ignore
            cache: new nodecache({ stdTTL: 300 }),
        });
    }

    hasFeature(header: string) {
        return flagsmith.hasFeature(header);
    }

    getFeature(header: string) {
        return flagsmith.getValue(header);
    }

    async getFeatureObject<T>(header: string) {
        const result = await this.getFeature(header);
        return JSON.parse(result as string) as T;
    }
}

import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { DigitalTwinModule } from './digitaltwin.module';
import { DigitalTwinService } from './digitaltwin.service';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';

describe('Twin', () => {
    let app: INestApplication;
    let digitalTwinService = { findAll: () => [''] };

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [DigitalTwinModule],
        })
            .overrideProvider(DigitalTwinService)
            .useValue(digitalTwinService)
            .compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    it(`Should return 200 on getting all twins`, () => {
        return request(app.getHttpServer()).get('/digitaltwin').expect(200).expect(digitalTwinService.findAll());
    });

    it('Should return a 404 for getting twins of unknown user', () => {
        const unknownUser = randomStringGenerator();
        return request(app.getHttpServer()).get(`/digitaltwin${unknownUser}/`).expect(404);
    });

    afterAll(async () => {
        await app.close();
    });
});

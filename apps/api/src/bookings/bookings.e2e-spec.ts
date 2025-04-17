import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../app.module';

describe('BookingController (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'testuser', password: 'testpassword' })
      .expect(200);

    accessToken = loginResponse.body.accessToken;
  });

  afterAll(async () => {
    await app.close();
  });

  it('/bookings (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/bookings')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ userId: 'testuserId', busId: 'testbusId', seatNumber: 'A1' })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('userId', 'testuserId');
    expect(response.body).toHaveProperty('busId', 'testbusId');
    expect(response.body).toHaveProperty('seatNumber', 'A1');
  });

  it('/bookings/:id (GET)', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/bookings')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ userId: 'testuserId', busId: 'testbusId', seatNumber: 'A1' })
      .expect(201);

    const bookingId = createResponse.body.id;

    const response = await request(app.getHttpServer())
      .get(`/bookings/${bookingId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(response.body).toHaveProperty('id', bookingId);
    expect(response.body).toHaveProperty('userId', 'testuserId');
    expect(response.body).toHaveProperty('busId', 'testbusId');
    expect(response.body).toHaveProperty('seatNumber', 'A1');
  });
});

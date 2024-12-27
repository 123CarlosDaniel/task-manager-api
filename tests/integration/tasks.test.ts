import request from "supertest"
import app from "../../src/app"
import { describe, expect, it } from "vitest";


describe('Test de integración para autenticación y tareas', () => {
  let accessToken;
  let refreshToken;

  it('Debe autenticar al usuario y retornar un objeto con session', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@test.test',
        password: '123456789'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('session');
    expect(response.body.session).toHaveProperty('access_token');
    expect(response.body.session).toHaveProperty('refresh_token');

    accessToken = response.body.session.access_token;
    refreshToken = response.body.session.refresh_token;
  });

  it('Debe retornar un array de tareas cuando se provee el access_token', async () => {
    const response = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${accessToken}`)
      .set('x-refresh-token', refreshToken);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    if (response.body.length > 0) {
      expect(response.body[0]).toHaveProperty('title');
      expect(response.body[0]).toHaveProperty('description');
      expect(response.body[0]).toHaveProperty('state');
    }
  });
});


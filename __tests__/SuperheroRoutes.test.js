require('dotenv').config();

const { MongoMemoryServer } = require('mongodb-memory-server');
const mongod = new MongoMemoryServer();
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');

const request = require('supertest');
const app = require('../lib/app');
const Superhero = require('../lib/models/Superhero');


describe('SuperHero Routes', () => {

  beforeAll(async() => {
    const uri = await mongod.getUri();
    return connect(uri);
  });
  
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  
  afterAll(async() => {
    await mongoose.connection.close();
    return mongod.stop();
  });
  
  it('creates a superhero', () => {
    return request(app)
      .post('/api/v1/superheroes')
      .send({
        name: 'Simon',
        power: 'Gas Passing'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          name: 'Simon',
          power: 'Gas Passing',
          __v: 0
        });
      });
  });

  it('gets the superheroes', async() => {

    await Superhero.create([{
      name: 'Jimmy',
      power: 'Chocolate Magic'
    }, {
      name: 'Susan',
      power: 'Vanilla Magic'
    }]);

    return request(app)
      .get('/api/v1/superheroes')
      .then(res => {
        expect(res.body).toEqual([{
          __v: 0,
          _id: expect.anything(),
          name: 'Jimmy',
          power: 'Chocolate Magic'
        },
        { __v: 0,
          _id: expect.anything(),
          name: 'Susan',
          power: 'Vanilla Magic'     
        }]);
      });
  });

  it('gets a superhero by id', async() => {
    const newSuperhero = await Superhero.create({
      name: 'Timmy Two Toes',
      power: 'Two Toe Science'
    });

    return request(app)
      .get(`/api/v1/superheroes/${newSuperhero._id}`)
      .then(res => {
        expect(res.body).toEqual({
          __v: 0,
          _id: newSuperhero.id,
          name: 'Timmy Two Toes',
          power: 'Two Toe Science'
        });
      });
  });

  it('gets a superhero by id and updates it', () => {

    Superhero.create({
      name: 'Billy Badass',
      power: 'Badassery'
    })
      .then(superhero => {
        return request(app)
          .patch(`/api/v1/superheroes/update/${superhero._id}`)
          .send({
            name: 'William BadButt',
            power: 'BadButtery'
          })
          .then(res => {
            expect(res.body).toEqual({
              __v: 0,
              _id: expect.anything(),
              name: 'William BadButt',
              power: 'BadButtery'
            });
          });
      });
  });

  it('deletes a superhero', async() => {

    const newSuperhero = await Superhero.create({
      name: 'Jimmy Cracker Of Corn',
      power: 'Not caring'
    });

    return request(app)
      .delete(`/api/v1/superheroes/${newSuperhero._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          __v: 0,
          name: 'Jimmy Cracker Of Corn',
          power: 'Not caring'
        });
      });
  });
});
  

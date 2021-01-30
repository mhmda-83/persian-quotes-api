import chai, { expect } from 'chai';
import chaiThings from 'chai-things';
import { Container } from 'typescript-ioc';

import { sampleRecords } from '../../src/data/seedRecord';
import QuoteRepo from '../../src/repository/quote';
import { createContainer } from '../mocks.config';

chai.should();
chai.use(chaiThings);

describe('mongooseRepo', () => {
  Container.configure(...createContainer());
  const repo = Container.get(QuoteRepo);

  before('connect to db', () => {
    repo.connect();
  });

  beforeEach(async () => {
    await repo.deleteAll();
    await repo.seed(sampleRecords);
  });

  it('should return all document in range', async () => {
    const docs = await repo.getAll({ limit: 7 });

    expect(docs.length).to.be.eq(7);
  });

  it('should return all documents count', async () => {
    const docsCount = await repo.getCount();
    expect(docsCount).to.be.a('number').and.be.eq(sampleRecords.length);
  });

  it('should return random document', async () => {
    const randomDoc = await repo.getRandom();
    const foundRandomDoc = sampleRecords.find(
      (e) => e.original.text === randomDoc?.original.text,
    );
    expect(randomDoc?.original)
      .to.be.an('object')
      .and.deep.eq(foundRandomDoc?.original);
  });

  it('should return document by id', async () => {
    const randomDoc = await repo.getRandom();
    if (randomDoc?.id) {
      const doc = await repo.getById(randomDoc?.id);
      expect(doc).to.be.deep.eq(randomDoc);
    }
  });

  it('should get document by author', async () => {
    const docs = await repo.getByAuthor(sampleRecords[0].original.author, {
      limit: 1,
    });
    docs.should.all.have.nested.property(
      'original.author',
      sampleRecords[0].original.author,
    );
  });
});

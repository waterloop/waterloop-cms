import chai from 'chai';
const expect = chai.expect;
import renameProps from '../../utils/rename-props';

describe('Utility: rename-props', () => {
  it('Should return a new object with renamed props', () => {
    const object = {
      helloWorld: '1',
    };

    const renamedObject = renameProps(object, {
      helloWorld: 'hello_world',
    });

    expect(renamedObject).to.deep.equal({
      hello_world: '1',
    });
  });

  it('should include any props that were not to be renamed', () => {
    const object = {
      helloWorld: 1,
      anotherProp: 2
    };

    const renamedObject = renameProps(object, {
      helloWorld: 'hello_world',
    });

    expect(renamedObject).to.deep.equal({
      hello_world: 1,
      anotherProp: 2,
    });
  });

  it('should not modify the original object', () => {
    const object = {
      helloWorld: 1,
      anotherProp: 2
    };

    renameProps(object, {
      helloWorld: 'hello_world',
    });

    expect(object).to.deep.equal({
      helloWorld: 1,
      anotherProp: 2
    });
  });

  it('should return the original object if no propMap is supplied', () => {
    const object = {
      helloWorld: 1,
      anotherProp: 2
    };

    const renamedObject = renameProps(object);

    expect(renamedObject).to.deep.equal({
      helloWorld: 1,
      anotherProp: 2
    });
  });

  it('should return the original object if the props in propMap do not appear in object', () => {
    const object = {
      helloWorld: 1,
      anotherProp: 2
    };

    const renamedObject = renameProps(object, {
      pickles: 'pineapples',
    });

    expect(renamedObject).to.deep.equal({
      helloWorld: 1,
      anotherProp: 2
    });
  });
});

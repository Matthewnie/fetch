import Client from '../../src';
import Transport from '../../src/Transport';
import MockTransport from '../../__mocks__/MockTransport';
import expect from 'expect';

// describe

describe('Client', () => {
  it('sets transport property', () => {
    const transport = new MockTransport();
    const client = new Client({}, transport);
    expect(client.transport).toBe(transport);
  });

  it('has default transport layer', () => {
    const client = new Client();
    expect(client.transport instanceof Transport).toBe(true);
  });

  it('has default options', () => {
    const client = new Client();
    expect(client.options).toEqual({
      endpoint: '',
      namespace: 'wp/v2',
      resource: '',
      config: {
        referrer: 'wp-headless',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    });
  });

  it('merges options', () => {
    const client = new Client({
      endpoint: 'https://wordpress.test/wp-json',
      config: {
        referrer: 'WordMess',
        foo: 'bar',
        headers: {
          'X-Foo': 'bar'
        },
        colors: ['red', 'green', 'blue']
      }
    });
    expect(client.options).toEqual({
      endpoint: 'https://wordpress.test/wp-json',
      namespace: 'wp/v2',
      resource: '',
      config: {
        referrer: 'WordMess',
        credentials: 'include',
        foo: 'bar',
        headers: {
          'Content-Type': 'application/json',
          'X-Foo': 'bar'
        },
        colors: ['red', 'green', 'blue']
      }
    });
  });

  it('has HTTP methods', () => {
    const client = new Client();
    expect(typeof client.get).toBe('function');
    expect(typeof client.create).toBe('function');
    expect(typeof client.update).toBe('function');
    expect(typeof client.delete).toBe('function');
  });

  it('has API Resource methods', () => {
    const client = new Client();
    [
      'categories',
      'comments',
      'media',
      'statuses',
      'pages',
      'posts',
      'settings',
      'tags',
      'taxonomies',
      'types',
      'users',
      'search'
    ].forEach(method => {
      client[method]();
      expect(client.options.resource).toBe(method);
    });
  });
});

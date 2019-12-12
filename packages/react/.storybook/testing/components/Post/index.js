import React from 'react';

const Post = ({ data, fetch, update, isFetching }) => {
  if (!data) {
    return null;
  }
  return (
    <div style={{ padding: 80, background: '#eee' }}>
      <div style={{ margin: '0 auto', width: 400 }}>
        <div
          style={{
            padding: 30,
            background: '#fff',
            margin: '0 0 20px 0'
          }}
        >
          <h1>{data.title.rendered}</h1>
          <p dangerouslySetInnerHTML={{ __html: data.content.rendered }} />
        </div>
        <button onClick={() => fetch()}>Refresh</button>
        <button onClick={() => update({ title: 'updated!' })}>update</button>
        {isFetching && <p>Refreshing...</p>}
      </div>
    </div>
  );
};

export default Post;

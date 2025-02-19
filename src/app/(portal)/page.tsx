import { Home } from '@/portal/module/home/Home';

async function getPosts() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return []; // Return empty array as fallback
  }
}

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <Home posts={posts} />
  );
}

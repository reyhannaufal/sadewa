import { PrismaClient } from '@prisma/client';
import { useRouter } from 'next/router';
import React from 'react';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import NextImage from '@/components/NextImage';

interface User {
  id: string;
  name: string | null;
  image: string | null;
}

interface Post {
  id: string;
  title: string;
  content: string;
  author: User;
}

interface PostIndeProps {
  posts: Post[];
}

export async function getServerSideProps() {
  const prisma = new PrismaClient();

  const allPosts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });

  return {
    props: {
      posts: allPosts,
    },
  };
}

export default function PostIndex({ posts }: PostIndeProps) {
  const router = useRouter();

  return (
    <Layout>
      <div className='py-2'>
        <h1>
          <span role='img' aria-label='waving hand'>
            👋
          </span>{' '}
          List of Posts
        </h1>
        {posts.map((post: Post) => (
          <div
            key={post.id}
            className='mt-2 space-y-2 rounded-lg border-2 border-gray-800 p-3'
          >
            <div className='flex items-center gap-x-2'>
              <NextImage
                src={post.author.image as string}
                alt={post.author.name as string}
                layout='fixed'
                width={40}
                height={40}
                imgClassName='rounded-full'
              />
              <p>{post.author.name}</p>
            </div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p></p>
          </div>
        ))}
        <Button className='mt-6' onClick={() => router.push('/dashboard')}>
          Back to dashboard
        </Button>
      </div>
    </Layout>
  );
}

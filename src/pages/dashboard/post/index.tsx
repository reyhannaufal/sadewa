import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { prisma } from '@/lib/prisma';

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
  const { register, handleSubmit, reset } = useForm();
  const { data: session } = useSession();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    await fetch('/api/post/', {
      method: 'POST',
      body: JSON.stringify({
        ...data,
        email: session?.user.email,
        id: session?.user.id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    reset();
  };

  return (
    <Layout>
      <div className='py-2'>
        <div className='mt-10'>
          <h2>Create post</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='mt-5 mb-10 space-y-4 '
          >
            <div className='rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600 '>
              <label
                htmlFor='title'
                className='block text-xs font-medium text-gray-900'
              >
                Title
              </label>
              <input
                type='text'
                id='title'
                className='block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm'
                placeholder='Some awsesome title'
                {...register('title')}
              />
            </div>
            <div className='rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600'>
              <label
                htmlFor='content'
                className='block text-xs font-medium text-gray-900'
              >
                Content
              </label>
              <input
                type='text'
                id='content'
                className='block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm'
                placeholder='Hmmm content 🤔'
                {...register('content')}
              />
            </div>
            <Button type='submit'>Submit</Button>
          </form>
        </div>
        <h2>
          <span role='img' aria-label='waving hand'>
            👋
          </span>{' '}
          List of Posts
        </h2>
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

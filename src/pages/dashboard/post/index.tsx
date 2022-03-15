import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { ImSpinner2 } from 'react-icons/im';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';

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

export default function PostIndex() {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm();
  const { data: session } = useSession();
  const [posts, setPosts] = React.useState<Post[] | null>(null);

  const getPostsData = async () => {
    const res = fetch('/api/post', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await (await res).json();
    setPosts(data);
  };

  const postPostData = async (values: FieldValues) => {
    await fetch('/api/post/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    reset();
    await postPostData({
      ...data,
      id: session?.user.id,
      email: session?.user.email,
    });
    setPosts(null);
    await getPostsData();
  };

  React.useEffect(() => {
    getPostsData();
  }, []);

  if (!posts) {
    return (
      <Layout>
        <Seo templateTitle='Notes' />

        <div className='layout flex min-h-[50vh] w-full flex-col items-center justify-center space-y-4 text-center'>
          <ImSpinner2 className='animate-spin' />
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className=' mx-12 mt-10 flex  w-auto flex-col justify-start space-y-4'>
        <h2>Create an awesome workspace 🤙</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 '>
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
      <div className='mx-12 mt-10 mb-8 flex w-auto flex-col  space-y-4'>
        <h2>
          <span role='img' aria-label='waving hand'>
            👋
          </span>{' '}
          Workspaces
        </h2>
        {posts &&
          posts?.map((post: Post) => (
            <div
              key={post.id}
              className='mx-auto mt-2 w-full space-y-2 rounded-lg border-2 border-gray-800 p-3'
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
        <Button
          className='w-[11rem] justify-start'
          onClick={() => router.push('/dashboard')}
        >
          Back to dashboard
        </Button>
      </div>
    </Layout>
  );
}

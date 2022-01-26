import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import type { NextPage } from 'next';
import { Skeleton } from '@mui/material';
import Head from 'next/head';
import AddIcon from '@mui/icons-material/Add';
import KeyboardTabTwoToneIcon from '@mui/icons-material/KeyboardTabTwoTone';
import AttachmentOutlinedIcon from '@mui/icons-material/AttachmentOutlined';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';

import Sidebar from '../components/shared/Sidebar';
import { getAllEventTypes } from '../store/actions/events';
import { AppState } from '../store/types';

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const { isLoading, eventTypes } = useSelector(
    (state: AppState) => state.events,
    shallowEqual
  );

  useEffect(() => {
    dispatch(getAllEventTypes());
  }, []);

  return (
    <div className='flex flex-row items-start justify-between'>
      <Head>
        <title>Event Types | Cal.com</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Sidebar />
      <div className='h-screen w-[80%] bg-secondary p-12 flex flex-col'>
        <div className='flex flex-row items-start justify-between w-full'>
          <div className='flex flex-col items-start justify-center'>
            <span className='text-base font-bold'>Event Types</span>
            <span className='text-gray-500'>
              Create events to share for people to book on your calendar.
            </span>
          </div>
          <button
            className='flex flex-row items-center justify-center px-3 py-2 text-white bg-black'
            type='button'
          >
            <AddIcon /> <span className='ml-2'>New event type</span>
          </button>
        </div>
        {isLoading && (
          <div className='w-full h-[25%] flex flex-col justify-around items-center'>
            <Skeleton
              animation='wave'
              variant='rectangular'
              width='100%'
              height='25%'
            />
            <Skeleton
              animation='wave'
              variant='rectangular'
              width='100%'
              height='25%'
            />
            <Skeleton
              animation='wave'
              variant='rectangular'
              width='100%'
              height='25%'
            />
          </div>
        )}
        {!isLoading &&
          eventTypes.map((eventType, index) => (
            <div
              key={index}
              className='flex flex-row items-center justify-between w-full px-5 py-5 mt-10 bg-white border-2 border-secondary'
            >
              <div className='flex flex-col justify-between cursor-pointer'>
                <div className='flex flex-row my-2 text-xs'>
                  <span className='font-bold capitalize'>{eventType.name}</span>
                  <span className='text-gray-300'>
                    /dushimeemma/{eventType.duration}min
                  </span>
                </div>
                <div className='flex flex-row items-center justify-start my-2 text-xs'>
                  <AccessTimeRoundedIcon className='w-[0.938rem] h-[0.938rem] text-gray-300' />
                  <span className='ml-1 mr-3 text-gray-300'>
                    {eventType.duration}m
                  </span>
                  <PersonOutlineRoundedIcon className='w-[0.938rem] h-[0.938rem] text-gray-300' />
                  <span className='ml-1 text-gray-300'>1 on 1</span>
                </div>
              </div>
              <div className='flex flex-row justify-between'>
                <a
                  target='_blank'
                  href={`/dushimeemma/${eventType.duration}min`}
                  onClick={() =>
                    localStorage.setItem('id', JSON.stringify(eventType.id))
                  }
                  className='flex items-center justify-center w-10 h-10 mx-5 hover:border-2 hover:border-secondary'
                >
                  <KeyboardTabTwoToneIcon className='-rotate-45 w-[0.938rem] h-[0.938rem]' />
                </a>
                <button
                  type='button'
                  className='flex items-center justify-center w-10 h-10 mx-5 hover:border-2 hover:border-secondary'
                >
                  <AttachmentOutlinedIcon className='w-[0.938rem] h-[0.938rem] -rotate-45' />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;

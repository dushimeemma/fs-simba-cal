import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import AccessTimeTwoToneIcon from '@mui/icons-material/AccessTimeTwoTone';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import AddIcon from '@mui/icons-material/Add';
import moment from 'moment';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Alert from '@mui/material/Alert';

import TextField from '../../components/reusable/TextField';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Full Name'),
  email: Yup.string().email().required().label('Email'),
  notes: Yup.string().label('Additional Notes'),
});

const Book = () => {
  const router = useRouter();
  const [booking, setBooking] = useState('');
  useEffect(() => {
    const dateData = localStorage.getItem('date');
    const dayData = moment(dateData).format('dddd');
    const newDateData = moment(dateData).format('MMM Do YYYY');
    const time = localStorage.getItem('time');
    setBooking(`${time}, ${dayData} ${newDateData}`);
  });

  const handleConfirmEvent = (values: {
    name: string;
    email: string;
    notes: string;
  }) => {
    console.log(values);
    router.push({
      pathname: '/success',
      query: { date: `${booking}` },
    });
  };
  return (
    <div className='flex items-center justify-center w-screen h-screen bg-secondary'>
      <Head>
        <title>Confirm your 15min with Emmanuel Dushime | Cal.com</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='w-[60%]  h-[65%] bg-white border-8 border-secondary flex flex-row justify-between items-center'>
        <div className='mx-5 border-r-2 border-secondary w-[50%] h-[90%] flex flex-col items-start'>
          <span className='text-gray-500'>Emmanuel Dushime</span>
          <span className='text-base font-bold'>15 Min Meeting</span>
          <div className='flex flex-row items-center justify-center mt-5 text-gray-500'>
            <AccessTimeTwoToneIcon className='mr-3' />
            <span>15 minutes</span>
          </div>
          <div className='flex flex-row items-center justify-center mt-2 text-green-300 cursor-pointer'>
            <CalendarTodayOutlinedIcon className='mr-3' />
            <span className='mr-3 '>{booking}</span>
          </div>
        </div>
        <Formik
          initialValues={{ name: '', email: '', notes: '' }}
          onSubmit={handleConfirmEvent}
          validationSchema={validationSchema}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            errors,
            handleBlur,
            touched,
            isValid,
          }) => (
            <form
              className='w-[50%] h-full py-10 flex flex-col pl-5 pr-10'
              onSubmit={handleSubmit}
            >
              <>
                <TextField
                  label='Your Name'
                  type='text'
                  name='name'
                  placeholder='John Doe'
                  containerClasses='my-2'
                  value={values.name}
                  onChange={handleChange('name')}
                  onBlur={handleBlur('name')}
                />
                {touched.name && errors.name && (
                  <Alert severity='error' className='w-full mb-5'>
                    {errors.name}
                  </Alert>
                )}
              </>
              <>
                <TextField
                  label='Email Address'
                  type='text'
                  name='email'
                  placeholder='you@email.address'
                  containerClasses='my-2'
                  value={values.email}
                  onChange={handleChange('email')}
                  onBlur={handleBlur('email')}
                />
                {touched.email && errors.email && (
                  <Alert severity='error' className='w-full mb-5'>
                    {errors.email}
                  </Alert>
                )}
              </>

              <button
                type='button'
                className='flex items-center justify-start my-3 font-bold text-black'
              >
                <AddIcon />
                <span>Addition Guests</span>
              </button>

              <label htmlFor='notes' className='my-2 font-bold text-black'>
                Additional notes
              </label>
              <>
                <textarea
                  value={values.notes}
                  onChange={handleChange('notes')}
                  onBlur={handleBlur('notes')}
                  name='notes'
                  placeholder='Please share any that can help prepare our meeting'
                  className='w-full px-3 py-2 space-x-2 leading-tight text-black border-2 rounded-sm shadow appearance-none border-secondary focus:outline-none focus:shadow-outline'
                ></textarea>
                {touched.notes && errors.notes && (
                  <Alert severity='error' className='w-full mb-5'>
                    {errors.notes}
                  </Alert>
                )}
              </>

              <div className='flex flex-row items-center'>
                <button
                  type='submit'
                  className='flex items-center justify-center h-10 px-3 py-2 my-5 text-white bg-black'
                  disabled={!isValid}
                >
                  Confirm
                </button>
                <button
                  type='button'
                  className='flex items-center justify-center h-10 px-3 py-2 my-5 ml-3 text-black bg-secondary'
                  onClick={() => router.push('/dushimeemma/15min')}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default Book;

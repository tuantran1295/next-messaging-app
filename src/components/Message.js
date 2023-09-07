import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { formatRelative } from 'date-fns';

// Uppercase the first letter
const capitalize = ([first, ...rest]) =>
  [first.toUpperCase(), ...rest].join('');

const formatDate = (date) => {
  let formattedDate = '';
  if (date) {
    // Convert the date in words relative to the current date
    formattedDate = formatRelative(date, new Date());
  }
  return capitalize(formattedDate);
};

function Message({
  createdAt = null,
  text = '',
  displayName = '',
  photoURL = '',
}) {
  if (!text) return null;
  console.log(photoURL);
  return (
    <div className='px-4 py-4 rounded-md hover:bg-gray-50 dark:hover:bg-coolDark-600 overflow-hidden flex items-start'>
      {photoURL ? (
        <Image
          src={photoURL}
          alt='Avatar'
          className='rounded-full'
          width={45}
          height={45}
        />
      ) : <Image
          src='/assets/avatar-placeholder.jpg'
          alt='Avatar'
          className='rounded-full'
          width={45}
          height={45}
      />}
      <div className='ml-4'>
        <div className='flex items-center mb-1'>
          {displayName ? (
            <p className='mr-2 text-KaiBrand-500'>{displayName}</p>
          ) : <p className='mr-2 text-KaiBrand-500'>Anonymous</p>}
          {createdAt?.seconds ? (
            <span className='text-gray-500 text-xs'>
              {formatDate(new Date(createdAt.seconds * 1000))}
            </span>
          ) : null}
        </div>
        <p>{text}</p>
      </div>
    </div>
  );
}

Message.propTypes = {
  text: PropTypes.string,
  // An object taking on a particular shape
  createdAt: PropTypes.shape({
    seconds: PropTypes.number,
  }),
  displayName: PropTypes.string,
  photoURL: PropTypes.string,
};

export default Message;

import Image from 'next/image';

const user = {
  name: 'Azam',
  imageUrl: '/images/mypic.jpg',
  imageSize: 90,
};

export default function Profile() {
  return (
    <Image
      classNameName="rounded-e-full"
      src={user.imageUrl}  // Use the correct image URL from the user object
      width={user.imageSize}  // Adjust the size dynamically
      height={user.imageSize}
      alt={`Picture of ${user.name}`}  // Dynamically adjust alt text
    />
  );
}

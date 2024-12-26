import EmptyLayout from '@/components/Layout/EmptyLayout';

export default function HomePage() {
  return (
    <EmptyLayout>
      <div>home</div>
    </EmptyLayout>
  );
}

// export async function getServerSideProps(context: any) {
//   return {
//     redirect: {
//       destination: '/dashboard',
//       permanent: false,
//     },
//   };
// }

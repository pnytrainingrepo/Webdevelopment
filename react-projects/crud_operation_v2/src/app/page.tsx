// app/page.tsx
import ItemList from '@/components/ItemList';

export default function Home() {
  return (
    <div className="container mx-auto">
      <main className="py-4">
        <h1 className="text-center text-3xl font-bold mb-8">CRUD Application</h1>
        <ItemList />
      </main>
    </div>
  );
}

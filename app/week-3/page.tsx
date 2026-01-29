import ItemList from './item-list';

export default function Page() {
  return (
    <main className="min-h-screen text-black-1000 bg-slate-200 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Shopping List</h1>
        <ItemList />
      </div>
    </main>
  );
}
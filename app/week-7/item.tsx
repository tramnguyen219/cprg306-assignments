interface ItemProps {
  name: string;
  quantity: number;
  category: string;
  onSelect: () => void;  
}

export default function Item({ name, quantity, category, onSelect }: ItemProps) {
  return (
    <li 
      onClick={onSelect} 
      className="flex flex-col p-4 mb-3 bg-white rounded-lg shadow-sm border border-gray-500 hover:shadow-md transition-shadow duration-200 cursor-pointer"
    >
      <div className="flex items-center justify-between mb-5">
        <span className="text-lg font-semibold text-gray-800">{name}</span>
      </div>
      <div className="flex justify-between text-medium text-gray-600">
        <span>Quantity: <span className="font-medium text-blue-800">{quantity}</span></span>
        <span className="font-medium text-gray-800">
          {category}
        </span>
      </div>
    </li>
  );
}
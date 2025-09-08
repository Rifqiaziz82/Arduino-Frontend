
interface Lamp {
  id: number;
  room: string;
  isOn: boolean;
}

interface LampControlProps {
  lamp: Lamp;
  toggleLamp: (id: number) => void;
}

const LampControl: React.FC<LampControlProps> = ({ lamp, toggleLamp }) => {
  return (
    <div
      className={`p-4 rounded-lg shadow-md text-white transition-colors duration-300 ${
        lamp.isOn ? 'bg-yellow-500' : 'bg-gray-700'
      }`}
    >
      <h3 className="text-lg font-medium">{lamp.room}</h3>
      <p className="text-sm">{lamp.isOn ? 'Menyala' : 'Mati'}</p>
      <button
        onClick={() => toggleLamp(lamp.id)}
        className="mt-4 w-full py-2 px-4 rounded-md font-semibold transition-colors duration-300
        bg-white text-gray-700 hover:bg-gray-200"
      >
        {lamp.isOn ? 'Matikan' : 'Nyalakan'}
      </button>
    </div>
  );
};

export default LampControl;
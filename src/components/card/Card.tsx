type CardProps = {
  bgColor: string;
  type: string;
  taskCount: number;
  children: React.ReactNode;
  onClick?: () => void;
};

const Card = ({ bgColor, type, taskCount, children, onClick }: CardProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex gap-2 justify-start items-center ${bgColor} p-2 rounded-2xl cursor-pointer hover:brightness-90 transition-all ease-in-out duration-300`}>
      <div style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }} className="p-2 rounded-full">
        {children}
      </div>
      <div>
        <span className="block font-semibold text-sm  break-all">{type}</span>
        <span className="block text-xs opacity-35">{taskCount} Tasks</span>
      </div>
    </div>
  );
};

export default Card;

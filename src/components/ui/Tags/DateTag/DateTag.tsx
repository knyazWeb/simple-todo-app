

type DateTagProps = {
  date: string;
}


const DateTag = ({date}: DateTagProps) => {
  return (
    <div
      className={`inline w-fit py-1 px-2 bg-fuchsia-400 leading-none rounded-full text-white text-xs font-normal`}>
      {date}
    </div>
  );
}

export default DateTag
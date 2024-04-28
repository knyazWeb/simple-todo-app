import { Listbox, Transition } from "@headlessui/react";
import { dateItemType } from "../../pages/calendar/items.types";
import { BsChevronExpand } from "react-icons/bs";
import { Fragment } from "react";
import { IoCheckmark } from "react-icons/io5";

type DateListboxProps = {
  selectedItem: dateItemType;
  setSelectedItem: (item: dateItemType) => void;
  items: dateItemType[];
  classNames?: string;
};

const DateListbox = ({ selectedItem, setSelectedItem, items, classNames }: DateListboxProps) => {
  return (
    <Listbox value={selectedItem} onChange={setSelectedItem}>
      <div className={`relative mt-1 ${classNames}`}>
        <Listbox.Button
          className={
            "relative w-full cursor-default bg-red-400 rounded-lg text-white py-1 px-5 text-center shadow-md "
          }>
          <span className="block">{selectedItem.name}</span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          enter="transition ease-in-out duration-200"
          leave="transition ease-in-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <Listbox.Options className="absolute z-10 mt-1 w-full overflow-auto rounded-md bg-white py-1 text-base max-h-36 shadow-md scrollbar-hide overflow-y-auto">
            {items.map((item) => (
              <Listbox.Option
                className={({ active }) =>
                  `relative cursor-default select-none text-center ${active ? "bg-red-200 " : "text-black"}`
                }
                key={item.id}
                value={item}
                disabled={item.unavailable}>
                {({ selected }) => (
                  <span className={`block py-1 ${selected ? "bg-red-400 text-white" : "bg-transparent font-normal"}`}>
                    {item.name}
                  </span>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default DateListbox;

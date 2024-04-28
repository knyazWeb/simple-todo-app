import { IoIosArrowBack } from "react-icons/io";
import ButtonIcon from "../../components/ui/Buttons/ButtonIcon/ButtonIcon";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DateListbox from "../../components/dateListbox/DateListbox";
import { monthItems, yearItems, createDayItems, isValidDate } from "./calendarItems";
import Loading from "../../components/loading/Loading";
import { useAppSelector } from "../../hooks/redux";
import { selectUser } from "../../store/reducers/authSlice";
import { useGetTasksQuery } from "../../services/TasksService";
import Task from "../../components/tasks/Task/Task";
import { formatLocalDate } from "../../components/helpers/formatLocalDate";

const Calendar = () => {
  const { isAuth, userId } = useAppSelector(selectUser);
  const { data, isLoading, isError } = useGetTasksQuery(userId, { skip: !isAuth });
  const [visibleDate, setVisibleDate] = useState(new Date());
  const formattedDate = visibleDate.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const dataTasksKeys =
    data &&
    Object.keys(data)
      .filter((key) => data[key].date === formatLocalDate(visibleDate))
      .reverse();

  const [dayItems, setDayItems] = useState(createDayItems(visibleDate.getFullYear(), visibleDate.getMonth() + 1));

  const [selectedDayItem, setSelectedDayItem] = useState(
    dayItems.find((item) => item.id === visibleDate.getDate()) || dayItems[0]
  );
  const [selectedMonthItem, setSelectedMonthItem] = useState(
    monthItems.find((item) => item.id === visibleDate.getMonth() + 1) || monthItems[0]
  );
  const [selectedYearItem, setSelectedYearItem] = useState(
    yearItems.find((item) => item.name === visibleDate.getFullYear().toString()) || yearItems[0]
  );

  useEffect(() => {
    setSelectedDayItem(dayItems.find((item) => item.id === selectedDayItem.id) || dayItems[0]);
  }, [dayItems]);

  useEffect(() => {
    setDayItems(createDayItems(selectedYearItem.id, selectedMonthItem.id));
  }, [selectedMonthItem, selectedYearItem]);

  useEffect(() => {
    const { day, month, year } = {
      day: selectedDayItem.name,
      month: selectedMonthItem.id,
      year: selectedYearItem.name,
    };
    if (isValidDate(+selectedYearItem.name, selectedMonthItem.id, selectedDayItem.id)) {
      setVisibleDate(new Date(`${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`));
    }
  }, [selectedDayItem, selectedMonthItem, selectedYearItem]);

  const navigate = useNavigate();

  if (!isAuth && isError) {
    return <Navigate to="/registration" replace />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col w-full pb-20">
      <div className="mb-5">
        <ButtonIcon onClick={() => navigate(-1)} type="button" color="bg-gray-200" borderRadius="rounded-lg">
          <IoIosArrowBack size={25} />
        </ButtonIcon>
      </div>
      <div className="mb-8">
        <span className="block font-medium mb-1">{formattedDate}</span>
        <div className="flex justify-between gap-2">
          <DateListbox
            classNames="basis-16 shrink-0"
            items={dayItems}
            selectedItem={selectedDayItem}
            setSelectedItem={setSelectedDayItem}
          />
          <DateListbox
            classNames="basis-full"
            items={monthItems}
            selectedItem={selectedMonthItem}
            setSelectedItem={setSelectedMonthItem}
          />
          <DateListbox
            classNames="basis-fit"
            items={yearItems}
            selectedItem={selectedYearItem}
            setSelectedItem={setSelectedYearItem}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {isLoading && <Loading />}

        {data && dataTasksKeys?.length
          ? dataTasksKeys.map((key) => {
              const task = data[key];
              return (
                <Task
                  key={key}
                  id={key}
                  title={task.title}
                  date={task.date}
                  description={task.description}
                  status={task.status}
                  bgColor={
                    task.status === "Completed"
                      ? "bg-teal-100 bg-opacity-40"
                      : task.status === "In process"
                        ? "bg-yellow-100 bg-opacity-40"
                        : task.status === "On going"
                          ? "bg-blue-200 bg-opacity-40"
                          : task.status === "Canceled"
                            ? "bg-red-200 bg-opacity-40"
                            : ""
                  }
                />
              );
            })
          : isLoading || <p className="text-center text-xl">No tasks on this day</p>}
      </div>
    </div>
  );
};

export default Calendar;

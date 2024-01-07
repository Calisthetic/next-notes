import IconBirthday from "@/src/components/icons/icon-birthday";
import IconCart from "@/src/components/icons/icon-cart";
import IconNotes from "@/src/components/icons/icon-notes";
import IconTasks from "@/src/components/icons/icon-tasks";
import ReadMoreButton from "@/src/components/ui/read-more-btn";
import RenderBirthdays from "./render-birthdays";
import RenderTasks from "./render-tasks";

export default function Dashboars () {

  return (
    <div className="flex justify-center w-full px-2 pt-2">
      <div className="flex justify-center flex-col w-full max-w-5xl gap-y-2 md:gap-y-4">
        <div className="flex justify-between w-full flex-col sm:flex-row gap-y-2
        child:outline-1 child:border-b sm:child:outline child:outline-border sm:child:rounded-xl
        child:py-2 sm:child:py-0 sm:child:border-none child:p-1">
          <div className="w-full sm:w-[calc(40%-4px)] md:w-[calc(30%-8px)] flex flex-col justify-between">
            <div className="flex items-center justify-start gap-x-2">
              <IconBirthday classes="h-8 w-8 fill-icon"></IconBirthday>
              <p className=" text-lg font-medium">Ближайшие днюхи</p>
            </div>
            <RenderBirthdays></RenderBirthdays>
            <div className="flex justify-between items-center">
              <div></div>
              <ReadMoreButton path="/birthdays"></ReadMoreButton>
            </div>
          </div>
          <div className="w-full sm:w-[calc(60%-4px)] md:w-[calc(70%-8px)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-start gap-x-2">
                <IconTasks classes="h-8 w-8 stroke-icon"></IconTasks>
                <p className=" text-lg font-medium">Задания</p>
              </div>
              {/* <div className="my-1">
                <label className="relative inline-flex items-center me-5 cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer"/>
                  <div className="w-11 h-6 bg-gray-500 rounded-full peer peer-checked:after:translate-x-full 
                  rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] 
                  after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-white after:border 
                  after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-button"></div>
                </label>
              </div> */}
              <RenderTasks></RenderTasks>
            </div>
            <div className="flex justify-between items-center">
              <div></div>
              <ReadMoreButton path="/tasks"></ReadMoreButton>
            </div>
          </div>
        </div>
        <div className="flex justify-between w-full flex-col sm:flex-row-reverse gap-y-2
        child:outline-1 child:border-b sm:child:outline child:outline-border sm:child:rounded-lg
        child:py-2 sm:child:py-0 sm:child:border-none child:p-1">
          <div className="w-full sm:w-[calc(30%-4px)] md:w-[calc(30%-8px)]">
            <div className="flex items-center justify-start gap-x-2">
              <IconCart classes="h-8 w-8 fill-icon"></IconCart>
              <p className=" text-lg font-medium">Продукты</p>
            </div>
            <div className="my-1"></div>
            <div className="flex justify-between items-center">
              <div></div>
              <ReadMoreButton path="/products"></ReadMoreButton>
            </div>
          </div>
          <div className="w-full sm:w-[calc(70%-4px)] md:w-[calc(70%-8px)]">
            <div className="flex items-center justify-start gap-x-2">
              <IconNotes classes="h-8 w-8 fill-icon"></IconNotes>
              <p className=" text-lg font-medium">Заметки</p>
            </div>
            <div className="my-1"></div>
            <div className="flex justify-between items-center">
              <div></div>
              <ReadMoreButton path="/notes"></ReadMoreButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
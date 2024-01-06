export default async function Dashboars () {
  return (
    <div className="flex justify-center w-full">
      <div className="flex justify-center flex-col w-full max-w-5xl gap-y-4">
        <div className="flex justify-between w-full flex-col sm:flex-row
        child:outline-1 child:outline child:outline-border child:rounded sm:child:rounded-xl">
          <div className="w-[calc(30%-8px)]">Ближайшая днюха</div>
          <div className="w-[calc(70%-8px)]">Ближайшее задание</div>
        </div>
        <div className="flex justify-between w-full flex-col sm:flex-row
        child:border-2 child:border-border child:rounded sm:child:rounded-lg">
          <div className="w-[calc(30%-8px)]">Продукты</div>
          <div className="w-[calc(70%-8px)]">Заметки</div>
        </div>
      </div>
    </div>
  );
}
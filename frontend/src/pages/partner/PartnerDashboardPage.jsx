export default function PartnerDashboardPage() {
  return (
    <main className="p-16 pt-8">
      <section className="w-full mb-8  flex justify-between">
        <div>
          <h1 className="text-3xl font-medium">Salom, hamkor</h1>
        </div>
        <div>
          <button className="py-2 px-3 bg-blue-500 text-lg text-white cursor-pointer rounded-md">
            + yangi moyka qo'shish
          </button>
        </div>
      </section>
      <div className="flex gap-8 w-full ">
        <section className=" bg-white p-5  w-full rounded-lg shadow-md flex flex-col gap-3">
          <h3 className="text-xl font-medium pb-3 border-b border-gray-300 ">
            Moykalarim
          </h3>
          <CarwashCard />
          <NotCarwashYet size={"large"}>
            Hali moyka qo'shilmagan 🧐
          </NotCarwashYet>
        </section>
        <div className=" w-full">
          <section className="bg-white p-6 mb-4 rounded-lg shadow-md flex flex-col gap-3">
            <h3 className="text-xl font-medium pb-3 border-b border-gray-300">
              Administratsiya paneli
            </h3>
            <div className="flex-1 grid grid-cols-3 gap-5">
              <div className={gridItemStyle}>
                <h1 className="text-3xl self-center">0</h1>
                <p className="self-center">Bugungi buyurtmalar</p>
              </div>
              <div className={gridItemStyle}>
                <h1 className="text-3xl self-center">12</h1>
                <p className="self-center">Jami buyurtmalar</p>
              </div>
              <div className={gridItemStyle}>
                <h1 className="text-3xl self-center">59</h1>
                <p className="self-center">Mijozlar</p>
              </div>
              <div
                className={
                  "col-span-2 p-3 bg-green-50 rounded-lg border border-green-200 grid grid-rows-2"
                }
              >
                <h1 className="text-3xl self-center">1,500,000 so'm</h1>
                <p className="self-center">Jami daromad</p>
              </div>
              <div className={gridItemStyle}>
                <h1 className="text-3xl self-center">0</h1>
                <p className="self-center">Sof daromad</p>
              </div>
            </div>
          </section>
          <section className="bg-white p-5 rounded-lg shadow-md flex flex-col gap-3">
            <h3 className="text-xl font-medium pb-3 border-b border-gray-300">
              So'nggi buyurtmalar
            </h3>
            <NotCarwashYet size={"small"}>
              Hech narsa topilmadi 🤷‍♂
            </NotCarwashYet>
          </section>
        </div>
      </div>
    </main>
  );
}

function NotCarwashYet({ size, children }) {
  return (
    <div className="w-full flex-1  flex justify-center items-center">
      <h1
        className={
          (size === "large" ? "text-3xl font-bold" : "text-xl font-medium") +
          " text-gray-400"
        }
      >
        {children}
      </h1>
    </div>
  );
}

const gridItemStyle =
  "p-3 flex flex-col aspect-[3/2] bg-green-50 rounded-lg border border-green-200 grid grid-rows-2 gap-1";

function CarwashCard() {
  return (
    <div className="h-36 p-5 flex justify-between border border-gray-300 mb-5 rounded-xl">
      <div>
        <h1 className="text-xl font-medium mb-2">CarwashName</h1>
        <h2 className="text-lg font-medium mb-3">Address</h2>
        <h3>Details</h3>
      </div>
      <div className="flex flex-col justify-between">
        <div>Stars</div>
        <div className="inline-flex">
          <button className="px-2 py-1 border border-blue-300 cursor-pointer text-blue-500">
            Tahrirlash
          </button>
          <button className="px-2 py-1 border border-red-300 bg-red-100 cursor-pointer text-red-500">
            O'chirish
          </button>
        </div>
      </div>
    </div>
  );
}

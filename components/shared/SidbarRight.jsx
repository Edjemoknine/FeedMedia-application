import React from "react";

const SidbarRight = () => {
  return (
    <div className="sticky mt-7 right-0 top-0 z-20 h-screen  flex flex-col w-[300px] xl:w-[350px] overflow-auto gap-12 pl-6 pr-10 max-lg:hidden">
      <div className="flex flex-col gap-4">
        <h4 className="text-white text-xl font-semibold">Following</h4>
        <div className="flex flex-col gap-4">Mapping Users</div>
      </div>
      <div className="flex flex-col gap-4">
        <h4 className="text-white text-xl font-semibold">Suggestions People</h4>
        <div className="flex flex-col gap-4">Mapping Users</div>
      </div>
    </div>
  );
};

export default SidbarRight;

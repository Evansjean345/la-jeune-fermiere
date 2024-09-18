import React from 'react';

const NavigationLink = ({ children, name }) => {
  return (
    <div
      className=" flex p-1 rounded cursor-pointer stroke-[0.75] hover:stroke-neutral-100 stroke-neutral-400 text-neutral-400 hover:text-neutral-100 place-items-center gap-3 hover:bg-neutral-700/30 transition-colors duration-100"
    >
      {children}
      <h1 className="text-inherit font-poppins overflow-clip whitespace-normal tracking-wide ">
        {name}
      </h1>
    </div>
  );
};

export default NavigationLink;

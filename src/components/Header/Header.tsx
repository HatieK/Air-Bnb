import React, { useState } from "react";
import { Button, Divider, Popover } from "antd";
import classNames from "classnames";
const Header = () => {
  const [opened, setOpened] = useState(false);
  const [open, setOpen] = useState(false);

  const handleShowMobile = () => {
    setOpened(!opened);
  };

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <header className="header relative mx-auto flex max-w-screen-xl items-center justify-between bg-slate-900 py-4 md:bg-transparent md:p-6">
      {/* LOGO */}
      <div>
        <a href="" className="flex items-center space-x-3">
          <img src="/img/logo-airbnb.svg" alt="airbnb logo" className="h-8" />
          <span className="whitespace-nowrap text-2xl font-bold text-rose-800 duration-100 duration-500 hover:text-red-600">
            Airbnb
          </span>
        </a>
      </div>
      {/* NAVIGATION */}
      {/* Mobile */}
      <div
        className={`${opened ? "md:hidden" : "hidden"} absolute top-16 w-full`}
      >
        <nav className="w-full bg-slate-800">
          <ul className="flex-col items-center gap-4 rounded-lg border p-4 text-base font-medium">
            <li>
              <a href="" className="text-xl text-rose-700">
                Home
              </a>
            </li>
            <li>
              <a
                href=""
                className="text-xl text-black duration-500 hover:text-rose-600"
              >
                About
              </a>
            </li>
            <li>
              <a
                href=""
                className="text-xl text-black duration-500 hover:text-rose-600"
              >
                Service
              </a>
            </li>
            <li>
              <a
                href=""
                className="text-xl text-black duration-500 hover:text-rose-600"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href=""
                className="text-xl text-black duration-500 hover:text-rose-600"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Desktop */}
      <div>
        <nav className="w-full">
          <ul className="flex hidden items-center gap-4 rounded-lg border p-4 text-base font-medium md:flex">
            <li>
              <a href="" className="text-xl text-rose-700">
                Home
              </a>
            </li>
            <li>
              <a
                href=""
                className="text-xl text-black duration-500 hover:text-rose-600"
              >
                About
              </a>
            </li>
            <li>
              <a
                href=""
                className="text-xl text-black duration-500 hover:text-rose-600"
              >
                Service
              </a>
            </li>
            <li>
              <a
                href=""
                className="text-xl text-black duration-500 hover:text-rose-600"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href=""
                className="text-xl text-black duration-500 hover:text-rose-600"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* BUTTON ACTION */}
      <div className="flex items-center gap-3">
        <Popover
          content={
            <div className="p-3">
              <a onClick={hide} className="mb-3 block text-black">
                ĐĂNG NHẬP
              </a>
              <a href="" className="text-black">
                ĐĂNG KÝ
              </a>
            </div>
          }
          trigger="click"
          open={open}
          onOpenChange={handleOpenChange}
        >
          <Button type="primary" danger>
            <i className="fa-solid fa-user"></i>
          </Button>
        </Popover>
        <div
          onClick={handleShowMobile}
          className={classNames(
            `tham tham-e-squeeze tham-w-6 block md:hidden`,
            { "tham-active": opened },
          )}
        >
          <div className="tham-box">
            <div className="tham-inner" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;


"use client";
import { Link } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import { useState } from "react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import { AiFillMoneyCollect } from "react-icons/ai";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { CiSettings } from "react-icons/ci";
import { IoSettings } from "react-icons/io5";
import { MdHeight } from "react-icons/md";

export function AdminSidebar({expanded=false}) {
  const windowHieght = window.innerHeight;
  return (
    <Sidebar aria-label="Default sidebar example" className={`md:block md:sticky top-0 h-screen pt-8 fixed z-20 ${!expanded && "hidden"}`}>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to="/admin">
          <Sidebar.Item  icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          </Link>
          <Link to={"/admin/products"}>
          <Sidebar.Item icon={HiShoppingBag}>
            Products
          </Sidebar.Item>
          </Link>

          <Link to={"/admin/inbox"}>
          <Sidebar.Item icon={HiInbox}>
            Inbox
          </Sidebar.Item>
          </Link>

          <Link to={"/admin/orders"}>
          <Sidebar.Item icon={AiFillMoneyCollect}>
            Orders
          </Sidebar.Item>
          </Link>
          
        <Link to={"/admin/management"}>
          <Sidebar.Item icon={IoSettings}>
            Management
          </Sidebar.Item>
        </Link>
          
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default AdminSidebar
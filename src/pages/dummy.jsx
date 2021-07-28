import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button } from "antd";
import Loading from "../components/Loading";
import "../styles/dashboard.css";
import {
  addCategory,
  addExpense,
  getCategories,
  getDetails,
} from "../redux/actions/expenseActions";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { expenses, categories } = useSelector(
    (storeState) => storeState.expenseState
  );

  useEffect(() => {
    dispatch(getDetails());
  }, []);

  const columns = [
    {
      title: "Date",
      dataIndex: "Date",
      className: "cols",
    },
    {
      title: "Category",
      dataIndex: "Category",
      className: "cols",
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      className: "cols",
    },
    {
      title: "Description",
      dataIndex: "Description",
      className: "cols",
    },
  ];

  let data = [];
  expenses &&
    expenses.map((el, index) => {
      data.unshift({
        key: index,
        Date: el.date_added,
        Category: el.category,
        Amount: el.amount,
        Description: el.description,
      });
    });
  return (
    <div className="dashboard-container">
      {expenses ? (
        <>
          <div className="dashboard-table">
            <Table
              columns={columns}
              dataSource={data}
              pagination={{ hideOnSinglePage: true }}
            />
          </div>
          <div className="dashboard-btns">
            <Button type="primary">+ Expense</Button>
            <Button type="primary">Filter</Button>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Dashboard;

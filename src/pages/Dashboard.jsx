import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading'
import InputField from '../components/InputField'
import '../styles/dashboard.css'
import { Table, Button, Modal, DatePicker, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { 
    addCategory,
    addExpense,
    getCategories,
    getDetails
 } from '../redux/actions/expenseActions'


const { RangePicker } = DatePicker;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const Dashboard = () => {
    const dispatch = useDispatch()
    const[M1visible, setVisibleM1] = useState(false);
    const[M2visible, setVisibleM2] = useState(false);
    const initialExpense = {
        amount: '',
        category : '',
        description : ''
    }
    const initialFilter = {
        category : '',
        start_date : '',
        end_date : ''
    }
    const[expense, setExpense] = useState(initialExpense)
    const[filter, setFilter] = useState(initialFilter)
    const[category, setCategory] = useState('')
    const { expenses, categories, loader } = useSelector(storeState => storeState.expenseState)
    
    useEffect(() => {
        dispatch(getDetails())
        dispatch(getCategories())
    }, [])

    const columns = [
      {
        title: 'Date',
        dataIndex: 'Date',
        className : "cols"
      },
      {
        title: 'Category',
        dataIndex : 'Category',
        className : "cols"
      },
      {
        title: 'Amount',
        dataIndex : 'Amount',
        className : "cols"
      },
      {
        title: 'Description',
        dataIndex : 'Description',
        className : "cols"
      },

    ];
    
    let data = [];
    expenses && expenses.map((el, index) => {
      data.unshift({
        key: index,
        Date : el.date_added,
        Category: el.category,
        Amount: el.amount,
        Description: el.description,
      });
    })

    const handleClick = e => {
        e.preventDefault();
        dispatch(addCategory(category))
        setCategory('')
    }

    const handleDateChange = (_, dateString) => {
        setFilter({...filter, start_date : dateString[0], end_date : dateString[1]})
    }

    const handleFilterSubmit = e => {
        e.preventDefault();
        dispatch(getDetails(filter))
        setFilter(initialFilter)
    }

    const handleExpenseSubmit = e => {
        e.preventDefault();
        dispatch(addExpense(expense))
        setExpense(initialExpense)
    }

    return (
        <>
            <div className="dashboard-container">
                {
                    expenses
                    ?
                    <>
                        <div className='dashboard-table'>
                            <Table className="table" columns={columns} dataSource={data} pagination={{hideOnSinglePage: true, }} />
                        </div>
                        <div className="dashboard-btns">
                        {
                                loader && <Spin 
                                    style={{
                                        position : "absolute",
                                        right : '2%',
                                        top: '8%'
                                    }}
                                    indicator={antIcon} 
                                />
                            }
                            <div className="btns">
                                <InputField 
                                    type='text'
                                    style={{ width : '65%', padding : '10px', textAlign : "center"}} 
                                    placeholder="Add a new category"
                                    value={category}
                                    onChange={e => setCategory(e.target.value)}
                                />
                                {
                                    category == '' 
                                    ?
                                    <Button onClick={handleClick} type="primary" disabled>+ Category</Button>
                                    :
                                    <Button onClick={handleClick} type="primary">+ Category</Button>
                                }
                                <Button onClick={()=>{
                                    setVisibleM2(true) 
                                    dispatch(getCategories()) 
                                }} type="primary">Filter</Button>
                                <Button onClick={()=>{
                                    setVisibleM1(true)
                                    dispatch(getCategories()) 
                                }} type="primary">+ Expense</Button>
                            </div>
                        </div>
                    </>
                    :
                        <Loading/> 
                }
            </div>
                    <Modal
                        title="Add expense"
                        centered
                        footer={null}
                        visible={M1visible}
                        onCancel={() => {
                            setVisibleM1(false)
                            dispatch(getDetails())
                        }}
                        className='image-modal'
                    >
                            <div className="add-expense-section">
                                <div style={{ display : "flex", justifyContent : "space-evenly"}}>
                                    <select onChange={ e => setExpense({...expense, category : e.target.value })} className="dropdown-stylings" defaultValue='default' required>
                                        <option disabled value='default'> --- category --- </option>
                                        {
                                            categories ? 
                                                categories.map( el => (
                                                    <>
                                                        <option>{el}</option>
                                                    </>
                                                ))
                                            : null
                                        }
                                    </select>
                                    <InputField
                                        type="Number"
                                        value={expense.amount}
                                        onChange={ e => setExpense({...expense, amount : e.target.value })}
                                        placeholder = "add the money spent"
                                        required
                                    />
                                </div>
                                <InputField
                                        type="textarea"
                                        value={expense.description}
                                        onChange={ e => setExpense({...expense, description : e.target.value })}
                                        placeholder = "desribe your spending"
                                        required
                                    />
                                <Button type="primary" onClick={handleExpenseSubmit}>Add</Button>
                            </div> 
                    </Modal>   
                    <Modal
                        title="Filter your expenses"
                        centered
                        footer={null}
                        visible={M2visible}
                        width={700}
                        onCancel={() =>{
                            setVisibleM2(false)
                        }}
                        className='image-modal'
                    >
                        <div className="filter-section">
                            <div style={{ display : "flex", justifyContent : "space-evenly"}}>
                                <select onChange={ e => setFilter({...filter, category : e.target.value })} className="dropdown-stylings" defaultValue='default'>
                                    <option disabled value='default'> --- category --- </option>
                                    {
                                        categories ? 
                                        categories.map( el => (
                                            <>
                                                <option>{el}</option>
                                            </>
                                        ))
                                        : null
                                    }
                                </select>
                                <RangePicker
                                    format="YYYY-MM-DD"
                                    onChange={handleDateChange}
                                />
                            </div>
                            <div style={{ display : 'flex', justifyContent : 'space-around'}}>
                                <Button type="primary" onClick={handleFilterSubmit}>Filter</Button>
                                <Button style={{ color : "red" }} onClick={() => {
                                    dispatch(getDetails())
                                    setFilter(initialFilter)
                                }}> X reset</Button>
                            </div>
                        </div>     
                    </Modal> 
        </>
    )
}

export default Dashboard

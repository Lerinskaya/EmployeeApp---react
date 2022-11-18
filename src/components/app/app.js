import { Component } from 'react';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';
import { v4 } from "uuid";

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { name: 'Юрий С.', salary: 1500, increase: true, rise: true, id: v4() },
                { name: 'Ольга A.', salary: 1800, increase: true, rise: false, id: v4() },
                { name: 'Вячеслав B.', salary: 900, increase: false, rise: false, id: v4() }
            ],
            value: '',
            filter: "all",
        }
    }
    deleteItem = (id) => {
        this.setState(({ data }) => {
            return {
                data: data.filter(person => person.id !== id)
            }
        });
    }

    addItem = (name, salary) => {
        const newPerson = {
            name,
            salary,
            increase: false,
            rise: false,
            id: v4()
        }
        this.setState(({ data }) => {
            const newArr = [...data, newPerson];
            return {
                data: newArr
            }
        });
    }

    onToggleProp = (id, prop) => {
        this.setState(({ data }) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return { ...item, [prop]: !item[prop] }
                }
                return item;
            })
        }))
    }

    searchEmp = (items, value) => {
        if (value.length === 0) {
            return items;
        }
        return items.filter(item => {
            return item.name.indexOf(value) > -1
        })
    }

    onUpdateSearch = (value) => {
        this.setState({ value });
    }

    filteredData = (items, filter) => {

        if (filter === 'all') {
            return items
        } else if (filter === 'rise') {
            return items.filter(person => person.rise)
        } else if (filter === 'more1000') {
            return items.filter(person => person.salary > 1000)
        }
    }

    onChangeTab = (filter) => {
        this.setState({ filter });
    }

    render() {
        const { data, value, filter } = this.state;
        const visibleData = this.filteredData(this.searchEmp(data, value), filter);
        const employees = this.state.data.length;
        const employeesOnIncrease = this.state.data.filter(person => person.increase).length;
        return (
            <div className="app">
                <AppInfo
                    employees={employees}
                    employeesOnIncrease={employeesOnIncrease} />

                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch} />
                    <AppFilter filter={filter}
                        onChangeTab={this.onChangeTab} />
                </div>
                <EmployeesList
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp} />
                <EmployeesAddForm onAdd={this.addItem} />
            </div>
        );
    }
}

export default App;
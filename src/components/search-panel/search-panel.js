import { Component } from 'react';
import './search-panel.css'

class SearchPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }

    onSearch = (e) => {
        const value = e.target.value;
        this.setState({ value });
        this.props.onUpdateSearch(value)
    }

    render() {
        return (
            <input
                type="text"
                className="form-control search-input"
                placeholder="Найти сотрудника"
                value={this.state.value}
                onChange={this.onSearch} />
        )
    }
}

export default SearchPanel;